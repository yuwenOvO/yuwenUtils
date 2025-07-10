# NestJS 集成 Prisma 数据库 ORM

## 1. 安装依赖

```bash
pnpm install @prisma/client
pnpm install -D prisma
```

## 2. 初始化 Prisma

```bash
npx prisma init
```

这将创建一个 `prisma` 文件夹，里面包含一个 `schema.prisma` 文件。

## 3. 配置数据源

在 `prisma/schema.prisma` 中配置数据源：

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

在 `.env` 文件中添加数据库连接字符串：

```env
DATABASE_URL="postgresql://user:password@localhost:5432/mydb"
```

## 4. 生成 Prisma Client

```bash
npx prisma generate
```

## 5. 在 NestJS 中使用 Prisma

### 5.1 创建 PrismaService 模块

目录结构建议：

```bash
src/
  prisma/
    prisma.module.ts  # Prisma 模块
    prisma.service.ts  # Prisma 服务
  app.module.ts
  main.ts
```

在 `src/prisma/prisma.module.ts` 中创建 Prisma 模块：

```typescript
import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // 使用 @Global() 装饰器使 PrismaService 在整个应用中可用
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
```

在 `src/prisma/prisma.service.ts` 中创建 Prisma 服务：

```typescript
import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super({
      // 配置 Prisma 日志
      log: ['error', 'warn', 'info', 'query'],
    });
  }

  async onModuleInit() {
    await this.$connect();
  }
}
```

### 5.2 在 AppModule 中注册 PrismaService

```typescript
import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [PrismaModule],
})
export class AppModule {}
```

### 5.3 在其他模块中注入 PrismaService

```typescript
import { Controller, Get } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Controller('users')
export class UsersController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  async findAll() {
    return this.prisma.user.findMany();
  }
}
```

## 6. 运行数据库迁移

```bash
npx prisma migrate dev --name init
```

## 7. 使用 Prisma Studio

```bash
npx prisma studio
```
