import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import PokemonChooser from '../../components/PokemonChooser';
import { useRoom, useSetRoom } from '../../contexts/RoomContext';
import { useRouterState } from '../../contexts/RouterContext';
import { useSocket } from '../../contexts/SocketContext';
import useApi from '../../hooks/useApi';

const TYPES = ["bug", "dark", "dragon", "electric", "fairy", "fighting", "fire", "flying", "ghost", "grass", "ground", "ice", "normal", "poison", "psychic", "rock", "steel", "water"];

const TYPE_COLORS = {
    "ground": {
        "red": 215,
        "green": 141,
        "blue": 94
    },
    "ghost": {
        "red": 97,
        "green": 109,
        "blue": 191
    },
    "normal": {
        "red": 146,
        "green": 153,
        "blue": 161
    },
    "dark": {
        "red": 101,
        "green": 103,
        "blue": 118
    },
    "water": {
        "red": 94,
        "green": 170,
        "blue": 220
    },
    "fighting": {
        "red": 215,
        "green": 64,
        "blue": 95
    },
    "electric": {
        "red": 247,
        "green": 218,
        "blue": 92
    },
    "flying": {
        "red": 155,
        "green": 179,
        "blue": 225
    },
    "poison": {
        "red": 185,
        "green": 98,
        "blue": 205
    },
    "bug": {
        "red": 153,
        "green": 197,
        "blue": 42
    },
    "rock": {
        "red": 203,
        "green": 189,
        "blue": 142
    },
    "fire": {
        "red": 253,
        "green": 161,
        "blue": 88
    },
    "grass": {
        "red": 91,
        "green": 191,
        "blue": 103
    },
    "steel": {
        "red": 82,
        "green": 152,
        "blue": 164
    },
    "ice": {
        "red": 124,
        "green": 210,
        "blue": 199
    },
    "psychic": {
        "red": 250,
        "green": 135,
        "blue": 132
    },
    "dragon": {
        "red": 11,
        "green": 110,
        "blue": 191
    },
    "fairy": {
        "red": 255,
        "green": 175,
        "blue": 238
    }
};


