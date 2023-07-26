import { css } from "@emotion/css";
import Image from "next/image";
import { MediaList } from "../types/media";

type AnimeCardProps = MediaList;

const figureClass = css`
  position: relative;
  aspect-ratio: 1 / 1;
  border-radius: 0.75rem;
`;

const imageClass = css`
  object-fit: cover;
  object-position: top;
  border-radius: 0.75rem;
`;

const cardContainer = css`
  position: relative;
  overflow: hidden;
  border-radius: 0.75rem;
  border: 1px solid #efefef;
  padding: 0.5rem;
  color: #000000;
  transition: all 0.2s;

  &:hover {
    background-color: #f0f1f3;
  }
`;

const descriptionContainer = css`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 0.125rem 0;
`;

const titleContainer = css`
  display: inline-flex;
  gap: 0.125rem;
  align-items: center;
  color: rgb(234 179 8);
`;

const inline = css`
  display: inline-block;
`;

const score = css`
  color: rgb(39 39 42);
`;

const title = css`
  text-transform: capitalize;
  overflow: hidden;
  display: -webkit-box !important;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const AnimeCard = (props: AnimeCardProps) => {
  return (
    <div className={cardContainer}>
      <figure className={figureClass}>
        <Image
          fill
          className={imageClass}
          src={props.media.coverImage.large}
          alt={props.media.title?.userPreferred + Math.random().toString()}
          blurDataURL={props.media.coverImage.medium}
          placeholder="blur"
        />
      </figure>
      <section className={descriptionContainer}>
        <span className={inline}>
          <span title={props.media.title.userPreferred} className={title}>
            {props.media.title.userPreferred}
          </span>
          ({props.media.seasonYear})
        </span>

        <span className={titleContainer}>
          &#9733;
          <span className={score}>{props.score}</span>
        </span>
      </section>
    </div>
  );
};

export default AnimeCard;
