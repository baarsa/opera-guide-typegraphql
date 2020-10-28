import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  operas: Array<Opera>;
  opera: Opera;
  composers: Array<Composer>;
};


export type QueryOperaArgs = {
  id: Scalars['ID'];
};

export type Opera = {
  __typename?: 'Opera';
  id: Scalars['ID'];
  name: Scalars['String'];
  creationYear: Scalars['Int'];
  author: Composer;
  roles: Array<Role>;
};

export type Composer = {
  __typename?: 'Composer';
  id: Scalars['ID'];
  name: Scalars['String'];
  birthYear: Scalars['Int'];
  operas: Array<Opera>;
};

export type Role = {
  __typename?: 'Role';
  name: Scalars['String'];
  voice: VoiceType;
};

export enum VoiceType {
  Bass = 'Bass',
  Baritone = 'Baritone',
  Tenor = 'Tenor',
  Contralto = 'Contralto',
  Mezzo = 'Mezzo',
  Soprano = 'Soprano'
}

export type Mutation = {
  __typename?: 'Mutation';
  addOpera: Opera;
};


export type MutationAddOperaArgs = {
  data: OperaInput;
};

export type OperaInput = {
  name: Scalars['String'];
  creationYear: Scalars['Int'];
  authorId: Scalars['String'];
  roles: Array<RoleInput>;
};

export type RoleInput = {
  name: Scalars['String'];
  voice: VoiceType;
};

export type Subscription = {
  __typename?: 'Subscription';
  upcomingPerformance: Performance;
};

export type Performance = {
  __typename?: 'Performance';
  id: Scalars['String'];
  opera: Opera;
  performers: Array<Performer>;
  location: Scalars['String'];
  date: Scalars['String'];
};

export type Performer = {
  __typename?: 'Performer';
  name: Scalars['String'];
  voice: VoiceType;
};

export type GetOperaQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetOperaQuery = (
  { __typename?: 'Query' }
  & { opera: (
    { __typename?: 'Opera' }
    & Pick<Opera, 'id' | 'name' | 'creationYear'>
    & { author: (
      { __typename?: 'Composer' }
      & Pick<Composer, 'name'>
    ) }
  ) }
);

export type GetOperaRolesQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetOperaRolesQuery = (
  { __typename?: 'Query' }
  & { opera: (
    { __typename?: 'Opera' }
    & Pick<Opera, 'id'>
    & { roles: Array<(
      { __typename?: 'Role' }
      & Pick<Role, 'name' | 'voice'>
    )> }
  ) }
);

export type GetAllComposersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllComposersQuery = (
  { __typename?: 'Query' }
  & { composers: Array<(
    { __typename?: 'Composer' }
    & Pick<Composer, 'id' | 'name'>
  )> }
);

export type AddOperaMutationVariables = Exact<{
  operaData: OperaInput;
}>;


export type AddOperaMutation = (
  { __typename?: 'Mutation' }
  & { addOpera: (
    { __typename?: 'Opera' }
    & Pick<Opera, 'name'>
  ) }
);


export const GetOperaDocument = gql`
    query GetOpera($id: ID!) {
  opera(id: $id) {
    id
    name
    creationYear
    author {
      name
    }
  }
}
    `;

