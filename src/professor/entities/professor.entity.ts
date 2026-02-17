import { randomUUID } from "node:crypto";
export class Professor {
  constructor(
    private readonly _id: string,
    private readonly _name: string,
    private readonly _cpf: string,
  ) {}

  public get id(): string {
    return this._id;
  }
  public get name(): string {
    return this._name;
  }

  public get cpf(): string {
    return this._cpf;
  }

  public static create(name: string, cpf: string): Professor {
    const id = randomUUID();

    if (!this.validateCPF(cpf)) {
      throw new Error("CPF is invalid");
    }

    return new Professor(id, name, cpf);
  }

  private static validateCPF(input: string): boolean {
    const cpf: string = input.replace(/[^\d]+/g, "");

    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
      return false;
    }

    let soma = 0;
    let resto: number;

    for (let i = 1; i <= 9; i++) {
      soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }

    resto = (soma * 10) % 11;

    if (resto === 10 || resto === 11) {
      resto = 0;
    }

    if (resto !== parseInt(cpf.substring(9, 10))) {
      return false;
    }

    soma = 0;

    for (let i = 1; i <= 10; i++) {
      soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }

    resto = (soma * 10) % 11;

    if (resto === 10 || resto === 11) {
      resto = 0;
    }

    if (resto !== parseInt(cpf.substring(10, 11))) {
      return false;
    }

    return true;
  }
}
