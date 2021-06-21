import { useState } from 'react';

type ButtonProps = {
  text?: string;
  children?: string;
};
//para types opcionais usa-se "?" apos a chave

function Button(props: ButtonProps) {
  // let counter = 0;
  let [counter, setCounter] = useState(0);
  const increment = () => {
    setCounter(counter + 1);
  };

  return (
    <>
      <button onClick={increment}>
        {props.text || props.children || 'texto para o botao sem props.text'}
      </button>
      <h2>{counter} clicks</h2>
    </>
  );
}

/* 
*Aqui tenho o as propiedades.
*Elas são recebidas nos parâmetros da função. OBS: as props é um objeto

function Button(props: ButtonProps) {
todo  return <button>props.text</button>; Aqui rederiza o props.text
todo  return <button>{props.text}</button>; Aqui rederiza o que vir do props.text, tornando-o dinamico
}
*/
/* 
o estado e um conceito legal de: qualquer evento provocado pelo user, ira refletir na visualizacao


let [counter, setCounter] = useState(0);
  const increment = () => {
    setCounter(counter + 1);
  };
*/
export { Button };
