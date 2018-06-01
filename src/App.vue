<template>
  <div id="app">
    <div id="mydiv" :style="{'height':height}">
      <div class="content">
        <!-- <router-view/> -->
        <home />
      </div>
    </div>
  </div>
</template>

<script>
import Home from '@/pages/Home'
import { getuserAdress } from './request';

export default {
  components: {
    'home': Home
  },
  name: 'App',
  data() {
    return {
      height: window.clientHeight,
      account: ''
    }
  },
  async mounted() {
    //配置
    var config = {
      vx: 4,	//小球x轴速度,正为右，负为左
      vy: 4,	//小球y轴速度
      height: 4,	//小球高宽，其实为正方形，所以不宜太大
      width: 4,
      count: 200,		//点个数
      color: "121, 162, 185", 	//点颜色
      stroke: "130,255,255", 		//线条颜色
      dist: 6000, 	//点吸附距离
      e_dist: 20000, 	//鼠标吸附加速距离
      max_conn: 4 	//点到点最大连接数
    }
    //调用
    CanvasParticle(config);

  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

body,
html,
#app,
#mydiv {
  height: 100%;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#mydiv {
  background-image: url(./assets/demo-1-bg.jpg);
  position: relative;
  width: 100%;
  background-color: #333;
  overflow: hidden;
  background-size: cover;
  background-position: center center;
}

#mydiv canvas {
  z-index: 0!important;
}

.content {
  position: absolute;
  left: 50%;
  top: 50%;
  margin-top: -250px;
  margin-left: -400px;
  z-index: 2;
  width: 800px;
  height: 500px;
  background: rgba(0, 0, 0, .5);
  box-shadow: 0 0 5px 10px rgba(0, 0, 0, .5);
  border-radius: 5px;
  padding: 20px;
  box-sizing: border-box;
}

.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.btn-box {
  margin-top: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-item {
  width: 200px;
  border-radius: 10px;
  color: blue;
  text-align: center;
  line-height: 50px;
  background: rgba(0, 0, 0, .5);
  color: #fff;
  font-weight: 600;
  font-size: 20px;
  cursor: pointer;
  transition: all .3s ease;
}

.btn-item.etc {
  box-shadow: white 0px 0px 8px, white 0px 0px 10px, rgb(0, 255, 255) 0px 0px 20px;
}

button:active,
button:focus {
  outline: none;
}





/* 设置滚动条的样式 */

::-webkit-scrollbar {
  width: 10px;
}





/* 滚动槽 */

::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
}





/* 滚动条滑块 */

::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background: #bbb;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
}

::-webkit-scrollbar-thumb:window-inactive {
  background: rgba(255, 0, 0, 0.4);
}
</style>
