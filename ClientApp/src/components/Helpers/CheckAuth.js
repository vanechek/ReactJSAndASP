import React from "react";

export function CheckAuth(props) {
    if (props.token || localStorage.getItem("token")) {
        return true
    }
    return false

}
