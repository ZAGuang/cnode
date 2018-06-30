<template>
  <div class="container">
    <div class="nav_tab">
      <router-link to="/?tab=all">全部</router-link>
      <router-link to="/?tab=good">精华</router-link>
      <router-link to="/?tab=share">分享</router-link>
      <router-link to="/?tab=ask">问答</router-link>
      <router-link to="/?tab=job">招聘</router-link>
      <router-link to="/?tab=dev">测试</router-link>
    </div>
    <!-- 主题 -->
    <div class="content">
      <ul class="posts-list">
        <li v-for="(item, index) in Topics" :key="index">
          <router-link :to="'/detail/?id='+item.id">
          <h4>
            <span v-if="item.top" class="top" style="background:#E74C3C;">置顶</span>
            <span v-if="item.good" class="top" style="background:#E67E22;">精华</span>
            <span v-if="'ask'===item.tab&&!item.top&&!item.good" class="top" style="background:#3498DB;">问答</span>
            <span v-if="'share'===item.tab&&!item.top&&!item.good" class="top" style="background:#1ABC9C;">分享</span>
            <span v-if="'job'===item.tab&&!item.top&&!item.good" class="top" style="background:#9B59B6;">招聘</span>
            <span v-if="'dev'===item.tab&&!item.top&&!item.good" class="top" style="background:green;">测试</span>
            {{ item.title }}
          </h4>
          <div class="louzhu">
            <img :src="item.author.avatar_url" class="authorimg">
            <div class="info">
              <p>
                <span class="name" title="作者">{{item.author.loginname}}</span>
                <span class="status">
                  <b title="回复数"> {{ item.reply_count }} </b>
                  / <span title="浏览数">{{ item.visit_count }}</span>
                </span>
              </p>
              <p>
                <span style="flex:1" title="发布时间">{{item.create_at | getLastTimeStr}}</span>
                <span title="最后回复时间">{{item.last_reply_at | getLastTimeStr}}</span>
              </p>
            </div>
          </div>
          </router-link>
        </li>
      </ul>
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
      Topics:[],
      loading:false
    }
  },
  mounted(){
    let tab=this.$route.query.tab
    this.loading=true
    this.$store.dispatch("getTopics",tab)
    .then((res) => {
      console.log(res.data.data)
      this.Topics=res.data.data
      this.loading=false
    })
  },
  beforeRouteUpdate(to, from, next) {
    let tab=to.query.tab
    this.Topics=[]
    this.loading=true
    next()
    this.$store.dispatch("getTopics",tab)
    .then((res) => {
      this.Topics=res.data.data
      this.loading=false
    })
  },
  filters:{
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
  overflow: hidden
}
/* 头部 */
.nav_tab{
  display: flex;
  position: fixed;
  width: 100%;
  height: 50px;
  background: white;
}
.nav_tab a{
  flex: 1;
  text-align: center;
  line-height: 50px;
  font-size: 18px;
}
.nav_tab .router-link-exact-active{
  background: red;
  color: white
}
/* 主体 */
.content{
  margin-top: 50px;
}
.posts-list li{
  padding: 10px 15px;
  border-bottom: 1px solid #d5dbdb;
}
.posts-list li a{
  color: black;
}
.posts-list .louzhu {
    padding-top: 10px;
    display: flex;
}
.posts-list .info {
    display: block;
    width: 100%;
    flex: 1;
}
.posts-list .authorimg{
    display: block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
    border: 1px solid #f3f3f3;
}
.posts-list p b {
    color: #42b983;
}
.posts-list p .name{
  display: block;
  width: 100%;
  flex: 1;
}
.posts-list p .status{
  font-size: 15px;
}
.posts-list p b {
    color: #42b983;
}
.posts-list p {
    padding: 3px 0;
    display: flex;
    color: #34495e;
    font-size: 12px;
}
.top{
  width: 50px;height: 20px;
  font-size: 12px;
  border: none;
  border-radius:2px;
  color: white;
  padding:3px 4px;
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
