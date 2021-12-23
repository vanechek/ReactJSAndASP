import { AUTH_SUCCESS, AUTH_LOGOUT } from "../actions/actionsType";

const initialState = {
    token: null,
    expiresDate: null,
    username: ""
}

export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case AUTH_SUCCESS:
            return {
                token: action.token, expiresDate: action.expiresDate, username: action.username
            }
        case AUTH_LOGOUT:
            return {
                ...state, token: null, username: "", expiresDate: null
            }
        default:
            return state
    }
}