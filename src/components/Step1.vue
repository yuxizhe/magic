<template>
      <section>
        <div class="second_neon" id="title">星云塔罗屋</div>
        <div class="first_neon" style="font-size:14px" id="content-panel"></div>
        <section class="list-pane" :style="{opacity:(showType ? 1 : 0)}">
          <div class="list" >
            <div class="item" :class="{'etc':type == 'a'}" @click="changeType('a')">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-xinlijiankang"></use>
              </svg>
              <span>爱情</span>
            </div>
            <div class="item" :class="{'etc':type == 'b'}" @click="changeType('b')">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-kaoyan"></use>
              </svg>
              <span>事业</span></div>
            <div class="item" :class="{'etc':type == 'c'}" @click="changeType('c')">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-jingji"></use>
              </svg>
              <span>财富</span></div>
          </div>
          <div class="btn-box">
            <button @click="initStep2" class="btn-item" :class="{'etc': type != ''}" >下一步 >></button>
          </div>
        </section>
      </section>
</template>
<script>
export default {
  data(){
    return{
      type:'',
      showType:false
    }
  },
  methods:{
    changeType(type){
      this.type = type;
    },
    initStep2(){
      if(this.type != ''){
        this.$emit('initStep2',this.type)
      }
    },
    initStep1(){
      $("#content-panel").typeIt({
        whatToType: [
          "亲爱的用户，欢迎您来到塔罗占卜屋!",
          "欢迎和我们一起踏上神奇的塔罗牌之旅，塔罗牌拥有神奇的力量，只要你愿意相信，这种力量就会显现出来，无论你原来是否相信，从这一刻起，请跟紧塔罗牌的脚步，在充满魔力的世界里，探寻你心中想要的真！",
          "在开始洗牌之前，请在下方选择你要占卜的类型，并在心中默念你要问的问题，然后请按“下一步”开始洗牌。"
        ],
        typeSpeed: 10,
        callback:() => {}
      });
      //洗牌和切牌都已经顺利完成，下面进入关键性的一步——抽牌，请从22张牌中选出你的牌阵所需要的牌。
  　　 //抽牌的时候，请摒弃杂念，不要过多犹豫，相信第一感觉。点击“下一步”开始抽牌。
      //牌已经洗好了，继续集中你的注意力，默念你的问题，诚意是整个占卜过程中最重要的部份。因为只要诚意才能起动塔罗牌超自然的预知玄力，好了，现在我们开始切牌。
      setTimeout(() => {
        this.showType = true;
      },12000);
    }
  },
  mounted(){
    this.initStep1();
  }
}
</script>
<style>
.list-pane{
  opacity: 0;
  transition: opacity .5s ease;
}
.list{
  margin: 0 auto;
  width: 400px;
  display: flex;
  align-items: center;
  justify-content:space-between;
}
.list .item{
  color: #fff;
  background: rgb(0, 0, 0,.4);
  border-radius: 50%;
  cursor: pointer;
  width: 80px;
  height: 80px;
  text-align: center;
  padding-top:10px;
  box-sizing: border-box;
}
.list .item:hover{
  box-shadow: white 0px 0px 8px, white 0px 0px 10px, rgb(91, 105, 105) 0px 0px 20px;
}
.list .item.etc {
  box-shadow: white 0px 0px 8px, white 0px 0px 10px, rgb(0, 255, 255) 0px 0px 20px;
}
.list .item span{
  display: block;
  line-height: 1;
  font-size: 12px;
}
.list .item .icon{
  width: 40px;
  height: 40px;
}

.first_neon{
  margin-top: 30px;
  text-indent: 2em;
  text-align: left;
  line-height: 30px;
  color:#fff;
  font-size: 16px;
  height: 150px;
  /* font-size: 16px; color: white; text-shadow: white 0px 0px 10px, white 0px 0px 20px, rgb(0, 255, 255) 0px 0px 30px, rgb(0, 255, 255) 0px 0px 40px, rgb(0, 255, 255) 0px 0px 70px, rgb(0, 255, 255) 0px 0px 80px, rgb(0, 255, 255) 0px 0px 100px; */
}

.first_neon .ti-cursor:after {
   content: ' |';
}
.ti-text-container {
    position: relative;
    display: inline;
    font-size: inherit;
}
.ti-text-container.active-container.ti-cursor:after {
    display: inline;
}
.ti-cursor:after {
    display: none;
    content: ' _';
    bottom: .05em;
    right: -.25em;
    position: absolute;
    line-height: normal;
    font-size: inherit;
    -webkit-animation: blink 1s infinite;
    animation: blink 1s infinite;
}
@-webkit-keyframes blink {
    0% {
        opacity: 1
    }

    50% {
        opacity: 0
    }

    100% {
        opacity: 1
    }
}

@keyframes blink {
    0% {
        opacity: 1
    }

    50% {
        opacity: 0
    }

    100% {
        opacity: 1
    }
}
.ti-container {
    display: block;
    font-size: inherit;
}
</style>

