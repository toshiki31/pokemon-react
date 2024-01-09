import { useEffect, useState } from "react";
import PokemonThumbnails from "./PokemonThumbnails";

function App() {
  const [allPokemons, setAllPokemons] = useState([]);
  const createPokemonObject = (results) => {
    results.forEach((pokemon) => {
      const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`;
      fetch(pokemonUrl)
        .then((res) => res.json())
        .then((data) => {
          const image = data.sprites.other["official-artwork"].front_default;
          const type = data.types[0].type.name;
          console.log(data.name, image, type);
        });
    });
  };

  // 仮でデータを配列にする
  const pokemons = [
    {
      id: 1,
      name: "フシギダネ",
      image:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
      type: "くさ",
    },
    {
      id: 2,
      name: "フシギソウ",
      image:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/2.png",
      type: "くさ",
    },
    {
      id: 3,
      name: "フシギバナ",
      image:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/3.png",
      type: "くさ",
    },
  ];

  // APIからデータを取得する
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon");
  const getAllPokemons = () => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setAllPokemons(data.results);
        createPokemonObject(data.results);

        // 次の20件をURLにセットする
        setUrl(data.next);
      });
  };

  useEffect(() => {
    getAllPokemons();
  }, []);

  return (
    <div className="app-container">
      <h1>ポケモン図鑑</h1>
      <div className="pokemon-container">
        <div className="all-container">
          {/* 仮で３つの子コンポーネントを表示する */}
          {pokemons.map((pokemon, index) => (
            <PokemonThumbnails
              id={pokemon.id}
              name={allPokemons[index]?.name}
              image={pokemon.image}
              type={pokemon.type}
              key={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
