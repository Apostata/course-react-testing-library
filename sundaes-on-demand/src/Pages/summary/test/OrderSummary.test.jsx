import {render, screen} from '@testing-library/react'
import {OrderSummary} from '../OrderSummary'
import {OrderDetailsProvider} from '../../../Providers/OrderDetails.provider'

const scoops= new Map()
const toppings= new Map()

scoops.set('Vanilla', '1')
toppings.set('M&Ms', 1)

describe('Order Summary page', ()=>{
    test('Initial render', ()=>{
        render(<OrderSummary/>, {wrapper:OrderDetailsProvider})
        const scoopsSubtotal = screen.getByText('Scoops: $', {exact:false})
        const toppingsSubtotal = screen.getByText('Toppings: $', {exact:false})
        const Total = screen.getByText('Total: $', {exact:false})

        expect(scoopsSubtotal).toHaveTextContent('0.00')
        expect(toppingsSubtotal).toHaveTextContent('0.00')
        expect(Total).toHaveTextContent('0.00')
    })

    test('with order', ()=>{
        render(<OrderDetailsProvider scoops={scoops} toppings={toppings}><OrderSummary/></OrderDetailsProvider>)
        const scoopsSubtotal = screen.getByText('Scoops: $', {exact:false})
        const toppingsSubtotal = screen.getByText('Toppings: $', {exact:false})
        const Total = screen.getByText('Total: $', {exact:false})

        expect(scoopsSubtotal).toHaveTextContent('2.00')
        expect(toppingsSubtotal).toHaveTextContent('1.50')
        expect(Total).toHaveTextContent('3.50')
    })
})