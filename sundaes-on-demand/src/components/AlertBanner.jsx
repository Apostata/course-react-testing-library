import { Alert } from "react-bootstrap";

export default function AlertBanner({message='Ops An error had ocurred!', variant='danger'}){
    return (
        <Alert variant={variant} style={{backgroundColor:'red'}}>{message}</Alert>
    )
}