import { useAuthToken } from '@/components/context/auth';
import { TypedDocumentString } from '@/gql/graphql';
import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import request from 'graphql-request';

export function useGraphQL<TResult, TVariables>(
  operationName: string,
  document: TypedDocumentString<TResult, TVariables>,
  ...[variables]: TVariables extends Record<string, never> ? [] : [TVariables]
): UseQueryResult<TResult> {
  const { graphqlToken } = useAuthToken();
  let name = operationName
  let queryKey = [name, variables]
  let queryFn = async ({ queryKey }:{queryKey:any}) =>
    request(
      process.env.NEXT_PUBLIC_OOG_API_ENDPOINT!,
      document.toString(),
      queryKey[1] ? queryKey[1] : undefined,
      {
        Authorization: `Bearer ${graphqlToken}`,
      }
    )

  return useQuery({queryKey, queryFn})
}
