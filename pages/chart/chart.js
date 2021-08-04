// pages/chart/chart.js
import * as echarts from '../../ec-canvas/echarts';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ec:{
      lazyLoad:true,
    },
    ecBar:{
      // onInit: initChart,
      lazyLoad:true,
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    
    this.oneComponent1 = this.selectComponent('#mychart-dom-bar');
    this.oneComponent2 = this.selectComponent('#mychart-dom-multi-bar');
    that.getData();
  },
  // 获取数据
  getData:function(){
    let that=this;
    let time=[];
    let finishWords=[];
    let wrongWords=[];
    wx.request({
      url:"http://localhost:8080/dailyData/all",
      method:"GET",
      header:{'content-type': 'application/json'},
      success:(res)=>{
        let data=res.data.data;
        let length=data.length;
        for(var i=0;i<length;i++){
          finishWords.push(data[i].finishWordsCount);
          wrongWords.push(data[i].wrongWordsCount);
          let date=new Date(data[i].time);
          let month=date.getMonth()+1;
          let day=date.getDate();
          let year=month+"-"+day;
          time.push(year);
        }
        time=time.slice(9,17);
        finishWords=finishWords.slice(9,17);
        wrongWords=wrongWords.slice(9,17);
        // console.log(time);
        // console.log(finishWords);
        that.setData({
          time:time,
          finishWords:finishWords,
          wrongWords:wrongWords,
        })
        that.initGraph(time,finishWords);
        that.initGraph2(time,wrongWords);
      }
    })
  },
  // 柱状图
  initGraph:function(time,finishWords){
    this.oneComponent1.init((canvas, width, height) => {
      const chart = echarts.init(canvas, null, {
       width: width,
       height: height
      });
      // initChart(chart, time, finishWords);
      // this.chart = chart;
      var option1 = {
        title: {
          text: '每天背单词量'
        },
        tooltip: {},
        legend: {
          data: ['单词量']
        },
        xAxis: {
          data: time
        },
        yAxis: {},
        series: [{
          name: '单词量',
          type: 'bar',
          data: finishWords
        }]
      };
      chart.setOption(option1);
      return chart;
     });
  },
  // 折现图
  initGraph2:function(time,wrongWords){
    this.oneComponent2.init((canvas, width, height) => {
      const chart = echarts.init(canvas, null, {
       width: width,
       height: height
      });
      var option2 = {
        xAxis: {
            type: 'category',
            data: time,
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            data: wrongWords,
            type: 'line'
        }]
      };
      chart.setOption(option2);
      return chart;
     });
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