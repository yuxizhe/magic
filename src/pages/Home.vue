<template>
  <div>
    <step1 @initStep2="initStep2" v-show="step == 1" />
    <step2 @initStep3="initStep3" v-if="step == 2" />
    <step3 v-if="step == 3" />
    <step4 :index="index" :info="info" v-if="step == 4" />
    <user @changeIndex='changeIndex' :list="info" v-if="step == 5" />
    <about v-if="step == 6" />
    <div class='nav-list'>
      <div @click="changeStep(1)" :class='{"etc":step != 5 && step != 6}'>占卜</div>
      <div @click="changeStep(5)" :class='{"etc":step == 5 }'>我的</div>
      <div @click="changeStep(6)" :class='{"etc":step == 6 }'>关于</div>
    </div>
  </div>
</template>
<script>
import { saveData, queryData, getuserAdress,Account,neb,dappAddress } from '../request';
import Step1 from '@/components/Step1.vue'
import Step2 from '@/components/Step2.vue'
import Step3 from '@/components/Step3.vue'
import Step4 from '@/components/Step4.vue'
import User from '@/components/User.vue'
import About from '@/components/About.vue'
export default {
  components: {
    'step1': Step1,
    'step2': Step2,
    'step3': Step3,
    "step4": Step4,
    "user": User,
    "about":About
  },
  data() {
    return {
      step: 1,
      type: 'a',
      info: false,
      index: 0,
      account: ''
    }
  },

  methods: {
    changeIndex(index){
      this.index = index;
      this.step = 4;
    },
    changeStep(step) {
      this.step = step;
    },
    initStep2(type) {
      if(window.webExtensionWallet){
        let check = this.check();
        if(check == false){
          this.step = 4;
          this.index = this.info.length - 1;
          return;
        }
        this.step = 2;
        this.type = type;
      }else{
        this.$kiko_message('请先安装扩展钱包未安装');
      }
    },
    resultBack(res){
      this.info = res.names || [];
      this.index = this.info.length - 1;
    },
    getInfo(flag) {
      var callArgs = JSON.stringify([this.account]); //in the form of ["args"]
      var callFunction = "getUserList";
      var contract = {
        "function": callFunction,
        "args": callArgs
      }
      var from = Account.NewAccount().getAddressString();
      var value = "0";
      var nonce = "0";
      var gas_price = "1000000";
      var gas_limit = "2000000";
      var _this = this;
      neb.api.call(from, dappAddress, value, nonce, gas_price, gas_limit, contract).then(function(resp) {
        _this.resultBack(JSON.parse(resp.result));
        if(flag){
          _this.step = 4;
        }
      }).catch(function(err) {
        console.log(err)
      })
    },
    check(){
      let info = this.info;
      if(info && info.length > 0){
        let _item = info[info.length - 1];
        let date = new Date();
        let _date = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0).getTime();
        if (_item.time - _date >=0) {
          return false
        }
      }
      return true;
    },
    initStep3() {
      this.step = 3;
      var _this = this;
      let check = this.check();
      if(check == false){
        this.step = 4;
        this.index = this.info.length - 1;
        return;
      }
      saveData({
        callFunction: 'saveUser',
        callArgs: "[\"" + this.type + "\"]",
        sucess: async (res) => {
          //成功
          _this.getInfo(true);
        },
        fail: (res) => {
          if (res.code == 0) {
            //取消
            _this.$kiko_message('您取消了交易，停止占卜');
          } else {
            _this.$kiko_message('占卜失败，请重新占卜')
          }
          _this.step = 1;
        }
      });
    }
  },
  async created() {
    setTimeout(() => {
      getuserAdress().then(({ account }) => {
        this.account = account;
        this.getInfo();
      }).catch(res => {
        this.$kiko_message('请先安装扩展钱包未安装');
        console.log("请先安装扩展钱包未安装");
      });
    },1500)
    
  }
}
</script>
<style>
.second_neon {
  text-align: center;
  font-size: 40pt;
  color: white;
  text-shadow: white 0px 0px 10px, white 0px 0px 20px, rgb(0, 255, 255) 0px 0px 30px, rgb(0, 255, 255) 0px 0px 40px, rgb(0, 255, 255) 0px 0px 70px, rgb(0, 255, 255) 0px 0px 80px, rgb(0, 255, 255) 0px 0px 100px;
}

.nav-list {
  position: absolute;
  bottom: 30px;
  right: -70px;
  overflow: hidden;
  background: rgba(0, 0, 0, .5);
  box-shadow: 0 0 5px 10px rgba(0, 0, 0, .5);
  border-radius: 0 5px 5px 0;
  color: #fff;
  padding: 10px;
}

.nav-list>div {
  line-height: 40px;
  cursor: pointer;
}

.nav-list>div:hover,
.nav-list>div.etc {
  text-shadow: white 0px 0px 10px, white 0px 0px 20px, rgb(0, 255, 255) 0px 0px 30px, rgb(0, 255, 255) 0px 0px 40px, rgb(0, 255, 255) 0px 0px 70px, rgb(0, 255, 255) 0px 0px 80px, rgb(0, 255, 255) 0px 0px 100px;
}
</style>
