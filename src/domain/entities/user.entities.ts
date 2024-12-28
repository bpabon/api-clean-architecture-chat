//  Representan los objetos de dominio del negocio.
export class UserEntity {
    constructor(
        public id: number,
        public name: string,
        public email: string,
        public password: string,
        public role: string,
        public recoveryToken: string | null,
        public createdAt?: Date,
        public updatedAt?: Date,
    ) {}
  }
  