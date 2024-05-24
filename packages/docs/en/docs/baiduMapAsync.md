# Baidu map asynchronous loading

## Problem description

::: info
Problem：When calling Baidu Maps API, if Baidu's JS related files are not loaded completely, an undefined error will be reported. To solve this problem, asynchronous loading can be used.
:::

## Key code

```javascript
function LoadBaiduMapScript() {
  const AK = '百度地图AK值';
  const BMap_URL = 'https://api.map.baidu.com/api?v=3.0&ak=' + AK + '&callback=onBMapCallback';
  return new Promise((resolve, reject) => {
    // Return directly if loaded
    if (typeof BMap !== 'undefined') {
      resolve(BMap);
      return true;
    }
    // Baidu map asynchronous load callback processing
    window.onBMapCallback = function () {
      console.log('百度地图脚本初始化成功...');
      resolve(BMap);
    };
    // Insert script
    let scriptNode = document.createElement('script');
    scriptNode.setAttribute('type', 'text/javascript');
    scriptNode.setAttribute('src', BMap_URL);
    document.body.appendChild(scriptNode);
  });
}

LoadBaiduMapScript();
```
