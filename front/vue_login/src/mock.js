// 引入mockjs
const Mock = require('mockjs')
// 获取 mock.Random 对象
const Random = Mock.Random
// mock一组数据
const produceNewsData = function () {
 let articles = []
 for (let i = 0; i < 100; i++) {
   let newArticleObject = {
     title: Random.csentence(5, 30), //  Random.csentence( min, max )
     thumbnail_pic_s: Random.dataImage('300x250', 'mock的图片'), // Random.dataImage( size, text ) 生成一段随机的 Base64 图片编码
     author_name: Random.cname(), // Random.cname() 随机生成一个常见的中文姓名
     date: Random.date() + ' ' + Random.time() // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd；Random.time() 返回一个随机的时间字符串
   }
   articles.push(newArticleObject)
 }
 return {
   data: articles
 }
}

const the_data = {
    "name" : "aaaaaaa",
    "obj" : {
      "user":{
        "name" : "aaaa"
      }
    }
}




// console.log(user);
// 拦截ajax请求，配置mock的数据

//真正起作用的语句
Mock.mock('http://localhost:8080/api/test', 'post', the_data)
Mock.mock('/api/get', 'get', the_data)