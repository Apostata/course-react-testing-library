# TDD (test-driven Development)
Escrever testes antes do código
* testes falham antes de escrever o código

## Unit test
Testa uma unidade de código como um componente

### Quando usa-los?
  - para Funções ou Comportamentos:
    * para cobrir todos os possíveis casos extremos
    * determinar o que falhou no teste funcional
    * são dificeis de manter em refatoração
    * dificil diagnóstico
  
## Integration test
Teste como unidates trabalham em conjunto

## Functional test
Testa um função ou um comportamento do software

## End to end Test (E2E)
use browser e server, (cypress, Selenium)

## Functional testing vs Functional testing

* Unit testing: 
  * isolado, mocka as dependencias, 
  * muito facil de achar falhas
  * não diz muito como o usuário usar seu software
  * costuma quebrar após refatoração de código

* Functional test
  * mais próximo de como um usuário usa o software
  * teste mais robusto, pois o comportamento não muda só o código
  * Mais complicado para debugar quando teste falha
  
## TDD vs BDD
* Testing library encoraja comportamento(BDD) ao invés de Implementação
* Apesar disso, BDD involve vários outros papéis que não só o desenvolvedor, então quando se trata de time, sim
    
## Unit testing functions
Funções separadas do componente
* testar se a lógica é complexa
* usada por mais de um componente
  
## Jest Debugging Tools
No próprio teste, no console. aparecem as opções para  `w` para whating, onde teremos a opção de `p` para digitar uma pattern para encontrar o arquivo que você precisa
podemos usar o `test.only('descrição do teste', ()=>{... função para testar})` para testar somente este teste, ou `test.skip('descrição do teste', ()=>{... função para testar})`, para ignorar os testes marcabos com `skip`

