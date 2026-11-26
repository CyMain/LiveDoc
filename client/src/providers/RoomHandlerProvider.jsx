import { createContext, useContext, useState } from "react";

const RoomContext = createContext(null)

function RoomHandlerProvider({children}){
    const [inRoom, setInRoom] = useState(false)
    const [room_name, setRoomName] = useState("")


    const value = {
        inRoom,
        setInRoom,
        room_name,
        setRoomName
    }

    return(
        <>
            <RoomContext value={value}>
                {children}
            </RoomContext>
        </>
    )
}

export function useRoomContext(){
    const context = useContext(RoomContext)
    if (!context){
        throw new Error("useRoomContext needs to be user in a RoomHandlerProvider")
    }

    return context;
}