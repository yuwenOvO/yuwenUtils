# 安装

```shell
npm install @yuwena/utils -S

or

pnpm install @yuwena/utils -S
```

## 使用

```javascript
// 引入
import { WebSocketClient } from '@yuwena/utils';

// 使用
const ws = new WebSocketClient('ws://localhost:3000');
ws.connect();

...
```

## LICENSE

[MIT](LICENSE)
