# Jest
* por padrão no create-react-app
* Um test runner


## metodo Test
metodo global recebe um nome e uma função
* a função recebe assertions para verificar se o teste passa ou não
* Todo passo testa se não encontrar erro
* pode-se manualmente inserir um `throw newError('mensagem')`, para gerar um erro, mas não é recomendado,

## Assertions
Determina se o teste passa ou não

Exemplo:
```js
expect(linkElement).toBeInDocument()
```
* Expect
o que estiver em expect é o objeto a ser testado, no caso, `linkElement`

* Matcher
O tipo de teste que será feito, no caso, `.toBeInDocument()`, se existe no documento
Matcher pode ou não conter argumentos
exemplos:
```js
expect(element.textContent).toBe('hello')
expect(elementsArray).toHaveLength(7)
```

## jest-dom
* By default in create-react-app
* `src/setupTests.js` importa os jest-dom matchers para estarem disponíveis a aplicação
* são Matcher relacionados ao DOM
  * exemplos: `toBeVisible()` ou `toBeChecked()`

## jest watch mode
Observa apenas por arquivos modificados depois do ultimo commit
