// pages/choose/choose.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab:0,
    // swiper适应高度
    height:600,
    // 折叠隐藏
    hidden:true,
    // 标题
    books:[],
    localBooks:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.receiveBooks();
    this.getLocal();
  },
  swiperTab:function(e){
    this.setData({
      currentTab:e.detail.current,
    })
  },
  clickTab:function(e){
    var that=this;
    if(this.data.currentTab===e.target.dataset.current){
      return false;
    }
    else{
      that.setData({
        currentTab:e.target.dataset.current
      })
    }
  },
  // 获取单词本数据
  receiveBooks:function(){
    let that=this;
    wx.request({
      url: 'http://localhost:8080/word-text/all', //仅为示例，并非真实的接口地址
      method:"GET",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        
        that.setData({
          books:res.data.data,
        })
        // console.log(that.data.books)
      }
    })
  },
  choo_click2:function(e){
    let id=e.currentTarget.dataset.id;
    let data=this.data.localBooks[id];
    app.globalData.chooseId=data.id;
    // let key=(data.id).toString();
    // console.log(typeof(key));
    // wx.setStorageSync(key, data);
    var str2= JSON.stringify(data);
    wx.redirectTo({
      url:"../index/index?str2="+str2
    })
  },
  choo_click:function(e){
    // console.log(e.currentTarget.dataset.id);
    let id=e.currentTarget.dataset.id;
    let data=this.data.books[id];
    app.globalData.chooseId=data.id;
    let key=(data.id).toString();
    // console.log(typeof(key));
    wx.setStorageSync(key, data);
    var str= JSON.stringify(data);
    wx.redirectTo({
      url:"../index/index?str="+str
    })
  },
  // 获取缓存
  getLocal:function(){
    let info=wx.getStorageInfoSync();
    // console.log(info);
    let keys=info.keys;
    let myList=[];
    // console.log(keys);
    for(var i=0;i<keys.length;i++){
      if(keys[i]=="logs"){
        wx.removeStorageSync("logs");
      }
      else{
        let data=wx.getStorageSync(keys[i])
        myList.push(data)
      }
    }
    this.setData({
      localBooks:myList,
    })
    // console.log(this.data.localBooks);
  },
  // 长按出现弹窗
  long_click:function(e){
    let id=e.currentTarget.dataset.id;
    // console.log(id);
    let data=this.data.localBooks[id];
    // console.log(data.id);
    let key=(data.id).toString();
    let that=this;
    wx.showActionSheet({
      itemList: ["删除课本"],
      success (res) {
        // console.log(res.tapIndex)
        wx.showModal({
          title: '提示',
          content: '确定要删除该本地课本吗？',
          success (res) {
            if (res.confirm) {
              // app.globalData.chooseId=-1;
              if(app.globalData.chooseId==data.id){
                app.globalData.chooseId=-1;
              }
              wx.removeStorageSync(key);
              that.getLocal();
              console.log("用户点击确定"+key)
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      },
      fail (res) {
        console.log(res.errMsg)
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let res = wx.getSystemInfoSync();
    let winHeight=res.windowHeight;
    this.setData({
      height:winHeight,
    })
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
    // console.log("3");
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