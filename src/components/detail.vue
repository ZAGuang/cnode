<template>
  <div class="container">
    <!-- 头部 -->
    <div class="getback">
      <i class="iconfont icon-left" @click="back" title="返回上一个">返回</i>
      <span>主题</span>
      <span></span>
    </div>
    <!-- 内容 -->
    <div id="content" v-if="!loading">
      <h3 class="top_title">
        <span v-if="Detail.top" class="top" style="background:#E74C3C;">置顶</span>
        <span v-if="Detail.good" class="top" style="background:#E67E22;">精华</span>
        <span v-if="'ask'===Detail.tab&&!Detail.top&&!Detail.good" class="top" style="background:#3498DB;">问答</span>
        <span v-if="'share'===Detail.tab&&!Detail.top&&!Detail.good" class="top" style="background:#1ABC9C;">分享</span>
        <span v-if="'job'===Detail.tab&&!Detail.top&&!Detail.good" class="top" style="background:#9B59B6;">招聘</span>
        <span v-if="'dev'===Detail.tab&&!Detail.top&&!Detail.good" class="top" style="background:green;">测试</span>
        {{ Detail.title }}
      </h3>
      <!-- 楼主信息 -->
      <div class="author">
        <img :src="Detail.author.avatar_url" class="authorimg" >
        <div class="col">
          <span>{{ Detail.author.loginname }}</span>
          <span>发布于:{{Detail.create_at | getLastTimeStr}} • {{ Detail.visit_count }}次浏览 • 来自 : {{ Detail.tab | tab }}</span>
        </div>
        <div class="collect">
          <button class="collect_btn" v-show="btnshow" @click="collect">收藏</button>
          <button class="delcollect_btn" v-show="!btnshow" @click="delcollect">取消收藏</button>
        </div>
      </div>
      <!-- 帖子内容 -->
      <div class="topics_content" v-html="Detail.content">

      </div>
      <!-- 评论 -->
      <h4 class="reply" v-if="reply">
        <strong>{{ Detail.reply_count}}</strong>回复
      </h4>
      <div class="reply_list">
        <ul>
          <li v-for="(item, index) in Detail.replies" :key="index">
            <div class="user">
              <img :src="item.author.avatar_url" class="authorimg">
              <div class="info">
                <span class="left">
                    <span class="name" v-text="item.author.loginname"></span>
                      <span style="color:green">{{index+1}}楼 •
                      发布于:{{item.create_at | getLastTimeStr}}
                      </span>
                </span>
              </div>
            </div>
            <div class="reply_content" v-html="item.content">
            </div>
          </li>
        </ul>
      </div>
      <!-- 添加评论 -->
      <div class="addcomment">
        <h4 class="addreply">
          <strong>添加评论</strong>
        </h4>
        <div class="com">
          <textarea name="" id="txta" cols="120" rows="20" v-model="text" placeholder="请输入文字。。。">
          </textarea>

          <div>
            <button id="btn" @click="addcomment">回复</button>
          </div>
        </div>
      </div>
    </div>
    <!-- CSS动画 -->
    <div class="loader" v-if="loading">
      <div class="loader-inner">
        <div class="loader-line-wrap">
          <div class="loader-line"></div>
        </div>
        <div class="loader-line-wrap">
          <div class="loader-line"></div>
        </div>
        <div class="loader-line-wrap">
          <div class="loader-line"></div>
        </div>
        <div class="loader-line-wrap">
          <div class="loader-line"></div>
        </div>
        <div class="loader-line-wrap">
          <div class="loader-line"></div>
        </div>
      </div>
    </div>
    <!-- CSS动画结束 -->
  </div>
</template>
  
