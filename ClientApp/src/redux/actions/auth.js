
import { AUTH_SUCCESS, AUTH_LOGOUT } from "./actionsType.js"

export function auth(login, password) {
    return async dispatch => {
        let Users = {
            "Login": login,
            "Password": password
        }
        var json = JSON.stringify(Users);
        var xhr = new XMLHttpRequest();
        xhr.open('POST', "api/users/Authorization");
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.onload = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                let response = JSON.parse(xhr.responseText);
                console.log("Успешен");
                dispatch(authSuccess(response.access_token, response.expiresDate, response.username));
                localStorage.setItem("token", response.access_token);
                localStorage.setItem("userId", response.userId);
                localStorage.setItem("expiresDate", response.expiresDate)
                localStorage.setItem("username", response.username)
            }
            if (xhr.status === 404) {
                alert("Ошибка авторизации")
            }
        }.bind(this);
        xhr.send(json);
    }
}
export function logout() {
    localStorage.removeItem("token", null);
    localStorage.removeItem("userId", null);
    localStorage.removeItem("expiresDate", null);
    localStorage.removeItem("username", "");
    return {
        type: AUTH_LOGOUT
    }
}
export function authSuccess(token, expiresDate, username) {
    return {
        type: AUTH_SUCCESS,
        token: token,
        expiresDate: expiresDate,
        username: username
    }
}