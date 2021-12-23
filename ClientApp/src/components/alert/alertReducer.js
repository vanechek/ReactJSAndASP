import { SHOW_ALERT, HIDE_ALERT } from "../../redux/actions/actionsType"

export const alertReducer = (state, action) => {
    debugger;
    switch (action.type) {
        case SHOW_ALERT:
            return action.payload
        case HIDE_ALERT:
            return null
        default: return state
    }
}