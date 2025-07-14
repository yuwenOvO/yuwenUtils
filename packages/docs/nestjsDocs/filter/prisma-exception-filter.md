# Prisma 异常过滤器

Prisma 异常过滤器是 NestJS 中用于处理 Prisma 相关错误的机制。它允许开发者定义一个统一的错误处理逻辑，从而在应用程序中捕获和处理所有未被捕获的 Prisma 相关异常。

## 创建 Prisma 异常过滤器

要创建一个 Prisma 异常过滤器，你需要实现 `ExceptionFilter` 接口，并使用 `@Catch()` 装饰器来指定要捕获的异常类型。以下是一个简单的 Prisma 异常过滤器的示例：

```typescript
import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus, Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ERROR_MSG, RESPONSE_CODE } from 'src/common/enums';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaFilter implements ExceptionFilter {
  private Logger = new Logger();
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    // 打印异常信息
    this.Logger.error(exception);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<import('express').Response>();
    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      code: RESPONSE_CODE.INTERNAL_SERVER_ERROR,
      msg: ERROR_MSG.SERVER_ERROR,
      data: null,
    });
  }
}
```

在这个示例中，我们创建了一个名为 `PrismaExceptionFilter` 的 Prisma 异常过滤器。它捕获了 `PrismaClientKnownRequestError` 异常，并在发生错误时返回一个包含错误信息的 JSON 响应。

## 使用 Prisma 异常过滤器

要使用 Prisma 异常过滤器，你需要在应用程序的主模块中进行配置。可以通过 `app.useGlobalFilters()` 方法来注册全局过滤器。以下是如何在 `main.ts` 文件中注册 Prisma 异常过滤器的示例：

```typescript
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaExceptionFilter } from './common/filters/prisma-exception-filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new PrismaFilter());
  await app.listen(3000);
}`
bootstrap();
```

在这个示例中，我们在应用程序启动时注册了 `PrismaFilter` 作为全局异常过滤器。这样，所有未处理的 Prisma 相关异常都会被该过滤器捕获并处理。
