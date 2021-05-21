import Head from 'next/head'
import Layout from '../components/Layout'
import Cliente from '../components/Cliente'
import {gql,useQuery} from '@apollo/client'
import {useRouter} from 'next/router'
import Link from 'next/link'

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

export default function Index() {
 
  const {data,loading,client} = useQuery(OBTENER_CLIENTES_USUARIO)
  
  const router = useRouter()

  if(loading) return 'cargando.......'

  if (!data.obtenerClientesVendedor) {
    client.clearStore();
    router.push('/login');
    return <p>Loading...</p>;
  }
 

  return (
    <>
         <Layout>
        <h1 className="text-2xl text-gray-800 font-light">Clientes</h1>
        <Link href="/nuevocliente">
            <a className="bg-blue-800 py-2 px-5 mt-5 inline-block rounded text-white text-sm hover:bg-gray:800 uppercase font-bold">Nuevo cliente</a>
        </Link>
 
        <table className="table-auto shadow-md mt-10 w-full w-lg">
          <thead className="bg-gray-800">
            <tr className="text-white">
              <th className="w-1/5 py-2">Nombre</th>
              <th className="w-1/5 py-2">Empresa</th>
              <th className="w-1/5 py-2">Email</th>
              <th className="w-1/5 py-2">Eliminar</th>
              <th className="w-1/5 py-2">Editar</th>
         
            </tr>
          </thead>
          <tbody className="bg-white">
            {
            data.obtenerClientesVendedor ? (
            
            data.obtenerClientesVendedor.map(cliente => (
              <Cliente
              key={cliente.id}
              cliente={cliente}
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
    )
}
