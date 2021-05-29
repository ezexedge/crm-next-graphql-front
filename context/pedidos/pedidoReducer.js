import {
    SELECCCIONAR_CLIENTE,
    SELECCCIONAR_PRODUCTO,
    CANTIDAD_PRODUCTOS
}from '../../types'

export default (state,action)=> {
    switch(action.type){
        case SELECCCIONAR_CLIENTE:
            return {
                ...state,
                cliente: action.payload
            }
        default:
        return state
    }
}