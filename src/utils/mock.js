import secret from './utils'

const userInfo = {
  "name" : "Chris" ,
  "sex" : "male"
}

export default secret.Encrypt(JSON.stringify(userInfo))