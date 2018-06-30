<template>
  <div>
    <nav class="nav">
      <ul>
        <li>
          <router-link to="/?tab=all"><i class="iconfont icon-all"></i><p>首页</p></router-link>
        </li>
        <li>
          <router-link to="/message"><i class="iconfont icon-xiaoxi"></i><p>消息</p></router-link>
        </li>
        <li>
          <router-link to="/publish"><i class="iconfont icon-fabu"></i><p>发布</p></router-link>
        </li>
        <li>
          <router-link to="/mine"><i class="iconfont icon-mine"></i><p>我的</p></router-link>
        </li>
      </ul>
    </nav>
    
    <router-view></router-view>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.nav{
  width: 100%;
  position: fixed;
  bottom: 0;
  background: white;
}
.nav ul{
  display: flex;
}
.nav ul li{
  flex: 1;
  text-align: center;
  padding: 10px 0;
}
.iconfont{
  font-size: 18px;
}
.nav ul li a{
  color: black;
  font-size: 20px;
}
.nav ul li .router-link-exact-active{
  color: green;
  font-size: 20px;
  font-weight: 600;
}
.nav ul li .router-link-exact-active .iconfont{
  font-size: 23px;
  font-weight: 600;
}

</style>
