import { Options } from "./Options"
import { ScoopsAndToppingsProvider } from '../../Providers/scoopsAndToppings.provider'
import { useOrderDetailsContext } from "../../Providers/OrderDetails.provider"
import {Row, Col, Button, Form} from 'react-bootstrap'
import { useHistory } from "react-router"

export function OrderEntry(props){
    const history = useHistory()
    const [orderDetails] = useOrderDetailsContext()

    return (
        <ScoopsAndToppingsProvider>
            <Row>
                <Col xs="12">
                    <h1>Sundae App</h1>
                </Col>
            </Row>
            <Row>
                <Col xs="12">
                    <Options optionsType='scoops' />
                </Col>
            </Row>
            <Row>
                <Col xs="12">
                    <Options optionsType='toppings' />
                </Col>
            </Row>
            <Row>
                <Col xs="12">
                    <h2>Grand Total: {orderDetails.totals.total}</h2>
                </Col>
            </Row>
            <Row>
                <Col xs="12">
                    <Form>
                        <Button type="submit" onClick={(e)=>{
                            e.preventDefault()
                            history.push('/summary')
                        }}>
                            Submit Order
                        </Button>
                    </Form>
                </Col>
            </Row>
        </ScoopsAndToppingsProvider>
    )
}

export default OrderEntry