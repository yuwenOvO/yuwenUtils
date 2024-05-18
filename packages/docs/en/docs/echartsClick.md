# The echarts bar chart adds click events to the shadow

::: tip
Problem: When the maximum and minimum values of the bar chart are quite different, the minimum value is difficult to click, and it is necessary to add a click event to the shadow
:::

Solution:

```javascript
this.charts.getZr().off('click')// Prevent multiple clicks and calls

// Move the mouse to the shadow range   setCursorStyle('pointer')
this.charts.getZr().on('mousemove', param => {
    var pointInPixel= [param.offsetX, param.offsetY]
      if (this.charts.containPixel('grid', pointInPixel)) {// If the mouse hovers over an area and the position is within the current chart range, set the mouse to small hand
          this.charts.getZr().setCursorStyle('pointer')
      } else {
        this.charts.getZr().setCursorStyle('default')
      }
})

this.charts.getZr().on('click', function (params) {
 let pointInPixel = [params.offsetX, params.offsetY]
 let pointInGrid = this.charts.convertFromPixel({ seriesIndex: 0 }, pointInPixel)
    // Bar chart - vertical (index values of data)
    const op = this.charts.getOption()
    const month = op.xAxis[0].data[pointInGrid[0]];  // Obtain the clicked column name
    if (this.charts.containPixel('grid',pointInPixel)) {
       // Logic code
      }
})

```
