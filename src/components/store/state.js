let defaultCode = ''
let defaultOpenid = ''
let defaultAccess = ''
try {
  if (localStorage.tokenmine) {
    defaultCode = localStorage.tokenmine
  }

  if (localStorage.openid) {
    defaultOpenid = localStorage.openid
  }

  if (localStorage.accessToken) {
    defaultAccess = localStorage.accessToken
  }
} catch (e) {}

export default {
    token: defaultCode,
    openid:defaultOpenid,
    accessToken:defaultAccess
}