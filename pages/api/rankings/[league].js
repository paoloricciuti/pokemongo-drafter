export default (req, res) => {
    if (req.method !== "GET") res.sendStatus(404);
    let { league } = req.query;
    fetch(`https://pvpoke.com/data/rankings/all/overall/rankings-${league}.json`)
        .then(response => response.json())
        .then(data => {
            fetch(`https://pvpoke.com/data/gamemaster.json`)
                .then(gameMasterRes => gameMasterRes.json())
                .then(gameMaster => {
                    let filtered = data.filter(elem => elem.speciesId.indexOf("_shadow") == -1 && elem.speciesId.indexOf("_xl") == -1);
                    filtered.forEach((pokemon) => {
                        pokemon.types = gameMaster.pokemon.find(gmPokemon => gmPokemon.speciesId == pokemon.speciesId).types;
                        pokemon.moves.chargedMoves = pokemon.moves.chargedMoves.map(move => {
                            return { ...move, type: gameMaster.moves.find(gmMove => gmMove.moveId == move.moveId).type }
                        })
                        pokemon.moves.fastMoves = pokemon.moves.fastMoves.map(move => {
                            return { ...move, type: gameMaster.moves.find(gmMove => gmMove.moveId == move.moveId).type }
                        });
                        pokemon.stats = gameMaster.pokemon.find(gmPokemon => gmPokemon.speciesId == pokemon.speciesId).baseStats;
                    });
                    res.json(filtered)
                })
        });
}