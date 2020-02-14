//初始化数据库
const db = wx.cloud.database();
//创建实例
const todos = db.collection('todos');
Page({
  data:{
    image:null
  },
  //上传图片
  selectImage:function(e){
    wx.chooseImage({
      //不使用function(res..)，避免this被覆盖
      success: res=> {
        console.log(res.tempFilePaths[0])
        wx.cloud.uploadFile({
          //云端路径 保证每次名字不同 `为反引号
          cloudPath:`${Math.floor(Math.random()*10000000)}.png`,
          //上传文件路径
          filePath: res.tempFilePaths[0]
        }).then(res=>{
          console.log(res.fileID)
          //数据保存到image
          this.setData({
            image:res.fileID
          })
        }).catch(err=>{
          console.error(err)
        })
      },
    })
  },
  onSubmit:function(event){
    console.log(event.detail.value.title)
    //新增数据
    todos.add({
      data:{
        title:event.detail.value.title,
        image:this.data.image
      }
    }).then(res=>{
      console.log(res._id)
      //展示toast
      wx.showToast({
        title: '添加成功',
        icon: 'success',
        //成功后跳转到详情页
        success:res2=>{
          wx.redirectTo({
            //反引号
            url:`../todoInfo/todoInfo?id=${res._id}`,
          })
        }
      })
    })
  }
})