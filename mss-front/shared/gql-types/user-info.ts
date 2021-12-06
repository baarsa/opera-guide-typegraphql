import { gql } from "@apollo/client";

export const USER_INFO = gql`
  query UserInfo {
    user {
      name @client
      role @client
    }
  }
`;