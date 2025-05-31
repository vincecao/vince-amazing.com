import { CacheService, RedisCacheService } from '../infra/services/CacheService';

export class DIContainer {
  private static instance: DIContainer;
  private services: Map<string, any> = new Map();

  private constructor() {
    this.initializeServices();
  }

  static getInstance(): DIContainer {
    if (!DIContainer.instance) {
      DIContainer.instance = new DIContainer();
    }
    return DIContainer.instance;
  }

  private initializeServices(): void {
    // Initialize shared services
    this.services.set('CacheService', new RedisCacheService());
  }

  get<T>(key: string): T {
    const service = this.services.get(key);
    if (!service) {
      throw new Error(`Service ${key} not found in container`);
    }
    return service;
  }

  set<T>(key: string, service: T): void {
    this.services.set(key, service);
  }
} 