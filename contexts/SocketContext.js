import React, { useState, createContext, useContext, useEffect } from 'react';
import { useSetRoom } from './RoomContext';
import { io } from 'socket.io-client';

const SocketContext = createContext(null);
const UpdateSocketContext = createContext(null);

const useSocket = () => {
    return useContext(SocketContext);
}

const useSetSocket = () => {
    return useContext(UpdateSocketContext);
}

const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(io());
    const setRoom = useSetRoom();
    useEffect(() => {
        socket.on("updateRoom", room => {
            setRoom(room);
        });
    }, [setRoom]);
    return (
        <SocketContext.Provider value={socket}>
            <UpdateSocketContext.Provider value={setSocket}>
                {socket && children}
            </UpdateSocketContext.Provider>
        </SocketContext.Provider>
    )
}

export default SocketContextProvider;
export { SocketContext, useSocket, useSetSocket };