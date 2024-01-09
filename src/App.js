import { useEffect, useState } from "react";
import PokemonThumbnails from "./PokemonThumbnails";

function App() {
  const [pokemonNames, setPokemonNames] = useState([]);

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
  const url = "https://pokeapi.co/api/v2/pokemon";
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.results[0].name);
        // 仮で3つのポケモンの名前をセットする
        const names = [
          data.results[0].name,
          data.results[1].name,
          data.results[2].name,
        ];
        setPokemonNames(names);
      });
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
              name={pokemonNames[index]}
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
