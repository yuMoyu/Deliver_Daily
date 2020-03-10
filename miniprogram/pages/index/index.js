const db = wx.cloud.database();
const todos = db.collection('todos').orderBy('work','desc');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //若task为null则无concat方法，报错：Cannot read property 'concat' of null
    tasks:[],
    activeNames: ['1']
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData();    
  },

  onReady: function () {

  },
  onShow: function () {

  },
  //触底事件
  onReachBottom:function(){
    this.getData();
  },
  //下拉刷新事件对应"enablePullDownRefresh":true
  onPullDownRefresh:function(){
    this.getData(res=>{
      //保证数据更新完时 停止刷新
      wx.stopPullDownRefresh();
      //下拉刷新后回到第一条数据
      this.pageData.skip = 0;
    });
  },
  //获取数据
  getData:function(callback){
    //callback不存在，自动赋值
    if(!callback){
      callback=res=>{}
    }
    wx.showLoading({
      title: '数据加载中',
    })
    todos.skip(this.pageData.skip).get().then(res => {
      let oldData = this.data.tasks;
      this.setData({
        //前面数据与跳转后获得的数据进行拼接
        tasks: oldData.concat(res.data)
      },res=>{
        //跳转到第20条数据后
        this.pageData.skip=this.pageData.skip+20
        wx.hideLoading()
        //执行匿名函数
        callback();
      })
    })
  },
  //跳页
  pageData:{
    skip:0
  },
  onShareAppMessage: function (res) {
    return {
      title: '投递日记',
      path: '/pages/index/index',
      imageUrl: 'https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1583824796&di=438a4cc1d45abf8dd09d564cfaa48128&src=http://img01.jituwang.com/170621/256892-1F6210QI716.jpg'
    }
  }
})