const Room = props => {
    const [notificationSound, setNotificationSound] = useState(null);
    useEffect(()=>{
        setNotificationSound(new Audio("../notification.mp3"));
    },[]);
    const room = useRoom();
    const setRoom = useSetRoom();
    const router = useRouter();
    const { link } = router.query;
    const [routerState, setRouterState] = useRouterState();
    const socket = useSocket();
    const api = useApi();
    const [username, setUsername] = useState(routerState);
    const [searchQuery, setSearchQuery] = useState("");
    const handleSearchQueryChange = (e) => {
        setSearchQuery(e.target.value);
    };
    const [searchQuerySubstitute, setSearchQuerySubstitute] = useState("");
    const handleSearchQuerySubstituteChange = (e) => {
        setSearchQuerySubstitute(e.target.value);
    };
    const [rounds, setRounds] = useState(6);
    const [banRounds, setBanRounds] = useState(0);
    const handleRounds = useCallback((e) => {
        const val = Math.max(e.target.value, 1);
        setBans([...new Array((banRounds + val))].map(elem => false));
        setRounds(val);
    }, [banRounds]);
    const handleBanRounds = useCallback((e) => {
        const val = Math.max(e.target.value, 0);
        setBans([...new Array((rounds + val))].map(elem => false));
        setBanRounds(val);
    }, [rounds]);
    const banRef = useRef();
    const [bans, setBans] = useState([false, false, false, false, false, false]);
    const handleCheckboxes = (e) => {
        setBans([...banRef.current.querySelectorAll("input")].map(elem => elem.checked));
    }
    const [selectedLeague, setSelectedLeague] = useState("1500");
    const handleSelectedLeague = (e) => {
        setSelectedLeague(e.target.value);
    };
    const [pvpokeRankings, setPvpokeRankings] = useState(null);
    const [selectedPokemon, setSelectedPokemon] = useState(null);
    const pickPokemon = useCallback((e) => {
        const chooser = room.players.find(player => player.pick_order == room.choosing);
        if (chooser.username.toLowerCase() != username.toLowerCase()) {
            return;
        }
        let selected = e.target.dataset.id;
        if (room.choosed_list.indexOf(selected) != -1) {
            alert("This pokemon was already selected.");
            return;
        }
        setSelectedPokemon(pvpokeRankings.find(pick => pick.speciesId == selected));
    }, [room, username, pvpokeRankings]);

    const [substituting, setSubstituting] = useState(false);
    const [substitutingPick, setSubstitutingPick] = useState(null);
    const assignSubstitute = useCallback(() => {
        const confirm = window.confirm("Are you sure you want to assign the substitute to the current chooser? The draft will go on and it will later be able to substitute the doll with a Pokemon on his turn.");
        const chooser = room.players.find(player => player.pick_order == room.choosing);
        if (!confirm) return;
        let newPick = {
            room_link: link,
            chooser,
            pick: "Substitute",
            pick_id: "substitute",
            substitute: true
        }
        socket.emit("pick", newPick);
    }, [socket, room]);
    const doSubstitution = useCallback((e) => {
        setSubstituting(true);
        setSubstitutingPick(e.target.dataset.id);
    }, [socket, room])
    const selectPokemon = useCallback(() => {
        const chooser = room.players.find(player => player.pick_order == room.choosing);
        if (chooser.username.toLowerCase() != username.toLowerCase()) {
            return;
        }
        if (room.choosed_list.indexOf(selectedPokemon.speciesId) != -1) {
            alert("This pokemon was already selected.");
        } else {
            let newPick = {
                room_link: link,
                chooser,
                pick: selectedPokemon.speciesName,
                pick_id: selectedPokemon.speciesId
            }
            setSearchQuery("");
            socket.emit("pick", newPick);
            setSelectedPokemon(null);
        }
    }, [room, socket, selectedPokemon, username]);
    const subsitutePokemon = useCallback(() => {
        const chooser = room.players.find(player => player.pick_order == room.choosing);
        if (chooser.username.toLowerCase() != username.toLowerCase()) {
            return;
        }
        if (room.choosed_list.indexOf(selectedPokemon.speciesId) != -1) {
            alert("This pokemon was already selected.");
        } else {
            let newPick = {
                room_link: link,
                id: substitutingPick,
                pick: selectedPokemon.speciesName,
                pick_id: selectedPokemon.speciesId
            }
            setSearchQuery("");
            socket.emit("substitute", newPick);
            setSelectedPokemon(null);
            setSubstituting(false);
            setSubstitutingPick(null);
        }
    }, [room, socket, selectedPokemon, username, substitutingPick]);
    const startDraft = useCallback(() => {
        if (window.confirm("Are you sure you want to start the draft? No other person will be able to join after the draft is started.")) {
            socket.emit("startDraft", { room_link: link, bans, league: selectedLeague });
        }
    }, [socket, bans, selectedLeague, link])
    const checkHideSubstitute = useCallback((pick) => {
        const picked = room.choosed_list.indexOf(pick.speciesId) == -1;
        const mode = searchQuerySubstitute.charAt(0);
        let searched = pick.speciesId.replaceAll("_", " ").toLowerCase().includes(searchQuerySubstitute.toLowerCase());
        if (TYPES.indexOf(searchQuerySubstitute) != -1) {
            searched = pick.types.reduce((accumulator, element) => accumulator || element.toLowerCase() == searchQuerySubstitute.toLowerCase(), false)
        }
        if (mode == "@") {
            let species = searchQuerySubstitute.substr(1);
            if (TYPES.indexOf(species) == -1) {
                searched = Object.values(pick.moves).flatMap(move => move).map(move => move.moveId.replaceAll("_", " ").toLowerCase()).reduce((accumulator, element) => accumulator || element.includes(species), false);
            } else {
                searched = Object.values(pick.moves).flatMap(move => move).map(move => move.type.toLowerCase()).reduce((accumulator, element) => accumulator || element == species, false);
            }
        } else if (mode == "-") {
            let species = searchQuerySubstitute.substr(1);
            searched = Object.values(pick.matchups).flatMap(matchup => matchup).map(matchup => matchup.opponent.replaceAll("_", " ").toLowerCase()).reduce((accumulator, element) => accumulator || element.includes(species), false);
        }
        return picked && searched;
    }, [searchQuerySubstitute, room]);

    const checkHide = useCallback((pick) => {
        const picked = room.choosed_list.indexOf(pick.speciesId) == -1;
        const mode = searchQuery.charAt(0);
        let searched = pick.speciesId.replaceAll("_", " ").toLowerCase().includes(searchQuery.toLowerCase());
        if (TYPES.indexOf(searchQuery) != -1) {
            searched = pick.types.reduce((accumulator, element) => accumulator || element.toLowerCase() == searchQuery.toLowerCase(), false)
        }
        if (mode == "@") {
            let species = searchQuery.substr(1);
            if (TYPES.indexOf(species) == -1) {
                searched = Object.values(pick.moves).flatMap(move => move).map(move => move.moveId.replaceAll("_", " ").toLowerCase()).reduce((accumulator, element) => accumulator || element.includes(species), false);
            } else {
                searched = Object.values(pick.moves).flatMap(move => move).map(move => move.type.toLowerCase()).reduce((accumulator, element) => accumulator || element == species, false);
            }
        } else if (mode == "-") {
            let species = searchQuery.substr(1);
            searched = Object.values(pick.matchups).flatMap(matchup => matchup).map(matchup => matchup.opponent.replaceAll("_", " ").toLowerCase()).reduce((accumulator, element) => accumulator || element.includes(species), false);
        }
        return picked && searched;
    }, [searchQuery, room]);

    const [isInfoPopupOpened, setIsInfoPopupOpened] = useState(false);
    const togglePopup = () => {
        setIsInfoPopupOpened(prev => !prev);
    }
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [chatMessage, setChatMessage] = useState("");
    const toggleChat = () => {
        setIsChatOpen(prev => !prev);
    }
    const [chat, setChat] = useState([]);
    const chatRef = useRef();
    const sendChat = useCallback((e) => {
        e.preventDefault();
        socket.emit("chatMsg", {
            username: username,
            msg: chatMessage,
            room_link: link
        });
        setChatMessage("");
    }, [socket, username, chatMessage, link]);
    useEffect(() => {
        if(!link) return;
        if (room == null) {
            router.push(`/joinroom/${link}`);
        } else {
            if (!pvpokeRankings) {
                const getPvpokeRankingsAsync = async () => {
                    if (!room?.league) {
                        return;
                    }
                    let res = await api(`rankings/${room.league}`, "GET");
                    setPvpokeRankings(res);
                };
                getPvpokeRankingsAsync();
            }
            if (room?.started) {
                if (!(Math.floor(room.choosed_list.length / room.players.length) >= room.ban_rounds.length) && room?.players?.find(player => player.pick_order == room.choosing)?.username?.toLowerCase() == username?.toLowerCase()) {
                    if(notificationSound) notificationSound.play();
                }
                if (("Notification" in window) && Notification.permission !== "granted") {
                    Notification.requestPermission();
                }
                if (("Notification" in window) && Notification.permission === "granted") {
                    if (!(Math.floor(room.choosed_list.length / room.players.length) >= room.ban_rounds.length) && room?.players?.find(player => player.pick_order == room.choosing)?.username?.toLowerCase() == username?.toLowerCase()) {
                        try {
                            new Notification("It's your turn", { body: `Hey ${username} it's your turn to pick for the draft ${room.name}` });
                        } catch (e) {

                        }
                    }
                }
            }
        }
    }, [room, link]);
    useEffect(() => {
        if (room) {
            socket.on("updateChat", chat => {
                let scrolledDown = chatRef.current.scrollHeight - chatRef.current.clientHeight == chatRef.current.scrollTop;
                setChat(chat);
                if (scrolledDown) {
                    chatRef.current.scrollTop = chatRef.current.scrollHeight - chatRef.current.clientHeight;
                }
            })
        }
    }, [room, socket, setChat, chatRef]);
    const chatTitleRef = useRef();
    const animationNewChat = useCallback(() => {
        if (chatTitleRef.current) {
            if (!isChatOpen) {
                chatTitleRef.current.classList.add("new-msg");
                chatTitleRef.current.addEventListener("animationend", () => {
                    chatTitleRef.current.classList.remove("new-msg");
                })
            }
        }
    },
        [isChatOpen, chatTitleRef]);
    useEffect(animationNewChat, [chat]);
    return (
        room && <div className="main">
            <div className={`container titled room-container ${Math.floor(room.choosed_list.length / room.players.length) >= room.ban_rounds.length && "finished"}`} data-title={room.name}>
                {
                    Math.floor(room.choosed_list.length / room.players.length) >= room.ban_rounds.length && "finished"
                    &&
                    <div className="ended">
                        The drafting is over...have a good tournament!
                    </div>
                }
                <div className="container-element playerlist">
                    <ul>
                        {
                            room.players.map((player) => {
                                return (
                                    <li className={player.online ? "online" : ""} key={player.username}>
                                        <span>{player.username}</span>
                                        <hr />
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
                <div className="container-element teams">
                    {
                        room?.started ?
                            room.players.map((player) => {
                                return (
                                    <div className={`player-team titled ${!(Math.floor(room.choosed_list.length / room.players.length) >= room.ban_rounds.length) && room.players.find(player => player.pick_order == room.choosing).username == player.username ? "choosing" : ""} ${room.ban_rounds[Math.floor(room.choosed_list.length / room.players.length)] ? "banning" : ""}`} data-title={player.username}>
                                        {
                                            player.team.map((pokemon, index) => {
                                                const chooserUsername = room.players.find(player => player.pick_order == room.choosing).username.toLowerCase();
                                                const myTurn = chooserUsername === username.toLowerCase() && chooserUsername === player.username.toLowerCase();
                                                const substitute = myTurn && pokemon.pick_id === "substitute";
                                                return (
                                                    <div className={`pick ${room.ban_rounds[index] ? "ban" : ""} ${substitute ? "substitute" : ""}`} onClick={substitute && doSubstitution} data-id={pokemon.id} style={{ backgroundImage: `url(https://rankingsbot.com/imgs2/${pokemon.pick_id.replace("_", "-").replace("alolan", "alola")}.png)` }}>
                                                    </div>
                                                )
                                            }
                                            )
                                        }
                                    </div>
                                )
                            }) :
                            <h2>Everyone's team will be shown here as soon as the draft starts!</h2>
                    }
                </div>
                <div className="container-element commands">
                    {
                        room?.started ?
                            <>
                                <div className={`chooser ${room.players.find(player => player.pick_order == room.choosing).username.toLowerCase() == username.toLowerCase() ? "your-turn" : ""}`}>
                                    Chooser: {room && room.players.find(player => player.pick_order == room.choosing).username}
                                </div>
                                {
                                    room?.players?.find(player => player.username.toLowerCase() == username.toLowerCase())?.host ?
                                        <button className="lighter" onClick={assignSubstitute}>Assign substitute</button> : null
                                }
                                {
                                    room.ban_rounds[Math.floor(room.choosed_list.length / room.players.length)] &&
                                    <div className="warning">
                                        <i className="material-icons">warning</i> banning round.
                                    </div>
                                }
                                <div style={{ position: "relative" }}>
                                    <input className="searchBox" placeholder="Search..." type="text" value={searchQuery} onChange={handleSearchQueryChange} />
                                    <i className="material-icons info" onClick={togglePopup}>info</i>
                                </div>
                                <div className="picks">
                                    {
                                        pvpokeRankings ?
                                            pvpokeRankings.map(pick => {
                                                return (
                                                    <div
                                                        className={`pick ${checkHide(pick) ? "" : "hidden"} ${room.players.find(player => player.pick_order == room.choosing).username.toLowerCase() != username.toLowerCase() ? "disabled" : ""}`}
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
                            </> :
                            <div>
                                {
                                    room?.players?.find(player => player.username.toLowerCase() == username.toLowerCase())?.host ?
                                        <div className="options">
                                            <label>Rounds:</label>
                                            <input type="number" min="1" value={rounds} onChange={handleRounds} />
                                            <label>Ban:</label>
                                            <input type="number" min="0" value={banRounds} onChange={handleBanRounds} />
                                            {
                                                banRounds > 0 && (
                                                    <div style={{ width: "100%" }}>
                                                        Ban columns:
                                                        <div ref={banRef} className="bans" onClick={handleCheckboxes}>
                                                            {
                                                                bans.map((ban, i) => {
                                                                    return (
                                                                        <div style={{ width: "100%", display: "flex", flexDirection: "column", justifyContent: "space-evenly", alignItems: "center" }}>
                                                                            <span>{(i + 1)}</span>
                                                                            <input disabled={bans.filter(Boolean).length == banRounds && !ban} checked={ban} type="checkbox"></input>
                                                                        </div>
                                                                    )
                                                                })
                                                            }
                                                        </div>
                                                    </div>
                                                )
                                            }
                                            <label>League:</label>
                                            <select value={selectedLeague} onChange={handleSelectedLeague}>
                                                <option value="1500">Great League</option>
                                                <option value="2500">Ultra League</option>
                                                <option value="10000">Master League</option>
                                            </select> <br />
                                            <button className="lighter" onClick={startDraft}>Start Draft</button>
                                        </div>
                                        :
                                        <>
                                            The host <span style={{ fontWeight: "bold" }}>{room.players.find(player => player.host).username}</span> hasn't started the draft yet.
                                        </>
                                }
                            </div>
                    }
                </div>
            </div>
            {
                username &&
                <div className="chat-container">
                    <div ref={chatTitleRef} className="chat-title" onClick={toggleChat}>Chat <i className="material-icons">close</i></div>
                    <div className={`chat-and-commands ${isChatOpen ? "" : "chat-closed"}`}>
                        <div ref={chatRef} className="chat">
                            {
                                chat.map(msg => {
                                    let date = new Date(msg.eta);
                                    date.setHours(date.getHours() - (new Date().getTimezoneOffset() / 60));
                                    return (
                                        <div className={`chat-msg ${msg.author.toLowerCase() == username.toLowerCase() ? "personal" : ""}`}>
                                            <div className="chat-author">
                                                {msg.author}
                                            </div>
                                            <div className="chat-content">
                                                {msg.msg}
                                            </div>
                                            <div className="chat-eta">
                                                {`${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`}
                                            </div>
                                        </div>
                                    );
                                })
                            }
                        </div>
                        <div className="chat-commands">
                            <form onSubmit={sendChat}>
                                <input value={chatMessage} onChange={(e) => setChatMessage(e.target.value)} />
                                <button disabled={!chatMessage} type="submit"><i className="material-icons">send</i></button>
                            </form>
                        </div>
                    </div>
                </div>
            }
            <div className={`substitute-popup ${substituting ? "" : "closed"}`}>
                <div className="substitute-popup-picker titled" data-title="Substitute">
                    <div style={{ position: "relative" }}>
                        <input className="searchBox" placeholder="Search..." type="text" value={searchQuerySubstitute} onChange={handleSearchQuerySubstituteChange} />
                        <i className="material-icons info" onClick={togglePopup}>info</i>
                    </div>
                    <PokemonChooser pvpokeRankings={pvpokeRankings} checkHide={checkHideSubstitute} pickPokemon={pickPokemon} />
                    <button onClick={() => { setSubstituting(false) }}>Cancel</button>
                </div>
            </div>
            <div onClick={togglePopup} className={`info-popup ${isInfoPopupOpened ? "" : "closed"}`}>
                <ul>
                    <li>Type <b><i>pokemonname</i></b> to list a pokémon with that name</li>
                    <li>Type <b><i>type</i></b> to list pokémon with that type</li>
                    <li>Type <b><i>@move</i></b> to list pokémon with that move</li>
                    <li>Type <b><i>@type</i></b> to list pokémon with that move type</li>
                    <li>Type <b><i>-pokemonname</i></b> to list counters for that pokémon</li>
                </ul>
            </div>
            {
                selectedPokemon &&
                <div className="confirm-pokemon" onClick={(e) => e.target.classList.contains("confirm-pokemon") && (setSelectedPokemon(null))}>
                    <div className="pokemon-card">
                        <div className="pokemon-card-img" style={{ backgroundImage: `url(https://rankingsbot.com/imgs2/${selectedPokemon.speciesId.replaceAll("_", "-").replace("alolan", "alola")}.png)` }}>
                        </div>
                        <div className="pokemon-card-name">
                            {selectedPokemon.speciesName}
                        </div>
                        <div className="pokemon-card-types">
                            {
                                selectedPokemon.types.map(type => {
                                    return (
                                        type != "none" && <div style={{ backgroundImage: `url(../types/${type}.png)` }}></div>
                                    )
                                })
                            }
                        </div>
                        <div className="pokemon-card-stats">
                            <div className="pokemon-card-stat">
                                ATK
                            </div>
                            <div className="pokemon-card-stat">
                                DEF
                            </div>
                            <div className="pokemon-card-stat">
                                HP
                            </div>
                            <div className="pokemon-card-stat">
                                {selectedPokemon.stats.atk}
                            </div>
                            <div className="pokemon-card-stat">
                                {selectedPokemon.stats.def}
                            </div>
                            <div className="pokemon-card-stat">
                                {selectedPokemon.stats.hp}
                            </div>
                        </div>
                        <div className="pokemon-card-moves">
                            <div className="pokemon-card-fasts">
                                {
                                    selectedPokemon.moves.fastMoves.map(fast => {
                                        return (
                                            <div style={{ background: `rgb(${TYPE_COLORS[fast.type].red}, ${TYPE_COLORS[fast.type].green}, ${TYPE_COLORS[fast.type].blue})` }} className="pokemon-card-fast">
                                                {fast.moveId.replaceAll("_", " ")}
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <div className="pokemon-card-charges">
                                {
                                    selectedPokemon.moves.chargedMoves.map(charge => {
                                        return (
                                            <div style={{ background: `rgb(${TYPE_COLORS[charge.type].red}, ${TYPE_COLORS[charge.type].green}, ${TYPE_COLORS[charge.type].blue})` }} className="pokemon-card-charge">
                                                {charge.moveId.replaceAll("_", " ")}
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className="pokemon-card-buttons">
                            <button className="lighter" onClick={() => { setSelectedPokemon(null) }}>Cancel</button>
                            <button className="lighter" onClick={!substituting ? selectPokemon : subsitutePokemon}>{substituting ? "Substitute" : room.ban_rounds[Math.floor(room.choosed_list.length / room.players.length)] ? "Ban" : "Select"}</button>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
};

export default Room;