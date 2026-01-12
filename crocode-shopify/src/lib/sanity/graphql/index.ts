import { ApolloClient, InMemoryCache, gql, createHttpLink } from '@apollo/client';

const httpLink = createHttpLink({
  uri: process.env.SANITY_ENDPOINT,
  headers: {
    Authorization: `Bearer ${process.env.SANITY_TOKEN}`
  }
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export async function fetchGraphQL<T = any>(
  query: string,
  variables?: Record<string, any>,
): Promise<{ data: T; errors: any }> {
  try {
    const { data, errors } = await client.query({
      query: gql(query),
      variables,
    });
    return { data, errors };
  } catch (error: any) {
    console.log(error);
    return { data: null as T, errors: error.message };
  }
}
