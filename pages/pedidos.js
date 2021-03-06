import React from 'react';
import Layout from '../components/Layout'
import Link from 'next/dist/client/link';

const Pedidos = () => {
    return ( 
        <>
         <Layout>
        <h1 className="text-2xl text-gray-800 font-light">Pedidos</h1>
        <Link href="/nuevopedido">
            <a className="bg-blue-800 py-2 px-5 mt-5 inline-block rounded text-white text-sm hover:bg-gray:800 uppercase font-bold">Nuevo Pedido</a>
        </Link>
        </Layout>
        </>
     );
}
 
export default Pedidos;