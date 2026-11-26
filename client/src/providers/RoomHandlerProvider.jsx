import { createContext, useContext, useState } from "react";

const RoomContext = createContext(null)


function getFileExtension(fileName, { lowercase = true } = {}){
    if (typeof fileName !== "string") return "";

    const baseName = fileName.split(/[\\/]/).pop() ?? "";
    const dotIndex = baseName.lastIndexOf(".");

    //dotIndex <= 0 covers no dot(-1) and leading-dot names like ".gitignore" or ".env"
    if (dotIndex<=0 || dotIndex === baseName.length - 1){
        return "";
    }

    const ext = baseName.slice(dotIndex + 1);
    return lowercase ? ext.toLowerCase() : ext;
}


export function RoomHandlerProvider({children}){
    const [inRoom, setInRoom] = useState(false)
    const [room_name, setRoomName] = useState("")
    const [room_id, setRoomID] = useState("")
    const [roomPassword, setRoomPassword] = useState("")
    const [room_files, setRoomFiles] = useState([])


    function filesBreakdown(){
        const file_breakdown = room_files.map(async (file)=>{
            const file_text = await file.text()
            
            const file_data = {
                file_name: file.name,
                file_ext: getFileExtension(file.name),
                file_content: file_text
            }

            return file_data
        })

        return file_breakdown;
    }

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
        setRoomFiles,
        filesBreakdown
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