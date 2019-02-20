export class User {
  id: number;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
}
export interface LoginUser {
  userName: string;
  password: string;
  loginStatus: boolean;
}
export interface CurrentUser {
  castgc: string;
  firstName: string;
  identityId: string;
  authorizedResource: Array<UserAutorizeProduct>;
  lastName: string;
  locale: string;
  loginStatus?: boolean;
  name: string;
  password?: string;
  timeZone: string;
  title: string;
  token: string;
  userName: string;
}
export interface UserAutorizeProduct {
  expiryDate: string;
  hasAccess: boolean;
  moduleId: string | number;
  productId: string | number;

}
