interface RequestUserBody {
    name: string;
    lastName: string;
    password: string;
    passwordConfirm: string;
    token: string;
  }
  
  export interface RequestSignUpClientBody extends RequestUserBody {
    birthDate: Date;
    weight?: string;
    height?: string;
    conditions?: string[];
  }
  
  export interface RequestSignUpTrainerBody extends RequestUserBody {
    birthDate: Date;
  }

  export interface LogInBody {
    email: string;
    password: string;
  }
  