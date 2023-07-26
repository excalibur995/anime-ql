export interface MediaList {
  id: number;
  media: Media;
  status: MediaStatus;
  score: number;
}

export interface Media {
  id: number;
  title: MediaTitle;
  coverImage: CoverImage;
  seasonYear: number;
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

export interface MediaTitle {
  userPreferred: string;
}
