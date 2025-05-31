export interface Post {
  id: string;
  title: string;
  content: string;
  publishedAt: Date;
  excerpt?: string;
  tags?: string[];
  categories?: string[];
}

export class PostEntity implements Post {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly content: string,
    public readonly publishedAt: Date,
    public readonly excerpt?: string,
    public readonly tags?: string[],
    public readonly categories?: string[]
  ) {}

  static fromMarkdown(id: string, frontMatter: any, content: string): PostEntity {
    // Handle date field - can be 'date' or 'publishedAt'
    const dateValue = frontMatter.date || frontMatter.publishedAt;
    const publishedAt = dateValue ? new Date(dateValue) : new Date();

    // Handle categories - can be string or array
    let categories: string[] = [];
    if (frontMatter.categories) {
      if (Array.isArray(frontMatter.categories)) {
        categories = frontMatter.categories;
      } else if (typeof frontMatter.categories === 'string') {
        categories = frontMatter.categories.split(',').map((cat: string) => cat.trim());
      }
    }

    // Handle tags - can be string or array
    let tags: string[] = [];
    if (frontMatter.tags) {
      if (Array.isArray(frontMatter.tags)) {
        tags = frontMatter.tags;
      } else if (typeof frontMatter.tags === 'string') {
        tags = frontMatter.tags.split(',').map((tag: string) => tag.trim());
      }
    }

    return new PostEntity(
      id,
      frontMatter.title || 'Untitled',
      content,
      publishedAt,
      frontMatter.excerpt,
      tags,
      categories
    );
  }

  getFormattedDate(): string {
    return this.publishedAt.toLocaleDateString();
  }
} 