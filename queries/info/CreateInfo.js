import { gql } from "@apollo/client";

//mutation (보내기)
export const CREATE_INFO_MUTATION = gql`
  mutation CreateInfo(
    $name: String!
    $version: String!
    $year: Int!
    $maker: String!
  ) {
    createInfo(name: $name, version: $version, year: $year, maker: $maker) {
      id
      name
    }
  }
`;

export const SEND_VIDEO = gql`
  mutation ReceiveVideo(
    $file: Upload!
    $time: String!
    $width: Int!
    $height: Int!
    $collector: String!
    $rivername: String!
  ) {
    receiveVideo(
      file: $file
      time: $time
      width: $width
      height: $height
      collector: $collector
      rivername: $rivername
    ) {
      ok
      error
    }
  }
`;
