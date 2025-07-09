---
outline: deep
---

# NestJS 集成 Winston 日志与接口调用日志中间件指引

本指引详细介绍如何在 NestJS 项目中集成 Winston 日志系统，并通过中间件记录每一次接口调用日志，便于后续项目快速复用。

## 目录结构建议

```bash
src/
  common/
    middleware/
      logger.middleware.ts   # 接口调用日志中间件
  config/
    winston.config.ts       # winston 日志配置
  app.module.ts
  main.ts
```

## 1. 安装依赖

```bash
pnpm add chalk winston winston-daily-rotate-file nest-winston
```

::: tip
`chalk` 是一个用于在终端中输出彩色文本的库。<br>
`winston` 是一个功能强大的日志库，支持多种传输方式和格式化选项。<br>
`winston-daily-rotate-file` 是Winston的一个传输器，用于将日志输出到文件，并按天轮转。<br>
`nest-winston` 是NestJS的Winston集成包，提供了更好的集成和配置方式。
:::

## 2. 配置 Winston 日志

在 `src/config/winston.config.ts` 中配置 winston：

```typescript
import chalk from 'chalk';
import { createLogger, format, transports } from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';

// 定义日志级别颜色
const levelsColors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  debug: 'blue',
  verbose: 'cyan',
};

const winstonLogger = createLogger({
  format: format.combine(format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), format.errors({ stack: true }), format.splat(), format.json()),
  transports: [
    new DailyRotateFile({
      filename: 'logs/errors/error-%DATE%.log', // 日志名称，占位符 %DATE% 取值为 datePattern 值。
      datePattern: 'YYYY-MM-DD-HH', // 日志轮换的频率，此处表示 1 小时轮换一次。
      zippedArchive: true, // 是否通过压缩的方式归档被轮换的日志文件。
      maxSize: '20m', // 设置日志文件的最大大小，m 表示 mb 。
      level: 'error', // 日志类型，此处表示只记录错误日志。
      format: format.combine(
        format.simple(),
        format.printf(info => {
          return `${String(info.timestamp)} ${String(info.message)}`;
        }),
      ),
    }),
    new DailyRotateFile({
      filename: 'logs/warnings/warning-%DATE%.log',
      datePattern: 'YYYY-MM-DD-HH',
      zippedArchive: true,
      maxSize: '20m',
      level: 'warn',
      format: format.combine(
        format.simple(),
        format.printf(info => {
          return `${String(info.timestamp)} ${String(info.message)}`;
        }),
      ),
    }),
    new DailyRotateFile({
      filename: 'logs/info/info-%DATE%.log',
      datePattern: 'YYYY-MM-DD-HH',
      zippedArchive: true,
      maxSize: '20m',
      level: 'info',
      format: format.combine(
        format.simple(),
        format.printf(info => {
          return `${String(info.timestamp)} ${String(info.message)}`;
        }),
      ),
    }),
    new transports.Console({
      format: format.combine(
        format.colorize({
          colors: levelsColors,
        }),
        format.simple(),
        format.printf(info => {
          const symbols = Object.getOwnPropertySymbols(info);

          const levelSymbol = symbols.find(s => s.toString() === 'Symbol(level)');
          const messageSymbol = symbols.find(s => s.toString() === 'Symbol(message)');

          const level = levelSymbol ? (info[levelSymbol] as string) : 'debug';
          const message = messageSymbol ? info[messageSymbol] : '';

          const chalkColor = getChalkColor(level);

          return `${chalkColor(info.timestamp)} ${chalkColor(message)}`;
        }),
      ),
      level: 'debug',
    }),
  ],
});

const getChalkColor = (level: string) => {
  switch (level) {
    case 'error':
      return chalk.red;
    case 'warn':
      return chalk.yellow;
    case 'info':
      return chalk.green;
    case 'debug':
      return chalk.blue;
    case 'verbose':
      return chalk.cyan;
    default:
      return chalk.white;
  }
};

export default winstonLogger;
```

## 3. 在 AppModule 中集成 Winston

在 `src/app.module.ts` 中引入并注册 Winston 日志模块：

```typescript
import { WinstonModule } from 'nest-winston';
import winstonLogger from './config/winston.config';

@Module({
  imports: [
    WinstonModule.forRoot({
      transports: winstonLogger.transports,
      format: winstonLogger.format,
      defaultMeta: winstonLogger.defaultMeta,
      exitOnError: false,
    }),
  ],
  // ...
})
```

## 4. 在 main.ts 中设置全局 Logger

```typescript
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  await app.listen(process.env.PORT ?? 3000);
}
```

## 5. 编写接口调用日志中间件

在 `src/common/middleware/logger.middleware.ts`：

```typescript
import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger();
  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl, ip, httpVersion, headers } = req;
    const { statusCode } = res;
    const logFormat = `接口调用 - 调用地址: [${originalUrl}] 调用方法: [${method}] HTTP 协议版本: [HTTP/${httpVersion}] 客户端IP: [${ip}] 状态码: [${statusCode}] User-Agent: [${headers['user-agent']}]`;
    if (statusCode >= 500) {
      this.logger.error(logFormat, originalUrl);
    } else if (statusCode >= 400) {
      this.logger.warn(logFormat, originalUrl);
    } else {
      this.logger.log(logFormat, originalUrl);
    }
    next();
  }
}
```

> 如需将日志直接写入 winston，可将 `Logger` 替换为自定义的 winstonLogger。

## 6. 注册中间件

在 `app.module.ts` 中注册中间件：

```typescript
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
```

## 7. 日志文件输出说明

- 错误日志：`logs/errors/error-YYYY-MM-DD-HH.log`
- 警告日志：`logs/warnings/warning-YYYY-MM-DD-HH.log`
- 普通日志：`logs/info/info-YYYY-MM-DD-HH.log`

## 8. 常见问题排查

- 日志文件为空：请确认有实际调用日志方法，且日志目录有写入权限。
- 日志级别未触发：如只调用 info，error/warn 文件不会有内容。
- 进程未正常退出可能导致日志未及时写入磁盘。

---

如需扩展日志内容或格式，可在 `winston.config.ts` 中自定义 format。
