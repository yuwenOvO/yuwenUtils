---
outline: deep
---

# NestJS 集成 Swagger 详细指引

本指引将手把手教你如何在 NestJS 项目中集成 Swagger，实现自动化 API 文档。

## 1. 安装依赖

```bash
pnpm install @nestjs/swagger
```

## 2. 配置环境变量（可选）

在项目根目录下新建 `.env` 文件，添加如下内容：

```env
SWAGGER_PATH=/api-docs
SWAGGER_TITLE=Nest Demo API
SWAGGER_DESCRIPTION=Nest Demo API Documentation
SWAGGER_VERSION=1.0.0
```

## 3. 在入口文件中集成 Swagger

编辑 `src/main.ts`，添加如下代码：

```typescript
import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger 配置
  const options = new DocumentBuilder()
    .setTitle(process.env.SWAGGER_TITLE || 'NestJS API')
    .setDescription(process.env.SWAGGER_DESCRIPTION || 'API description')
    .setVersion(process.env.SWAGGER_VERSION || '1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(process.env.SWAGGER_PATH || '/api-docs', app, document);

  await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();
```

## 4. 可选：为环境变量添加类型提示

在 `src/types/env.d.ts` 文件中扩展 `ProcessEnv` 接口：

```typescript
declare namespace NodeJS {
  interface ProcessEnv {
    PORT?: string;
    SWAGGER_TITLE?: string;
    SWAGGER_DESCRIPTION?: string;
    SWAGGER_VERSION?: string;
    SWAGGER_PATH?: string;
  }
}
```

确保 `tsconfig.json` 的 `include` 包含 `src/types` 目录。

## 5. 启动项目并访问文档

```bash
npm run start
# 或 pnpm start
```

访问：`http://localhost:3000/api-docs`（或你配置的 SWAGGER_PATH）

## 6. 常见问题

- **接口未显示？**
  - 确认控制器和 DTO 上有正确的 Swagger 装饰器（如 `@ApiTags`、`@ApiProperty` 等）。
- **环境变量无效？**
  - 确认已安装 `dotenv` 并在入口文件顶部 `import 'dotenv/config'`。
- **类型提示无效？**
  - 检查 `env.d.ts` 文件路径和 `tsconfig.json` 配置。

## 7. 参考文档

- [NestJS 官方 Swagger 文档](https://docs.nestjs.com/openapi/introduction)
- [Swagger 官方文档](https://swagger.io/docs/)

如有问题欢迎补充！
