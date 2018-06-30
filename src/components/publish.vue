<template>
  <div class="container">
    <Header title="主题"/>
    <div class="add-container">
        <!-- <form class="" action="index.html" method="post"> -->

            <div class="line">选择分类：
                <select class="add-tab" v-model="tab">
                    <option value="share">分享</option>
                    <option value="ask">问答</option>
                    <option value="job">招聘</option>
                    <option value="dev">测试</option>
                </select>
                <button class="add-btn" @click="publish">发布</button>
            </div>
            <div class="line">
                <input class="add-title" v-model="title"
                        type="text"
                        placeholder="标题，字数10字以上" />
            </div>
            <textarea v-model="con" rows="35" cols="144" class="add-content"
                placeholder='请输入内容'>
            </textarea>
        <!-- </form> -->

        </div>
  </div>
</template>

<script>
import Header from '@/components/header'
export default {
  components:{Header},
  data(){
    return{
      title:'',
      tab:'请选择',
      con:''
    }
  },
   methods:{
    publish() {
      var title = this.title;
      var tab = this.tab;
      var con = this.con;
      if(title != '' && tab !='请选择' && con != ''){
        this.$store.dispatch('getAddTopics',{
          title: title,
          tab: tab,
          content: con
        })
        .then( (res) => {
            console.log(res)
        })
        .catch( (res) => {
          console.log(res)
        })
      }

    }
  }
}
</script>

<style scoped>
。container{
  width: 100%;
  height: 100%;
}
.add-container{
  margin-top: 60px;
  padding:20px;
}
.line{
  padding: 5px 0;
  height: 40px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #d4d4d4;
}
.line .add-tab{
  width: 80%;
  height: 30px;
}
.line .add-btn{
  width: 70px;
  margin-left: 30px;
  height: 30px;
  font-size: 18px;
  background: #4fc08d;
  border-radius:4px;
  color: white;
  border: none;
}
.line .add-title{
  padding-left: 30px;
  border: none;
  outline: none;
  font-size: 18px;
  width: 80%;
  height: 30px;
}
.add-content{
  margin: 20px 30px;
  font-size: 16px;
}
</style>
