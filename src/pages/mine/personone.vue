<template>
  <div class="active">
    <div class="smal">
      <ul>
        <li class="line">
          <span class="word">头像</span>
          <label for="fileinp">
            <img :src="letter.headimgurl" class="weix" id="img" ref="imgsss">
            <!-- <span id="text">请上传Word文档</span> -->
            <input type="file" id="fileinp" @change="change($event)" ref="wrapImg">
          </label>

          <!-- <input type="file" accept="image/png, image/jpg, image/jpeg" @change="change($event)"> -->
          <!-- <van-uploader :after-read="onRead" accept="image/png, image/jpg, image/jpeg" multiple> -->
          <!-- </van-uploader> -->
        </li>
        <li class="line" style="height:30px">
          <span class="word">昵称</span>
          <!-- <span class="imgsa">{{letter.username}}</span> -->
          <textarea v-model="desca" class="wordAlla">{{letter.username}}</textarea>
        </li>
        <li class="linea">
          <span class="word">个人简介</span>
          <textarea @input="descInput" v-model="desc" class="wordAll">{{letter.self_introduction}}</textarea>
          <div class="num">{{remnant}}</div>
        </li>
      </ul>
    </div>
    <div class="warpall">
      <div class="enterH" @click="enenneen">保存</div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import { Uploader } from "vant";

Vue.use(Uploader);
import { peosMS } from "@/components/axios/api";
import secret from "@/utils/utils";
import { people } from "@/components/axios/api";

import { imgUpdat } from "@/components/axios/api";
export default {
  name: "Fit",
  data() {
    return {
      remnant: 118,
      desc: "",
      desca: "",
      letter: {},
      imsg: ""
    };
  },
  created() {
    people()
      .then(res => {
        const num = secret.Decrypt(res.data.data);
        this.letter = JSON.parse(num);
      })
      .catch(err => {
        console.log(err, "请求失败");
        // this.$router.push("/phone");
      });
  },
  methods: {
    change(file) {
      let image = document.getElementById("img"); //预览对象
      this.clip(file, {
        resultObj: image,
        aspectRatio: 1
      });
      // console.log(file.path[1].childNodes[0])
      // console.log(this.$refs.wrapImg.files[0]);
      var file = this.$refs.wrapImg.files[0];
      // var files = this.$refs.wrapImg.files[0].name;
      // // 如果该文件没有后缀就新年构造一个File对象， 并指定文件名和类型
      // // 第一个参数可以为Blob对象的数组 （第一个参数必须是数组）， File对象继承自Blob，所以可以传递File对象
      // // 第二个参数为 要设置的文件名
      // // 第三个参数为可选参数， 没有后缀可能获取不到该文件类型， 所以最好设置下该值
      // let filea = new File([file], new Date().getTime() + ".png", {
      //   type: files
      // });
      // console.log(filea);

      var reader = new FileReader();

      var imgFile;

      reader.onload = function(e) {
        imgFile = e.target.result;
        console.log(imgFile);
      };

      //正式读取文件
      reader.readAsDataURL(file);

      // var reader = new FileReader();
      // reader.readAsDataURL(file);
      // var URL = URL || webkitURL;
      // var blob = URL.createObjectURL(file);
      // let aaa = window.URL.createObjectURL(num);

      // console.log(files);
      // let aafile = new File([num], files);
      // console.log(aafile);

      // let aaa = files.split('/')[0]
      // let bbb = aaa+'/'+num
      // imgUpdat(filea)
      //   .then(res => {
      //     console.log(res);
      //   })
      //   .catch(err => {
      //     console.log(err, "请求失败");
      //   });
    },
    descInput() {
      var txtVal = this.desc.length;
      this.remnant = 118 - txtVal;
    },
    enenneen() {
      // const imgs = secret.Decrypt(this.imsg);
      if (this.desca == "" || this.desc == "") {
        alert("请更改");
      } else {
        peosMS(this.desca, this.desc)
          .then(res => {
            console.log(res);
            alert("保存成功");
            this.$router.go(-2);
          })
          .catch(err => {
            console.log(err, "请求失败");
          });
      }
    }
  }
};
</script>
<style lang="stylus" type="text/stylus" rel="stylesheet/stylus" scoped>
label {
  position: relative;
}

#fileinp {
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
}

#btn {
  margin-right: 5px;
}

#text {
  color: red;
}

.wordAll {
  width: 100%;
  height: 50px;
  display: block;
  margin-top: 10px;
}

.wordAlla {
  width: 30%;
  height: 50px;
  text-align: right;
  line-height: 50px;
  display: block;
}

.num {
  color: #999;
  font-size: 13px;
  font-family: SanFranciscoDisplay-Medium;
  font-weight: 500;
  color: rgba(153, 153, 153, 1);
  text-align: right;
}

.linea {
  padding: 10px 2% 10px 2%;
}

.weix {
  width: 35px;
  height: 35px;
  border-radius: 50%;
}

.active {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  overflow-y: auto;
  background-color: #f4f4f4;
}

.imgsa img {
  width: 25%;
}

.line {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #eee;
  padding: 10px 2% 10px 2%;
}

.word {
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  color: #333333;
}

.enterH {
  width: 96%;
  height: 50px;
  text-align: center;
  line-height: 50px;
  background: #fff;
  margin-top: 20px;
  font-size: 14px;
  background: #D21623;
  color: #fff;
  border-radius: 5px;
  margin-left: 2%;
}

.warpall {
  background: #F4F4F4;
  hieght: 500px;
}

.smal {
  background: #ffffff;
}

.SAME {
  margin-right: 15px;
  height: 30px;
}
</style>
