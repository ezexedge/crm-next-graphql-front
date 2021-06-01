import React, {useReducer} from 'react'
import PedidoContext from './pedidoContext'
import pedidoReducer from './pedidoReducer'


import {
        SELECCCIONAR_CLIENTE,
        SELECCCIONAR_PRODUCTO,
        CANTIDAD_PRODUCTOS,
        ACTUALIZAR_TOTAL
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


    const agregarProducto = productosSeleccionados => {

        let nuevoState;
        if(state.productos.length > 0 ) {
            // Tomar del segundo arreglo, una copia para asignarlo al primero
            nuevoState = productosSeleccionados.map( producto => {
                const nuevoObjeto = state.productos.find( productoState => productoState.id === producto.id  );
                return {...producto, ...nuevoObjeto }
            } )
        } else {
            nuevoState = productosSeleccionados;
        }

        

        dispatch({
            type: SELECCCIONAR_PRODUCTO,
            payload: nuevoState
        })
    }

    const cantidadProducto = nuevoProducto => {
        dispatch({
            type: CANTIDAD_PRODUCTOS,
            payload: productos
        })


    }

    const actualizarTotal = () => {
        dispatch({
            type: ACTUALIZAR_TOTAL
        })
    }

    return (
        <PedidoContext.Provider 
        value={{
        productos: state.productos,
        agregarCliente,
        agregarProducto,
        cantidadProducto,
        actualizarTotal
        }}
        
        >
            {children}
        </PedidoContext.Provider>
    )
}

export default PedidoState