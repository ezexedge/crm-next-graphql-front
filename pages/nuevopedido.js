import React, {useState,useEffect,useContext} from 'react'
import Layout from '../components/Layout';
import AsignarCliente from '../components/pedidos/AsignarCliente';
import AsignarProducto from '../components/pedidos/AsignarProductos';


import PedidoContext from '../context/pedidos/pedidoContext';

const NuevoPedido = () => {

    const pedidoContext =  useContext( PedidoContext)

    console.log(pedidoContext)

    return ( 
        <>
        <Layout>
        <h1 className="text-2xl text-gray-800 font-light">Crear Nuevo pedido</h1>


        <AsignarCliente/>
        <AsignarProducto/>
        </Layout>
        
        </>
     );
}
 
export default NuevoPedido;