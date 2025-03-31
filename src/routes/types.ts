interface RegisterBody {
  nome: string;
  email: string;
  senha: string;
  cpf: string;
}

interface LoginBody {
  email: string;
  senha: string;
}

interface UsersBody extends RegisterBody {
  id: number;
}

export { RegisterBody, LoginBody, UsersBody };
