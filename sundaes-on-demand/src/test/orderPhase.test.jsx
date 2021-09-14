import {createEvent, render, screen, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {App} from '../App'
import { BrowserRouter as Router} from "react-router-dom";
import { OrderDetailsProvider } from '../Providers/OrderDetails.provider';

const WithWrappers = ({children})=>{
    return (
        <OrderDetailsProvider>
            <Router>
                {children}
            </Router>
        </OrderDetailsProvider>
    )
}

const renderWithRouter = (ui, { route = "/" } = {}) => {
    window.history.pushState({}, "entryOrder", route);
    
    return render(ui, { wrapper: WithWrappers});
  };

describe('Making an Order', ()=>{
    test('happy path, Order Entry to OrderSummary', async ()=>{
        renderWithRouter(<App/>, {route:'/'})
        
        await waitFor(async()=>{
            const scoops = screen.getAllByRole('spinbutton')
            const toppings = screen.getAllByRole('checkbox')
            const submitOrderButton = screen.getByRole('button', {name:/submit order/i})
                    
            // Número inicias de scoops e toppings
            expect(scoops).toHaveLength(2)
            expect(toppings).toHaveLength(3)

            // adicionando itens ao pedido
            userEvent.clear(scoops[0])
            userEvent.type(scoops[0], '1')
            userEvent.click(toppings[0])

            // submit order
            const submitEvent = createEvent.click(submitOrderButton)
            submitEvent.preventDefault = jest.mock()
            // screen.debug()
            userEvent.click(submitOrderButton, submitEvent)
            
            // aguarda a mudança de rota e a renderização da página de OrderSummary
            await waitFor(async()=>{ 
                const termsAndConditions = screen.getByRole("checkbox", { name: /terms and conditions/i})
                expect(termsAndConditions).toBeInTheDocument()              
            })
        })       
    })

    test('happy path, OrderSummary to ConfirmOrder', async ()=>{
        const scoops= new Map()
        const toppings= new Map()
        scoops.set('Vanilla', '1')
        toppings.set('M&Ms', 1)
        window.history.pushState({}, "entryOrder", '/summary');

        render(<OrderDetailsProvider scoops={scoops} toppings={toppings}>
            <Router>
                <App/>
            </Router>
        </OrderDetailsProvider>)
        
        await waitFor(async()=>{
            const termsAndConditions = screen.getByRole("checkbox", { name: /terms and conditions/i})
            const confirmOrderButton = screen.getByRole("button", {name:/confirm order/i})
            expect(termsAndConditions).toBeInTheDocument()    
            expect(confirmOrderButton).toBeInTheDocument() 
            userEvent.click(termsAndConditions)
            expect(confirmOrderButton).toBeEnabled()
            const submitEvent = createEvent.click(confirmOrderButton)
            submitEvent.preventDefault = jest.mock()
            userEvent.click(confirmOrderButton, submitEvent)

            await waitFor(async()=>{ 
                const thankYou = screen.getByRole("heading", { name: /thank you!/i})
                expect(thankYou).toBeInTheDocument()              
                const OrderNumber = screen.getByText(/order number: \d*/i, {exact:false})
                expect(OrderNumber).toBeInTheDocument()
            })
        })         
    })    

    test('happy path, ConfirmOrder back to Order entry', async ()=>{
        const scoops= new Map()
        const toppings= new Map()
        scoops.set('Vanilla', '1')
        toppings.set('M&Ms', 1)
        window.history.pushState({}, "entryOrder", '/orderConfirmation');

        render(<OrderDetailsProvider scoops={scoops} toppings={toppings} orderNumber={5444681652}>
            <Router>
                <App/>
            </Router>
        </OrderDetailsProvider>)
        
        
        await waitFor(async()=>{         
            const OrderNumber = screen.getByText(/order number:/i)
            expect(OrderNumber).toBeInTheDocument()
            const createNeworderButton = screen.getByRole('button', {name:/new order/i})
            expect(createNeworderButton).toBeInTheDocument()
            const submitEvent = createEvent.click(createNeworderButton)
            submitEvent.preventDefault = jest.mock()
            
            userEvent.click(createNeworderButton, submitEvent)            
            await waitFor(async()=>{
                screen.getByRole('spinbutton', {name:'Vanilla'})
                screen.getByRole('checkbox', {name:'M&Ms'})
                const scoopsSubtotal = screen.getByText('Scoops total: $', {exact:false}) //partial match
                const toppingsSubtotal = screen.getByText('Toppings total: $', {exact:false}) //partial match
                const grandTotal = screen.getByRole('heading', {name:/grand total: \$/i})
                expect(scoopsSubtotal).toHaveTextContent('0.00')
                expect(toppingsSubtotal).toHaveTextContent('0.00')
                expect(grandTotal).toHaveTextContent('0.00')
            })
        })
    })    
})