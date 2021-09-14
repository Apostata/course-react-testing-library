import { createContext, useContext, useState, useEffect, useMemo } from "react";
import { subtotalCalc } from "../helpers/subtotalCalc";
import { formatCurrency } from "../helpers/formatCurrency";
import { postOrder } from '../services/sundae.service'

export const OrderDetailsContext = createContext();

export const useOrderDetailsContext = () =>{
    const context = useContext(OrderDetailsContext)
    if(!context){ // se não estiver dentro de um OrderDetailsProvider, gera um erro, se estiver, retorna o context
        throw new Error('Must be used within an OrderDetailsProvider!')
    }

    return context;
}

export const OrderDetailsProvider = (props) =>{
    const {children, ...newProps} = props
    const [orderNumber, setOrderNumber] = useState(props?.orderNumber || null)
    const [optionCounts, setOptionCounts] = useState({
        scoops: props?.scoops || new Map(), // [key, value]
        toppings: props?.toppings || new Map()
    })

    const zeroCurrency = formatCurrency(0)

    const [totals, setTotals] = useState({
        scoops:zeroCurrency,
        toppings:zeroCurrency,
        total:zeroCurrency
    })

    useEffect(()=>{
        const scoopsSubtotal = subtotalCalc('scoops', optionCounts)
        const toppingsSubtotal = subtotalCalc('toppings', optionCounts)
        const total = scoopsSubtotal + toppingsSubtotal
        setTotals({
            scoops: formatCurrency(scoopsSubtotal),
            toppings:formatCurrency(toppingsSubtotal),
            total: formatCurrency(total)
        })
    },[optionCounts])

    const value = useMemo(()=>{
        function updateItemCount(itemName, newItemCount, optionType){
            const newOptionCounts = {...optionCounts }
            const optionCountsMap = optionCounts[optionType];
            optionCountsMap.set(itemName, parseInt(newItemCount))

            setOptionCounts(newOptionCounts)
        }

        function resetOrder(){
            setOptionCounts({
                scoops: new Map(),
                toppings: new Map()
            })
            setOrderNumber(null)
        }

        const createOrder = async (data, retorno = false, callback=null) => {
            const resp = await postOrder(data)
            if (!retorno) {
                setOrderNumber(resp.orderNumber)
                if(callback && typeof callback === 'function'){
                    callback()
                }

            } else {
              return resp;
            }
            
        };

        return [{
            ...optionCounts,
            totals,
            orderNumber
        }, updateItemCount, resetOrder, createOrder]
    },[optionCounts, totals, orderNumber])

    return <OrderDetailsContext.Provider value={value} {...newProps} >{children}</OrderDetailsContext.Provider>
}