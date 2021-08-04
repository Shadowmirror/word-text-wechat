var app = getApp()
// pages/choose/choose.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag:true,
    // 打卡
    clock:true,
    //单词本数据
    // bookData:{},
    array:[5,10,15,20],
    index:app.globalData.index,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    // console.log("1");
    // this.judge();
    if(options.str){
      var data = JSON.parse(options.str);
      // console.log(data);
      this.setData({
        bookData:data,
      })
    }
    if(options.str2){
      var data = JSON.parse(options.str2);
      // console.log(data);
      this.setData({
        bookData:data,
      })
      // console.log(this.data.bookData.wordTableName);
    }
  },
  //picker底部弹出框
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    let value=e.detail.value;
    this.setData({
      index: value
    })
    app.globalData.index=value;
  },
  // 是否有单词本进行判断
  judge:function(){
    let id=app.globalData.chooseId;
    // console.log(id);
    if(id==-1){
      // console.log(-1);
      this.setData({
        flag:true,
      })
    }
    else{
      // let info=wx.getStorageInfoSync();
      // console.log(info);
      // let keys=info.keys;
      // console.log(typeof(keys[0]));
      id=id.toString();
      let data=wx.getStorageSync(id);
      // console.log(data);
      this.setData({
        flag:false,
        bookData:data,
      })
    }
    // let info=wx.getStorageInfoSync();
    // let keys=info.keys;
    // let id=app.globalData.chooseId;
    // // console.log(keys.length);
    // if(keys[id]=="logs"){
    //   wx.removeStorageSync("logs");
    // }
    // if(keys.length == 0){
    //   this.setData({
    //     flag:true,
    //   })
    // }
    // else{
    //   // let id=keys.length-1;
    //   let data=wx.getStorageSync(keys[id]);
    //   // console.log(data);
    //   this.setData({
    //     flag:false,
    //     bookData:data,
    //   })
    // }
  },
  sea_click:function(){
    wx.navigateTo({
      url:"../login/login",
    })
  },
  search:function(){
    wx.navigateTo({
      url:"../search/search",
    })
  },
  click:function(){
    wx.navigateTo({
      url: '../choose/choose',
    });
  },
  // 跳转到背单词页面
  toRecite:function(){
    let key=this.data.bookData.wordTableName;
    // console.log(key);
    let value=this.data.index;
    // console.log(value);
    // console.log("quan"+app.globalData.index);
    let num=this.data.array[value];
    // console.log(num);
    wx.navigateTo({
      url:"../recite/recite?key="+key+"&num="+num
    })
  },
  // 跳转到图表
  bind_learn:function(){
    wx.navigateTo({
      url:"../chart/chart"
    })
  },
  bind_word:function(){
    wx.navigateTo({
      url:"../chart2/chart2"
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // this.judge();
    // console.log("2");
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // console.log("4");
    // 从上一个页面返回触发
    this.judge();
    // console.log(3);
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