export interface IUser {
  username: string;
  password: string;
  email: string;
  name: string;
  surname: string;
}
export interface IUserId {
  id: string | undefined;
}

export interface IUserLoginDTO {
  email: string;
  password: string;
}

export interface IUserSignInDTO extends IUser {}

export interface IRole {
  role: string | undefined;
}

export interface IUserName {
  username: string | undefined;
}
