import dotenv from 'dotenv';
import { createClient } from 'redis';

dotenv.config();

/** A function will be called by nextjs build script */
async function main() {
  try {
    await invalidateBlogCache();
    console.log('Successfully invalidated blog cache');
    process.exit(0);
  } catch (error) {
    console.error('Failed to invalidate blog cache:', error);
    process.exit(1);
  }
}

async function invalidateBlogCache(): Promise<void> {
  const redis = createClient({ url: process.env.REDIS_URL });
  redis.connect().catch(console.error);
  try {
    // Delete all blog-related cache entries
    const keys = await redis.keys('blog:*');
    if (keys.length > 0) {
      await redis.del(keys);
      keys.forEach((key) => {
        console.log(`Cleared blog cache entry: ${key}`);
      });
      console.log(`Total cleared blog cache entries: ${keys.length}`);
    } else {
      console.log('No blog cache entries found to clear.');
    }
  } catch (error) {
    console.error('Error invalidating blog cache:', error);
  }
  await redis.quit();
}

main();