<script>
export default {
  data(){
    return{
      Detail:[],
      loading:true,
      reply:true,
      text:"",
      btnshow:true,
    }
  },
  mounted(){
    let id = this.$route.query.id
    this.$store.dispatch("getTopicsDetail",id)
    .then((res)=>{
      console.log(res.data.data)
      if(res.data.data.reply_count==0){
        this.reply=false
      }
      this.Detail=res.data.data
      this.loading=false
    })
  },
  methods:{
    back(){
      history.back()
    },
    //添加评论
    addcomment(){
      let text=this.text
      this.$store.dispatch("getComment",{
        content:text
      })
      .then( (res) => {
        console.log(res)
      })
      .catch( (res) => {
        console.log(res)
      })
      this.text=""
    },
    // 添加收藏
    collect(){
      this.btnshow=false
      this.$store.dispatch("addCollect")
      .then((res)=>{
        console.log(res.config.url)
        this.url="https://cnodejs.org/api/v1/topic_collect/collect"
      })
    },
    //取消收藏
    delcollect(){
      this.btnshow=true
      this.$store.dispatch("delCollect")
      .then((res)=>{
        this.url="https://cnodejs.org/api/v1/topic_collect/de_collect"
        console.log(res.config.url)
      })
    }
  },
  filters:{
    tab (ele){
          switch (ele) {
            case 'ask':
              return '问答'
              break;
            case 'share':
              return '分享'
              break;
            case 'job':
              return '招聘'
              break;
            default: return ""

          }
      },
    getLastTimeStr(ele) {
          var lr = new Date(ele);
          var now = new Date;
          var dt = now - lr;
          var s = dt/1000;
          var m = s/60;
          var h = m/60;
          if(s < 60){
            return s + '秒前';
          }else if(s < 3600){
            return parseInt(s/60) + '分钟前';
          }else if( s < 86400 ){
            return parseInt(s/60/60) + '小时前';
          }else if( s < 604800){  //在一周内
            return parseInt(s/60/60/24) + '天前';
          }else if( s < 2592000){
            return parseInt(s/60/60/24/7) + "周前"
          }else if( s < 2592000 && s > 604800){ //超过一周
            return parseInt(s/60/60/24) + '天前';
          }else if(s < 31104000){
            return parseInt(s/60/60/24/30) + '月前';
          }else if(s < 311040000){
            return parseInt(s/60/60/24/30/12) + '年前';
          }
    }
  }
}
</script>

