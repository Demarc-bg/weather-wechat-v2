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
    locationCity:[],
    nowTemp: '1',
    nowWeather: '阴天',
    nowSrc: "/images/sunny-bg.png",
    nowDate:'',
    highLow:'',
    hourlyWeather: []
  },
  onTapTodayWeather(){
    wx.showToast()
    wx.navigateTo({
      url: '/pages/list/list',
    })
  },
  onTapLocation(){
    wx.getLocation({
      success: function(res) {
        console.log(res.latitude, res.longitude)
      }
    })
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
        this.setNow(result)
        this.setDateAndHL(result)
        this.setHourlyWeather(result)
      },
      complete:()=>{
        callback&&callback()
      }
    })
  },  
  setNow(result){
    let temp = result.now.temp
    let weather = result.now.weather
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
  setDateAndHL(result) {
    let thisday = new Date()
    this.setData({
      nowDate: `${thisday.getFullYear()}-${thisday.getMonth() + 1}-${thisday.getDate()} 今天`,
      highLow: result.today.minTemp + '°-' + result.today.maxTemp + `°`
    })
  },
  setHourlyWeather(result){
    console.log(new Date().getFullYear())
    //set hourlyWeather
    let hourlyWeather = []
    let nowHour = new Date().getHours()
    //**using i=0 i++ is more readable
    for (let i = 0; i < 8; i++) {
      hourlyWeather.push({
        time: (i * 3 + nowHour) % 24 + '时',
        iconPath: '/images/' + result.forecast[i].weather + '-icon.png',
        temp: result.forecast[i].temp
      })
    }
    this.setData({ hourlyWeather })
  }


  
})