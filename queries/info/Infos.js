import { gql } from "@apollo/client";

//query (받아오기)
export const INFOS_QUERY = gql`
  query Infos {
    infos {
      id
      name
      maker
      version
      year
      createdAt
      images {
        id
      }
      annotations {
        id
      }
    }
  }
`;
