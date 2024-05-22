# echarts 柱状图给阴影添加点击事件

## 问题描述

::: info
问题：当柱状图的最大值和最小值相差比较大的时候，最小值很难点击，需要给阴影添加点击事件
:::

## 关键代码

```typescript
echartsInstance.getZr().off('click');
echartsInstance.getZr().on('click', event => {
  const pointInPixel = [event.offsetX, event.offsetY];
  const pointInGrid = echartsInstance!.convertFromPixel({ seriesIndex: 0 }, pointInPixel);
  if (echartsInstance?.containPixel('grid', pointInPixel)) {
    const clickData = data.value[pointInGrid[0]];
    alert(`点击了${clickData.name}`);
  }
});
```

## 完整代码

<https://github.com/yuwenOvO/yuwenUtils/blob/master/packages/vueDemo/src/views/EchartClickView.vue>

## 效果展示

<iframe src="https://demo.moshangl.cn/echartClick" title="echarts-click" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"></iframe>
