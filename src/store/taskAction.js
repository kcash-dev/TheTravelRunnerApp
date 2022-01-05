import { ADD_ITEM, REMOVE_ITEM, ADJUST_NUM_ITEMS } from './taskTypes'

export const addItem = (item) => ({
    type: ADD_ITEM,
    payload: item
})

export const removeItem = (id) => ({
    type: REMOVE_ITEM,
    payload: id
})


export const adjustNumItems = (id) => ({
    type: ADJUST_NUM_ITEMS,
    payload: id
})