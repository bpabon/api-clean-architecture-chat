// datos que se reciben en la solicitud y se envían en la respuesta.
export class LoginUserDto {
    constructor(
      public email: string,
      public password: string,
      public name?: string,
    ) {}
  
    static login( object: { [ key: string ]: any; } ): [ string?, LoginUserDto?] {
      const { email, password } = object;

      if ( !email ) return [ 'email is required' ];
      if ( !password ) return ['Password is required'];  
  
      return [
        undefined,
        new LoginUserDto(email, password)
      ];
    }
    static create( object: { [ key: string ]: any; } ): [ string?, LoginUserDto?] {
      const { email, password,name } = object;

      if ( !email ) return [ 'email is required' ];
      if ( !password ) return ['Password is required'];  
      if ( !name ) return ['Name is required'];  
      return [
        undefined,
        new LoginUserDto(email, password,name)
      ];
    }
  }