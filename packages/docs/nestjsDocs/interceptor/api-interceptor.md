# 接口拦截器

这里实现了一个简单的接口拦截器，用于记录请求和响应的日志。

## 目录结构建议

```plaintext
src/
  common/
    interceptors/
      api.interceptor.ts  # 接口拦截器
  app.module.ts
  main.ts
```

## 1. 创建接口拦截器

在 `src/common/interceptors/api.interceptor.ts` 中创建接口拦截器：

```typescript
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map } from 'rxjs/operators';

@Injectable()
export class ApiInterceptor implements NestInterceptor {
  constructor(private readonly operationLogService: OperationLogService) {}

  intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest<Request>();
    return next.handle().pipe(
      map(data => {
        // 记录请求日志
        // 可以在这里调用日志服务记录请求信息
        // 例如：
        void this.operationLogService.createLog(request, data);
        return data;
      }),
    );
  }
}
```

operationLogService实现<br>
`getRealIp`函数用于获取请求的真实IP地址，通常用于记录日志或进行安全审计。<br>
`desensitization`函数用于脱敏处理敏感数据。<br>
如有需要，请确保在项目中实现这两个函数。这里仅供参考

```typescript
import { Injectable, Logger } from '@nestjs/common';
import { LogMethod, Prisma } from '@prisma/client';
import { desensitization, getRealIp } from 'src/common/utils';
import { ResultData } from 'src/common/utils/ResultData';
import { UAParser } from 'ua-parser-js';
import { PrismaService } from 'src/modules/prisma/prisma.service';

interface MyRequest extends Request {
  user?: { userName: string; sub: string };
}

@Injectable()
export class OperationLogService {
  private logger = new Logger();

  constructor(private readonly prisma: PrismaService) {}

  /**
   * @description 记录操作日志
   * @param request 请求对象
   * @param response 响应对象
   */
  async createLog(request: MyRequest, response: ResultData) {
    const { url, method, headers, body } = request;
    const userAgent = headers['user-agent'];
    const parser = new UAParser(userAgent);
    let userInfo = request.user;
    const isLogin = url === '/api/login';
    if (isLogin) {
      const userName = body ? body['userName'] : '';
      const user = await this.prisma.user.findFirst({
        where: {
          OR: [{ userName: userName }, { mobile: userName }, { email: userName }],
        },
      });
      if (!user) return;
      userInfo = { userName: user.userName, sub: user.id };
      if (response['code'] == 200) {
        response['data'] = '******';
      }
    }
    if (method.toUpperCase() === 'GET' || !userInfo) return;
    const data: Prisma.LogCreateInput = {
      user: { connect: { id: userInfo.sub } },
      action: url,
      method: method.toUpperCase() as LogMethod,
      ip: getRealIp(request),
      params: JSON.parse(JSON.stringify(desensitization(body ?? {}, ['password', 'token']))),
      response: JSON.parse(JSON.stringify(desensitization(response ?? {}, ['password', 'token']))),
      os: Object.values(parser.getOS()).join(' '),
      browser: parser.getBrowser().name || parser.getUA(),
    };
    this.logger.log('记录操作日志', data);
    await this.prisma.log.create({ data });
    this.logger.log('记录操作日志成功');
  }
}
```

## 2. 在需要使用拦截器的模块中注册

在 `src/app.controller.ts` 或其他需要使用拦截器的模块中注册拦截器：

```typescript
import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { ApiInterceptor } from 'src/common/interceptors/api.interceptor';

@Controller('app')
@UseInterceptors(ApiInterceptor)
export class AppController {
  @Get()
  getHello(): string {
    return 'Hello World!';
  }
}
```

## 3. 或者在 `app.module.ts` 中全局注册拦截器

```typescript
// ...existing code...
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ApiInterceptor } from './common/interceptor/api.interceptor';

@Module({
  // ...existing code...
  providers: [
    // ...existing providers...
    {
      provide: APP_INTERCEPTOR,
      useClass: ApiInterceptor,
    },
  ],
})
export class AppModule {}
// ...existing code...
```
