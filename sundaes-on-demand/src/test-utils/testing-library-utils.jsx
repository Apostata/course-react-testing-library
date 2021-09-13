import { render } from "@testing-library/react";
import { OrderDetailsProvider } from "../Providers/OrderDetails.provider";
import { ScoopsAndToppingsProvider } from "../Providers/scoopsAndToppings.provider";

const WithAllProviders = ({children})=>{
    return (
        <OrderDetailsProvider>
            <ScoopsAndToppingsProvider>
                {children}
            </ScoopsAndToppingsProvider>
        </OrderDetailsProvider>
    )
}

const renderWithContexts = (ui, options) =>{
    return render(ui, {wrapper:WithAllProviders, ...options})
}

export * from '@testing-library/react'
export { renderWithContexts as render}