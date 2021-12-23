import { GetItems } from "./actionsType";

export function getRequestWithoutParams(url) {
    return async dispatch => {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onload = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                dispatch(getItems(xhr.status, JSON.parse(xhr.responseText), null))
            }
            if (xhr.status !== 200 && xhr.readyState === 4) {
                dispatch(getItems(xhr.status, null, xhr.responseText))
            }
        }.bind(this);
        xhr.send();
    }
}

export function postRequestWithParams(url, key, value) {
    return async dispatch => {
        debugger;
        let acc = {};
        acc[key] = value;
        var json = JSON.stringify(acc);
        var xhr = new XMLHttpRequest();
        xhr.open('POST', url, true);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.onload = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                dispatch(getItems(xhr.status, JSON.parse(xhr.responseText), null))
            }
            if (xhr.status !== 200 && xhr.readyState === 4) {
                dispatch(getItems(xhr.status, null, xhr.responseText))
            }
        }.bind(this);
        xhr.send(json);
    }
}

export function getItems(status, items, responseMessage) {
    return {
        type: GetItems,
        status: status,
        items: items,
        responseMessage: responseMessage
    }
}
