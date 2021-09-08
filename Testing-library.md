# React Testing library
* renderiza, pesquisa e interage com componentes no virtual DOM

## Metodos render e screen
.render - cria o virtual DOM
.screen - tem alguns metodos para procurar no virtual DOM

exemplo:
```js
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />); 
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
```
onde render vai criar o virtual dom e screen vai usar o metodo getByText, para encontrar o elemento a ser testado

## Acessibilidade
* Test por acessibilidade:
  * getByRole
  * getByLabelText
  * getByPlaceholderText
  * getByText
  * getByDisplayValue
* Queries semanticas:
  * getByAltText
  * getByTitle
  * getByTestId (só recomendado quando nenhum dos outros estiver presente, pois não é visivel ou audivel pelo usuário)

### Recomendações de acessibilidade
Caso seja um elemento estático que não tem interação, podemos usar o `getByText`, caso seja um link, ai sim ele terá uma role, então melhor seria `getByRole`

## Queries
### Command
1. **get**, espera que o elemento que esteja no DOM:
   * getByRole, = getByRole('role', {...options}), exemplo
     * expect(htmlHelement)`.getByRole('link', {name: /learn react/i}` - Pega o elemento do tipo link de texto 'learn react', not case sensitive
     * veja : https://www.w3.org/TR/wai-aria/#role_definitions para roles de cada elemento do DOM
2. **query**, espera que o elemento que NÃO está no DOM
3. **find**, espera que o elemento apareça asyncrono

Todos comandos tem a opção `all`, que retorna um array, exemplo: `getAllByRole`

### QueryTypes
* Role (preferivel), exemplos: `getByRole`, `getAllByRole`, `findByRole`, `findAllByRole`, `queryByRole` e `queryAllByrole`
* AltText (images)
* Text (display elements)
* Form elements:
  * PlaceHolderText
  * LabelText
  * DisplayValue

* toHaveStyle, exemplo
  * expect(htmlHelement)`.toHaveStyle({ backgroundColor: 'red' })`

Quick reference: https://testing-library.com/docs/react-testing-library/cheatsheet/

## Events
* fireEvents
* userEvents - recomendado userEvent ao inveás de fireEvent para eventos de ações de usuários

### async events
wait for é usado para teste assincronos para quando o elemento leva um certo tempo para responder
exemplo:
```js
test('Povover appers when mouseover on checkbox label, and disapears when mouseout', async()=>{
            render(<SummaryForm/>)
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
```

## Moking server responses
