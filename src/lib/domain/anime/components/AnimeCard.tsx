import { css } from "@emotion/css";
import Image from "next/image";
import { Media } from "../types/media";

type AnimeCardProps = Media;

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
  height: 100%;
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
  font-weight: bold;
  font-size: 20px;
`;

const score = css`
  color: rgb(39 39 42);
`;

const title = css`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;

  @supports (-webkit-line-clamp: 2) {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: initial;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
`;

const AnimeCard = (props: AnimeCardProps) => {
  return (
    <div className={cardContainer}>
      <figure className={figureClass}>
        <Image
          fill
          className={imageClass}
          src={props.coverImage.large}
          alt={props.title?.userPreferred + Math.random().toString()}
          blurDataURL={props.coverImage.medium}
          placeholder="blur"
        />
      </figure>
      <section className={descriptionContainer}>
        <span className={inline}>
          <span title={props.title.userPreferred} className={title}>
            {props.title.userPreferred}
          </span>
          <span>({props.seasonYear})</span>
        </span>

        <span className={titleContainer}>
          &#9733;
          <span className={score}>{props.averageScore}</span>
        </span>
      </section>
    </div>
  );
};

export default AnimeCard;
