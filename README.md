# College Helper（大学助手）-前端
> 详细信息请看项目文档(`项目文档.docx`)
## 一、功能介绍
1. 文本智能分析（实体识别）+ 详情页面

    给定一段文本，识别其中所有的实体以及给出分词结果，点击可跳转对应详情页面
2. 大学专业智能查询（实体查询）

    给定任意名称、查询对应的实体具有的关系，以及对应所属类别分类、详细信息
3. 查关系（关系查询）

    给定实体1、关系、实体2，查询对应存在的图谱，以及关系
4. 大学专业概览（知识概览）	

    给出各省份、各大学、各专业、各职业、各公司关系
5. AI问答

    对用户输入内容进行实体识别，得到实体后进行实体查询与关系查询、最后通过语言生成模型进行润色返回最终结果以及演变图谱

6. 登陆注册找回密码

    提供用户手机号密码登陆、手机号验证码登录、找回密码、用户注册功能，用户登陆后在本地存储cookie、session以及登录记录，用户可在一定时间内免密登录网站，后端同时实时检测用户登录情况并进行监督，如果用户登录失效则进行拦截阻止其访问任何页面
7. 智能推荐

    根据用户的浏览记录、以及相关用户的浏览记录，选择性推荐用户感兴趣的内容
8. 分数智能分析
    
    根据用户提供的分数、省份、具体细致的以可视化的形式给出近几年该分数的排名情况、以及能够上的专业、大学
9. 个人中心（包含私信、历史记录、收藏）

    用户可以浏览自己的收藏、浏览自己的记录、修改个人信息
10. 问题反馈

    为用户提供反馈词条错误，反馈关系错误、补充词条美容、补充关系等等的途径。通过用户的自发反馈可以纠正图谱的小部分错误并完善相关内容、使图谱能够更加充分的更加准确的展现相对应的知识

## 二、技术栈
1. 前端技术栈
    + vue3
    + vuerouter
    + vuex
2. 后端技术栈
    + django
3. 数据库
    + mysql
    + redis
    + neo4j
## 三、前端部署细节
1. nodejs版本18.17.0
2. npm install --force (这里注意由于eslint版本原因需要force忽视强制安装)
3. 后端请求接口api的ip配置位于

api/index.js
```js
// 修改
axios.defaults.baseURL = 'http://ip:port/api'
```
