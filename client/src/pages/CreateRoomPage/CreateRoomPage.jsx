import { useState } from "react"
import { usePageHandler } from "../../providers/PageHandlerProvider"

export default function CreateRoomPage(){
    const [passworded, setPassworded] = useState(false)
    const {toEditRoom, changePage} = usePageHandler()

    function backToHome(){
        changePage("home")
    }

    function togglePassworded(){
        const target_checkbox = document.getElementById("passworded-checkbox")
        setPassworded(target_checkbox.checked)
    }

    return(
        <>
            <button
                className="quick-link-btn"
                onClick={backToHome}
            >
                <a href="">Back</a>
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

            <button
                onClick={toEditRoom}
            >Create Room</button>
        </>
    )
}