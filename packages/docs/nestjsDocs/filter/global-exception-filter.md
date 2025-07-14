# 全局异常过滤器

全局异常过滤器是 NestJS 中用于处理应用程序中未处理的异常的机制。它允许开发者定义一个统一的错误处理逻辑，从而在应用程序中捕获和处理所有未被捕获的异常。

## 创建全局异常过滤器

要创建一个全局异常过滤器，你需要实现 `ExceptionFilter` 接口，并使用 `@Catch()` 装饰器来指定要捕获的异常类型。以下是一个简单的全局异常过滤器的示例：

```typescript
import { ArgumentsHost, BadRequestException, Catch, ExceptionFilter, HttpException, HttpStatus, Logger, ValidationError } from '@nestjs/common';
import { ERROR_MSG, RESPONSE_CODE } from 'src/common/enums';

@Catch()
export class GlobalFilter implements ExceptionFilter {
  private Logger = new Logger();
  catch(exception: any, host: ArgumentsHost) {
    // 打印异常信息
    this.Logger.error(exception);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<import('express').Response>();
    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    if (exception instanceof BadRequestException) {
      const exceptionResponse: any = exception.getResponse();
      const validationErrors: ValidationError[] = exceptionResponse.message;
      const msgArr: string[] = [];

      // 递归获取错误信息
      const recursion = (errors: ValidationError[]) => {
        errors.forEach(error => {
          if (error.children && error.children.length) {
            recursion(error.children);
          } else {
            const errMsg = error.constraints ? Object.values(error.constraints).join('') : '';
            msgArr.push(errMsg);
          }
        });
      };
      recursion(validationErrors);

      response.status(status).json({
        code: status,
        msg: msgArr.join(', '),
      });
    } else {
      if (status === Number(RESPONSE_CODE.UNAUTHORIZED)) {
        response.status(status).json({
          code: RESPONSE_CODE.UNAUTHORIZED,
          msg: ERROR_MSG.TOKEN_EXPIRED,
        });
      } else if (status === Number(RESPONSE_CODE.NOT_FOUND)) {
        response.status(status).json({
          code: RESPONSE_CODE.NOT_FOUND,
          msg: ERROR_MSG.NOT_FOUND,
        });
      } else {
        response.status(status).json({
          code: RESPONSE_CODE.INTERNAL_SERVER_ERROR,
          msg: ERROR_MSG.SERVER_ERROR,
        });
      }
    }
  }
}
```

在这个示例中，我们创建了一个名为 `GlobalFilter` 的全局异常过滤器。它捕获所有未处理的异常，并根据异常类型返回相应的错误响应。
该过滤器会打印异常信息，并根据异常类型返回不同的错误响应。对于 `BadRequestException`，它会提取验证错误信息并返回；对于其他异常，则返回通用的错误消息。

## 使用全局异常过滤器

要使用全局异常过滤器，你需要在应用程序的主模块中进行配置。可以通过 `app.useGlobalFilters()` 方法来注册全局过滤器。以下是如何在 `main.ts` 文件中注册全局异常过滤器的示例：

```typescript
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalFilter } from './common/filters/global.filter';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new GlobalFilter());
  await app.listen(3000);
}
bootstrap();
```

在这个示例中，我们在应用程序启动时注册了 `GlobalFilter` 作为全局异常过滤器。这样，所有未处理的异常都会被该过滤器捕获并处理。
