import { client } from "@/lib/drivers/apollo/apollo-client";
import { gql } from "@apollo/client";
import { GetServerSideProps } from "next/types";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const movieId = context.params?.id as string | undefined;
  if (!movieId) {
    return {
      notFound: true,
    };
  }

  const { data } = await client.query({
    variables: { id: movieId },
    query: gql`
      query ($id: Int) {
        Media(id: $id, type: ANIME) {
          title {
            userPreferred
          }
        }
      }
    `,
  });

  return {
    props: {
      movieId,
      movie: data,
    },
  };
};

const AnimeDetail = (props: any) => {
  return <div>{JSON.stringify(props)}</div>;
};

export default AnimeDetail;
