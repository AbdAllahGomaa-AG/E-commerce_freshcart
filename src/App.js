import React from 'react'
import { createBrowserRouter, createHashRouter, RouterProvider, } from "react-router-dom"
import MainLayouts from './Layouts/MainLayouts'
import HomePages from './Pages/HomePages'
import Products from './component/Products/Products'
import ProductDetails from './component/ProductDetails/ProductDetails'
import Registration from './component/Registration/Registration'
import Login from './component/Login/Login'
import { ToastContainer, toast } from 'react-toastify';
import Provider from './context/StoreContext'
import Cart from './component/Cart/Cart'


export default function App() {
  let routs = createHashRouter([
    {
      path: '',
      element: <MainLayouts />,
      children: [
        { index: true, element: <HomePages /> },
        { path: 'Products', element: <Products /> },
        { path: 'productDetails/:id', element: <ProductDetails /> },
        { path: 'Registration', element: <Registration /> },
        { path: 'Login', element: <Login /> },
        { path: 'cart', element: <Cart /> },
      ]
    }
  ])
  return (
    <>
      <ToastContainer theme='colored' />
      <Provider>

        <RouterProvider router={routs} />
      </Provider>
    </>
  )
}
