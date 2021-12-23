import {GetItems } from "../actions/actionsType";

const initialState = {
    status: 0,
    items: null,
    responseMessage: ""
}

export default function requestReducer(state = initialState, action) {
    switch (action.type) {
        case GetItems:
            return {
                ...state, status: action.status, items: action.items, responseMessage: action.responseMessage
            }
        default:
            return state
    }
}