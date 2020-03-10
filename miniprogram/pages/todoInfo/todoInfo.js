const db = wx.cloud.database()
const todos = db.collection('todos')
Page({

  data: {
    task:{}
  },
  //存放数据
  pageData:{},
  onLoad: function (options) {
    this.pageData.id = options.id
    //获取数据
    todos.doc(options.id).get().then(res=>{
      this.setData({
        //将结果赋值给data
        task:res.data
      })
    }) 
  },
  //查看导航
  viewLocation:function(){
    wx.openLocation({
      latitude:this.data.task.location.latitude,
      longitude:this.data.task.location.longitude,
      name:this.data.task.location.name,
      address:this.data.task.location.address,
    })
  },
  //更新状态
  changeSta:function(){
    wx.redirectTo({
      //反引号
      url: `../updateSta/updateSta?id=${this.pageData.id}`,
    })
  }
})