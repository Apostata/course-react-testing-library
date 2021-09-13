import { Col, Form, Row} from 'react-bootstrap'

export default function Option({name, imagePath, type, updateItemCount}){
    return(
        <Col xs={type === 'topping'? '4':'6'} sm={type === 'topping'?'2':'3'} style={{textAlign:'center'}}>
            <img style={{width:'75%'}} alt={`${name} ${type}`} src={`http://localhost:3030${imagePath}`} />
            <Form.Group controlId={`${name}-count`} as={Row} style={{marginTop:'10px'}}>
                {type !== 'topping' ?
                    <>
                        <Form.Label column xs={6} style={{textAlign:'right'}} >{name}</Form.Label>
                        <Col xs={5} style={{textAlign:'left'}}>
                            <Form.Control type="number" defaultValue={0} onChange={(e)=>updateItemCount(name, e.target.value)}/>
                        </Col>
                    </>
                    :
                    <Form.Check 
                        type="checkbox" onChange={(e)=>updateItemCount(name, e.target.checked? 1: 0 )} label={name}
                    />
                }
            </Form.Group>
        </Col>
    )

}