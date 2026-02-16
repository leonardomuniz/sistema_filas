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

    return new Professor(id, name, cpf);
  }
}
