import React, { useState, createContext, useContext } from 'react';

const RoomContext = createContext(null);
const UpdateRoomContext = createContext(null);

const useRoom=()=>{
    return useContext(RoomContext);
}

const useSetRoom=()=>{
    return useContext(UpdateRoomContext);
}

const RoomContextProvider = ({ children }) => {
    const [room, setRoom] = useState(null);
    return (
        <RoomContext.Provider value={room}>
            <UpdateRoomContext.Provider value={setRoom}>
                {children}
            </UpdateRoomContext.Provider>
        </RoomContext.Provider>
    )
}

export default RoomContextProvider;
export { RoomContext, useRoom, useSetRoom };