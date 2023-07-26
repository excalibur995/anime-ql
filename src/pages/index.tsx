import Layout from "@/components/layouts/Layout";
import AnimeCard from "@/lib/domain/anime/components/AnimeCard";
import { useMediaListQuery } from "@/lib/domain/anime/query/anime-list-query";
import { grid } from "@/styles/global";
import Link from "next/link";

export default function Home(props: any) {
  const { data, loading } = useMediaListQuery();

  return (
    <Layout>
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
