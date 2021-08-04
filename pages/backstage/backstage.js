// pages/backstage/backstage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab:0,
    // swiper适应高度
    height:600,
    src:"",
    title:"",
    name:"",
    //上传之后的文件
    up_books:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.upBooks();
  },
  //获取单词本数据
  upBooks:function(){
    let that=this;
    wx.request({
      url: 'http://localhost:8080/word-text/all', //仅为示例，并非真实的接口地址
      methods:"GET",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        
        that.setData({
          up_books:res.data.data,
        })
        // console.log(that.data.books)
      }
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
  // 选择文件
  cho_file:function(){
    let that=this;
    wx.chooseMessageFile({
      count: 1,
      type: 'file',
      success (res) {
        const tempFilePaths = res.tempFiles
        console.log(tempFilePaths);
        that.setData({
          src:tempFilePaths,
        })
      }
    })
  },
  // 保留文件
  hold:function(){
    let name=this.data.name;
    let title=this.data.title;
    // console.log(this.data.name);
    let tempFilePaths=this.data.src;
    let that=this;
    wx.uploadFile({
      url: 'http://localhost:8080/word-text/upload-csv', //仅为示例，非真实的接口地址
      filePath: tempFilePaths[0].path,
      name: 'file',
      formData: {
        'name': name,
        'des': title,
      },
      success (res){
        const data = res.data;
        that.upBooks();
        wx.showToast({
          title: '保存成功！',
          icon: 'none',
          duration: 1000,
        });
        setTimeout(function(){
          that.setData({
            currentTab:0,
          })
        },1500)
        // console.log(data)
        //do something
      }
    })
    
  },
  // 删除单词本
  delete:function(e){
    // console.log(e);
    let key=e.currentTarget.dataset.key;
    // let key=e.dataset.key;
    let that=this;
    wx.showModal({
      title:"提示",
      content:"确定要删除该课本吗？",
      success(res){
        if(res.confirm){
          wx.request({
            url: 'http://localhost:8080/word-text/delete-csv',
            data:{
              wordTableName:key,
            },
            method:"POST",
            header: {
              "Content-Type": "application/x-www-form-urlencoded" // 默认值
            },
            success: (res)=>{
              console.log("删除成功！");
              that.upBooks();
            }
          })
        }
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