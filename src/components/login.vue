<template>
  <div class="container">
    <Header title="登陆"/>
    <div class="login">
      <el-input v-model="token" placeholder="Access Token"></el-input>
      <el-button type="success" @click="loginuser">登陆</el-button>
    </div>
  </div>
</template>

<script>
import Header from '@/components/header';
export default {
  components:{Header},
  data(){
    return{
      token:"89ba0ecd-49b6-4221-bf6c-adc4a1e6d0a1"
    }
  },
  methods:{
    loginuser(){
      if(this.token!=""&&this.token!=undefined){
        this.$store.dispatch("gettoken",this.token)

        this.$store.dispatch("Login",this.token)
        // 消息提供accesstoken

        .then((res)=>{
          console.log(res.data)
          if(res.data.success){
            this.$store.dispatch("severuser",res.data)
            this.$router.push("/mine")
          }
        })
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
.login{
  margin-top: 58px;
  padding: 50px 18px;
}
.el-button{
  width: 100%;
  display: block;
  margin: 20px auto;
  font-size: 18px;
  background: #4fc08d;
}
</style>
