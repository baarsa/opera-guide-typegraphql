import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Composer = {
  __typename?: 'Composer';
  id: Scalars['ID'];
  name: Scalars['String'];
  nickname: Scalars['String'];
  birthYear: Scalars['Int'];
  operas: Array<Opera>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addOpera: Opera;
  resetOperas: Scalars['String'];
};


export type MutationAddOperaArgs = {
  data: OperaInput;
};

export type Opera = {
  __typename?: 'Opera';
  id: Scalars['ID'];
  name: Scalars['String'];
  creationYear: Scalars['Int'];
  author: Composer;
  roles: Array<Role>;
};

export type OperaInput = {
  name: Scalars['String'];
  creationYear: Scalars['Int'];
  authorId: Scalars['String'];
  roles: Array<RoleInput>;
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

export type Query = {
  __typename?: 'Query';
  operas: Array<Opera>;
  opera: Opera;
  composers: Array<Composer>;
};


export type QueryOperaArgs = {
  id: Scalars['ID'];
};

export type Role = {
  __typename?: 'Role';
  name: Scalars['String'];
  voice: VoiceType;
};

export type RoleInput = {
  name: Scalars['String'];
  voice: VoiceType;
};

export type Subscription = {
  __typename?: 'Subscription';
  upcomingPerformance: Performance;
};

export enum VoiceType {
  Bass = 'Bass',
  Baritone = 'Baritone',
  Tenor = 'Tenor',
  Contralto = 'Contralto',
  Mezzo = 'Mezzo',
  Soprano = 'Soprano'
}

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
    & Pick<Opera, 'id' | 'name'>
    & { author: (
      { __typename?: 'Composer' }
      & Pick<Composer, 'name'>
    ) }
  ) }
);

export type PerformanceSubscriptionSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type PerformanceSubscriptionSubscription = (
  { __typename?: 'Subscription' }
  & { upcomingPerformance: (
    { __typename?: 'Performance' }
    & Pick<Performance, 'location' | 'date'>
    & { opera: (
      { __typename?: 'Opera' }
      & Pick<Opera, 'name'>
      & { author: (
        { __typename?: 'Composer' }
        & Pick<Composer, 'name'>
      ) }
    ), performers: Array<(
      { __typename?: 'Performer' }
      & Pick<Performer, 'name'>
    )> }
  ) }
);

export type GetAllOperasQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllOperasQuery = (
  { __typename?: 'Query' }
  & { operas: Array<(
    { __typename?: 'Opera' }
    & Pick<Opera, 'id' | 'name'>
    & { author: (
      { __typename?: 'Composer' }
      & Pick<Composer, 'name'>
    ) }
  )> }
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
export function useGetOperaQuery(baseOptions: Apollo.QueryHookOptions<GetOperaQuery, GetOperaQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOperaQuery, GetOperaQueryVariables>(GetOperaDocument, options);
      }
export function useGetOperaLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOperaQuery, GetOperaQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOperaQuery, GetOperaQueryVariables>(GetOperaDocument, options);
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
export function useGetOperaRolesQuery(baseOptions: Apollo.QueryHookOptions<GetOperaRolesQuery, GetOperaRolesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOperaRolesQuery, GetOperaRolesQueryVariables>(GetOperaRolesDocument, options);
      }
export function useGetOperaRolesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOperaRolesQuery, GetOperaRolesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOperaRolesQuery, GetOperaRolesQueryVariables>(GetOperaRolesDocument, options);
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllComposersQuery, GetAllComposersQueryVariables>(GetAllComposersDocument, options);
      }
export function useGetAllComposersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllComposersQuery, GetAllComposersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllComposersQuery, GetAllComposersQueryVariables>(GetAllComposersDocument, options);
        }
export type GetAllComposersQueryHookResult = ReturnType<typeof useGetAllComposersQuery>;
export type GetAllComposersLazyQueryHookResult = ReturnType<typeof useGetAllComposersLazyQuery>;
export type GetAllComposersQueryResult = Apollo.QueryResult<GetAllComposersQuery, GetAllComposersQueryVariables>;
export const AddOperaDocument = gql`
    mutation AddOpera($operaData: OperaInput!) {
  addOpera(data: $operaData) {
    id
    name
    author {
      name
    }
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddOperaMutation, AddOperaMutationVariables>(AddOperaDocument, options);
      }
export type AddOperaMutationHookResult = ReturnType<typeof useAddOperaMutation>;
export type AddOperaMutationResult = Apollo.MutationResult<AddOperaMutation>;
export type AddOperaMutationOptions = Apollo.BaseMutationOptions<AddOperaMutation, AddOperaMutationVariables>;
export const PerformanceSubscriptionDocument = gql`
    subscription PerformanceSubscription {
  upcomingPerformance {
    opera {
      name
      author {
        name
      }
    }
    performers {
      name
    }
    location
    date
  }
}
    `;

/**
 * __usePerformanceSubscriptionSubscription__
 *
 * To run a query within a React component, call `usePerformanceSubscriptionSubscription` and pass it any options that fit your needs.
 * When your component renders, `usePerformanceSubscriptionSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePerformanceSubscriptionSubscription({
 *   variables: {
 *   },
 * });
 */
export function usePerformanceSubscriptionSubscription(baseOptions?: Apollo.SubscriptionHookOptions<PerformanceSubscriptionSubscription, PerformanceSubscriptionSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<PerformanceSubscriptionSubscription, PerformanceSubscriptionSubscriptionVariables>(PerformanceSubscriptionDocument, options);
      }
export type PerformanceSubscriptionSubscriptionHookResult = ReturnType<typeof usePerformanceSubscriptionSubscription>;
export type PerformanceSubscriptionSubscriptionResult = Apollo.SubscriptionResult<PerformanceSubscriptionSubscription>;
export const GetAllOperasDocument = gql`
    query GetAllOperas {
  operas {
    id
    name
    author {
      name
    }
  }
}
    `;

/**
 * __useGetAllOperasQuery__
 *
 * To run a query within a React component, call `useGetAllOperasQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllOperasQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllOperasQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllOperasQuery(baseOptions?: Apollo.QueryHookOptions<GetAllOperasQuery, GetAllOperasQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllOperasQuery, GetAllOperasQueryVariables>(GetAllOperasDocument, options);
      }
export function useGetAllOperasLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllOperasQuery, GetAllOperasQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllOperasQuery, GetAllOperasQueryVariables>(GetAllOperasDocument, options);
        }
export type GetAllOperasQueryHookResult = ReturnType<typeof useGetAllOperasQuery>;
export type GetAllOperasLazyQueryHookResult = ReturnType<typeof useGetAllOperasLazyQuery>;
export type GetAllOperasQueryResult = Apollo.QueryResult<GetAllOperasQuery, GetAllOperasQueryVariables>;