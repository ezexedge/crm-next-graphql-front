import React , {useContext} from 'react'
import PedidoContext from '../../context/pedidos/pedidoContext';
import ProductoResumen from './ProductoResumen';

const ResumenPedido = () => {

    const pedidoContext = useContext(PedidoContext)
    const {productos} = pedidoContext

    console.log(productos)

    return ( 
            <>
                <p className="mt-10">3-.Ajuste cantidades del producto </p>

                {productos.length > 0 ?

                    <>
                    <p className="mt-5">hay productos</p>

                    {productos.map(producto => (
                        <ProductoResumen
                        key={producto.id}
                        producto={producto}
                        />
                    ))}
                    </>
                    :
                    <>
                    <p className="mt-5">no hay productos</p>
                    </>

                    
            }
  
            </>
     );
}
 
export default ResumenPedido;