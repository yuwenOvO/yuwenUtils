# 百度地图异步加载

## 问题描述

::: info
问题：在调用百度地图API的时候，如果百度的JS相关文件没有加载完成，就会报undefined错误。为了解决这个问题可以通过异步加载实现。
:::

## 关键代码

```javascript
function LoadBaiduMapScript() {
  const AK = '百度地图AK值';
  const BMap_URL = 'https://api.map.baidu.com/api?v=3.0&ak=' + AK + '&callback=onBMapCallback';
  return new Promise((resolve, reject) => {
    // 如果已加载直接返回
    if (typeof BMap !== 'undefined') {
      resolve(BMap);
      return true;
    }
    // 百度地图异步加载回调处理
    window.onBMapCallback = function () {
      console.log('百度地图脚本初始化成功...');
      resolve(BMap);
    };
    // 插入script脚本
    let scriptNode = document.createElement('script');
    scriptNode.setAttribute('type', 'text/javascript');
    scriptNode.setAttribute('src', BMap_URL);
    document.body.appendChild(scriptNode);
  });
}

LoadBaiduMapScript();
```
