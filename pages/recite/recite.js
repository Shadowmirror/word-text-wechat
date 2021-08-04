var app=getApp();
// pages/recite/recite.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    words:[],
    // 页面滑动
    startPageX:0,
    currentView:0,
    toView:"",
    key:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      key:options.key,
      num:options.num,
    })
    console.log(options.num);
    if(app.globalData.Name==''){
      app.globalData.Name=options.key;
      app.globalData.allNum=options.num;
      this.getWords();
      // console.log(1)
    }
    else{
      if(app.globalData.Name==options.key){
        if(app.globalData.allNum==options.num){
          this.setData({
            words:app.globalData.gloData,
          })
        }
        else{
          app.globalData.Name=options.key;
          app.globalData.allNum=options.num;
          this.getWords();
        }
        // console.log(2);
      }
      else{
        app.globalData.Name=options.key;
        app.globalData.allNum=options.num;
        this.getWords();
      }
    }
    // this.getWords();
  },
  // 开始移动
  touchStart:function(e){
    // console.log(e.changedTouches[0].pageX);
    this.setData({
      startPageX:e.changedTouches[0].pageX,
    })
    // console.log(this.data.startPageX);
  },
  // 移动结束
  touchEnd(e){
    let moveX=e.changedTouches[0].pageX-this.data.startPageX;
    let maxPage=this.data.words.length-1;
    // console.log(moveX);
    let current=this.data.currentView;
    if(Math.abs(moveX)>=150){
      if(moveX>0){
        current = current!==0 ? current-1:0;
        this.setData({
          currentView:current,
        })
      }
      else{
        current = current!==maxPage ? current+1:maxPage;
        this.setData({
          currentView:current,
        })
      }
    }
    this.setData({
      toView:"card"+current,
    })
    // console.log(this.data.toView);
  },
  // 不认识
  previous:function(){
    let num=this.data.currentView;
    let sum=this.data.words.length-1;
    if(num==sum){
      wx.showToast({
        title: '今日单词已完成！',
        icon: 'success',
        duration: 2000
      })
      num=sum+1;
      app.globalData.finishWords=app.globalData.finishWords+num;
      // console.log(app.globalData.finishWords);
      // console.log(typeof(app.globalData.finishWords))
      this.clock();
    }
    else{
      num=num+1;
      app.globalData.wrongWords++;
      this.setData({
        currentView:num,
        toView:"card"+num,
      })
    }
  },
  next:function(){
    let num=this.data.currentView;
    let sum=this.data.words.length-1;
    if(num==sum){
      wx.showToast({
        title: '今日单词已完成！',
        icon: 'success',
        duration: 2000
      })
      num=sum+1;
      app.globalData.finishWords=app.globalData.finishWords+num;
      // console.log(app.globalData.finishWords);
      // console.log(typeof(app.globalData.finishWords))
      this.clock();
    }
    else{
      num=num+1;
      this.setData({
        currentView:num,
        toView:"card"+num,
      })
    }
  },
  // 获取数据
  getWords:function(){
    let key=this.data.key;
    let num=this.data.num;
    console.log(num);
    let that=this;
    wx.request({
      url: 'http://localhost:8080/word-text/get-csv?wordTableName='+key,
      success: (res)=>{
        let csvStream = res.data.data.replace(/(^\s*)|(\s*$)/g, "");
        let arr = csvStream.split("\n");
        for(let i =0; i< arr.length; i++){
          arr[i] = arr[i].replace(/(^\s*)|(\s*$)/g, "").split(",")
        }
        console.log(5);
        arr=arr.slice(0,num);
        // console.log(arr);
        that.setData({
          words:arr,
        })
        // console.log(this.data.words);
        app.globalData.gloData=this.data.words;
        // console.log(app.globalData.gloData);
        // console.log(that.data.words);
      }
    })
  },
  // 打卡完成跳转
  clock:function(){
    let startTime1 = new Date(new Date().toLocaleDateString()).getTime();
    let finishWords=app.globalData.finishWords;
    let wrongWords=app.globalData.wrongWords;
    console.log(finishWords,wrongWords);
    console.log(startTime1);
    wx.request({
      url:"http://localhost:8080/dailyData/update",
      method:"POST",
      data:{
        time:startTime1,
        finishWordsCount:finishWords,
        wrongWordsCount:wrongWords,
      },
      header: { 
        "Content-Type": "application/x-www-form-urlencoded"
      }, 
      success:(res)=>{
        console.log("成功");
        wx.redirectTo({
          url:"../index/index"
        })
      }
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