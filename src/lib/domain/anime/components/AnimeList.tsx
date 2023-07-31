import { grid } from "@/styles/global";
import styled from "@emotion/styled";
import Link from "next/link";
import RemoveAnimeFromCollection from "../../collections/components/RemoveAnimeFromCollection";
import { AnimeCollection } from "../../collections/context/AnimeCollectionContext";
import { Media } from "../types/media";
import AnimeCard from "./AnimeCard";

const Grid = styled.div`
  margin: 1rem 0;
`;

const Container = styled.div({
  position: "absolute",
  top: 16,
  right: 16,
  background: "white",
  padding: 12,
  borderRadius: 16,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 35,
});

interface AnimeListProps {
  list: Media[];
  collection?: AnimeCollection;
}

const AnimeList = (props: AnimeListProps) => {
  return (
    <Grid className={grid}>
      {props.list.map((anime) => (
        <Link
          style={{ position: "relative" }}
          href={`/anime-detail/${anime.id}`}
          key={anime.id}
        >
          <AnimeCard {...anime} />
          {props.collection && (
            <Container>
              <RemoveAnimeFromCollection
                anime={anime}
                collection={props.collection}
              />
            </Container>
          )}
        </Link>
      ))}
    </Grid>
  );
};

export default AnimeList;
