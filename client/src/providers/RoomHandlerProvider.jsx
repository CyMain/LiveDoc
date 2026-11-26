import { createContext, useContext, useState } from "react";

const RoomContext = createContext(null)

function RoomHandlerProvider({children}){
    const [inRoom, setInRoom] = useState(false)
    const [room_name, setRoomName] = useState("")
    const [room_id, setRoomID] = useState("")
    const [roomPassword, setRoomPassword] = useState("")
    const [room_files, setRoomFiles] = useState(null)


    const value = {
        inRoom,
        setInRoom,
        room_name,
        setRoomName,
        room_id,
        setRoomID,
        roomPassword,
        setRoomPassword,
        room_files,
        setRoomFiles
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