import store  from "../store"
import { getToken } from "./auth";

export function getHeader(code) {
    // let token = store.getters.token
    let token = getToken()
    console.log('token->',token)
    // console.log('url->',url)
    return {
      // 'Content-Type': 'application/json; charset=UTF-8',
      'token': token,
      'code': code,
      'source':'web'
    };
  }