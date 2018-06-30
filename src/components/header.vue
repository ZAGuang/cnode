<template>
  <div class="header">
    <h2>{{ title }}</h2>
  </div>
</template>

<script>
export default {
  props:["title"]
}
</script>

<style>
.header{
  display: flex;
  justify-content: center;
  width: 100%;
  align-items: center;
  position: fixed;
  top: 0;
  border-bottom: solid 1px #e8e8e8;
  box-shadow: 0 0 4px rgba(0,0,0,.25);
  background: white;
  padding: 12px 0;
}
</style>
