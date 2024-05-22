# The echarts bar chart adds click events to the shadow

## Problem description

::: info
Problem: When the maximum and minimum values of the bar chart are quite different, the minimum value is difficult to click, and it is necessary to add a click event to the shadow
:::

## Key code

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

## Complete code

<https://github.com/yuwenOvO/yuwenUtils/blob/master/packages/vueDemo/src/views/EchartClickView.vue>

## Effect display

<iframe src="https://demo.moshangl.cn/echartClick" title="echarts-click" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"></iframe>
