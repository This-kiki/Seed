const TokenKey = 'seed_token';

export function getToken() {
  return localStorage.getItem(TokenKey);
}

export function setToken(token) {
  return localStorage.setItem(TokenKey, token);
}

export function removeToken() {
  return localStorage.removeItem(TokenKey);
}

export function setUserMsg(msg) {
  return localStorage.setItem('userId', msg);
}

export function getUserMsg() {
  return localStorage.getItem('userId');
}
