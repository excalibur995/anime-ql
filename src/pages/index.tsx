import Layout from "@/components/layouts/Layout";
import AnimeCard from "@/lib/domain/anime/components/AnimeCard";
import { useMediaListQuery } from "@/lib/domain/anime/query/anime-list-query";
import { baseAlignment, container, grid } from "@/styles/global";
import { cva } from "class-variance-authority";
import Link from "next/link";

export default function Home(props: any) {
  const { data, loading } = useMediaListQuery();

  return (
    <Layout className={cva([container, baseAlignment])()}>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className={grid}>
          {data?.Page.mediaList.map((anime) => (
            <Link href={`/anime-detail/${anime.media.id}`} key={anime.media.id}>
              <AnimeCard {...anime} />
            </Link>
          ))}
        </div>
      )}
    </Layout>
  );
}