<style scoped>
.container{
  width: 100%;
  height: 100%;
  /* background: #e1e1e1; */

}
.getback{
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  position: fixed;
  top: 0;
  height: 45px;
  font-size: 19px;
  border-bottom: solid 1px #e8e8e8;
  box-shadow: 0 0 4px rgba(0,0,0,.25);
  background: white;
}
.icon-left{
  font-size: 18px;
}
/* 主题 */
#content{
  padding-top: 47px
}
.top{
  font-size: 12px;
  border: none;
  border-radius:2px;
  color: white;
  padding:3px 6px;
}
.top_title{
  margin: 15px;
  height: 25px;
  padding: 5px 5px 5px 10px;
  background: #e8e8e8;
  display: flex;
  align-items: center;
}
.author{
  display: flex;
  align-items: center;
  padding: 0 15px;
  font-size: 15px;
  position: relative;
}
.author>img{
  margin-right: 20px;
}
.author span{
  display: block;
  padding: 3px;
}
.topics_content{
  padding: 15px;
  margin-top: 15px;
  background: #fff;
  border-bottom: 1px solid #d4d4d4;
  font-size: 16px;
  line-height: 2.1;
  color: #333;
}
.reply{
  padding: 10px;
  background-color: #f6f6f6;
  border-radius: 3px 3px 0 0;
  border-bottom: solid 1px #f0f0f0;
  box-shadow: 0 0 4px rgba(0,0,0,.25);
  margin-top:15px;
}
.reply strong{
  color: green
}
.user{
  display: flex;
  font-size: 14px;
}
.user .info{
  line-height: 2.6;
  padding-left: 10px;
}
.container .authorimg{
  width: 50px;
  height: 50px;
  border-radius: 5px;
}
.reply_list{
  background: white;
}
.reply_list li{
  padding: 10px;
  border-bottom: solid 1px #f0f0f0;
}
.reply_content {
  padding: 0 15px;
  margin-top: 15px;
  font-size: 15px;
}
.addreply{
  padding: 10px;
  background-color: #f6f6f6;
  border-radius: 3px 3px 0 0;
  border-bottom: solid 1px #f0f0f0;
  box-shadow: 0 0 4px rgba(0,0,0,.25);
  margin-top:15px;
}
.addcomment .com{
  padding: 15px;
}
#txta{
  font-size: 20px;
}
#btn{
  width: 80px;
  height: 40px;
  font-size: 18px;
  float: right;
  margin-top: 5px;
  margin-right: 10px;
  background: green;
  color: white;
  border: none;
  border-radius: 5px
}
.author .collect{
  /* float: right; */
  position: absolute;
  right: 20px;
}
.collect_btn{
  width: 55px;
  height: 35px;
  background: #80BD01;
  border:none;
  border-radius: 3px;
  color: white;
  font-size: 15px;
}
.delcollect_btn{
  width: 80px;
  height: 35px;
  background: #E5E5E5;
  border:none;
  border-radius: 3px;
  font-size: 15px;
}
/* CSS动画 */
/* .loader {
    background: #000;
    background: radial-gradient(#222, #000);
    bottom: 0;
    left: 0;
    overflow: hidden;
    position: fixed;
    right: 0;
    top: 0;
    z-index: 99999;
} */
.loader-inner {
    bottom: 0;
    height: 60px;
    left: 0;
    margin: auto;
    position: absolute;
    right: 0;
    top: 0;
    width: 100px;
}
.loader-line-wrap {
    -webkit-animation:
		spin 2000ms cubic-bezier(.175, .885, .32, 1.275) infinite
	;
            animation:
		spin 2000ms cubic-bezier(.175, .885, .32, 1.275) infinite
	;
    box-sizing: border-box;
    height: 50px;
    left: 0;
    overflow: hidden;
    position: absolute;
    top: 0;
    -webkit-transform-origin: 50% 100%;
            transform-origin: 50% 100%;
    width: 100px;
}
.loader-line {
    border: 4px solid transparent;
    border-radius: 100%;
    box-sizing: border-box;
    height: 100px;
    left: 0;
    margin: 0 auto;
    position: absolute;
    right: 0;
    top: 0;
    width: 100px;
}
.loader-line-wrap:nth-child(1) { -webkit-animation-delay: -50ms; animation-delay: -50ms; }
.loader-line-wrap:nth-child(2) { -webkit-animation-delay: -100ms; animation-delay: -100ms; }
.loader-line-wrap:nth-child(3) { -webkit-animation-delay: -150ms; animation-delay: -150ms; }
.loader-line-wrap:nth-child(4) { -webkit-animation-delay: -200ms; animation-delay: -200ms; }
.loader-line-wrap:nth-child(5) { -webkit-animation-delay: -250ms; animation-delay: -250ms; }
.loader-line-wrap:nth-child(1) .loader-line {
    border-color: hsl(0, 80%, 60%);
    height: 90px;
    width: 90px;
    top: 7px;
}
.loader-line-wrap:nth-child(2) .loader-line {
    border-color: hsl(60, 80%, 60%);
    height: 76px;
    width: 76px;
    top: 14px;
}
.loader-line-wrap:nth-child(3) .loader-line {
    border-color: hsl(120, 80%, 60%);
    height: 62px;
    width: 62px;
    top: 21px;
}
.loader-line-wrap:nth-child(4) .loader-line {
    border-color: hsl(180, 80%, 60%);
    height: 48px;
    width: 48px;
    top: 28px;
}
.loader-line-wrap:nth-child(5) .loader-line {
    border-color: hsl(240, 80%, 60%);
    height: 34px;
    width: 34px;
    top: 35px;
}
@-webkit-keyframes spin {
    0%, 15% {
		-webkit-transform: rotate(0);
		        transform: rotate(0);
	}
	100% {
		-webkit-transform: rotate(360deg);
		        transform: rotate(360deg);
	}
}
@keyframes spin {
    0%, 15% {
		-webkit-transform: rotate(0);
		        transform: rotate(0);
	}
	100% {
		-webkit-transform: rotate(360deg);
		        transform: rotate(360deg);
	}
}
/* CSS动画结束 */
</style>
