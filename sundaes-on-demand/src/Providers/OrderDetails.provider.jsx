import { createContext, useContext, useState, useEffect, useMemo } from "react";
import { subtotalCalc } from "../helpers/subtotalCalc";
import { formatCurrency } from "../helpers/formatCurrency";
const OrderDetailsContext = createContext();

export const useOrderDetailsContext = () =>{
    const context = useContext(OrderDetailsContext)
    if(!context){ // se não estiver dentro de um OrderDetailsProvider, gera um erro, se estiver, retorna o context
        throw new Error('Must be used within an OrderDetailsProvider!')
    }

    return context;
}

export const OrderDetailsProvider = (props) =>{
    const [optionCounts, setOptionCounts] = useState({
        scoops: new Map(), // [key, value]
        toppings: new Map()
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
            debugger
            const optionCountsMap = optionCounts[optionType];
            optionCountsMap.set(itemName, parseInt(newItemCount))

            setOptionCounts(newOptionCounts)
        }
        return [{
            ...optionCounts,
            totals
        }, updateItemCount]
    },[optionCounts, totals])

    return <OrderDetailsContext.Provider value={value} {...props} />
}