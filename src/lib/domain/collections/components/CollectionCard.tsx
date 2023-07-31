import { plural } from "@/lib/utils/utils";
import styled from "@emotion/styled";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimeCollection } from "../context/AnimeCollectionContext";
import DeleteCollection from "./DeleteCollection";
import EditCollectionName from "./EditCollectionName";

const ContainerCard = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 0.75rem;
  border: 1px solid #efefef;
  padding: 0.5rem;
  color: #000000;
  transition: all 0.2s;
  height: 100%;
  @media (hover: hover) and (pointer: fine) {
    &:hover {
      background-color: #f0f1f3;
    }
  }
`;

const Figure = styled.figure`
  position: relative;
  aspect-ratio: 1 / 1;
  border-radius: 0.75rem;
`;

const PosterImage = styled(Image)`
  object-fit: cover;
  object-position: top;
  border-radius: 0.75rem;
`;

const Space = styled.div`
  margin: 1rem 0;
`;

const Inline = styled.section`
  display: inline-flex;
  align-items: baseline;
  gap: 0.5rem;
`;
const Between = styled(Inline)`
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;
const CollectionCard = (item: AnimeCollection) => {
  const [image, setImage] = useState(item.collection?.[0]?.coverImage.large);
  return (
    <ContainerCard>
      <Link href={"/collection/" + item.collectionId}>
        <Figure>
          <PosterImage
            fill
            src={image}
            alt={item.collectionName}
            onError={() => {
              setImage("/placeholder.png");
            }}
          />
        </Figure>
      </Link>
      <Space>
        <Between>
          <Inline>
            <h3>{item.collectionName}</h3>
            <EditCollectionName {...item} />
          </Inline>
          <DeleteCollection {...item} />
        </Between>

        {item.collection.length > 0 && (
          <div>
            {item.collection.length} {plural(item.collection.length, "Anime")}
          </div>
        )}
      </Space>
    </ContainerCard>
  );
};

export default CollectionCard;
