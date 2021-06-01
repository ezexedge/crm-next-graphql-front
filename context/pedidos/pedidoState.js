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


    const agregarProducto = productos => {
        dispatch({
            type: SELECCCIONAR_PRODUCTO,
            payload: productos
        })
    }

    

    return (
        <PedidoContext.Provider 
        value={{
        productos: state.productos,
        agregarCliente,
        agregarProducto
        }}
        
        >
            {children}
        </PedidoContext.Provider>
    )
}

export default PedidoState