import React from 'react'
import Layout from '../../components/Layout';
import { useRouter } from 'next/router';


const EditarProducto = () => {


    const router = useRouter()
    const {query: {id}} = router

    return ( 
        <Layout>
             <h1 className="text-2xl text-gray-800 font-light">Editar producto</h1>
             <div className="flex justify-center mt-5 ">
            <div className="w-full max-w-lg">
                    <form className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
                //   onSubmit={formik.handleSubmit}
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
                          //     onChange={formik.handleChange}
                            //    onBlur={formik.handleBlur}
                            //    value={formik.values.nombre}
                               />
                    </div>

                    {/* formik.touched.nombre && formik.errors.nombre &&
                        
                        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                            <p className="font-bold">Error</p>
                            <p>{formik.errors.nombre}</p>
                        </div>
                    */ }


                    <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="existencia">
                                    Cantidad disponible
                                </label>

                                <input
                                className="shadow appearance-none border rounded w-full  py-2 px-3 text-gray-700 leading-tight  focus:outline-none focus:shadow-outline"
                                id="existencia"
                                type="number"
                                placeholder="Cantidad disponible"
                             //  onChange={formik.handleChange}
                            //    onBlur={formik.handleBlur}
                           //   value={formik.values.existencia}
                               />
                    </div>


                    { /* formik.touched.existencia && formik.errors.existencia &&
                        
                        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                            <p className="font-bold">Error</p>
                            <p>{formik.errors.existencia}</p>
                        </div>
                    */}


                    <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="precio">
                                    Precio
                                </label>

                                <input
                                className="shadow appearance-none border rounded w-full  py-2 px-3 text-gray-700 leading-tight  focus:outline-none focus:shadow-outline"
                                id="precio"
                                type="number"
                                placeholder="precio Producto"
                               // onChange={formik.handleChange}
                              //  onBlur={formik.handleBlur}
                                //value={formik.values.precio}
                               />
                    </div>

                    {/* formik.touched.precio && formik.errors.precio &&
                        
                        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                            <p className="font-bold">Error</p>
                            <p>{formik.errors.precio}</p>
                        </div>
                    */ }


                    <input

                        type="submit"
                          className="bg-gray-800 w-full mt-5  p-2 text-white uppercase hover:bg-gray-900"
                        value="agregar producto"
                    />


                    </form>
                    </div>
                    </div>
       
        </Layout>
     );
}
 
export default EditarProducto;