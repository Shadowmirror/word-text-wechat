// pages/chart2/chart2.js
import * as echarts from '../../ec-canvas/echarts';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ec:{
    //   onInit: initChart,
    lazyLoad:true,
    },
    ecBar:{
        lazyLoad:true,
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    this.oneComponent1 = this.selectComponent('#mychart2-dom-bar');
    this.oneComponent2 = this.selectComponent('#mychart2-dom-multi-bar');
    that.getData();
  },
  getData:function(){
    let that=this;
    let time=[];
    let finishWords=[];
    let wrongWords=[];
    let wrongWords2=[];
    let knowWords=[];
    wx.request({
      url:"http://localhost:8080/dailyData/all",
      method:"GET",
      header:{'content-type': 'application/json'},
      success:(res)=>{
        let data=res.data.data;
        let length=data.length;
        for(var i=0;i<length;i++){
          finishWords.push(data[i].finishWordsCount);
          let knowWord=data[i].finishWordsCount-data[i].wrongWordsCount;
          knowWords.push(knowWord);
          wrongWords.push(data[i].wrongWordsCount)
          let wrongWord=-data[i].wrongWordsCount;
          wrongWords2.push(wrongWord);
          let date=new Date(data[i].time);
          let month=date.getMonth()+1;
          let day=date.getDate();
          let year=month+"-"+day;
          time.push(year);
        }
        // console.log(finishWords);
        time=time.slice(9,17);
        finishWords=finishWords.slice(9,17);
        wrongWords=wrongWords.slice(9,17);
        wrongWords2=wrongWords2.slice(9,17);
        knowWords=knowWords.slice(9,17);
        // console.log(time);
        // console.log(finishWords);
        // console.log(knowWords);
        that.setData({
          time:time,
          finishWords:finishWords,
          wrongWords:wrongWords,
          knowWords:knowWords,
        })
        that.initGraph(time,finishWords,wrongWords2,knowWords);
        that.initGraph2(time,finishWords,wrongWords,knowWords);
      }
    })
  },
  initGraph:function(time,finishWords,wrongWords2,knowWords){
    this.oneComponent1.init((canvas, width, height) => {
      const chart = echarts.init(canvas, null, {
       width: width,
       height: height
      });
      var option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {            
                type: 'shadow'       
            }
        },
        legend: {
            data: ['总单词数', '认识', '不认识']
        },
        grid: {
            left: '5%',
            right: '4%',
            bottom: '5%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'value'
            }
        ],
        yAxis: [
            {
                type: 'category',
                axisTick: {
                    show: false
                },
                data: time
            }
        ],
        series: [
            {
                name: '总单词数',
                type: 'bar',
                label: {
                    show: true,
                    position: 'inside'
                },
                emphasis: {
                    focus: 'series'
                },
                data: finishWords
            },
            {
                name: '认识',
                type: 'bar',
                stack: '总量',
                label: {
                    show: true
                },
                emphasis: {
                    focus: 'series'
                },
                data: knowWords
            },
            {
                name: '不认识',
                type: 'bar',
                stack: '总量',
                label: {
                    show: true,
                    position: 'left'
                },
                emphasis: {
                    focus: 'series'
                },
                data: wrongWords2
            }
        ]
    };
      chart.setOption(option);
      return chart;
    
    });
  },
  initGraph2:function(time,finishWords,wrongWords,knowWords){
    this.oneComponent2.init((canvas, width, height) => {
      const chart = echarts.init(canvas, null, {
       width: width,
       height: height
      });
    //   console.log(finishWords);
    //   console.log(wrongWords);
    //   console.log(knowWords);
      var option2 = {
        title: {
            text: '汇总'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['不认识', '认识', '单词总量']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: time
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name: '不认识',
                type: 'line',
                stack: '总量',
                data: wrongWords
            },
            {
                name: '认识',
                type: 'line',
                stack: '总量',
                data: knowWords
            },
            {
                name: '单词总量',
                type: 'line',
                stack: '总量',
                data: finishWords
            },

        ]
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