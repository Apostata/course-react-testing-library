import { createContext, useState, useContext } from 'react'
import { getScoopsOrToppings } from '../services/sundae.service'

// criando contexto
export const ScoopsAndToppingsContext = createContext({})

export const ScoopsAndToppingsProvider = ({children}) =>{
    const [scoops, setScoops] = useState([])
    const [toppings, setToppings] = useState([])
    const [error, setError] = useState(null)

    const getScoops = async (retorno = false) => {
        const resp = await getScoopsOrToppings('scoops')
        if (!retorno) {
            Array.isArray(resp)? setScoops(resp) : setError(resp)
        } else {
          return resp;
        }
        
    }

    const getToppings = async (retorno = false) => {
        const resp = await getScoopsOrToppings('toppings')
        if (!retorno) {
            Array.isArray(resp)? setToppings(resp) : setError(resp)
        } else {
          return resp;
        }
    }

    return (
        <ScoopsAndToppingsContext.Provider value={{scoops, toppings, getScoops, getToppings, error}}>
            {children}
        </ScoopsAndToppingsContext.Provider>
    )
}

export const useScoopContext = ()=>{
    const context = useContext(ScoopsAndToppingsContext)
    if(!context){ // se não estiver dentro de um ScoopsAndToppingsProvider, gera um erro, se estiver, retorna o context
        throw new Error('Must be used within an ScoopsAndToppingsProvider!')
    }

    return context;
}