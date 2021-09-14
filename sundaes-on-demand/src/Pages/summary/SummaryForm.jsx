import React from "react";
import {Form, Button, Popover, OverlayTrigger} from 'react-bootstrap'
import { useOrderDetailsContext } from '../../Providers/OrderDetails.provider'
import { useHistory } from 'react-router-dom'

function SummaryForm(){
    const history = useHistory()
    const createOrder = useOrderDetailsContext()[3]
    const [disabledSubmit, setDisabledSubmit] = React.useState(true)

    const popover = (
        <Popover id="popover-basic">
          <Popover.Content>
            No ice cream will actually be delivered
          </Popover.Content>
        </Popover>
    );

    const checkboxLabel = (
        <span>
        I agree with {
        <OverlayTrigger placement="right" overlay={popover}>
            <span style={{color:'blue'}}>Terms and conditions</span>
        </OverlayTrigger>}
    </span>
    )

    return(
        <Form>
           <Form.Group controlId="terms-and-conditions">
                <Form.Check 
                    type="checkbox"
                    onChange={(e)=>{
                        setDisabledSubmit(!e.target.checked)
                    }} 
                    checked={!disabledSubmit}
                    label={checkboxLabel}
                />
            </Form.Group>
            <Button variant="primary" type="submit" disabled={disabledSubmit}
                onClick={(e)=>{
                    e.preventDefault()
                    createOrder({}, false, ()=>{
                        history.push('/orderConfirmation')
                    })
                }}
            >Confirm order</Button>
        </Form>
    )

}

export default SummaryForm