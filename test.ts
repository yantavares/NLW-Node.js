interface Dados {
  id: string;
  name: string;
}

function cadastrarUser({ id, name }: Dados) {
  console.log(id, name);
}

class Cadastro {
  print(dados: Dados) {
    cadastrarUser(dados);
  }
}
