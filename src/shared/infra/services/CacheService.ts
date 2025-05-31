import { RedisClientType, createClient } from 'redis';

export interface CacheService {
  get<T>(key: string): Promise<T | null>;
  set<T>(key: string, value: T, options?: { ttl?: number }): Promise<void>;
  delete(key: string): Promise<void>;
}

export class RedisCacheService implements CacheService {
  private client: RedisClientType | null = null;

  constructor(
    private redisUrl?: string,
    private defaultTtl: number = 3600 // 1 hour default
  ) {}

  private async getClient(): Promise<RedisClientType> {
    if (!this.client) {
      this.client = createClient({
        url: this.redisUrl || process.env.REDIS_URL,
      });
      await this.client.connect();
    }
    return this.client;
  }

  private reviveDates(key: string, value: any): any {
    // Convert ISO date strings back to Date objects
    if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(value)) {
      return new Date(value);
    }
    return value;
  }

  async get<T>(key: string): Promise<T | null> {
    try {
      const client = await this.getClient();
      const value = await client.get(key);
      return value ? JSON.parse(value, this.reviveDates) : null;
    } catch (error) {
      console.error('Cache get error:', error);
      return null;
    }
  }

  async set<T>(key: string, value: T, options?: { ttl?: number }): Promise<void> {
    try {
      const client = await this.getClient();
      const ttl = options?.ttl || this.defaultTtl;
      await client.set(key, JSON.stringify(value), { EX: ttl });
    } catch (error) {
      console.error('Cache set error:', error);
    }
  }

  async delete(key: string): Promise<void> {
    try {
      const client = await this.getClient();
      await client.del(key);
    } catch (error) {
      console.error('Cache delete error:', error);
    }
  }

  async disconnect(): Promise<void> {
    if (this.client) {
      await this.client.disconnect();
      this.client = null;
    }
  }
} 