## 微信小程序
### 天气预报
#### `page()` `setDate({})`等函数是重点

#### version1.3: 
- 实现了`wx.for={{hourlyWeather}}`列表渲染。`wx.for`省略了不少冗余代码工作
- 滑动容器，`<scorll-view scorll-x>`
- wxml面板实时观察
- 调用 `setData() `之后，`this.data` 的值将会立即改变。然而，小程序的页面（即视图层）需要等待页面再次渲染才能够更新。
- js的for语句中含有下标的时候，for判断条件要用`<xx.length`,不可以使用`<=`
- WXSS加入新容器/布局 ，修改padding使原来的位置不变
 