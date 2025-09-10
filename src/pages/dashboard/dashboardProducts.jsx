import { useGetDashboardProductsQuery } from '@/app/services/products'
import DashboardProductTable from '@/components/dashboardProductTable'
import DashboardTableSkeleton from '@/components/DashboardTableSkeleton'
import React from 'react'

const DashboardProducts = () => {
  return (
    <div>
      {/* <h1>Products</h1> */}
      <DashboardProductTable />
    </div>
  )
}

export default DashboardProducts;