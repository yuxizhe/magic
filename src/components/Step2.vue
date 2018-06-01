<template>
  <section>
    <div class="second_neon" id="title">洗牌</div>
    <div class="xipai-box" v-if="!isSelected">
      <div class="xipai-panel" :class="{'move':isAnimate}">
        <img class="left normal" :class="{'transition':isAnimate}" src="../assets/bg1.jpg" />
        <img class="center normal" src="../assets/bg1.jpg" />
        <img class="right normal" :class="{'transition':isAnimate}" src="../assets/bg1.jpg" />
        <img style="right:-220px" src="../assets/bg1.jpg" />
        <img style="right:-440px" src="../assets/bg1.jpg" />
      </div>
    </div>
    <ul class="card-list" v-if="isSelected">
      <li @click="initStep3" v-for="(item,index) in data" :key="index" :style="{'animation-delay':index * 0.1 + 's'}">
        <img src='../assets/bg1.jpg' />
      </li>
    </ul>
  </section>
</template>
<script>

var nums = 22;
var data = [];
for (let i = 0; i < 22; i++) {
  data.push({
    id: Math.floor(Math.random() * nums)
  })
}
export default {
  data() {
    return {
      isSelected: false,
      isAnimate: false,
      data: data
    }
  },
  methods: {
    initStep3() {
      this.$emit("initStep3");
    }
  },
  created() {
    setTimeout(() => {
      this.isAnimate = true;
    }, 500);
    setTimeout(() => {
      this.isAnimate = false;
    }, 2500);
    setTimeout(() => {
      this.isSelected = true;
    }, 3500);
  }
}
</script>
<style>
.card-list {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.card-list li {
  width: 80px;
  height: 95px;
  overflow: hidden;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  border-radius: 5px;
  margin-left: 12px;
  margin-top: 20px;
  border: 1px #fff solid;
  opacity: 0;
  animation: move1 .1s ease forwards;
  cursor: pointer;
}

.card-list img {
  max-width: 100%;
}

.xipai-box {
  width: 620px;
  overflow: hidden;
  margin: 0 auto;
}

.xipai-panel {
  position: relative;
  margin-top: 30px;
  height: 354px;
  box-sizing: border-box;
}

.xipai-panel.move {
  animation: move .05s linear 0.5s 40;
}

.xipai-panel img {
  position: absolute;
  width: 180px;
  transition: transform .3s linear;
}

.xipai-panel .normal {
  position: absolute;
  left: 50%;
  margin-left: -90px;
}

.transition.left {
  transform: translateX(-220px);
}

.transition.right {
  transform: translateX(220px);
}

@keyframes move1 {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes move {
  from {
    transform: translate(0);
  }
  to {
    transform: translate(-400px);
  }
}

@-webkit-keyframes move
/*Safari and Chrome*/

{
  from {
    transform: translate(0);
  }
  to {
    transform: translate(-400px);
  }
}
</style>

