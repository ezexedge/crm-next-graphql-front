import React from 'react'
import Layout from '../../components/Layout';
import { useRouter } from 'next/router';
import {gql, useQuery,useMutation} from '@apollo/client'
import {Formik} from 'formik'
import * as Yup from 'Yup'
import Swal from 'sweetalert2';


const OBTENER_PRODUCTO =  gql`

        query obtenerProducto($id: ID!){
            obtenerProducto(id:$id){
                nombre
                precio
                existencia
            }
        }

`

const ACTUALIZAR_PRODUCTO = gql`

        mutation actualizarProducto($id:ID! , $input: ProductoInput){
            actualizarProducto(id:$id,input:$input){
                id
                nombre
                existencia
                precio
            }
        }

`


const EditarProducto = () => {


    const router = useRouter()
    const {query: {id}} = router

    const {data,loading,error} = useQuery(OBTENER_PRODUCTO,{
        variables: {
            id
        }
    })


const [actualizarProducto] = useMutation(ACTUALIZAR_PRODUCTO)
   



    const schemaValidacion =  Yup.object({
        nombre : Yup.string()
                    .required('el nombre del producto es obligatorio'),
        existencia: Yup.number()
                        .required('Agrega la cantidad disponible')
                        .positive('No se aceptan numero negativos')
                        .integer('La existencia deben ser numero enteros'),
        precio: Yup.number()
                    .required('El precio es obligatiorio')
                    .positive('No se aceptan numeros negativos')
    })



    if(loading)return 'cargando....'

    if(!data) return 'accion no permitida '

    const actualizarInformacion = async valores => {


       // console.log(valores)
        
       const {nombre,existencia,precio} = valores
        try{

            const {data} = await actualizarProducto({
                variables : {
                    id,
                    input: {
                        nombre,
                        existencia,
                        precio
                    }
                }
            })
            console.log('respues actualizacion',data)

            router.push('/productos')

            Swal.fire(
                
                'Correcto',
                'el producto se modifico correctamente',
                'success'

                )



        }catch(error){

        }
    }

   const {obtenerProducto} = data

   


    console.log(data)
   // console.log(loading)
   // console.log(error)

    

    return ( 
        <Layout>
             <h1 className="text-2xl text-gray-800 font-light">Editar producto</h1>
             <div className="flex justify-center mt-5 ">
            <div className="w-full max-w-lg">


                <Formik

                    enableReinitialize
                    initialValues={obtenerProducto}
                    validationSchema={schemaValidacion}
                    onSubmit={valores => {

                        actualizarInformacion(valores)

                    }}



                >

                    {props => {
                    return(


                    <form className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
                   onSubmit={props.handleSubmit}
                    >



                    <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
                                    Nombre
                                </label>

                                <input
                                className="shadow appearance-none border rounded w-full  py-2 px-3 text-gray-700 leading-tight  focus:outline-none focus:shadow-outline"
                                id="nombre"
                                type="text"
                                placeholder="Nombre Producto"
                               onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.nombre}
                               />
                    </div>

                    { props.touched.nombre && props.errors.nombre &&
                        
                        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                            <p className="font-bold">Error</p>
                            <p>{props.errors.nombre}</p>
                        </div>
                     }


                    <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="existencia">
                                    Cantidad disponible
                                </label>

                                <input
                                className="shadow appearance-none border rounded w-full  py-2 px-3 text-gray-700 leading-tight  focus:outline-none focus:shadow-outline"
                                id="existencia"
                                type="number"
                                placeholder="Cantidad disponible"
                               onChange={props.handleChange}
                              onBlur={props.handleBlur}
                              value={props.values.existencia}
                               />
                    </div>


                    {  props.touched.existencia && props.errors.existencia &&
                        
                        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                            <p className="font-bold">Error</p>
                            <p>{props.errors.existencia}</p>
                        </div>
                    }


                    <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="precio">
                                    Precio
                                </label>

                                <input
                                className="shadow appearance-none border rounded w-full  py-2 px-3 text-gray-700 leading-tight  focus:outline-none focus:shadow-outline"
                                id="precio"
                                type="number"
                                placeholder="precio Producto"
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.precio}
                               />
                    </div>

                    { props.touched.precio && props.errors.precio &&
                        
                        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                            <p className="font-bold">Error</p>
                            <p>{props.errors.precio}</p>
                        </div>
                     }


                    <input

                        type="submit"
                          className="bg-gray-800 w-full mt-5  p-2 text-white uppercase hover:bg-gray-900"
                        value="agregar producto"
                    />


                    </form>

                )}}
                    </Formik>
                    </div>
                    </div>
       
        </Layout>
     );
}
 
export default EditarProducto;