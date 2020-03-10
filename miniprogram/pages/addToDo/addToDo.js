//初始化数据库
const db = wx.cloud.database();
//创建实例
const todos = db.collection('todos');
Page({
  data:{
    image:null,
    work: [
      { text: '智联招聘', value: '智联招聘' },
      { text: '拉钩招聘', value: '拉钩招聘' },
      { text: 'BOSS直聘', value: 'BOSS直聘' },
      { text: '牛客网', value: '牛客网' },
      { text: '51job', value: '51job' },
      { text: '官网投递', value: '官网投递' },
      { text: '内推', value: '内推' },
    ]
  },
  pageData:{
    locationObj:{}
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
     //新增数据
    todos.add({
      data:{
        work: event.detail.value.work,
        company: event.detail.value.company,
        workp:event.detail.value.workp,
        status: event.detail.value.status,
        image:this.data.image,
        location:this.pageData.locationObj
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
  },
  //获取位置
  //Cannot read property 'pageData' of undefined;at api chooseLocation success callback function 有可能是在回调函数内使用this
  chooseLocation:function(e){
    wx.chooseLocation({
      success:res=> {
        let locationObj = {
          latitude:res.latitude,
          longitude: res.longitude,
          name: res.name,
          address:res.address
        }
        this.pageData.locationObj = locationObj
      },
      
    })
  }
})