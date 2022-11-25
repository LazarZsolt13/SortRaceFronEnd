
export class RegisterUserDto {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    nickName: string;
  
    constructor() {
      this.firstName = '';
      this.lastName = '';
      this.email = '';
      this.password = '';
      this.nickName = '';
    }
  }
  