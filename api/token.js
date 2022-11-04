const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
import jwtDecode from "jwt-decode";

export function setToken(token) {
    localStorage.setItem(ACCESS_TOKEN, token)
}

export function getToken() {
    const Token = localStorage.getItem(ACCESS_TOKEN);
    if (!Token || Token === 'null') return null;
    return TokenExpire(Token) ? null : Token;
}

export function removeToken() {
    localStorage.removeItem(ACCESS_TOKEN);
}

export function TokenExpire(Token) {
    const seconds = 60;
    const metaToken = jwtDecode(Token);
    const { exp } = metaToken;
    const now = (Date.now() + seconds) / 1000; //fecha de hoy;
    return now > exp;
}