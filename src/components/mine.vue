<template>
  <div class="container">
    <Header title="我的"/>
    <div class="userinfo">
        <div @click="login">
          <img :src="user.avatar_url">
          <p>{{user.loginname}}</p>
        </div>
        <div class="integraltime">
          <span class="time">{{user.create_at | getLastTimeStr}}</span>
          <span class="integral">积分:{{ user.score }}</span>
        </div>
    </div>
    <div class="topics">
      <ul class="user_tab">
        <li :class='{"selected":selectItem === 1}' @click="changeItem(1)">最近回复</li>
        <li :class='{"selected":selectItem === 2}' @click="changeItem(2)">最新发布</li>
      </ul>
      <div class="message" >
        <ul class="usermessage">
          <li v-for="(item, index) in currentData" :key="index">
            <img class="authorimg" :src="item.author.avatar_url" alt="">
            <router-link :to="'/detail/?id='+item.id">
              <span class="louzhu" title="标题">
                {{item.title}}
              </span>
              <p class="title">
                <span title="作者">{{item.author.loginname}}</span>
                <span style="color:#80bd01" title="发布时间">{{item.last_reply_at | getLastTimeStr}}</span>
              </p>
            </router-link>
          </li>
        </ul>
      </div>
      <!-- 没有数据的时候 -->
      <div class="no-data" v-show="currentData.length === 0">
        <i class="iconfont icon-zanwushuju"></i>
        暂无数据!
      </div>
    </div>

  </div>
</template>

<script>
import Header from '@/components/header'
export default {
  components:{Header},
  data(){
    return{
      user:{
        avatar_url:'./static/moren.jpg',
        loginname:'您还未登录，请先登录'
      },
      load:false,
      selectItem:1,
      currentData:[]
    }
  },
  mounted(){
      let user = this.$store.getters.user
        if(user.success){
          this.user=user
          this.load=true
          // 用户信息
          let loginname=this.user.loginname
          this.$store.dispatch("usermessage",loginname)
          .then((res)=>{
            // console.log(res.data.data)
            this.user=res.data.data
            let data=res.data.data
            if (data.recent_replies.length > 0) {
              this.currentData = data.recent_replies;
            } else {
              this.currentData = data.recent_topics;
              this.selectItem = 2;
            }
          })
        }
  },
  methods:{
    login(){
      if(!this.load){
        this.$router.push("/login")
      }
    },
    changeItem(idx) {
      this.selectItem = idx;
      if(this.currentData.length===0){
        this.currentData.length===0
      }else{
        this.currentData = idx === 1 ? this.user.recent_replies : this.user.recent_topics;

      }
    },
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
}
.userinfo{
  background: #e7e7e7;
  margin-top:56px;
  width: 100%;
  background-color: #e7e7e7;
  text-align: center;
  height: 190px;
}
.userinfo img{
  width: 100px;
  height: 100px;
  border-radius:50%;
  margin-top: 15px;
}
.integraltime{
  display: flex;
  font-size: 15px;
  padding: 0 25px;
  margin-top: 20px;
}
.integraltime .time{
  flex: 1;
}
.integraltime .integral{
  flex: 1;
  text-align: right;
  color: #80bd01;
}
.user_tab{
  display: flex;
}
.user_tab li{
  flex:1;
  text-align: center;
  padding: 10px 0;
  border-bottom:solid 1px #d4d4d4;
}
.user_tab .selected{
  color: #ff5a5f;
  border-bottom: 2px solid #ff5a5f;
}
.usermessage li{
  display: flex;
  padding: 15px;
  align-items: center;
}
.user_tab :nth-child(1){
  border-right:solid 1px #d4d4d4;
}
.usermessage a{
  color: black;
  flex: 1;
  display: inline-block;
}
.usermessage .authorimg{
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 15px;
  /* margin-top: 10px; */
}
.title{
  display: flex;
  /* height: 30px; */
  justify-content: space-between
}
.louzhu{
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 10px;
  display: inline-block;
}
.title{
  font-size: 15px;
}
.no-data{
  width: 100%;
  height: 100%;
  padding: 20% 0;
  color: #d4d4d4;
  display: inline-block;
  font-size: 18px;
  text-align: center;
}
.no-data .icon-zanwushuju{
  font-size: 125px;
  display: block;
}

</style>
