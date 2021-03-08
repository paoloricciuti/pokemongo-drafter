import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Footer from '../../components/Footer';
import Logo from '../../components/Logo';
import { useRoom, useSetRoom } from '../../contexts/RoomContext';
import { useSocket } from '../../contexts/SocketContext'
import useApi from '../../hooks/useApi'
import { useRouterState } from '../../contexts/RouterContext';

const JoinRoom = props => {
    const router= useRouter();
    const { link } = router.query;
    const icon = useRef();
    const [room, setRoom] = useState(null);
    const api = useApi();
    const socket = useSocket();
    const [username, setUsername] = useState("");
    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };
    const [password, setPassword] = useState("");
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };
    const [routerState, setRouterState] = useRouterState();
    const [roomPassword, setRoomPassword] = useState(routerState ? routerState.password : "");
    const handleRoomPasswordChange = (e) => {
        setRoomPassword(e.target.value);
    };
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [roomPasswordError, setRoomPasswordError] = useState("");
    const globalRoom = useRoom();
    const sha256 = async (message) => {
        const encoder = new TextEncoder();
        const data = encoder.encode(message);
        const hash = await crypto.subtle.digest('SHA-256', data);
        let binary = '';
        const bytes = new Uint8Array(hash);
        const len = bytes.byteLength;
        for (let i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return btoa(binary);
    }
    const copyLink = async () => {
        await navigator.clipboard.writeText(`${window.location.href}`);
        icon.current.classList.add("copied");
    }
    const joinRoom = async (e) => {
        e.preventDefault();
        setPasswordError("");
        setUsernameError("");
        setRoomPasswordError("");
        if (await sha256(roomPassword) != room.password) {
            setRoomPasswordError("Wrong room Password");
            return;
        }
        if (!/^\w+$/.test(username)) {
            setUsernameError("Username can't contain spaces or special characters and can't be blank");
            return;
        }
        if (password == "") {
            setPasswordError("Password can't be blank");
            return;
        }
        socket.emit("joinRoom", { username, password, room: link })
    };
    const joinAsSpectator = async () => {
        setPasswordError("");
        setUsernameError("");
        setRoomPasswordError("");
        socket.emit("joinRoomSpec", { room: link })
    };
    useEffect(() => {
        if(!link) return;
        const getRoomAsync = async () => {
            let room = await api(`rooms/${link}`, "GET");
            setRoom(room);
        };
        if (routerState) {
            setRoom(routerState.room);
        } else {
            getRoomAsync();
        }
        socket.on("error", message => {
            if (message == "Wrong password") {
                setPasswordError("Wrong password")
            } else {
                setRoomPasswordError(message);
            }
        });
    }, [link]);
    useEffect(() => {
        if (globalRoom != null) {
            setRouterState(username);
            router.push(`/room/${globalRoom.link}`);
        }
    }, [globalRoom])
    return (
        room && <div className="main">
            <div className="container">
                <Logo />
                <Footer />
                <h3>
                    {!(room.ok === false) ? `Joining room ${room.name}` : `No room with name ${link}`}
                </h3>
                {!(room.ok === false) && (
                    <>
                        <button type="button" onClick={joinAsSpectator}>Join as Spectactor</button>
                        <span style={{ fontStyle: "italic", display: "block", marginTop: 0 }}>or</span>
                        <p className="explanation">
                            Choose your Username and Password, you'll need them to come back later!
                        </p>
                        <form onSubmit={joinRoom}>
                            <input placeholder="Username" type="text" value={username} onChange={handleUsernameChange} />
                            {usernameError != "" && <div className="error">
                                {usernameError}
                            </div>}
                            <input placeholder="Password" type="password" value={password} onChange={handlePasswordChange} />
                            {passwordError != "" && <div className="error">
                                {passwordError}
                            </div>}
                            <p className="explanation">
                                Share the following link and the room password with your friends to let them join the draft!
                            <code className="share-link" onClick={copyLink}>
                                    <span className="link">
                                        {window.location.href}
                                    </span>
                                    <i ref={icon} className="material-icons right">content_copy</i>
                                </code>
                            </p>
                            {
                                !routerState &&
                                <>
                                    <input placeholder="Room Password" type="password" value={roomPassword} onChange={handleRoomPasswordChange} />
                                    {roomPasswordError != "" && <div className="error">
                                        {roomPasswordError}
                                    </div>}
                                </>
                            }
                            <button type="submit">Join</button>


                        </form>
                    </>
                )
                }
            </div>
        </div>
    )
};

export default JoinRoom;