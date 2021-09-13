// import { render , screen, waitFor } from '@testing-library/react'
import { render , screen, waitFor } from '../../../test-utils/testing-library-utils'
import { OrderEntry } from '../OrderEntry'
import { rest } from 'msw'
import { server } from '../../../mocks/server'

const errorText = 'An unexpected error ocurred. Please try again later'
// const error500Text = new RegExp(errorText, 'i')

describe('Order entry', ()=>{
    describe('Ininital render', ()=>{
        test.only('handle errors for scoops and toppings backend routes', async ()=>{
            server.resetHandlers(
                rest.get('http://localhost:3030/scoops', (req, res, ctx)=>{
                    return res(
                        ctx.status(500),
                        ctx.json({
                            errorMessage: errorText,
                        }),
                    )
                }),
                rest.get('http://localhost:3030/toppings', (req, res, ctx)=>{
                    return res(
                        ctx.status(500),
                        ctx.json({
                            errorMessage: errorText,
                        }),
                    )
                })
            )

            render(<OrderEntry/>)
            await waitFor( async ()=> {
                const alerts = await screen.findAllByRole('alert')
                expect(alerts).toHaveLength(2)
            })
        })
    })
})