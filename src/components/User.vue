<template>
  <div class="user-panel">
    <div style='font-size:24px;'>我的占卜记录</div>
    <div class="list-panel">
      <div class="list-img">
        <img src='../assets/bg1.jpg' />
      </div>
      <div class="list-box">
        <div v-if="list" @click="showResult(index)" class='list-item' v-for="(item,index) in list" :key="index">
          {{fromMate(item.time)}} 占卜了{{getType(item.type)}} 点击查看详情 >>
        </div>
        <div v-if='list.length === 0'>
        无记录
        </div>
      </div>
      
    </div>
    
   
  </div>
</template>
<script>
export default {
  props:['list'],
  methods:{
    fromMate(time) {
        var date = new Date(time);
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var hours = date.getHours();
        var m = date.getMinutes();
        m = m > 9 ? m : '0'+m;
        return year + "/" + month + "/" + day + " " + hours + ":" + m ;
    },
    getType(type){
      var obj = {
        'a':'爱情',
        'b':'事业',
        'c':'财富'
      }
      return obj[type];
    },
    showResult(index){
      this.$emit('changeIndex',index);
    }
  }
}
</script>

<style>
  .user-panel{
    color: #fff;
  }
  .list-panel{
    display: flex;
    align-items: center;
    padding-left: 60px;
    height: 440px;
  }
   .list-panel .list-img{
     width: 200px;
     height: 200px;
     display: flex;
     align-items: center;
     border-radius: 50%;
     overflow: hidden;
   }
   .list-panel .list-img img{
     max-width: 100%;
   }
  .list-item{
    cursor: pointer;
    text-decoration: underline;
    transition: all .3s ease;
    line-height: 30px;
    font-size: 15px;
  }
  .list-item:hover{
    color: aqua;
  }
  .list-box{
    width: 420px;
    padding-left: 50px;
    padding-top:20px;
    max-height: 400px;
    overflow-y: auto;
  }
</style>

