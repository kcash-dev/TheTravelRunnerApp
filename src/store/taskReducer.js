
import { ADD_ITEM, REMOVE_ITEM, ADJUST_NUM_ITEMS } from "./taskTypes";

const initialState = {
    cart: []
}

const taskReducer = ( state =  initialState, action ) => {
    switch (action.type) {
        case ADD_ITEM:
            return {
                ...state,
                cart: [ ...state.cart, {
                    item: action.payload
                } ]
            }
        case REMOVE_ITEM:
            return {
                ...state,
                cart: state.cart.filter(item => item.id != action.payload)
            }
    }
}

export default taskReducer