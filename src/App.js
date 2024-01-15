import { useEffect, useState } from "react";
import PokemonThumbnails from "./PokemonThumbnails";
import pokemonJson from "./pokemon.json";
import pokemonTypeJson from "./pokemonType.json";

function App() {
  const [allPokemons, setAllPokemons] = useState([]);

  // APIからデータを取得
  // パラメータにLimitを設定し, 20件ずつ取得
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon?limit=20");
  const [isLoading, setIsLoading] = useState(false);

  const getAllPokemons = () => {
    console.log("getAllPokemons called!!");
    setIsLoading(true);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        // 次の20件をURLにセットする
        setUrl(data.next);
        createPokemonObject(data.results);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const createPokemonObject = (results) => {
    results.forEach((pokemon) => {
      const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`;
      fetch(pokemonUrl)
        .then((res) => res.json())
        .then(async (data) => {
          console.log(data);
          const _image = data.sprites.other["official-artwork"].front_default;
          const _iconImage = data.sprites.other.dream_world.front_default;
          const _type =
            data.types.length === 1
              ? [data.types[0].type.name]
              : [data.types[0].type.name, data.types[1].type.name];
          const japanese =
            _type.length === 1
              ? [await translateToJapanese(data.name, _type[0])]
              : [
                  await translateToJapanese(data.name, _type[0]),
                  await translateToJapanese(data.name, _type[1]),
                ];
          const newList = {
            id: data.id,
            name: data.name,
            image: _image,
            iconImage: _iconImage,
            type: _type[0],
            jpName: japanese[0].name,
            jpType:
              japanese.length === 1
                ? japanese[0].type
                : `${japanese[0].type}・${japanese[1].type}`,
          };
          // 既存のデータを展開し, 新しいデータを追加する
          setAllPokemons((currentList) =>
            [...currentList, newList].sort((a, b) => a.id - b.id)
          );
        });
    });
  };

  const translateToJapanese = async (name, type) => {
    const jpName = await pokemonJson.find(
      (pokemon) => pokemon.en.toLowerCase() === name
    ).ja;
    const jpType = await pokemonTypeJson[type];
    return { name: jpName, type: jpType };
  };

  useEffect(() => {
    let ignore = false;
    const startFetching = () => {
      if (!ignore) {
        console.log("1回目は呼ばれるよ");
        getAllPokemons();
      }
      console.log("2回目以降は呼ばれないよ");
    };
    startFetching();
    return () => {
      ignore = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="app-container">
      <h1>ポケモン図鑑</h1>
      <div className="pokemon-container">
        <div className="all-container">
          {allPokemons.map((pokemon, index) => (
            <PokemonThumbnails
              id={pokemon.id}
              name={pokemon.name}
              image={pokemon.image}
              iconImage={pokemon.iconImage}
              type={pokemon.type}
              key={index}
              jpName={pokemon.jpName}
              jpType={pokemon.jpType}
            />
          ))}
        </div>
        {isLoading ? (
          <button className="load-more">now loading...</button>
        ) : (
          <button className="load-more" onClick={getAllPokemons}>
            view more!
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
