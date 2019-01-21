const dayMap = {
  '1': '星期一',
  '2': '星期二',
  '3': '星期三',
  '4': '星期四',
  '5': '星期五',
  '6': '星期六',
  '0': '星期日',
}


Page({
  data: {
    dateItem: []
  },
  onPullDownRefresh(){
    this.getFuture(
      ()=>wx.stopPullDownRefresh()
    )
  }
  ,
  onLoad() {
    this.getFuture()
  },
  getFuture(callback) {
    wx.request({
      url: 'https://test-miniprogram.com/api/weather/future',
      data: {
        city: '广州市',
        time: new Date().getTime()
      },
      success: res => {
        console.log(res)
        let result = res.data.result
        this.getData(result)
      },
      complete:()=>
      {
        callback&&callback()
      }
    })
  },
  getData(result) {
    //console.log(result[2].maxTemp)
    let dateItem = []
    let thisday = new Date().getDay()
    for (let i = 0; i < result.length; i++) {
      console.log(result[i].maxTemp)
      dateItem.push({
        day: dayMap[(i+thisday)%7],
        temp: result[i].minTemp + '°-' + result[i].maxTemp + `°`,
        iconPath: '/images/' + result[i].weather + '-icon.png'
      })
    }
    this.setData({dateItem})
  }
})