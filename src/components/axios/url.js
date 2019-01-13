
const HOST = process.env.NODE_ENV  !== 'production' ? '/api' : 'http://csapi.nguiba.com/api'
const HOSTs = process.env.NODE_ENV  !== 'production' ? '/api' : 'http://csapi.nguiba.com'
export default {
    Hallowmas:HOST,
    //接口代理配置
    Hallowmasa:HOSTs,
  }
