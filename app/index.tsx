/* eslint-disable no-unused-expressions */
import { gql } from "@mobilestockweb/graphql-axios-fetcher";

gql`
  query ExampleQuery {
    characters {
      results {
        id
        name
        image
      }
    }
  }
`;
export default function Screen() {
  return <></>;
}
