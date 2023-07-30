import { gql } from "@apollo/client";
import { Media } from "../types/media";

export interface AnimeDetailMedia {
  Media: Media;
}

export const ANIME_DETAIL_QUERY = gql`
  query ($id: Int, $perPage: Int = 9) {
    Media(id: $id, type: ANIME) {
      id
      seasonYear
      bannerImage
      genres
      description
      duration
      averageScore
      status
      popularity
      coverImage {
        large
        medium
        color
      }
      title {
        userPreferred
      }
      episodes
      trailer {
        id
        thumbnail
        site
      }
      characters(perPage: $perPage) {
        nodes {
          id
          image {
            large
            medium
          }
          name {
            userPreferred
          }
        }
      }
    }
  }
`;
