//um exemplo, mostrar uma messagem para o usuário
//com o nome dele, a UF e a cidade.
/*
 * function showWelcome(user) {
 *  return `Welcome ${user.name}`;
 * }
 */

//Mas  se fosse recebesse essa informações por uma API
// q eu nn desenvolvi?
// no Js a primeira coisa que vem a cabeça é o console.log()
// mas o Ts consegue "prever" os dados que estão vindo
// além disso, com Ts se espera certos valores, então, evita erros. Obrigando a receber a typagem

type User = {
  name: string;
  address: {
    city: string;
    uf: string;
  };
};

function showWelcome(user: User) {
  return `Welcome ${user.name} from ${user.address.city}-${user.address.uf}`;
}

//!showWelcome({ name: 'wesley', address: 'endereço' });
//acima o ts fica acusando o erro

showWelcome({
  name: 'Wesley',
  address: {
    city: 'Fortaleza',
    uf: 'CE',
  },
});

//Acima o ts me ajuda no autocomple a saber o que está disponível de dados.
//Evitando erros.
