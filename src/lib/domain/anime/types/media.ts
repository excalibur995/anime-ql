export interface MediaList {
  id: number;
  media: Media;
  status: MediaStatus;
  score: number;
}

export interface Trailer {
  id: string;
  thumbnail: string;
  site: string;
}

export interface Media {
  id: string;
  seasonYear: number;
  bannerImage: string;
  genres: string[];
  description: string;
  duration: number;
  averageScore: number;
  popularity: number;
  status: string;
  coverImage: CoverImage;
  title: Title;
  episodes: number;
  trailer: Trailer;
  characters: {
    nodes: Character[];
    pageInfo: PageInfo;
  };
}

export interface CoverImage {
  large: string;
  medium: string;
  color: string;
}

export type MediaStatus =
  | "CURRENT"
  | "PLANNING"
  | "COMPLETED"
  | "DROPPED"
  | "PAUSED"
  | "REPEATING";

interface Title {
  userPreferred: string;
}

interface Image {
  large: string;
  medium: string;
}

interface Character {
  id: string;
  image: Image;
  name: Title;
}
