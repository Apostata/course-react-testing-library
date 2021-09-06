# ESList
* Analiza textos estáticos e avisa quebras de sintax
* Analisa apenas o que foi escrito e não o compilado ou o que está em execução
* Bom quando muitos devs estão trabalhando no projeto para manter um padrão
* pega alguns erros como:
  * Usar variavel antes de defini-la
  * importar de um arquivo inexistente

**NOTA: retirar a configuração do eslint do package json**

## Plugins 
extendem o código do lint reforçando as melhores práticas

instalar o `eslint-plugin-testing-library`

## Configurando o eslint com o jest-dom e testing-library
**criando arquivo `.eslintrc.json` na raiz do projeto**
```json
{
    "plugins": [
        "testing-library",
        "jest-dom"
    ],

    "extends": [
        "react-app",
        "react-app/jest",
        // "plugin:testing-library/recommended" não mais necessário
        "plugin:testing-library/react",
        "plugin:jest-dom/recommended"
    ]
}
```


## Configurando VSCode para o linter
add plugin EsLint no vsCode

### Criando uma pasta .vscode na raiz
```json
{
    "eslint.options": {
        "configure":".eslintrc.json"
    },
    "eslint.validate": ["javascript", "javascriptreact"],
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true 
    }
    
}
```