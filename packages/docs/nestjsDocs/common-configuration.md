# NestJS 常见配置

## 1. 环境变量配置

在 NestJS 项目中，通常使用 `.env` 文件来管理环境变量。可以使用 `dotenv` 包来加载这些变量。

### 安装依赖

```bash
pnpm install dotenv
```

### 创建 `.env` 文件

```env
PORT=3000
```

### 在 `main.ts` 中加载环境变量

```typescript
import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
```

### 配置类型提示

在 `src/types/env.d.ts` 中扩展 `ProcessEnv` 接口：

```typescript
declare namespace NodeJS {
  interface ProcessEnv {
    PORT?: string;
    // 其他环境变量
  }
}
```

## 2. 配置跨域

在 `main.ts` 中配置跨域：

```typescript
// ....
const app = await NestFactory.create(AppModule);
app.enableCors();
// ....
```