/**
 * __useGetOperaQuery__
 *
 * To run a query within a React component, call `useGetOperaQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOperaQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOperaQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetOperaQuery(baseOptions?: Apollo.QueryHookOptions<GetOperaQuery, GetOperaQueryVariables>) {
        return Apollo.useQuery<GetOperaQuery, GetOperaQueryVariables>(GetOperaDocument, baseOptions);
      }
export function useGetOperaLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOperaQuery, GetOperaQueryVariables>) {
          return Apollo.useLazyQuery<GetOperaQuery, GetOperaQueryVariables>(GetOperaDocument, baseOptions);
        }
export type GetOperaQueryHookResult = ReturnType<typeof useGetOperaQuery>;
export type GetOperaLazyQueryHookResult = ReturnType<typeof useGetOperaLazyQuery>;
export type GetOperaQueryResult = Apollo.QueryResult<GetOperaQuery, GetOperaQueryVariables>;
export const GetOperaRolesDocument = gql`
    query GetOperaRoles($id: ID!) {
  opera(id: $id) {
    id
    roles {
      name
      voice
    }
  }
}
    `;

/**
 * __useGetOperaRolesQuery__
 *
 * To run a query within a React component, call `useGetOperaRolesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOperaRolesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOperaRolesQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetOperaRolesQuery(baseOptions?: Apollo.QueryHookOptions<GetOperaRolesQuery, GetOperaRolesQueryVariables>) {
        return Apollo.useQuery<GetOperaRolesQuery, GetOperaRolesQueryVariables>(GetOperaRolesDocument, baseOptions);
      }
export function useGetOperaRolesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOperaRolesQuery, GetOperaRolesQueryVariables>) {
          return Apollo.useLazyQuery<GetOperaRolesQuery, GetOperaRolesQueryVariables>(GetOperaRolesDocument, baseOptions);
        }
export type GetOperaRolesQueryHookResult = ReturnType<typeof useGetOperaRolesQuery>;
export type GetOperaRolesLazyQueryHookResult = ReturnType<typeof useGetOperaRolesLazyQuery>;
export type GetOperaRolesQueryResult = Apollo.QueryResult<GetOperaRolesQuery, GetOperaRolesQueryVariables>;
export const GetAllComposersDocument = gql`
    query GetAllComposers {
  composers {
    id
    name
  }
}
    `;

/**
 * __useGetAllComposersQuery__
 *
 * To run a query within a React component, call `useGetAllComposersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllComposersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllComposersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllComposersQuery(baseOptions?: Apollo.QueryHookOptions<GetAllComposersQuery, GetAllComposersQueryVariables>) {
        return Apollo.useQuery<GetAllComposersQuery, GetAllComposersQueryVariables>(GetAllComposersDocument, baseOptions);
      }
export function useGetAllComposersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllComposersQuery, GetAllComposersQueryVariables>) {
          return Apollo.useLazyQuery<GetAllComposersQuery, GetAllComposersQueryVariables>(GetAllComposersDocument, baseOptions);
        }
export type GetAllComposersQueryHookResult = ReturnType<typeof useGetAllComposersQuery>;
export type GetAllComposersLazyQueryHookResult = ReturnType<typeof useGetAllComposersLazyQuery>;
export type GetAllComposersQueryResult = Apollo.QueryResult<GetAllComposersQuery, GetAllComposersQueryVariables>;
export const AddOperaDocument = gql`
    mutation AddOpera($operaData: OperaInput!) {
  addOpera(data: $operaData) {
    name
  }
}
    `;
export type AddOperaMutationFn = Apollo.MutationFunction<AddOperaMutation, AddOperaMutationVariables>;

/**
 * __useAddOperaMutation__
 *
 * To run a mutation, you first call `useAddOperaMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddOperaMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addOperaMutation, { data, loading, error }] = useAddOperaMutation({
 *   variables: {
 *      operaData: // value for 'operaData'
 *   },
 * });
 */
export function useAddOperaMutation(baseOptions?: Apollo.MutationHookOptions<AddOperaMutation, AddOperaMutationVariables>) {
        return Apollo.useMutation<AddOperaMutation, AddOperaMutationVariables>(AddOperaDocument, baseOptions);
      }
export type AddOperaMutationHookResult = ReturnType<typeof useAddOperaMutation>;
export type AddOperaMutationResult = Apollo.MutationResult<AddOperaMutation>;
export type AddOperaMutationOptions = Apollo.BaseMutationOptions<AddOperaMutation, AddOperaMutationVariables>;