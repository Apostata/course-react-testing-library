import { lazy } from 'react'
const OrderEntry = lazy(()=> import('../Pages/entry/OrderEntry'))
const OrderSumary = lazy(()=>import('../Pages/summary/OrderSummary'))
const ConfirmOrder = lazy(()=> import('../Pages/orderConformation/OrderConformation'))
const NotFound = lazy(()=>import('../Pages/404'))

const routes = [
    {
        path:'/',
        exact:true,
        name:'Home',
        component:OrderEntry
    },
    
    {
        path:'/summary',
        name:'Order Summary',
        component:OrderSumary
    },
    {
        path: '/orderConfirmation',
        name:'Order Confirmation',
        component: ConfirmOrder
    },
    
    {
        name:'Not found 404',
        component:NotFound
    },
]

export default routes