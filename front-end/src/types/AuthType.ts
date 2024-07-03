export interface IAuth {
  name?: string;
  password?: string;
  YoB?: number;
  userName?: string;
  avatar?: string;
  isAdmin?: boolean;
}

export interface ILoginResponse {
  status: number;
  token: string;
}

export interface IRegisterResponse {
  success: boolean;
  code: number;
  message: string;
}
