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
  onReady: function () {

  }
})