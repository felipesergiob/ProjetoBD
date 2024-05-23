import { createBrowserRouter } from 'react-router-dom'
import { Home } from './pages/home'
import { Products } from './pages/products'
import { AppLayout } from './components/app-layout'
import { Product } from './pages/product'
import { Checkout } from './pages/checkout'
import { Login } from './pages/login'
import { Orders } from './pages/orders'
import { Favorites } from './pages/favorites'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/products',
        element: <Products />
      },
      {
        path: '/products/:id',
        element: <Product />
      },
      {
        path: '/checkout',
        element: <Checkout />
      },
      {
        path: '/orders',
        element: <Orders />
      },
      {
        path: '/favorites',
        element: <Favorites />
      }
    ]
  },
  {
    path: '/login',
    element: <Login />
  }
])
