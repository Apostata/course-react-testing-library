import { useEffect, useState } from 'react'
import axios from 'axios' // mudar para um context depois
import ScoopOption from './scoopOption'
import { Row } from 'react-bootstrap'



export default function Options({optionsType}){
    const [itens, setItens] = useState([])
    useEffect(()=>{
        axios.get(`http://localhost:3030/${optionsType}`)
            .then((resp)=>{
                setItens(resp.data)
            })
            .catch((e)=>console.log(e))
    },[optionsType])

    const ItemComponent = optionsType === 'scoops'? ScoopOption : null 

    return(
        <Row>
            {itens.map((item, idx)=><ItemComponent  key={`${idx}-${item.name}`} {...item}/>)}
        </Row>
    )

}