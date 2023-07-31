import Column from "@/components/common/Column";
import { formatter } from "@/lib/utils/utils";
import { breakpoints, container } from "@/styles/global";
import styled from "@emotion/styled";
import htmr from "htmr";
import Image from "next/image";
import { PropsWithChildren, useRef } from "react";
import { RxClock } from "react-icons/rx";

import Modal, { ModalHandle } from "@/components/common/Modal";
import { BsBookmarkStarFill, BsFillPlayFill } from "react-icons/bs";
import AddToCollection from "../../collections/components/AddToCollection";
import { Media } from "../types/media";

const Figure = styled.figure`
  position: relative;
  height: 40vh;
  ${breakpoints.xl} {
    height: 60vh;
  }
  width: 100%;
  aspect-ratio: 16 / 9;
`;

const Banner = styled(Image)`
  object-fit: cover;
  ${breakpoints.lg} {
    object-fit: unset;
  }
`;

const MediaWrapper = styled.div`
  position: relative;
  margin: -8rem auto 0;
`;

const MediaContainer = styled.div`
  padding: 1rem;
  position: relative;
`;

const PosterFigure = styled.figure`
  position: relative;
  height: 10rem;
  width: 10rem;
  overflow: hidden;
  border-radius: 2rem;
  border: 4px solid #ffff;
  background-color: #ffff;
`;
const PosterImage = styled(Image)`
  object-position: top;
  object-fit: cover;
`;

const DescriptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  ${breakpoints.lg} {
    flex-direction: row;
    align-items: center;
  }
`;

const TitleWrapper = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  position: relative;
`;

const AnimeTitle = styled.h1`
  font-size: 1.75rem;
  font-weight: bold;
  ${breakpoints.md} {
    font-size: 2rem;
  }
`;

const ScoreWrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  ${breakpoints.lg} {
    flex-direction: row;
  }
`;

const ScoreContainer = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
`;
const Star = styled.span`
  color: rgb(234 179 8);
`;
const SmallScore = styled.span`
  font-size: 12px;
  font-weight: normal;
`;

const GenreList = styled.span`
  font-size: 12px;
  margin-right: 0.5rem;
  color: rgb(63 63 70);

  span:not(:last-child):after {
    content: "/";
    margin: 0 4px;
  }
`;

const ReleaseDateContainer = styled(ScoreContainer)`
  gap: 1rem;
  font-size: 12px;
`;

const AnimeDescription = styled.p`
  max-width: 64rem;
`;

const CharacterImage = styled(Image)`
  border-radius: 2rem;
`;

const CharactersWrapper = styled.div`
  --default-grid-no: 3;
  display: grid;
  grid-template-columns: repeat(var(--default-grid-no), 1fr);
  gap: 0.5rem;
  text-align: center;

  ${breakpoints.md} {
    --default-grid-no: 4;
  }
  ${breakpoints.lg} {
    --default-grid-no: 5;
  }
  ${breakpoints.xl} {
    --default-grid-no: 6;
  }

  ${breakpoints["2xl"]} {
    --default-grid-no: 7;
  }
`;

const Video = styled.figure`
  min-height: 400px;
  max-width: 64rem;
  width: 100%;
  aspect-ratio: 16 / 9;
  border: none;
  position: relative;
  overflow: hidden;
  height: 100%;
`;

const SectionColumn = styled(Column)`
  max-width: 64rem;
`;

const BookmarkButton = styled.button`
  all: unset;
  padding: 0.5rem;
  border-radius: 12px;
  cursor: pointer;
  background-color: #36454f;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Href = styled.a`
  width: 100%;
  position: relative;
`;

const PlayButtonContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Bookmark = (props: Media) => {
  const ref = useRef<ModalHandle>(null);
  return (
    <>
      <BookmarkButton
        onClick={(event) => {
          event.stopPropagation();
          event.nativeEvent.preventDefault();
          ref.current?.openModal();
          console.log(ref.current);
        }}
      >
        <BsBookmarkStarFill width={64} height={64} fill="#eaff00" />
      </BookmarkButton>
      <Modal ref={ref} title="Add to Collections">
        <AddToCollection anime={props} />
      </Modal>
    </>
  );
};

const SectionWithTitle = (props: { title: string } & PropsWithChildren) => {
  return (
    <SectionColumn gap="1rem">
      <h3>{props.title}</h3>
      {props.children}
    </SectionColumn>
  );
};

const AnimeDetail = (props: Media) => {
  return (
    <>
      <Figure>
        <Banner src={props.bannerImage} fill alt={props.title.userPreferred} />
      </Figure>
      <MediaWrapper className={container}>
        <MediaContainer>
          <PosterFigure>
            <PosterImage
              src={props.coverImage.large}
              alt={props.title.userPreferred}
              fill
            />
          </PosterFigure>
          <DescriptionWrapper>
            <TitleWrapper>
              <AnimeTitle>{props.title.userPreferred}</AnimeTitle>
              <Bookmark {...props} />
            </TitleWrapper>
            <ScoreWrapper>
              <ScoreContainer>
                <Star>&#9733;</Star>
                <div>
                  <b>{props.averageScore} / </b>
                  <SmallScore>
                    {" "}
                    100 -{" "}
                    {typeof props.popularity !== "undefined" &&
                      formatter(props.popularity, {
                        notation:
                          props.popularity > 100_000 ? "compact" : "standard",
                      })}{" "}
                    vote
                  </SmallScore>
                </div>
              </ScoreContainer>
            </ScoreWrapper>
          </DescriptionWrapper>
          <GenreList>
            {props.genres.map((genre) => (
              <span key={genre}>{genre}</span>
            ))}
          </GenreList>
          <ReleaseDateContainer>
            Release in {props.seasonYear}
            <ScoreContainer>
              <RxClock height={16} width={16} />
              {props.duration} min / episode
            </ScoreContainer>
          </ReleaseDateContainer>
          <AnimeDescription>{htmr(props.description)}</AnimeDescription>
          <SectionWithTitle title="Characters">
            <CharactersWrapper>
              {props.characters.nodes.map((item) => (
                <Column alignItems="center" key={item.id}>
                  <CharacterImage
                    src={item.image.large}
                    alt={item.name.userPreferred}
                    width={80}
                    height={80}
                  />
                  <p>{item.name.userPreferred}</p>
                </Column>
              ))}
            </CharactersWrapper>
          </SectionWithTitle>
          {props.trailer &&
            (props.trailer.id || props.trailer.site === "youtube") && (
              <SectionWithTitle title="Trailers">
                <Href
                  href={`https://www.youtube.com/watch?v=${props.trailer.id}`}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <Video>
                    <Image
                      src={props.trailer.thumbnail}
                      alt={props.title.userPreferred + "trailer"}
                      fill
                    />
                  </Video>
                  <PlayButtonContainer>
                    <BsFillPlayFill size={72} fill="red" />
                  </PlayButtonContainer>
                </Href>
              </SectionWithTitle>
            )}
        </MediaContainer>
      </MediaWrapper>
    </>
  );
};

export default AnimeDetail;
