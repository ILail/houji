import axios from 'axios'; //引入axios
import store from '@/components/vuex/store'
export function fetch(options) {
  return new Promise((resolve, reject) => {
    const instance = axios.create({ //instance创建一个axios实例，可以自定义配置，可在 axios文档中查看详情
      //所有的请求都会带上这些配置，比如全局都要用的身份信息等。
      headers: {
        // 'Content-Type': 'application/x-www-form-urlencoded',
        // 'token_in_header': global_.token,//token从全局变量那里传过来
        'token':store.state.token,
        // 'did': 'dfdfdffff',
        'apptype': 'wx_pub',
        'sign': '26644EBFD0C996C83B8E35005CBA0443DA20A54E0137DB73A838D3ACAA0DED1C056BCCFA6C22E5AB047E3B9695D7C4E3A960BAB8C8DFFA06548AB6E2E1A9E22832FDC6089785FA2BD96D03F1CE4015C0868AEE49080F259CCE922455E79C9954F48AC9128341E3ABB419CED937A192B0',
        // 'os': '12',
        // 'version': '1',
        // 'model': 'hw',
      },
    });

    instance.interceptors.request.use(
      config => {
        // if (store.state.token != '') { // 判断是否存在token，如果存在的话，则每个http header都加上token
        //   config.headers.token = token
        // }
        console.log(store.state.token)
        // if(store.state.token == ''){
        //   this.$router.push({
        //     path: "/bindm",
        //   });
        // }
        return config;
      },
      err => {
        return Promise.reject(err);

      }
    );
    instance(options)
      .then(response => { //then 请求成功之后进行什么操作

        resolve(response); //把请求到的数据发到引用请求的地方
      })
      .catch(error => {
        console.log('请求异常信息：' + error);
        reject(error);
      });
  });
}
