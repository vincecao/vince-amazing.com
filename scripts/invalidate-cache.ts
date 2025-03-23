import { invalidateBlogCache } from '../app/blog/_util';

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

main(); 