import Seo from "@/components/layouts/Seo";
import AnimeDetail from "@/lib/domain/anime/components/AnimeDetail";
import {
  ANIME_DETAIL_QUERY,
  AnimeDetailMedia,
} from "@/lib/domain/anime/query/anime-detail-query";
import { Media } from "@/lib/domain/anime/types/media";
import { useQuery } from "@apollo/client";
import styled from "@emotion/styled";
import { GetServerSideProps } from "next/types";

interface PageProps {
  animeId: number;
  movie: Media;
}

const NoCollectionLayout = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  text-align: left;
  align-items: center;
  min-height: 100vh;
  justify-content: center;
`;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const animeId = context.params?.id as string | undefined;
  if (!animeId) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      animeId,
    },
  };
};

const AnimeDetailPage = (props: PageProps) => {
  const { data, loading, error } = useQuery<AnimeDetailMedia>(
    ANIME_DETAIL_QUERY,
    {
      variables: { id: props.animeId },
    }
  );

  if (loading) {
    return (
      <NoCollectionLayout>
        <p>Getting anime data from server...</p>
      </NoCollectionLayout>
    );
  }

  if (!loading && error) {
    return (
      <NoCollectionLayout>
        <p>Something Went wrong please try again</p>
      </NoCollectionLayout>
    );
  }

  if (!loading && !!data?.Media) {
    return (
      <Seo
        title={data?.Media.title.userPreferred}
        description={data?.Media.description}
      >
        <AnimeDetail {...data?.Media} />
      </Seo>
    );
  }
};

export default AnimeDetailPage;
