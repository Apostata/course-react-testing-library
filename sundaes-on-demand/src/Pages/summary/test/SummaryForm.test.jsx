import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SummaryForm from '../SummaryForm'
import { OrderDetailsProvider } from '../../../Providers/OrderDetails.provider'

const termsAnConditionsText = new RegExp('terms and conditions', 'i')
const confirmOrderText = new RegExp('confirm order', 'i')
const popoverText = new RegExp('no ice cream will actually be delivered', 'i')

describe('Sumary form', ()=>{
    describe('Initial render', ()=>{
        test('Terms and conditions checkbox, should initialize unchecked', ()=>{
            render(<SummaryForm/>, {wrapper: OrderDetailsProvider})
            const termsAndConditions = screen.getByRole("checkbox", { name: termsAnConditionsText})
            expect(termsAndConditions).not.toBeChecked()
        })

        test('Confirm order button should initialize disabled', ()=>{
            render(<SummaryForm/>, {wrapper: OrderDetailsProvider})
            const confirmOrderButton = screen.getByRole("button", { name: confirmOrderText})
            expect(confirmOrderButton).toBeDisabled()
        })

        test('Popover starts \'hidden\'', ()=>{
            render(<SummaryForm />, {wrapper: OrderDetailsProvider})
            const nullPopover = screen.queryByText(popoverText)
            expect(nullPopover).not.toBeInTheDocument()
        })
    });

    describe('Events', ()=>{
        test('Terms and conditions checkbox, should toggle enabled/disabeld Confirm order button when clicked', ()=>{
            render(<SummaryForm/>, {wrapper: OrderDetailsProvider})
            const termsAndConditions = screen.getByRole("checkbox", { name: termsAnConditionsText})
            const confirmOrderButton = screen.getByRole("button", { name: confirmOrderText})
            userEvent.click(termsAndConditions)
            expect(confirmOrderButton).toBeEnabled()

            userEvent.click(termsAndConditions)
            expect(confirmOrderButton).toBeDisabled()
        });

        test('Povover appers when mouseover on checkbox label, and disapears when mouseout', async()=>{
            render(<SummaryForm/>, {wrapper: OrderDetailsProvider})
            const termsAndConditionsPopoverText = screen.getByText(termsAnConditionsText)

            userEvent.hover(termsAndConditionsPopoverText)
            const popover =screen.getByText(popoverText)
            expect(popover).toBeInTheDocument();
    
            userEvent.unhover(termsAndConditionsPopoverText)
            
            await waitFor(() => {
                const nullPopover = screen.queryByText(popoverText)
                expect(nullPopover).not.toBeInTheDocument();
            });
        })
    });

    
})