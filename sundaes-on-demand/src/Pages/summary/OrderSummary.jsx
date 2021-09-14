// import {  ScoopsAndToppingsProvider } from '../../Providers/scoopsAndToppings.provider'
import { useOrderDetailsContext } from '../../Providers/OrderDetails.provider'
import {Row, Col} from 'react-bootstrap'
import SummaryForm from './SummaryForm'

export function OrderSummary(props){
    const orderDetails = useOrderDetailsContext()[0]
    
    const renderItems = (type) =>{
        for (const [key, value] of orderDetails[type]){
            return (<li key={`${key}-${type}`}>{key} ({value})</li>)
        }
    }

    return (
        <div>
            <h1>Order Summary</h1>
            <Row>
                <Col xs="12">
                    <h2>Scoops: {orderDetails.totals['scoops']}</h2>
                    <ul>
                        { renderItems('scoops')}
                    </ul>
                </Col>
            </Row>
            <Row>
                <Col xs="12">
                    <h2>Toppings: {orderDetails.totals['toppings']}</h2>
                    <ul>
                        { renderItems('toppings')}
                    </ul>
                </Col>
            </Row>
            <Row>
                <Col xs="12">
                    <h2>Total: {orderDetails.totals.total}</h2>
                </Col>
            </Row>
            <SummaryForm />
        </div>
    )
}

// export default function WithProvider(props){
//     return (
//         <OrderDetailsProvider>
//             <OrderSummary/>
//         </OrderDetailsProvider>
//     )
// }
export default OrderSummary