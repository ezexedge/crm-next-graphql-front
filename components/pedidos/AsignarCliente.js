import React, { useEffect, useState,useContext } from 'react'
import Select from 'react-select';
import {gql ,useQuery} from '@apollo/client'
import PedidoContext from '../../context/pedidos/pedidoContext';



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

const AsignarCliente = () => {

    const [cliente,setCliente] = useState([])

    const pedidoContext = useContext(PedidoContext)

    const {agregarCliente} = pedidoContext

    const {data,loading,error} = useQuery(OBTENER_CLIENTES_USUARIO)


    console.log(data)
    console.log(loading)
    console.log(error)


    useEffect(()=>{
        agregarCliente(cliente)
    },[cliente])


    if(loading)return null
    const {obtenerClientesVendedor} = data

   

    const seleccionarCliente = cliente => {
        setCliente(cliente)
    }




    return ( 
        <>
        <p className="mt-10">1-. Asigna un cliente al pedido</p>
        <Select
        className="mt-3"
       options={ obtenerClientesVendedor }
        isMulti={false}
        onChange={opcion => seleccionarCliente(opcion)}
        getOptionValue={opciones => opciones.id}
        getOptionLabel={opciones => opciones.nombre}
        placeholder="Busque o seleccione un cliente"
        noOptionsMessage={()=> "No hay resultados"}
        />

        </>
     );
}
 
export default AsignarCliente;