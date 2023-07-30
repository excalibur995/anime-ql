import Seo from "@/components/layouts/Seo";
import AnimeDetail from "@/lib/domain/anime/components/AnimeDetail";
import {
  ANIME_DETAIL_QUERY,
  AnimeDetailMedia,
} from "@/lib/domain/anime/query/anime-detail-query";
import { Media } from "@/lib/domain/anime/types/media";
import { client } from "@/lib/drivers/apollo/apollo-client";
import { GetServerSideProps } from "next/types";

interface PageProps {
  moviedId: number;
  movie: Media;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const movieId = context.params?.id as string | undefined;
  if (!movieId) {
    return {
      notFound: true,
    };
  }
  const { data } = await client.query<AnimeDetailMedia>({
    variables: { id: movieId },
    query: ANIME_DETAIL_QUERY,
  });

  return {
    props: {
      movieId,
      movie: data.Media,
    },
  };
};

const AnimeDetailPage = (props: PageProps) => {
  return (
    <Seo
      title={props.movie.title.userPreferred}
      description={props.movie.description}
    >
      <AnimeDetail {...props.movie} />
    </Seo>
  );
};

export default AnimeDetailPage;
