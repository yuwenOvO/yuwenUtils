# echarts 柱状图给阴影添加点击事件

::: tip
问题：当柱状图的最大值和最小值相差比较大的时候，最小值很难点击，需要给阴影添加点击事件
:::

解决方案：

```javascript
this.charts.getZr().off('click'); // 防止点击调用多次

// 鼠标移动到阴影范围 setCursorStyle('pointer')
this.charts.getZr().on('mousemove', param => {
  var pointInPixel = [param.offsetX, param.offsetY];
  if (this.charts.containPixel('grid', pointInPixel)) {
    //若鼠标滑过区域位置在当前图表范围内 鼠标设置为小手
    this.charts.getZr().setCursorStyle('pointer');
  } else {
    this.charts.getZr().setCursorStyle('default');
  }
});

this.charts.getZr().on('click', function (params) {
  let pointInPixel = [params.offsetX, params.offsetY];
  let pointInGrid = this.charts.convertFromPixel({ seriesIndex: 0 }, pointInPixel);
  // 柱状图-竖向(数据的索引值)
  const op = this.charts.getOption();
  const month = op.xAxis[0].data[pointInGrid[0]]; //获取点击的列名
  if (this.charts.containPixel('grid', pointInPixel)) {
    // 逻辑代码
  }
});
```
