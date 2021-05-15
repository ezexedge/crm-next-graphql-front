import React , {useState} from 'react'
import Layout from '../components/Layout'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import {gql ,useMutation} from '@apollo/client'
import { useRouter } from 'next/router'

const NUEVO_CLIENTE = gql`

    mutation nuevoCliente($input: ClienteInput){
        nuevoCliente(input: $input){
            id
            nombre
            apellido
            empresa
            email
            telefono
        }
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


const NuevoCliente = () => {

    const router = useRouter()
    const [mensaje,guardarMensaje] = useState(null)

    const [nuevoCliente] = useMutation(NUEVO_CLIENTE, {

    update(cache,{data: {nuevoCliente}}){
        //ponemos el valor que aparece en cache que queremos actualizar
        const {obtenerClientesVendedor} = cache.readQuery({ query: OBTENER_CLIENTES_USUARIO })
//reescribimos la cache la cache nunca se puede modificar
        cache.writeQuery({
            query: OBTENER_CLIENTES_USUARIO,
            data : {
                obtenerClientesVendedor :  [...obtenerClientesVendedor , nuevoCliente]
            }
        })
    }
})



    const formik = useFormik({
        initialValues : {
            nombre: '',
            apellido: '',
            empresa: '',
            email: '',
            telefono: ''
        },
        validationSchema: Yup.object({
            nombre : Yup.string()
                        .required('el nombre del cliente es obligatorio'),
            apellido: Yup.string()
                      .required('el apellido del cliente es obligatorio'),
            empresa: Yup.string()
                    .required('el campo empresa es obligatorio'),
            email: Yup.string()
                    .email('el email no es valido')
                    .required('el email del cliente es obligatorio')

        }),
        onSubmit : async valores => {
           // console.log(valores)
            const { nombre, apellido,telefono,empresa,email} = valores

           try{

            const {data} = await nuevoCliente({
                variables : {
                    input: {
                        nombre,
                        apellido,
                        empresa,
                        email,
                        telefono
                    }
                }

            })

            console.log(data)
            router.push('/')
        }catch(error){
            console.log(error) 
            guardarMensaje(error.message.replace('GraphQL error:',''))            
     
            setTimeout(()=>{
                guardarMensaje(null)
            },2000)
        }
    }
    })



    const mostrarMensaje = () => {
        return(
                <div className="bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto">
                    <p>{mensaje}</p>
                </div>
        )
    }


    return ( 
        <Layout>
        <h1 className="text-2xl text-gray-800 font-light">Nuevo cliente</h1>
        {mensaje && mostrarMensaje()}
        <div className="flex justify-center mt-5 ">
            <div className="w-full max-w-lg">
                    <form className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
                    onSubmit={formik.handleSubmit}
                    >



                    <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
                                    Nombre
                                </label>

                                <input
                                className="shadow appearance-none border rounded w-full  py-2 px-3 text-gray-700 leading-tight  focus:outline-none focus:shadow-outline"
                                id="nombre"
                                type="text"
                                placeholder="Nombre cliente"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.nombre}
                               />
                    </div>
                    { formik.touched.nombre && formik.errors.nombre &&
                        
                        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                            <p className="font-bold">Error</p>
                            <p>{formik.errors.nombre}</p>
                        </div>
                        }

                    <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="apellido">
                                    Apellido
                                </label>

                                <input
                                className="shadow appearance-none border rounded w-full  py-2 px-3 text-gray-700 leading-tight  focus:outline-none focus:shadow-outline"
                                id="apellido"
                                type="text"
                                placeholder="Apellido cliente"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.apellido}
                               />
                    </div>
                    { formik.touched.apellido && formik.errors.apellido &&
                        
                        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                            <p className="font-bold">Error</p>
                            <p>{formik.errors.apellido}</p>
                        </div>
                        }


                    <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="empresa">
                                    Nombre de empresa
                                </label>

                                <input
                                className="shadow appearance-none border rounded w-full  py-2 px-3 text-gray-700 leading-tight  focus:outline-none focus:shadow-outline"
                                id="empresa"
                                type="text"
                                placeholder="Empresa cliente"

                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.empresa}
                               />
                    </div>
                    { formik.touched.empresa && formik.errors.empresa &&
                        
                        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                            <p className="font-bold">Error</p>
                            <p>{formik.errors.empresa}</p>
                        </div>
                        }
                    
                    <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                    Email
                                </label>

                                <input
                                className="shadow appearance-none border rounded w-full  py-2 px-3 text-gray-700 leading-tight  focus:outline-none focus:shadow-outline"
                                id="email"
                                type="email"
                                placeholder="email cliente"

                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                               />
                    </div>

                    { formik.touched.email && formik.errors.email &&
                        
                        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                            <p className="font-bold">Error</p>
                            <p>{formik.errors.email}</p>
                        </div>
                        }
                    <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="telefono">
                                    Telofono
                                </label>

                                <input
                                className="shadow appearance-none border rounded w-full  py-2 px-3 text-gray-700 leading-tight  focus:outline-none focus:shadow-outline"
                                id="telefono"
                                type="tel"
                                placeholder="telefono cliente"

                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.telefono}
                               />
                    </div>
                    { formik.touched.telefono && formik.errors.telefono &&
                        
                        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                            <p className="font-bold">Error</p>
                            <p>{formik.errors.telefono}</p>
                        </div>
                        }

                    <input

                        type="submit"
                          className="bg-gray-800 w-full mt-5  p-2 text-white uppercase hover:bg-gray-900"
                        value="registrar cliente"
                    />

                    </form>
            </div>
        </div>
        </Layout>
     );
}
 
export default NuevoCliente;