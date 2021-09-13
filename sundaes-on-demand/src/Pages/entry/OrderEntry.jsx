import { Options } from "./Options"
import { ScoopsAndToppingsProvider } from '../../Providers/scoopsAndToppings.provider'
import { OrderDetailsProvider, useOrderDetailsContext } from "../../Providers/OrderDetails.provider"

export function OrderEntry(){
    const [orderDetails] = useOrderDetailsContext()

    return (
        <div>
            <Options optionsType='scoops' />
            <Options optionsType='toppings' />
            <h2>Grand Total: {orderDetails.totals.total}</h2>
        </div>
    )
}

export default function WithContext (props){
    return(
        <OrderDetailsProvider>
            <ScoopsAndToppingsProvider>
                <OrderEntry />
            </ScoopsAndToppingsProvider>
        </OrderDetailsProvider>
    )
}