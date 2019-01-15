## 微信小程序
### js
- Map: 类似宏的用法  
`const weatherMap = {'sunny': '晴天'}`  
使用方法： `weather['sunny']`
- Page()：  
   - 有多种函数，`onload()`函数是打开即运行的函数   
   - `Page()`还有data的属性，可用于跟视图层进行交互，交互的时候要注意不能直接修改`this.data`，要使用`this.setData({})`来修改

### css
- html容器中有子容器数组，想要让各子元素对齐要用   `align-item:center`
- margin
