import {createEvent, render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {App} from '../App'
import { MemoryRouter as Router} from "react-router-dom";
import { OrderDetailsProvider } from '../Providers/OrderDetails.provider';

const WithWrappersAndRoute = ({children, initialRoute, contextProps={}})=>{
    return (
        <OrderDetailsProvider {...contextProps}>
            <Router initialEntries={initialRoute}>
                {children}
            </Router>
        </OrderDetailsProvider>
    )
}

const renderWithRouterAndcontext = (ui, {initialRoute, contextProps={}}) => {
    return render(ui, { wrapper:(args)=> WithWrappersAndRoute({...args, initialRoute, contextProps})});
};

describe('Making an Order', ()=>{
    test('happy path, Order Entry to OrderSummary', async ()=>{

        renderWithRouterAndcontext(<App/>, {initialRoute:['/']})

        const scoops = await screen.findAllByRole('spinbutton')
        const toppings = await screen.findAllByRole('checkbox')

        const submitOrderButton = screen.getByRole('button', {name:/submit order/i})
                
        expect(scoops).toHaveLength(2)
        expect(toppings).toHaveLength(3)

        userEvent.clear(scoops[0])
        userEvent.type(scoops[0], '1')
        userEvent.click(toppings[0])

        const submitEvent = createEvent.click(submitOrderButton)
        submitEvent.preventDefault = jest.mock()
        userEvent.click(submitOrderButton, submitEvent)
        
        const termsAndConditions = await screen.findByRole("checkbox", { name: /terms and conditions/i})
        expect(termsAndConditions).toBeInTheDocument()              
    })

    test('happy path, OrderSummary to ConfirmOrder', async ()=>{
        const scoops= new Map()
        const toppings= new Map()
        scoops.set('Vanilla', '1')
        toppings.set('M&Ms', 1)

        renderWithRouterAndcontext(<App/>, {initialRoute:['/summary'], contextProps:{scoops, toppings}})
        
        const termsAndConditions = await screen.findByRole("checkbox", { name: /terms and conditions/i})
        const confirmOrderButton = await screen.findByRole("button", {name:/confirm order/i})

        expect(termsAndConditions).toBeInTheDocument()    
        expect(confirmOrderButton).toBeInTheDocument() 
        userEvent.click(termsAndConditions)
        expect(confirmOrderButton).toBeEnabled()
        const submitEvent = createEvent.click(confirmOrderButton)
        submitEvent.preventDefault = jest.mock()
        userEvent.click(confirmOrderButton, submitEvent)

        const thankYou = await screen.findByRole("heading", { name: /thank you!/i})
        const OrderNumber = await screen.findByText(/order number: \d*/i, {exact:false})
        
        expect(thankYou).toBeInTheDocument()              
        expect(OrderNumber).toBeInTheDocument()
             
    })    

    test('happy path, ConfirmOrder back to Order entry', async ()=>{
        const scoops= new Map()
        const toppings= new Map()
        scoops.set('Vanilla', '1')
        toppings.set('M&Ms', 1)

        renderWithRouterAndcontext(<App/>, {initialRoute:['/orderConfirmation'], contextProps:{scoops, toppings}})

        const OrderNumber = await screen.findByText(/order number:/i)
        const createNeworderButton = await screen.findByRole('button', {name:/new order/i})

        expect(OrderNumber).toBeInTheDocument()
        expect(createNeworderButton).toBeInTheDocument()
        const submitEvent = createEvent.click(createNeworderButton)
        submitEvent.preventDefault = jest.mock()
        
        userEvent.click(createNeworderButton, submitEvent)    

        await screen.findByRole('spinbutton', {name:'Vanilla'})
        await screen.findByRole('checkbox', {name:'M&Ms'})

        const scoopsSubtotal = screen.getByText('Scoops total: $', {exact:false}) //partial match
        const toppingsSubtotal = screen.getByText('Toppings total: $', {exact:false}) //partial match
        const grandTotal = screen.getByRole('heading', {name:/grand total: \$/i})

        expect(scoopsSubtotal).toHaveTextContent('0.00')
        expect(toppingsSubtotal).toHaveTextContent('0.00')
        expect(grandTotal).toHaveTextContent('0.00')
    })    
})