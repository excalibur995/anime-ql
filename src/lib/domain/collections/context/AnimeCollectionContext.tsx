import useToggle from "@/lib/hooks/useToggle";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Media } from "../../anime/types/media";

export interface AnimeCollection {
  collectionId: number;
  collectionName: string;
  collection: Media[];
}

interface AnimeCollectionContextProps {
  collection: AnimeCollection[];
  createCollection: (name: string) => AnimeCollection;
  removeCollection: (id: number) => void;
  addToCollection: (id: number, anime: Media) => void;
  removeFromCollection: (id: number, anime: Media) => void;
  editCollectionName: (id: number, name: string) => void;
  isAnimeInsideCollection: (id: number, anime: Media) => boolean;
}

const CollectionContext = createContext<AnimeCollectionContextProps>({
  collection: [],
  createCollection: function (name: string): AnimeCollection {
    return {
      collection: [],
      collectionId: 0,
      collectionName: name,
    };
  },
  addToCollection: function (id: number, anime: Media): void {},
  removeFromCollection: function (id: number, anime: Media): void {},
  editCollectionName: function (id: number, name: string): void {},
  removeCollection: function (id: number): void {},
  isAnimeInsideCollection(id, anime) {
    return false;
  },
});

export const useCollectionContext = () => useContext(CollectionContext);

function generateId(collections: AnimeCollection[]) {
  let collectionId = new Date().getTime();
  const isIdExist = collections.find(
    (collection) => collection.collectionId === collectionId
  );

  if (isIdExist) {
    generateId(collections);
  }
  return collectionId;
}

export default function CollectionProvider(props: PropsWithChildren) {
  const [collection, setCollection] = useState<AnimeCollection[]>([]);
  const [updated, _, setValue] = useToggle(false);

  const createCollection = (collectionName: string) => {
    const collectionId = generateId(collection);
    const newCollection = {
      collectionId,
      collectionName,
      collection: [],
    };

    setValue(true);
    setCollection((prevCollection) => [...prevCollection, newCollection]);

    return newCollection;
  };

  const addToCollection = (id: number, anime: Media) => {
    const storedAnime = localStorage.getItem("animeCollection");

    let current = [...collection];

    if (storedAnime) {
      current = JSON.parse(storedAnime);
    }

    if (current.length > 0) {
      const selectedCollection = current.find(
        (item) => item.collectionId === id
      );
      if (selectedCollection) {
        const isNotExist = !selectedCollection.collection.find(
          (item) => item.id === anime.id
        );
        if (isNotExist) {
          selectedCollection.collection.push(anime);
          setCollection(current);
          setValue(true);
        }
      }
    }
  };

  const removeCollection = (id: number) => {
    const current = [...collection];
    const filteredCollection = current.filter(
      (collection) => collection.collectionId !== id
    );
    setCollection(filteredCollection);
    setValue(true);
  };

  const editCollectionName = (id: number, name: string) => {
    const current = [...collection];
    const selectedCollection = current.find((item) => item.collectionId === id);
    if (!!selectedCollection) {
      selectedCollection.collectionName = name;
      setCollection(current);
      setValue(true);
    }
  };

  const removeFromCollection = (id: number, anime: Media) => {
    const storedAnime = localStorage.getItem("animeCollection");

    let current = [...collection];

    if (storedAnime) {
      current = JSON.parse(storedAnime);
    }

    if (current.length > 0) {
      const selectedCollection = current.find(
        (item) => item.collectionId === id
      );
      if (selectedCollection) {
        // Use `filter` to create a new array without the anime to be removed
        selectedCollection.collection = selectedCollection.collection.filter(
          (item) => item.id !== anime.id
        );
        setCollection(current);
        setValue(true);
      }
    }
  };

  const isAnimeInsideCollection = (id: number, anime: Media) => {
    let current = [...collection];

    const selected = current.find((col) => col.collectionId === id);
    if (selected) {
      return selected.collection.findIndex((sel) => sel.id === anime.id) !== -1;
    }
    return false;
  };

  useEffect(() => {
    const storedAnime = localStorage.getItem("animeCollection");
    if (storedAnime) {
      setCollection(JSON.parse(storedAnime));
    }
  }, []);

  useEffect(() => {
    if (updated) {
      localStorage.setItem("animeCollection", JSON.stringify(collection));
    }
  }, [collection, updated]);

  return (
    <CollectionContext.Provider
      value={{
        collection,
        createCollection,
        removeCollection,
        editCollectionName,
        addToCollection,
        removeFromCollection,
        isAnimeInsideCollection,
      }}
    >
      {props.children}
    </CollectionContext.Provider>
  );
}
