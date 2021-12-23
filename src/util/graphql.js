import gql from "graphql-tag"

export const FETCH_ITEMS_QUERY = gql`
  {
    getItems {
      id
      name
      price
      condition
      createdAt
      description
      images {
        id
        downloadUrl
      }
      bookmarkedBy {
        id
        userId
        createdAt
      }
      user {
        id
        address {
          cityName
        }
        seller {
          username
        }
      }
    }
  }
`;