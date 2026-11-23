import { LockKeyholeIcon } from "lucide-react";
import { useState } from "react"
import { usePageHandler } from "../../providers/PageHandlerProvider";

function PasswordPrompt(){
    return(
        <>
            <label htmlFor="">
                Password: <input type="text" />
            </label>
        </>
    )
}

function RoomListItem({ room_data }){
    const { toEditRoom } = usePageHandler()

    function handleToEdit(){
        const data = {
            room_name: room_data.room_name,
            room_users: 1
        }
        toEditRoom(data)
    }

    return(
        <>
            <div className="room-list-item">
                <div className="top">
                    <h3>{room_data.room_name}</h3>
                    <button
                        className="join-room-btn"
                        onClick={handleToEdit}
                    >JOIN</button>
                </div>
                <div className="bottom">
                    {
                        room_data.passworded && ( <LockKeyholeIcon/> )
                    }
                </div>
            </div>

        </>
    )
}

function RoomsList(){
    const [rooms, setRooms] = useState([
        {
            room_name:"Nuh-uh 1",
            passworded: true,
        },
        {
            room_name:"Nuh-uh 2",
            passworded: true,
        },
        {
            room_name:"Nuh-uh 3",
            passworded: false,
        }
    ])

    return(
        <>
            <div className="rooms-list-container">
                <ul className="rooms-list">
                    {
                        rooms.map((room)=>{
                            return(
                                <>
                                    <RoomListItem room_data={room}/>
                                </>
                            )
                        })
                    }
                </ul>
            </div>
        </>
    )
}

export default function RoomsListPage(){
    const { changePage } = usePageHandler()


    function backToHome(){
        changePage("home")
    }

    return(
        <>
            <button
                onClick={backToHome}>
                <a href="">Back</a>
            </button>

            <h1>Select A Room</h1>
            <label htmlFor="">
                id:<input type="text" />
            </label>

            <label htmlFor="">
                name: <input type="text" />
            </label>

            <RoomsList/>

            <button>Refresh</button>
        </>
    )
}