import { render, screen } from '@testing-library/react'
import { OrderDetailsProvider } from '../../../Providers/OrderDetails.provider'
import { ScoopsAndToppingsProvider } from '../../../Providers/scoopsAndToppings.provider'

// import Options from '../Options-bonnie'
import {Options} from '../Options'

const WhithAllProviders = ({children})=>{
    return(
        <OrderDetailsProvider>
            <ScoopsAndToppingsProvider>
                {children}
            </ScoopsAndToppingsProvider>
        </OrderDetailsProvider>
    )
}


describe('Options initial render', ()=>{
    test('Displays image for each scoop option from the server', async ()=>{
        render(<Options optionsType="scoops" />, {wrapper: WhithAllProviders })
        
        const scoopImages = await screen.findAllByRole('img', {name:/scoop$/i})
        expect(scoopImages).toHaveLength(2)
        const altTexts = scoopImages.map(img=>img.alt)
        expect(altTexts).toEqual(['Chocolate scoop', 'Vanilla scoop'])
    })

    test('Displays image for each toppings option from the server', async ()=>{
        render(<Options optionsType="toppings" />, {wrapper:WhithAllProviders})
        const scoopImages = await screen.findAllByRole('img', {name:/topping$/i})
        expect(scoopImages).toHaveLength(3)
        const altTexts = scoopImages.map(img=>img.alt)
        expect(altTexts).toEqual(['Cherries topping', 'M&Ms topping', 'Hot fudge topping'])
    })
})