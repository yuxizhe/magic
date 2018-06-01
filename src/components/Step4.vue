<template>
  <div class='result'>
    <div class="result-panel">
      <div class="img-box"
      >
        <img v-if='imgSrc'  :src='imgSrc' />
      </div>
      <div class="info" v-if='tarot'>
          <div class="info-panel">
            <div class="item"><span>牌名：</span><label>{{tarot.name.name}}</label></div>
            <div class="item"><span>牌位：</span><label>{{tarot.index === 1 ? '逆位' : '正位'}}</label></div>
            <div class="item" v-for='(item,index) in data' :key='index'>
              <span>{{item.name}}：</span><label>{{item.value}}</label>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props:['info','index'],
  data(){
    return {
      src:''
    }
  },
  computed:{
    imgSrc(){
      if(this.tarot){
        return `http://online.chinatarot.com/web/images/card2/pai_${this.tarot.index}_${this.tarot.cardsIndex}.jpg`
      }else{
        return false;
      }
    },
    data(){
      var rst = [];
      var info = this.tarot;
      if(info && info.info){
        let _info = info.info.split("#");
        rst.push({
          name:_info[0].trim(),
          value:_info[1].trim()
        })
        if(_info.length > 2){
          rst.push({
            name:_info[2].trim(),
            value:_info[3].trim()
          })
        }
      }
      return rst;
    },
    tarot() {
      console.log(this.info)
      if(this.index > -1){
        return this.info[this.index]
      }else{
        return false;
      }
    }
  }
}
</script>

<style>
.result{
  background: url('../assets/13.png') top center no-repeat;
  background-size:100% auto;
  height: 460px;
}
  .result-panel{
    display: flex;
    align-items: center;
    height: 100%;
  }
  .result-panel .img-box {
    padding-top:40px;
    margin-left: 10px;
    width: 300px;
    height: 340px;
    background: url(../assets/12.png) no-repeat center center;
    background-size: 100% auto;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .result-panel .info{
    flex: 1;
    padding-right: 30px;
    padding-left: 20px;
  }
  .result-panel .info span{
    width: 60px;
  }
    .result-panel .info label{
      flex: 1;
    }
    .info-panel .item{
      margin-top:20px;
display: flex;
    }
    .img-box{
     position: relative;
    }
    .img-box span{
      position: absolute;
    }
  .img-box img{
    max-width: 100%;
    margin-top: -25px;
  }
</style>

