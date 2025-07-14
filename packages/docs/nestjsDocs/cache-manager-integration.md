# 集成cache-manager缓存和redis

在NestJS中集成`cache-manager`和`redis`可以通过以下步骤实现：

## 安装依赖

```bash
pnpm install cache-manager cacheable keyv @keyv/redis
```

::: info
`cache-manager` 是一个多存储缓存管理器，支持多种存储引擎，包括内存、文件系统和Redis等。<br>
`cacheable` 是一个用于缓存函数结果的库，可以与 `cache-manager` 一起使用。<br>
`keyv` 是一个轻量级的键值存储库，支持多种存储引擎，包括Redis。<br>
`@keyv/redis` 是 `keyv` 的 Redis 存储引擎。<br>
:::

## 配置缓存模块

新建 `redis` 模块，目录结构如下：

```bash
src/
├── redis
│   ├── redis.module.ts
│   └── redis.service.ts
```

### redis.module.ts

```typescript
import KeyvRedis from '@keyv/redis';
import { Global, Module } from '@nestjs/common';
import { createCache } from 'cache-manager';
import { CacheableMemory } from 'cacheable';
import Keyv from 'keyv';
import { RedisService } from './redis.service';

@Global() // 使用 @Global 装饰器使模块在全局可用
@Module({
  providers: [
    RedisService,
    {
      provide: 'CACHE_MANAGER',
      useFactory: () => {
        const cache = createCache({
          stores: [
            new Keyv({
              store: new CacheableMemory({ ttl: 1000 * 60 * 30 }),
            }),
            new Keyv(new KeyvRedis(`redis://:你的密码@你的地址:你的端口`)),
          ],
        });
        return cache;
      },
    },
  ],
  exports: [RedisService, 'CACHE_MANAGER'],
})
export class RedisModule {}
```

这里我们创建了一个全局的 `RedisModule`，它提供了一个名为 `CACHE_MANAGER` 的缓存管理器实例。这个实例使用了 `cache-manager` 和 `keyv` 来支持 Redis 缓存。

其中实现了一个 `useFactory` 方法来创建缓存实例，并配置了两个存储引擎：一个是内存存储，另一个是 Redis 存储。
内存存储使用了 `cacheable` 库来缓存函数结果，默认 TTL 为 30 分钟，Redis 存储使用了 `keyv` 库。

### redis.service.ts

```typescript
import { Inject, Injectable } from '@nestjs/common';
import { CreateCache, MyRedisClient } from 'src/types';

@Injectable()
export class RedisService {
  @Inject('CACHE_MANAGER')
  private cacheManager: CreateCache;

  /** 获取 Redis 客户端 */
  async getRedisClient(): Promise<MyRedisClient> {
    const client: MyRedisClient = this.cacheManager.stores[1].store.client;
    // 检测 Redis 客户端是否连接
    if (!client || !client.isOpen) {
      await client.connect();
    }
    return client;
  }

  /**
   * @description: 获取指定模式的 Redis 键
   * @param {string} pattern - 键的匹配模式
   * @return {Promise<string[]>} - 返回匹配的键列表
   */
  async getRedisKeys(pattern: string): Promise<string[]> {
    const client = await this.getRedisClient();
    const keys = await client.keys(pattern);
    return keys;
  }

  /**
   * @description: 向 Redis Set 中添加一个值
   * @param {string} key - Set 的键
   * @param {string} value - 要添加的值
   */
  async sAdd(key: string, value: string) {
    const client = await this.getRedisClient();
    await client.sAdd(key, value);
  }

  /**
   * @description: 获取 Redis Set 中的所有成员
   * @param {string} key - Set 的键
   * @return {Promise<string[]>} - 返回 Set 中的所有成员
   */
  async sMembers(key: string): Promise<string[]> {
    const client = await this.getRedisClient();
    const members = await client.sMembers(key);
    return members;
  }

  /**
   * @description: 删除指定的 Redis Set 中的一个值
   * @param {string} key - 要删除的键
   */
  async sRem(key: string, value: string) {
    const client = await this.getRedisClient();
    await client.sRem(key, value);
  }

  /**
   * @description: 设置 Set 的过期时间
   * @param {string} key - Set 的键
   * @param {number} seconds - 过期时间（秒）
   */
  async expire(key: string, seconds: number) {
    const client = await this.getRedisClient();
    await client.expire(key, seconds);
  }

  /**
   * @description: 向 Redis Set 中添加一个值并设置过期时间
   * @param {string} key - Set 的键
   * @param {string} value - 要添加的值
   * @param {number} seconds - 过期时间（秒）
   */
  async sAddWithExpire(key: string, value: string, seconds: number) {
    const client = await this.getRedisClient();
    await client.sAdd(key, value);
    await client.expire(key, seconds);
  }
}
```

因为cache-manager和keyv里只有简单的键值对存储和获取方法，所以我们在 `RedisService` 中封装了一些常用的 Redis 操作方法，如获取 Redis 客户端、获取键列表、添加 Set 成员、获取 Set 成员、删除 Set 成员以及设置过期时间等。

## 使用 Redis 模块

在app.module.ts中导入 `RedisModule`：

```typescript
import { RedisModule } from 'src/redis/redis.module';

@Module({
  imports: [RedisModule],
})
export class AppModule {}
```

现在，你可以在任何需要使用 Redis 的地方注入 `RedisService`，并使用它提供的方法来操作 Redis。
在需要使用缓存的地方，你可以通过注入 `CACHE_MANAGER` 来使用缓存功能。以下是一个示例：

```typescript
import { Controller, Get, Inject } from '@nestjs/common';
import { createCache } from 'cache-manager';
import { RedisService } from 'src/redis/redis.service';

type CreateCache = ReturnType<typeof createCache>;

@Controller('example')
export class ExampleController {
  @Inject('CACHE_MANAGER')
  private cacheManager: CreateCache;

  constructor(private readonly redisService: RedisService) {}

  @Get('cached-data')
  async getCachedData() {
    const cachedData = await this.cacheManager.get('my-key');
    if (cachedData) {
      return { data: cachedData, source: 'cache' };
    }

    // 如果缓存中没有数据，则从数据库或其他来源获取数据
    const data = { message: 'Hello, World!' }; // 模拟从数据库获取数据

    // 将数据存入缓存
    await this.cacheManager.set('my-key', data, { ttl: 1000 * 60 * 5 }); // 缓存5分钟

    // 如果需要存储高级数据结构，可以使用 Redis Service 例如 Set
    await this.redisService.sAddWithExpire('my-set', JSON.stringify(data), 1000 * 60 * 5);

    return { data, source: 'database' };
  }
}
```
