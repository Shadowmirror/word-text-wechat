var app=getApp();
// pages/login/login.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    ischecked:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(app.globalData.isLogin){
      wx.redirectTo({
        url:"../backstage/backstage"
      })
    }
  },
  submit(e){
    var username=e.detail.value.username;
    var password=e.detail.value.password;
    wx.request({
      url: 'http://localhost:8080/login?username='+username+'&password='+password,
      method: "POST",
      success:(res)=>{
        console.log(res.data)
        if(res.data.success == true){
          app.globalData.isLogin=true;
          wx.redirectTo({
            url: '../backstage/backstage'
          })
        }else{
          wx.showToast({
            title: '密码错误',
          })
        }
        
      }
    })
  },
  toRegister(){
    wx.navigateTo({
      url: '/pages/register/register'
    })
  },
  focus:function(){
    this.setData({
      ischecked:true,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})