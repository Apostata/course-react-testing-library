/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect } from 'react'
import Option from './Option'
import { Row } from 'react-bootstrap'
import { useScoopContext, ScoopsAndToppingsProvider } from '../../Providers/scoopsAndToppings.provider'
import { useOrderDetailsContext, OrderDetailsProvider } from '../../Providers/OrderDetails.provider'
import AlertBanner from '../../components/AlertBanner'
import { pricePerItem } from '../../constants'
import { formatCurrency } from '../../helpers/formatCurrency'

export function Options({optionsType}){
    const {scoops, getScoops, toppings, getToppings, error} = useScoopContext()   
    const [orderDetails, updateItemCount] = useOrderDetailsContext()
    useEffect(()=>{
        optionsType ==='scoops'? getScoops(): getToppings()
    },[])

    const renderOption = ()=>{
        if(optionsType ==='scoops'){
            return scoops.map((item, idx)=><Option key={`${idx}-${item.name}`} {...item} type="scoop" updateItemCount={(name, count)=>updateItemCount(name, count, "scoops")}/>)
        }
        else{
            return toppings.map((item, idx)=><Option key={`${idx}-${item.name}`} {...item}  type="topping" updateItemCount={(name, count)=>updateItemCount(name, count, "toppings")}/>)
        }
    }

    if(error) return <AlertBanner message={error.message} />
    
    const title = optionsType[0].toUpperCase() + optionsType.slice(1).toLowerCase()

    return(
        <>
            <h2>{title}</h2>
            <p>{formatCurrency(pricePerItem[optionsType])} each</p>
            <p>{title} total: {orderDetails.totals[optionsType]}</p>
            <Row>
                {renderOption()}
            </Row>
        </>
    )

}

export default function WithContext(props){
    const { optionsType } = props
    return (
        <OrderDetailsProvider>
            <ScoopsAndToppingsProvider>
                <Options optionsType={optionsType}/>
            </ScoopsAndToppingsProvider>
        </OrderDetailsProvider>
    )
}