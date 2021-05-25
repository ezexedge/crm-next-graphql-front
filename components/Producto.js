import React from 'react'
import Swal from 'sweetalert2'
import {gql, useMutation, useQuery} from '@apollo/client'
import Router from 'next/router'

const ELIMINAR_PRODUCTO = gql`

    mutation eliminarProducto($id: ID!){
        eliminarProducto(id: $id)
    }

`

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

const Producto = ({producto}) => {


    const editarProducto = () => {
        Router.push({
            pathname: '/editarproducto/[id]',
            query: {id}
        })

    }

    const {nombre,precio,existencia,id} = producto

    const [eliminarProducto] = useMutation(ELIMINAR_PRODUCTO,{
        update(cache){
            const {obtenerProductos} = cache.readQuery({
                query: OBTENER_PRODUCTOS
            })

            cache.writeQuery({
                query: OBTENER_PRODUCTOS,
                data:{
                    obtenerProductos: obtenerProductos.filter(productoActual => productoActual.id !== id)
                }
            })
        }
    })



    const confirmarEliminarProducto = () => {

        Swal.fire({
            title: 'Deseas eliminar un producto?',
            text: "Este cambio es irrreversible!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: 'no Borrar',
            confirmButtonText: 'si Borrar'
          }).then(async (result) => {
            if (result.value) {

                try{

                    const {data} = await eliminarProducto({
                        variables:{
                            id
                        }
                    })

                    Swal.fire(
                        'Correcto',
                        data.eliminarProducto,
                        'success'
                    )

                    console.log(data)

                }catch(error){  
                    console.log(error)
                }
               

            }
          })


    }


    return ( 
        <>
            <tr>
                <td className="border px-4 py-2">{nombre}</td>

                <td className="border px-4 py-2">{existencia} piezas</td>

                <td className="border px-4 py-2">{precio}</td>

                <td className="border px-4 py-2">
                        <button
                            type="button"
                            className="flex justify-center items-center bg-red-800 py-2 px-4 w-full text-white rounded text-xs uppercase font-bold"
                           onClick={ () => confirmarEliminarProducto()}
                        >
                                Elimnar
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>

                            </button>
                        </td>

                        <td className="border px-4 py-2">
                            <button
                            type="button"
                            className="flex justify-center items-center bg-green-600 py-2 px-4 w-full text-white rounded text-xs uppercase font-bold"
                           onClick={ () => editarProducto()}
                        >
                                Editar
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>

                            </button>
                </td>
            </tr>
        </>
     );
}
 
export default Producto;