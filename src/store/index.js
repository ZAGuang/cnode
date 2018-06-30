import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

let store = new Vuex.Store({
  state:{
    accesstoken:"89ba0ecd-49b6-4221-bf6c-adc4a1e6d0a1",
    user:{},
    id:""
  },
  mutations:{
    gettoken(state,token){
      state.accesstoken=token
    },
    severuser(state,user){
      state.user=user
    }
  },
  actions:{
    // 主题
    getTopics(store,params){
      return axios.get("https://cnodejs.org/api/v1/topics/?tab="+params)
    },
    // 主题详情
    getTopicsDetail(store,id){
      store.state.id=id
      return axios.get("https://cnodejs.org/api/v1/topic/"+id)
    },
    // 新建主题
    getAddTopics({commit,state},params){
      return axios.post("https://cnodejs.org/api/v1/topics",{
        accesstoken: state.accesstoken,
        title: params.title,
        tab: params.tab,
        content: params.content
      })
    },
    // 登陆
    Login(store,token){
      return axios.post("https://cnodejs.org/api/v1/accesstoken",{
        accesstoken:token
      })
    },
    // 用户
    severuser({commit},user){
      commit("severuser",user)
    },
    //消息
    getmessage({commit,state},token){
      return axios.get("https://cnodejs.org/api/v1/messages/?accesstoken="+token)
    },
    //消息提供
    gettoken({commit},token){
      commit("gettoken",token)
    },
    //用户详情
    usermessage({commit,state},loginname){
      return axios.get("https://cnodejs.org/api/v1/user/"+loginname)
    },
    //添加收藏
    addCollect(store,params){
      return axios.post("https://cnodejs.org/api/v1/topic_collect/collect",{
        accesstoken: store.state.accesstoken,
        topic_id: store.state.id
      })
    },
    //取消收藏
    delCollect(store,params){
      return axios.post("https://cnodejs.org/api/v1/topic_collect/de_collect",{
        accesstoken: store.state.accesstoken,
        topic_id: store.state.id
      })
    },
    //新建评论
    getComment(store,params){
      return axios.post("https://cnodejs.org/api/v1/topic/"+store.state.id+"/replies",{
        accesstoken: store.state.accesstoken,
        content: params.content
      })
    },
  },
  getters:{
    accesstoken:(state) => state.accesstoken,
    user:(state) => state.user
  }
})
export default store
