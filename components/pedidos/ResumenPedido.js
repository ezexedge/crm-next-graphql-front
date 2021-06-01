import React , {useContext} from 'react'
import PedidoContext from '../../context/pedidos/pedidoContext';


const ResumenPedido = () => {

    const pedidoContext = useContext(PedidoContext)
    const {agregarProducto} = pedidoContext
    return ( 
            <>
                <p className="mt-10">3-.Ajuste cantidades del producto </p>
  
            </>
     );
}
 
export default ResumenPedido;