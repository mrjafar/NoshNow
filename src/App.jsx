import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AppLayout } from './components/layout/AppLayout'
import Contact, { contactData } from './pages/Contact/Contact'
import { PlaceOrder } from './pages/PlaceOrder/PlaceOrder'
import Cart from './pages/Cart/Cart'
import { Home } from './pages/Home/Home'


const router = createBrowserRouter([
{
  path:'/',
  element:<AppLayout />,
  children: [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "cart",
      element: <Cart />,
    },
    {
      path: "order",
      element: <PlaceOrder />,
    },
    {
      path: "contact",
      element: <Contact />,
      action: contactData,
    },
  ],
}
])

const App = () => {
  return <RouterProvider router={ router} />
}

export default App
