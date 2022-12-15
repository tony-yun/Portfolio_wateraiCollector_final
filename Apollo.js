import { ApolloClient, InMemoryCache } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";

export const client = new ApolloClient({
  link: createUploadLink({ uri: "http://121.165.160.16:4000/graphql" }),
  cache: new InMemoryCache(),
});
//previous:
// export const client = new ApolloClient({
//   uri: "http://121.165.160.16:4000/graphql",
//   cache: new InMemoryCache(),
// });
