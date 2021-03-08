import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Footer from '../components/Footer';
import Logo from '../components/Logo';
import Menu from '../components/Menu';
import useApi from '../hooks/useApi';
import { useRouterState } from '../contexts/RouterContext';

const Home = props => {
  const [roomName, setRoomName] = useState("");
  const handleRoomChange = (e) => {
    setRoomName(e.target.value);
  };
  const [password, setPassword] = useState("");
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const [roomError, setRoomError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const api = useApi();
  const router = useRouter();
  const [routerState, setRouterState] = useRouterState();
  const createRoom = async (e) => {
    e.preventDefault();
    setPasswordError("");
    setRoomError("");
    if (password == "") {
      setPasswordError("Password can't be blank");
      return;
    }
    if (!/^(\w|\s)+$/.test(roomName)) {
      setRoomError("Room name can't contain special characters and can't be blank");
      return;
    }
    let room = await api("rooms", "POST", {
      name: roomName,
      password: password
    });
    if (room.error) {
      setRoomError("A room with the same name already exists, try another one")
    } else {
      setRouterState({ room, password });
      router.push(`/joinroom/${room.link}`);
    }
  };
  return (
    <div className="main">
      <div className="container">
        <Logo />
        <Footer />
        <Menu href="/articles" name="Articles" icon="article"/>
        <h3>
          Welcome to Pokemon Go drafter, the definitive tool to create a draft tournament with your friends.
                </h3>
        <p className="explanation">
          Choose a room name and a room password, share the link and the password with friends and start drafting.
                </p>
        <form onSubmit={createRoom}>
          <input placeholder="Room Name" type="text" value={roomName} onChange={handleRoomChange} />
          {roomError != "" && <div className="error">
            {roomError}
          </div>}
          <input placeholder="Room Password" type="password" value={password} onChange={handlePasswordChange} />
          {passwordError != "" && <div className="error">
            {passwordError}
          </div>}
          <button type="submit">Create Room</button>
        </form>
      </div>
    </div>
  )
};

export default Home;