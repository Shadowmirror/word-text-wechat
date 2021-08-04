// pages/register/register.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },
    submit: function (e) {
        var username = e.detail.value.username;
        var password = e.detail.value.password;
        wx.request({
            url: 'http://localhost:8080/register?username=' + username + '&password=' + password,
            method: "POST",
            success: (res) => {
                console.log(res.data)
                if(res.data.success == true){
                    wx.navigateTo({
                        url: '/pages/login/login'
                    })
                }else{
                    wx.showToast({
                      title: '注册失败',
                    })
                }
            }
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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