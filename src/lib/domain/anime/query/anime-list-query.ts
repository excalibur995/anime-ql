import { gql, useQuery } from "@apollo/client";
import { MediaList } from "../types/media";

export interface AnimeListQueryResult extends PageResult {
  mediaList: MediaList[];
}

interface Result {
  Page: AnimeListQueryResult;
}

export const ANIME_LIST_QUERY = gql`
  query ($page: Int, $perPage: Int) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
        perPage
      }
      mediaList(type: ANIME) {
        id
        status
        score
        media {
          id
          seasonYear
          coverImage {
            large
            medium
            color
          }
          title {
            userPreferred
          }
        }
      }
    }
  }
`;

export const animelistVariables: Pagination = {
  page: 1,
  perPage: 10,
};

export const useMediaListQuery = (
  variables: Pagination = animelistVariables
) => {
  const result = useQuery<Result>(ANIME_LIST_QUERY, {
    variables,
  });
  return {
    ...result,
  };
};
