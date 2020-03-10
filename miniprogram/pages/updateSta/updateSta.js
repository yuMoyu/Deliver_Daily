//初始化数据库
const db = wx.cloud.database();
//创建实例
const todos = db.collection('todos');
Page({
  data: {
    id: 0
  },
  //存放数据
  pageData: {},
  onLoad: function (options) {
    this.pageData.id = options.id
  },

  onSubmit: function (event) {
    //更新状态
    todos.doc(this.pageData.id).update({
      data: {
        status: event.detail.value.status
      }
    }).then(res => {
      //展示toast
      wx.showToast({
        title: '添加成功',
        icon: 'success',
        //成功后跳转到详情页
        success: res2 => {
          wx.redirectTo({
            //反引号
            url: `../todoInfo/todoInfo?id=${this.pageData.id}`,
          })
        }
      })
    })
  }
})