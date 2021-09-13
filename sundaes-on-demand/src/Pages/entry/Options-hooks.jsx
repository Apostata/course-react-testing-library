/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect } from 'react'
import ScoopOption from './scoopOption'
import { Row } from 'react-bootstrap'
import { useImages } from '../../../hooks/useImages'

export default function Options({optionsType}){
    const {images:itens, getImages:getItens} = useImages(optionsType)
    
    useEffect(()=>{
        getItens()
    },[])

    const ItemComponent = optionsType === 'scoops'? ScoopOption : null 

    return(
        <Row>
            {itens.map((item, idx)=><ItemComponent  key={`${idx}-${item.name}`} {...item}/>)}
        </Row>
    )

}