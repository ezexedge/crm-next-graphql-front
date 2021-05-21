import React from 'react';
import Swal from 'sweetalert2'
import { gql,useMutation } from '@apollo/client'
import Router from 'next/router'
 
const ELIMINAR_CLIENTE = gql`

    mutation eliminarCliente($id: ID!){
        eliminarCliente(id:$id)
    }


`


const OBTENER_CLIENTES_USUARIO = gql`
query obtenerClientesVendedor {
  obtenerClientesVendedor{
    id
    nombre
    apellido
    empresa
    email
  }
}

`


const Cliente = ({cliente}) => {


    const [eliminarCliente] = useMutation(ELIMINAR_CLIENTE,{
        update(cache){
            const {obtenerClientesVendedor} = cache.readQuery({query : OBTENER_CLIENTES_USUARIO})

            cache.writeQuery({
                query: OBTENER_CLIENTES_USUARIO,
                data: {
                    obtenerClientesVendedor: obtenerClientesVendedor.filter(clienteActual => clienteActual.id !== id)
                }
            })
        }
    })


    const {nombre,apellido,empresa,email,id} = cliente


    const confrimarEliminarCliente = id => {

        Swal.fire({
            title: 'Deseas eliminar un cliente?',
            text: "Este cambio es irrreversible!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: 'no Borrar',
            confirmButtonText: 'si Borrar'
          }).then(async (result) => {
            if (result.value) {
               try{

                const {data} = await eliminarCliente({
                    variables: {
                        id
                    }
                })

                console.log('eliminando ......',data)
                Swal.fire(
                  'Borrado!',
                  'Has borrado a un cliente',
                  'success'
                )
               }catch(error){
                console.log(error)
               }
            }
          })


    }


    const editarCliente = () => {
      Router.push({
        pathname: "/editarcliente/[id]",
        query: {id}
      })

    }

    return ( 
        <>

<tr>
                <td className="border px-4 py-2">{nombre} {apellido}</td>
                <td className="border px-4 py-2">{empresa}</td>
                <td className="border px-4 py-2">{email}</td>
                <td className="border px-4 py-2">
                    <button
                    type="button"
                    className="flex justify-center items-center bg-red-800 py-2 px-4 w-full text-white rounded text-xs uppercase font-bold"
                    onClick={ () => confrimarEliminarCliente()}
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
                    onClick={ () => editarCliente()}
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
 
export default Cliente;