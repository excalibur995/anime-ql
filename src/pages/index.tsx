import Layout from "@/components/layouts/Layout";
import AnimeCard from "@/lib/domain/anime/components/AnimeCard";
import { useMediaListQuery } from "@/lib/domain/anime/query/anime-list-query";
import { baseAlignment, container, grid } from "@/styles/global";
import styled from "@emotion/styled";
import { Pagination } from "@nextui-org/react";
import { cva } from "class-variance-authority";
import Link from "next/link";
import { useState } from "react";

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
export default function Home(props: any) {
  const [page, setPage] = useState<number>(1);
  const { data, loading } = useMediaListQuery({
    page,
    perPage: 10,
  });

  const onChangePage = (e: number) => {
    setPage(e);
    if (typeof window !== "undefined") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <Layout className={cva([container, baseAlignment])()}>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <Section>
          <div className={grid}>
            {data?.Page.mediaList.map((anime) => (
              <Link
                href={`/anime-detail/${anime.media.id}`}
                key={anime.media.id}
              >
                <AnimeCard {...anime.media} />
              </Link>
            ))}
          </div>
          <Pagination
            page={page}
            total={data?.Page.pageInfo.total}
            initialPage={1}
            onChange={onChangePage}
          />
        </Section>
      )}
    </Layout>
  );
}
