<template>
  <div class="container">
    <Header title="消息"/>
    <div class="message">
      <ul class="mes_tab">
        <li :class='{"selected":selectmes===1}' @click="mes_tab(1)">已读消息</li>
        <li :class='{"selected":selectmes===2}' @click="mes_tab(2)">未读消息</li>
      </ul>
      <div class="msg markdown-body" v-for="(item, idx) in currentData">
                <section class="user">
                    <img class="head" :src="item.author.avatar_url" />
                    <div class="info">
                        <span class="cl">
                            <span class="name">{{item.author.loginname}}</span>
                            <span class="name" v-if="item.type==='at'">在回复中@了您</span>
                            <span class="name" v-if="item.type==='reply'">回复了您的话题</span>
                        </span>
                        <span class="cr">
                            <span class="name" >{{item.reply.create_at | getLastTimeStr}}</span>
                        </span>
                    </div>
                </section>
                <div class="reply_content" v-html="item.reply.content"></div>
                <router-link :to="'/detail/?id='+item.topic.id">
                    <div class="topic-title">
                        话题：{{item.topic.title}}
                    </div>
                </router-link>
            </div>
       <!-- 没有数据的时候 -->
      <!-- <div class="no-data" v-show="currentData.length === 0">
        <i class="iconfont icon-zanwushuju"></i>
        暂无数据!
      </div> -->
    </div>
  </div>
</template>

<script>
import Header from '@/components/header'
export default {
  components:{Header},
  data(){
    return{
      selectmes:1,
      currentData: [],
    }
  },
  mounted(){
    let token=this.$store.getters.accesstoken
    console.log(token)
    this.$store.dispatch("getmessage",token)
    .then((res)=>{
      console.log(res.data.data)
        this.message = res.data.data;
        this.no_read_len = res.data.data.hasnot_read_messages.length;
        if (res.data.data.hasnot_read_messages.length > 0) {
          this.currentData = res.data.data.hasnot_read_messages;
        } else {
          this.currentData = res.data.data.has_read_messages;
          this.selectItem = 2;
        }

    })
  },
  methods:{
    mes_tab(i){
      this.selectItem = i;
      // if(this.currentData.length===0){
      //   this.currentData.length===0
      // }else{
        this.currentData = i === 1 ? this.message.has_read_messages : this.message.hasnot_read_messages;
      // }
    }
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
.message{
  margin-top: 58px
}
.mes_tab{
  display: flex;

}
.mes_tab li{
  flex:1;
  text-align: center;
  padding: 10px 0;
  border-bottom:solid 1px #d4d4d4;
}
.mes_tab :nth-child(1){
  border-right:solid 1px #d4d4d4;
}
.mes_tab .selected{
  color: #ff5a5f;
  border-bottom: 2px solid #ff5a5f;
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
.message .msg{
  border-bottom: 1px solid #d4d4d4;
}
.markdown-body{
    text-size-adjust: 100%;
    color: #333;
    font-family: Helvetica Neue,Helvetica,Segoe UI,Arial,freesans,sans-serif;
    font-size: 16px;
    line-height: 1.6;
    word-wrap: break-word;
    padding: 10px 0;
}
.user{
    width: 100%;
    margin: 10px 0;
    padding: 0 10px;
    display: flex;
}
.user .head {
    display: inline-block;
    width: 45px;
    height: 45px;
    margin-right: 10px;
    border-radius: 10px;
}
.markdown-body img {
    max-width: 100%;
    box-sizing: content-box;
    background-color: #fff;
}
.user .info {
    overflow: hidden;
    display: block;
    width: 100%;
    flex: 1;
}
.user .info .cl {
    display: inline-block;
    width: 68%;
}
.user .info .cr {
    width: 30%;
    display: inline-block;
    text-align: right;
}
.reply_content {
    padding: 0 15px;
    margin-bottom: 15px;
}
.topic-title {
    padding: 5px;
    margin: 15px;
    font-size: 18px;
    color: #2c3e50;
    line-height: 1.5;
    background-color: #f0f0f0;
    border-radius: 5px;
}
</style>
