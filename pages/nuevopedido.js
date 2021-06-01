import React, {useState,useEffect,useContext} from 'react'
import Layout from '../components/Layout';
import AsignarCliente from '../components/pedidos/AsignarCliente';
import AsignarProducto from '../components/pedidos/AsignarProductos';
import ResumenPedido from '../components/pedidos/ResumenPedido';
import Total from '../components/pedidos/Total';


import PedidoContext from '../context/pedidos/pedidoContext';

const NuevoPedido = () => {

    const pedidoContext =  useContext( PedidoContext)

    console.log(pedidoContext)

    return ( 
        <>
        <Layout>
        <h1 className="text-2xl text-gray-800 font-light">Crear Nuevo pedido</h1>

            <div className="flex justify-center mt-5">
                <div className="w-full max-w-lg">
                    <AsignarCliente/>
                    <AsignarProducto/>
                    <ResumenPedido/>
                    <Total/>

                    <button
                        type="button"
                        className={` bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900  `}
                      //  onClick={() => crearNuevoPedido() }

                    >Registrar Pedido</button>
                </div>
            </div>

        </Layout>
        
        </>
     );
}
 
export default NuevoPedido;