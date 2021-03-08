import React from 'react';

const PokemonChooser = ({pvpokeRankings, checkHide, pickPokemon}) => {
    return (
        <div className="picks">
            {
                pvpokeRankings ?
                    pvpokeRankings.map(pick => {
                        return (
                            <div
                                className={`pick ${checkHide(pick) ? "" : "hidden"}`}
                                style={{ backgroundImage: `url(https://rankingsbot.com/imgs2/${pick.speciesId.replaceAll("_", "-").replace("alolan", "alola")}.png)` }}
                                data-id={pick.speciesId}
                                data-name={pick.speciesName}
                                onClick={pickPokemon}
                            >
                            </div>
                        );
                    })
                    :
                    <div className="loadingContainer">
                        <div className="loading"></div>
                    </div>
            }
        </div>
    )
};

export default PokemonChooser;