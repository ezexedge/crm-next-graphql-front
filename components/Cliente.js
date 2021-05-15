import React from 'react';
import Swal from 'sweetalert2'

const Cliente = ({cliente}) => {



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
          }).then((result) => {
            if (result.value) {
                console.log('eliminando ......',id)
              Swal.fire(
                'Borrado!',
                'Has borrado a un cliente',
                'success'
              )
            }
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
                    onClick={ () => confrimarEliminarCliente(id)}
                   >
                        Elimnar
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
</svg>

                    </button>
                </td>
                
              </tr>
        </>
     );
}
 
export default Cliente;