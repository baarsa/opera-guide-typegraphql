import { USER_INFO } from "./gql-types/user-info";
import { client } from "./apollo-client-setup";
import jwt_decode from "jwt-decode";

type UserRole = 'admin' | 'viewer' | 'contributor';

export type UserInfo = {
  user: {
    name: string;
    role: UserRole;
  }
}
// Записывает данные пользователя из токена в кэш Apollo
export const setUserInfo = (token: string | null) => {
  if (token === null) {
    client.writeQuery({
      query: USER_INFO,
      data: {
        user: null,
      },
    });
    return;
  }
  const payload = jwt_decode<{ name: string; role: string }>(token);
  client.writeQuery({
    query: USER_INFO,
    data: {
      user: {
        name: payload.name,
        role: payload.role,
      }
    },
  });
}