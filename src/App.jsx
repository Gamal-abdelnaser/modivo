import { Routes, Route } from 'react-router'
import './App.css'
import { Box, Button, HStack, Link, Stack } from "@chakra-ui/react"
import HomePage from './pages'
import About from './pages/About'
import ProductsPage from './pages/Products/Products'
import Nav from './Layouts/navbar'
import Login from './Layouts/Login'
import { Toaster } from './components/ui/toaster'
import AppLayout from './Layouts/appLayout'
import CookieService from './services/CookieService'
import DashboardLayout from './pages/dashboard/DashboardLayout'
import AdminDashboard from './pages/dashboard/AdminDashboard'
import DashboardProductTable from './components/dashboardProductTable'
import DashboardProducts from './pages/dashboard/dashboardProducts'
import { ProductPage } from './pages/Products/ProductPage'
import Checkout from './Layouts/Checkout'
import DashboardOrders from './pages/dashboard/dashboardOrders'
import CustomModal from './Shared/Modal'
import ProductsLayout from './pages/Products/productsLayout'
import InternetConnectionProvider from './Provider/internetConnectionProvider'
// import Navbar from './Layouts/navbar.jsx'
// import * as Chakra from "@chakra-ui/react";

function App() {
  const token = CookieService.get('jwt')

  return (
    <Stack className='app' w="100%" p={0} m={0}>
      <Toaster />
      <Routes>

        <Route path='/' element={<AppLayout />} >
          <Route index element={<HomePage />} />
          <Route path='/products' element={<ProductsLayout />} />
          <Route path='/products/:productId' element={<ProductPage />} />
          <Route path='/about' element={<About />} />
        </Route>

        <Route path='/dashboard' element={<DashboardLayout />} >
          <Route index element={<AdminDashboard />} />
          <Route path='products' element={<DashboardProducts />} />
          <Route path='orders' element={<DashboardOrders />} />
          <Route path='categories' element={<h1>Categories</h1>} />
        </Route>

        <Route path='/login' element={<Login isAuthenticated={token} />} />
        <Route path='/checkout' element={<Checkout />} />

      </Routes>
      {/* <Main/> */}
    </Stack>
  )
}

export default App


// function Main() {
//   return(
//     <div className=''>
//       <ProductsPage/>
//     </div>
//   )
// }