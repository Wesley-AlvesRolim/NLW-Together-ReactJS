import { Button } from './Components/Button';

function App() {
  return (
    <>
      <Button text='Conteudo do botão 1' />
      <Button text='Conteudo do botão 2' />
      <Button text='Conteudo do botão 3' />
      <Button />
      <Button> Texto children </Button>
    </>
  );
}
/*
<>
  <a href='#exemplo' target='_blank'>
todo  <Button /> é um componente
  </a>
</> 
*/

/* 
todo para atribuir valores as props 
todo faz-se: myProp='valueToThisProp'
todo é bem semelhante aos atributos HTML
function App() {
  return (
    <>
      <Button text='Conteudo do botão 1' />
      <Button text='Conteudo do botão 2' />
      <Button text='Conteudo do botão 3' />
    </>
  );
} */

export default App;
