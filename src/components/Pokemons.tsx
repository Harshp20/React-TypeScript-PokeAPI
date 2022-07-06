type Pokemon = {
  name: string;
  url: string;
};

interface Props {
  pokemons: Pokemon[];
}

const Pokemons: React.FC<Props> = ({ pokemons }) => {
  return (
    <>
      {pokemons.map((pokemon: Pokemon) => (
        <div key={pokemon.url}>{pokemon.name}</div>
      ))}
    </>
  );
};

export default Pokemons;
