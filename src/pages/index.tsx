import LoadingState from "@/components/common/LoadingState";
import Layout from "@/components/layouts/Layout";

import { useMediaListQuery } from "@/lib/domain/anime/query/anime-list-query";
import { baseAlignment, container, grid } from "@/styles/global";
import styled from "@emotion/styled";
import { Pagination } from "@nextui-org/react";
import { cva } from "class-variance-authority";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const AnimeCard = dynamic(
  () => import("@/lib/domain/anime/components/AnimeCard")
);

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;
export default function Home(props: any) {
  const router = useRouter();
  const { page } = router.query;

  const [current, setPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>();
  const { data, loading } = useMediaListQuery({
    page: current,
    perPage: 10,
  });

  useEffect(() => {
    if (!loading && totalPage !== data?.Page.pageInfo.total) {
      setTotalPage(data?.Page.pageInfo.total);
    }
  }, [data?.Page.pageInfo.total, loading, totalPage]);

  useEffect(() => {
    if (typeof page !== "undefined") {
      setPage(Number(page));
    }
  }, [page]);

  const onChangePage = (e: number) => {
    setPage(e);

    router.push({ query: { ...router.query, page: e.toString() } }, undefined, {
      scroll: false,
    });

    if (typeof window !== "undefined") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <Layout className={cva([container, baseAlignment])()}>
      <LoadingState
        isLoading={loading}
        data={data?.Page.mediaList ?? []}
        emptyText="No Anime Available"
      >
        {(data) => (
          <Section>
            <section className={grid}>
              {data.map((anime) => (
                <Link
                  href={`/anime-detail/${anime.media.id}`}
                  key={anime.media.id}
                >
                  <AnimeCard {...anime.media} />
                </Link>
              ))}
            </section>
          </Section>
        )}
      </LoadingState>
      <PaginationContainer>
        <Pagination
          page={current}
          total={totalPage}
          initialPage={1}
          onChange={onChangePage}
        />
      </PaginationContainer>
    </Layout>
  );
}
