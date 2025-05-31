import dotenv from 'dotenv';
import { createClient, RedisClientType } from 'redis';

dotenv.config();

// Cache keys from GetPostsUseCase and GetPostByIdUseCase
const CACHE_KEYS = {
  ALL_POSTS: 'blog:all_posts',
  POSTS_PATTERN: 'blog:post:*'
} as const;

/** Simple posts cache invalidation for build process */
class PostsCacheInvalidator {
  private client: RedisClientType | null = null;

  constructor(private redisUrl?: string) {}

  private async getClient(): Promise<RedisClientType> {
    if (!this.client) {
      this.client = createClient({
        url: this.redisUrl || process.env.REDIS_URL,
      });
      await this.client.connect();
    }
    return this.client;
  }

  async invalidatePostsCaches(): Promise<void> {
    try {
      const client = await this.getClient();
      let totalCleared = 0;

      // Clear all posts cache
      const allPostsDeleted = await client.del(CACHE_KEYS.ALL_POSTS);
      if (allPostsDeleted > 0) {
        console.log(`✅ Cleared all posts cache: ${CACHE_KEYS.ALL_POSTS}`);
        totalCleared += allPostsDeleted;
      }

      // Clear individual post caches
      const postKeys = await client.keys(CACHE_KEYS.POSTS_PATTERN);
      if (postKeys.length > 0) {
        const individualDeleted = await client.del(postKeys);
        console.log(`✅ Cleared individual post caches: ${individualDeleted} entries`);
        totalCleared += individualDeleted;
      }

      if (totalCleared === 0) {
        console.log('📝 No post caches found to clear.');
      } else {
        console.log(`📊 Total cache entries cleared: ${totalCleared}`);
      }
    } catch (error) {
      console.error('❌ Error invalidating post caches:', error);
      throw error;
    }
  }

  async disconnect(): Promise<void> {
    if (this.client) {
      await this.client.disconnect();
      this.client = null;
    }
  }
}

/** Main function for Next.js build script */
async function main() {
  const cacheInvalidator = new PostsCacheInvalidator();
  
  try {
    console.log('🚀 Invalidating posts cache...');
    
    await cacheInvalidator.invalidatePostsCaches();
    
    console.log('✅ Cache invalidation completed!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Failed to invalidate cache:', error);
    process.exit(1);
  } finally {
    await cacheInvalidator.disconnect();
  }
}

// Run if called directly
if (require.main === module) {
  main();
}
