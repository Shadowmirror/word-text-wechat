// pages/search/search.js
const CryptoJS= require("../../utils/crypto.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hidden:true,
    // 翻译后的数据
    oneWord:"",
    words:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
  // cancel:function(){
  //   wx.navigateBack({
  //     delta: 1
  //   });
  // },
  mysubmit:function(e){
    console.log(e.detail.value.textarea);
    let that=this;
    // let q=this.data.query;
    // console.log(q);
    let q=e.detail.value.textarea;
    that.setData({
      oneWord:q,
    })
    // console.log(typeof q);
    let from="auto";
    let to="auto";
    let appKey="1021b27045dfb2f6";
    let key="fMVokft13Ms3wbsccHiKIdpLhGeyauP4"
    let salt=(new Date).getTime();
    let curtime= Math.round(new Date().getTime()/1000);
    let str1 = appKey + this.truncate(q) + salt + curtime + key;
    let sign=CryptoJS.SHA256(str1).toString(CryptoJS.enc.Hex);
    wx.request({
      url: 'https://openapi.youdao.com/api',
      type: 'post',
      dataType: 'jsonp',
      data: {
          q: q,
          appKey: appKey,
          salt: salt,
          from: from,
          to: to,
          sign: sign,
          signType: "v3",
          curtime: curtime,
      },
      success: function (res) {
        //res是对象，但是res.data是string
        let data=JSON.parse(res.data);
        console.log(data.basic.explains)
        that.setData({
          words:data.basic.explains,
          hidden:false,
        })
      } 
    })
  },
  truncate:function(q){
    var len = q.length;
    if(len<=20) return q;
    return q.substring(0, 10) + len + q.substring(len-10, len);
  },
  myreset:function(){
    this.setData({
      hidden:true,
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