<template>
  <div class="user-panel">
    <div style='font-size:24px;'>我的占卜记录</div>
    <div class="list-panel">
      <div class="list-img">
        <img src='../assets/22.jpg' />
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
   .list-panel .list-img img{
     max-width: 100%;
     margin: 15px 0;
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
    padding-left: 50px;
    padding-top:20px;
    max-height: 380px;
    overflow-y: auto;
  }
</style>

