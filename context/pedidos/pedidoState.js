import React, {useReducer} from 'react'
import PedidoContext from './pedidoContext'
import pedidoReducer from './pedidoReducer'


import {
        SELECCCIONAR_CLIENTE,
        SELECCCIONAR_PRODUCTO,
        CANTIDAD_PRODUCTOS
}from '../../types'


const PedidoState = ({children}) => {
    const initialState = {
        cliente: {},
        productos: [],
        total: 0
    }

    const [state,dispatch] = useReducer(pedidoReducer,initialState)

    const agregarCliente = cliente => {
        dispatch({
            type: SELECCCIONAR_CLIENTE,
            payload: cliente
        })
    }


    return (
        <PedidoContext.Provider 
        value={{agregarCliente}}
        
        >
            {children}
        </PedidoContext.Provider>
    )
}

export default PedidoState