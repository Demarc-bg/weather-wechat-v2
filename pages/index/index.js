const weatherMap = {
  'sunny': '晴天',
  'cloudy': '多云',
  'overcast': '阴',
  'lightrain': '小雨',
  'heavyrain': '大雨',
  'snow': '雪'
}

const weatherColorMap = {
  'sunny': '#cbeefd',
  'cloudy': '#deeef6',
  'overcast': '#c6ced2',
  'lightrain': '#bdd5e1',
  'heavyrain': '#c5ccd0',
  'snow': '#aae1fc'
}


Page({
  data: {
    nowTemp: '1',
    nowWeather: '阴天',
    nowSrc: "/images/sunny-bg.png",
    forecast: [1,2,3,4,5,6,7,8]
  },
  onPullDownRefresh() {
    this.getNow(
        ()=>{wx.stopPullDownRefresh()}  
    )
  },
  onLoad() {
    this.getNow()
  },
  getNow(callback) {
    wx.request({
      url: 'https://test-miniprogram.com/api/weather/now',
      data: {
        city: '广州市'
      },
      success: res => {
        console.log(res)
        let result = res.data.result
        let temp = result.now.temp
        let weather = result.now.weather
        //console.log(temp, weather)
        // var item = [
        //   { "temp": "", "day": "1" },
        //   { "temp": "", "day": "2" },
        //   { "temp": "", "day": "3" },
        //   { "temp": "", "day": "4" },
        //   { "temp": "", "day": "5" },
        //   { "temp": "", "day": "6" },
        //   { "temp": "", "day": "7" },
        //   { "temp": "", "day": "8" },
        // ]
        var item = result.forecast
        console.log(item[0].temp)
        this.setData({
          nowTemp: temp,
          nowWeather: weatherMap[weather],
          nowSrc: "/images/" + weather + "-bg.png"
        })
        wx.setNavigationBarColor({
          frontColor: '#000000',
          backgroundColor: weatherColorMap[weather],
        })
      },
      complete: ()=>{
        callback&&callback()
      }

    })
  }
})