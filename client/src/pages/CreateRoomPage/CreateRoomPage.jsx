import { useEffect, useState } from "react"
import { usePageHandler } from "../../providers/PageHandlerProvider"
import { useRoomContext } from "../../providers/RoomHandlerProvider"

export default function CreateRoomPage(){
    const [passworded, setPassworded] = useState(false)
    const {toEditRoom, changePage} = usePageHandler()

    const {room_files, setRoomFiles} = useRoomContext()

    useEffect(()=>{
        console.log("room_files: ", room_files)
    }, [room_files])

    function backToHome(){
        changePage("home")
    }

    function togglePassworded(){
        const target_checkbox = document.getElementById("passworded-checkbox")
        setPassworded(target_checkbox.checked)
    }

    function handleUpload(e){
        const files = [...e.target.files];
        if (!files) return;
        setRoomFiles(files)
        console.log("Selected files: ", files)
    }

    return(
        <>
            <button
                className="quick-link-btn"
                onClick={backToHome}
            >
                Back
            </button>
            <h1>Create Your Room</h1>
            <label htmlFor="">Room Name:</label>
            <input
                type="text"
                placeholder="Enter a Room Name"
            />
            
            <label htmlFor="">Room ID:</label>
            <input
                type="text"
                placeholder="Enter a Room Name"
            />

            
            <input
                type="checkbox"
                name="passworded-checkbox"
                id="passworded-checkbox"
                onClick={togglePassworded}
            /> Password protected

            {passworded ? (
                <>
                    <label htmlFor="">Password:</label>
                    <input
                        type="text"
                        placeholder="Enter a password for your room"
                    />
                </>
                ) : ""
            }

            <label htmlFor="">
                Upload a file: 
                <input
                    type="file"
                    multiple
                    name=""
                    id=""
                    onChange={handleUpload}            
                />
            </label>

            <button
                onClick={toEditRoom}
            >Create Room</button>
        </>
    )
}