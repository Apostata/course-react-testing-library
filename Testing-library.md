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
* getByRole, = getByRole('role', {...options}), exemplo
  * expect(htmlHelement)`.getByRole('link', {name: /learn react/i}` - Pega o elemento do tipo link de texto 'learn react', not case sensitive
  * veja : https://www.w3.org/TR/wai-aria/#role_definitions para roles de cada elemento do DOM

* toHaveStyle, exemplo
  * expect(htmlHelement)`.toHaveStyle({ backgroundColor: 'red' })`