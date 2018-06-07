var dappAddress = "n1wsmVABffhGtp8thECBsfYZCNshW3cpnRv";//"n1ifQ1mKaxtxQFvGV8FzjhjZ7rMwDRKgS8H";//"n1v7u8kcdYEriBRZbYhX33w7VHVzkUoiiza";

var nebulas = require("nebulas");
var Account = nebulas.Account,
  neb = new nebulas.Neb();
neb.setRequest(new nebulas.HttpRequest("https://mainnet.nebulas.io"));
var NebPay = require("nebpay");     //https://github.com/nebulasio/nebPay
var nebPay = new NebPay();

const cbPush = (hash) => {
  return new Promise(function (resolve, reject) {
    var timer = setInterval(() => {
      neb.api.getTransactionReceipt({ hash }).then((receipt) => {
        if (receipt.status === 0) {
          clearInterval(timer);
          reject(receipt)
        }
        if (receipt.status === 1) {
          clearInterval(timer);
          resolve(receipt)
        }
      });
    }, 5000);
  });

}
const saveData = ({ callArgs, callFunction, sucess, fail }) => {
  var to = dappAddress;
  var value = "0";
  var serialNumber;
  var _this = this;
  serialNumber = nebPay.call(to, value, callFunction, JSON.stringify(callArgs), {    //使用nebpay的call接口去调用合约,
    listener: function (resp) {
      var result = JSON.stringify(resp);
      if (result.includes("Transaction rejected by user")) {
        console.log('取消')
        fail && fail({
          code: 0//取消
        });
      } else {
        if (resp.txhash) {
          cbPush(resp.txhash).then(res => {
            console.log('成功')
            sucess && sucess();//成功
          }).catch(res => {
            console.log('失败')
            fail && fail({
              code: 1//失败
            });
          })
        }
      }
    }
  });
}
const queryData = (callFunction, callArgs, sucess, fail) => {
  var contract = {
    "function": callFunction,
    "args": JSON.stringify(callArgs)
  }
  var from = Account.NewAccount().getAddressString();
  var value = "0";
  var nonce = "0";
  var gas_price = "1000000";
  var gas_limit = "2000000";
  neb.api.call(from, dappAddress, value, nonce, gas_price, gas_limit, contract).then(function (resp) {
    sucess && sucess(resp);
  }).catch(function (err) {
    fail && fail(err);
  })
}
export const getuserAdress = () => {
  return new Promise(function (resolve, reject) {
    if (window.webExtensionWallet) {
      const a = window.postMessage({
        "target": "contentscript",
        "data": {},
        "method": "getAccount",
      }, "*");
      window.addEventListener('message', function (e) {
        if (e.data && e.data.data) {
          if (e.data.data.account) {//这就是当前钱包中的地址
            resolve({ code: 1, account: e.data.data.account });
            window.addEventListener('message', null)
          }
        }
      });
    } else {
      reject({ code: 0 });
    }
  })
}

export const fomartTime = (t) => {
  var time = new Date(t);
  var y = time.getFullYear();//年

  var m = time.getMonth() + 1;//月

  var d = time.getDate();//日

  var h = time.getHours();//时

  var mm = time.getMinutes();//分

  var s = time.getSeconds();//秒

  return y + "-" + m + "-" + d + " " + h + ":" + mm;
}
export { dappAddress, nebPay, neb, Account, cbPush, saveData, queryData }



