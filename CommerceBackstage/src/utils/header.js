import store  from "../store"
export function getHeader(code) {
    let token = store.getters.token
    console.log('token->',token)
    // console.log('url->',url)
    return {
      // 'Content-Type': 'application/json; charset=UTF-8',
      'token': token,
      'code': code,
      'source':'web'
    };
  }