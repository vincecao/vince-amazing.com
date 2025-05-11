---
title: My Universal LLM Client
date: 2025-05-11 13:56:00
tags: 
- llm
categories: Config
---

It's been a while since my last post, and many new technologies have popped up since then. There are so many things to learn every day, especially all things around LLM, and it's a little overwhelming as a developer, but I try to organize a way that works for my own workflow.

In my mind, there are generally two types of ways for operating the prompt nowadays. One is using pure first-hand SDKs, such as SDKs from OpenAI, Anthropic, or even some high-level abstractions created by open source libraries that claim to improve the coding experience, which still keeps relative flexibility in coding fashion. Some libraries for example are [kaibanjs](https://www.kaibanjs.com/) or [praison](https://docs.praison.ai/). Another one is using kind of fancy UI tools that immediately start to learn their way of thinking through UI operations, one example being [Vellum](https://www.vellum.ai/). The former is kind of great when you want to code something that fits your own needs, and the latter is great if you're a non-developer and want to just make things work without coding.

Below is what I take. I want to avoid learning something high-level for now because I can imagine the majority of libraries or UI tools will be burned to the ground after competition, and the time spent building up the knowledge will be wasted. I choose SDK, but I also don't want to waste time making tons of variants for each SDK per model family. Occasionally I happened to find [OpenRouter](https://openrouter.ai/). It's a smart way that acts as an LLM router, and uses OpenAI SDK - perfect. It seems OpenRouter will always stay up-to-date with what's popular in the model world, regardless of whether it's paid or free. I didn't find a master list of the models it supports, so I built a cron worker in GitHub Action, with [crawl4ai](https://github.com/unclecode/crawl4ai), and created [a dynamic list of paid and free models](https://github.com/vincecao/scheduler/blob/master/crawl4ai/openrouter/db/models.json) from OpenRouter. The action will crawl the list from their search page every week. I am very satisfied - the flow like this is small enough but also quite powerful to support all the latest models, as well as their features.

I made a [recipe generating project](https://github.com/vincecao/recipe-muse), and using the above way to form my version of an LLM client. It's easy enough to add `responseFormat`, `stream`, and `tools` support. I might want to make a little improvement on error handling and retry, but overall this is my small universal LLM client. I can now convert it to a TS lib or even a small server, and of course, I can also use HTTP to integrate it into other languages, such as my little [Swift project](https://github.com/vincecao/Polish-It).

Below are portions of code snippets from my [LLM client](https://github.com/vincecao/recipe-muse/blob/main/src/app/api/_services/llm-client.ts). It currently only supports one tool at a time, but is packaged for Generic type to better support formatted JSON output.

I will also recommend to check Anthropic API doc which explain some best practice for [building ai agents](https://www.anthropic.com/engineering/building-effective-agents). Thanks for reading.

_llm client_
``` ts
import OpenAI from 'openai';

export type LLMRequest = {
  messages: ChatCompletionMessageParam[];
  family: ModelFamily;
  model: Model;
  temperature?: number;
  max_tokens?: number;
  stream?: false | null | undefined;
  response_format?: ResponseFormatText | ResponseFormatJSONObject | ResponseFormatJSONSchema;
  tools?: ChatCompletionTool[];
};

export type LLMResponse<T> = {
  content: T;
  model: string;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
  };
};

const DEFAULT_USAGE = {
  prompt_tokens: 0,
  completion_tokens: 0,
  total_tokens: 0,
};

export class LLMClient {
  private readonly openRouterClient: OpenAI;

  constructor(
    private readonly CONFIG = {
      baseURL: 'https://openrouter.ai/api/v1' as const,
      apiKey: process.env.OPEN_ROUTER_API_KEY,
    },
  ) {
    this.openRouterClient = new OpenAI(this.CONFIG);
  }

  async processLlm<T = string>(
    payload: LLMRequest,
  ): Promise<LLMResponse<T> {
    const { family, model, tools, response_format } = payload;

    if (!family || !model) {
      throw new Error('Family and model are required');
    }

    const createOption = this.createLlmOptions(payload);
    const completion = await this.openRouterClient.chat.completions.create(createOption);

    return this.handleNonStreamingResponse<T>(completion, !!tools, !!response_format);

    /** @todo Handle streaming response 
     * if (stream) return this.handleStreamingResponse<T>(completion);
    */
      
  }

  private createLlmOptions(payload: LLMRequest) {
    const { messages, family, model, temperature = 0.0, max_tokens = 4096, stream, response_format, tools } = payload;
    return {
      messages,
      model: `${family}/${model}`,
      temperature,
      max_tokens,
      stream,
      response_format,
      tools,
    };
  }

  private handleNonStreamingResponse<T>(
    completion: ChatCompletion,
    hasTools: boolean,
    hasStructOutput: boolean,
  ): LLMResponse<T> | Promise<LLMResponse<T>> {
    const responseHandler = hasTools ? this.handleLlmResponseWithTool : this.handleLlmResponseWithoutTool;
    return responseHandler<T>(completion, hasStructOutput);
  }

  /*
  private async *handleStreamingResponse<T>(completion: AsyncIterable<any>): AsyncIterable<LLMResponse<T>> {
  }
  */

  private handleLlmResponseWithoutTool<T>(completion: ChatCompletion, hasStructOutput: boolean): LLMResponse<T> {
    // Validate completion.choices
    if (!completion.choices || !Array.isArray(completion.choices) || completion.choices.length === 0) {
      throw new Error('Invalid response: No choices available');
    }
    const [choice] = completion.choices;
    if (!choice?.message?.content) {
      throw new Error('No content in response');
    }

    console.log('Model content', choice.message.content);
    return {
      content: (!hasStructOutput ? choice.message.content : JSON.parse(choice.message.content)) as T,
      model: completion.model,
      usage: completion.usage || DEFAULT_USAGE,
    };
  }

  private async handleLlmResponseWithTool<T>(completion: ChatCompletion): Promise<LLMResponse<T>> {
    // Validate completion.choices
    if (!completion.choices || !Array.isArray(completion.choices) || completion.choices.length === 0) {
      throw new Error('Invalid response: No choices available');
    }
    const [choice] = completion.choices;
    if (!choice?.message?.tool_calls) {
      throw new Error('No tool calls in response');
    }

    // Process the tool call
    const toolResponse = await this.getToolResponse<T>(choice.message);

    console.log('Tool response', toolResponse.content);
    return {
      content: toolResponse.content,
      model: completion.model,
      usage: completion.usage || DEFAULT_USAGE,
    };
  }

  private async getToolResponse<Response>(
    response: ChatCompletionMessage,
  ): Promise<{ role: 'tool'; toolCallId: string; name: string; content: Response }> {
    const [toolCall] = response.tool_calls || [];
    const toolName = toolCall.function.name;
    const toolArgs = JSON.parse(toolCall.function.arguments);

    const toolFunction = TOOL_COMPLETION_RESPONSE[toolName as keyof typeof TOOL_COMPLETION_RESPONSE];
    if (!toolFunction) {
      throw new Error(`Tool function ${toolName} not found`);
    }
    const toolResult = await toolFunction(toolArgs);

    return {
      role: 'tool',
      toolCallId: toolCall.id,
      name: toolName,
      content: toolResult as Response,
    };
  }
}
```

_call with structured output_
``` ts
const payload = {
  // ...,
  /**
   * schema matches ReturnType
   * https://openrouter.ai/docs/features/structured-outputs#using-structured-outputs
   */
  response_format: {}
}
const { content } = await llmClient.processLlm<ReturnType>(payload);
```

_call with tool_
``` ts
async function count(input: { text: string }): Promise<{ length: number }> {
  return { length: input.text.length };
}

export const TOOL_COMPLETION_REQUEST = {
  /**
   * tool function that matches ToolReturnType
   * https://openrouter.ai/docs/features/tool-calling#define-the-tool
   */
  count: {
    type: 'function',
    function: {
      name: 'count',
      description: 'Count the number of characters in a given text string',
      parameters: {
        type: 'object',
        properties: {
          text: {
            type: 'string',
            description: 'The text string to count characters for',
          },
        },
        required: ['text'],
      },
    },
  } as ChatCompletionTool,
};

const TOOL_COMPLETION_RESPONSE = {
  count,
};

const payload = {
  // ...,
  tools: [TOOL_COMPLETION_REQUEST.count]
}
const { content } = await llmClient.processLlm<ToolReturnType>(payload);
```