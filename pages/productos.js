import React from 'react';
import Layout from '../components/Layout'
import {gql,useQuery} from '@apollo/client'
import Producto from '../components/Producto';
import Link from 'next/link'



const OBTENER_PRODUCTOS = gql`

    query obtenerProductos{
        obtenerProductos{
            id
            nombre
            precio
            existencia
        }
    }

`

const Productos = () => {

    const {data,loading,error} = useQuery(OBTENER_PRODUCTOS)

    console.log(data)
    if(loading) return 'cargando.....'

    return ( 
        <>
        <Layout>
            <h1 className="text-2xl">productos</h1>


            <Link href="/nuevoproducto">
            <a className="bg-blue-800 py-2 px-5 mt-5 inline-block rounded text-white text-sm hover:bg-gray:800 uppercase font-bold">Nuevo producto</a>
       
            </Link>

            <table className="table-auto shadow-md mt-10 w-full w-lg">
          <thead className="bg-gray-800">
            <tr className="text-white">
              <th className="w-1/5 py-2">Nombre</th>
              <th className="w-1/5 py-2">Existencia</th>
              <th className="w-1/5 py-2">Precio</th>
              <th className="w-1/5 py-2">Eliminar</th>
              <th className="w-1/5 py-2">Editar</th>
         
            </tr>
          </thead>
          <tbody className="bg-white">
            {
            data.obtenerProductos ? (
            
            data.obtenerProductos.map(producto => (
              <Producto
              key={producto.id}
              producto={producto}
              />
            ))
              ) :(
                <tr>
                  <td colspan="3" className="border px-4 py-2 text-center">No tiene clientes asignados</td>
                </tr>
              )
            }
          </tbody>
        </table>
        </Layout>
        </>
     );
}
 
export default Productos;