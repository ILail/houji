<template>
  <div class="active">
    <div class="smal" style="width:100%">
      <ul>
        <li class="line">
          <span class="word">头像</span>
          <label for="fileinp">
            <!-- 微信头像 -->
            <img src="@/assets/abs.png"  class="weix" v-if="show">
            <img :src="letter.headimgurl" id="img" v-if="!show">
            <!-- <span id="text">请上传Word文档</span> -->
            <input type="file" id="fileinp" ref="upload" accept="image/*">
          </label>
          <!--mint-ui的progress的库-->
          <mt-progress
            v-if="!(progress==0||progress==100)"
            :value="progress"
            :bar-height="5"
            class="progress"
          ></mt-progress>
          <!-- <input type="file" accept="image/png, image/jpg, image/jpeg" @change="change($event)"> -->
          <!-- <van-uploader :after-read="onRead" accept="image/png, image/jpg, image/jpeg" multiple> -->
          <!-- </van-uploader> -->
        </li>
        <li class="line" style="height:30px">
          <span class="word">昵称</span>
          <!-- <span class="imgsa">{{letter.username}}</span> -->
          <textarea v-model="desca" class="wordAlla">{{desc}}</textarea>
        </li>
        <li class="linea">
          <span class="word">个人简介</span>
          <textarea @input="descInput" v-model="desc" class="wordAll">{{desca}}</textarea>
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
import { Progress } from "mint-ui";

Vue.component(Progress.name, Progress);

import { peosMS } from "@/components/axios/api";
import secret from "@/utils/utils";
import { people } from "@/components/axios/api";
import { qinius } from "@/components/axios/api";
import axios from "axios";
import { imgUpdat } from "@/components/axios/api";

const axiosInstance = axios.create({});
window.ontouchmove=function(e){
    e.preventDefault && e.preventDefault();
    e.returnValue=false;
    e.stopPropagation && e.stopPropagation();
    return false;
};
export default {
  name: "Fit",
  data() {
    return {
      // isActive: false,
      show: false,
      remnant: 118,
      desc: "",
      desca: "",
      letter: "",
      files: [], // 文件
      uploadToken: "", // 上传文件 token
      progress: 0, // 进度条
      url: ""
    };
  },
  created() {
    people()
      .then(res => {
        const num = secret.Decrypt(res.data.data);
        this.letter = JSON.parse(num);
        this.desca = this.letter.username;
        this.desc = this.letter.self_introduction;
        if (this.letter.headimgurl == "") {
          this.show = true;
        }
  
      })
      .catch(err => {
        console.log(err, "请求失败");
        // this.$router.push("/phone");
      });
  },
  mounted() {
    // let self = this;
    qinius()
      .then(res => {
        // console.log(res.data.data);
        this.uploadToken = res.data.data.utoken;
        this.url = res.data.data.onlineUrl;
        let self = this;
        this.$refs.upload.addEventListener("change", function(event) {
          // self.$toast({
          //   message: "上传360x360的照片效果最好",
          //   duration: "1000"
          // });
          let image = document.getElementById("img"); //预览对象
          self.clip(event, {
            resultObj: image,
            aspectRatio: 1
          });
          self.show = false;
          let data = new FormData();
          data.append("token", self.uploadToken);
          data.append("file", this.files[0]);
          // 需要上传到七牛云的token 和 file
          axiosInstance({
            method: "POST",
            url: "http://upload.qiniu.com/",
            data: data,
            onUploadProgress: function(progressEvent) {
              var percentCompleted = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              //console.log(percentCompleted)
              //对应上传进度条
              self.progress = percentCompleted;
            }
          })
            .then(function(res) {
              // console.log(res);
              // let { base_url, path } = res.data;
              // console.log(self.url)
              let url = res.data.key;
              self.letter.headimgurl = self.url + url;
            })
            .catch(function(err) {
              console.log("err", err);
            });
        });
      })
      .catch(err => {
        console.log(err, "请求失败");
        // this.$router.push("/phone");
      });
  },
  methods: {
    descInput() {
      var txtVal = this.desc.length;
      this.remnant = 118 - txtVal;
    },
    enenneen() {
      // const imgs = secret.Decrypt(this.imsg);

      peosMS(this.desca, this.desc, this.letter.headimgurl)
        .then(res => {
          // console.log(res);
          this.$toast({
            message: "保存成功",
            duration: "1000"
          });
          this.$router.go(-1);
        })
        .catch(err => {
          console.log(err, "请求失败");
        });
    }
  },
  components: {
    [Progress.name]: Progress //mint-ui引入组件的方法
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
  margin: 0;
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

#img {
  width: 35px;
  height: 35px;
  border-radius: 50%;
}

.weix {
  width: 35px;
  height: 35px;
  border-radius: 50%;
}

.actives {
  -ms-transform: rotate(-90deg);
  -moz-transform: rotate(-90deg);
  -webkit-transform: rotate(-90deg);
  -o-transform: rotate(-90deg);
}

.active {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  -webkit-overflow-scrolling: touch;
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
  width: 100%;
}

.smal {
  background: #ffffff;
}

.SAME {
  margin-right: 15px;
  height: 30px;
}
</style>
