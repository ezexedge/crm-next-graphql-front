import React , {useState,useEffect,useContext} from 'react'
import Select from 'react-select'
import {gql,useQuery} from '@apollo/client'
import PedidoContext from '../../context/pedidos/pedidoContext'

 

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

const AsignarProducto = () => {


    const [productos,setProductos] = useState([])

    const pedidoContext = useContext(PedidoContext)

    const {agregarProducto} = pedidoContext

    const {data,loading,error} = useQuery(OBTENER_PRODUCTOS)



    useEffect(()=>{

        agregarProducto(productos)

    },[productos])
    //console.log(data)
   // console.log(loading)
    //console.log(error)

    const seleccionarProducto = producto => {

        setProductos(producto)

    }

    if(loading)return null
    
    const {obtenerProductos} =  data

    


    return ( 
        <>
        <p className="mt-10">1-. Selecciona o busca los productos</p>
        <Select
        className="mt-3"
        options={ obtenerProductos }
        isMulti={true }
        onChange={opcion => seleccionarProducto(opcion)}
        getOptionValue={opciones => opciones.id}
        getOptionLabel={opciones => `${opciones.nombre} - ${opciones.existencia} Disponibles`}
        placeholder="Busque o seleccione un productos"
        noOptionsMessage={()=> "No hay resultados"}
        />

        </>
     );
}
 
export default AsignarProducto;

