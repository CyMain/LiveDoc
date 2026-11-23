import { useEffect } from "react"

function RibbonOption ({ option_data }){
    function option_function(){
        option_data.option_function
    }

    return(
        <>
            <li
                className="ribbon-option"
                onClick={option_function}
            >
                { option_data.option_name }
            </li>
        </>
    )
}

function Ribbon( { ribbon_data } ){
    const room_name = ribbon_data.room_name
    const room_users = ribbon_data.room_users

    const ribbon_options = [
        {
            option_name:"Chat",
            option_function: ()=>{console.log("chat section opens")},
        },
        {
            option_name:"Download",
            option_function:()=>{console.log("You download the current state of the file and the platform auto saves")},
        },
        {
            option_name:"Save",
            option_function:()=>{console.log("You manually save. No idea why you'd do that.")}
        }
    ]

    return(
        <>
            <div className="ribbon">
                <div className="top">
                    <div className="top">
                        <h1>{room_name}</h1>
                        <span>Users:{room_users}</span>
                    </div>
                    <button className="leave_room_btn">
                        Leave Room
                    </button>
                </div>
                <div className="bottom">
                    <ul className="ribbon-options">
                        {
                            ribbon_options.map(
                                (option)=>{
                                    return(
                                        <>
                                            <RibbonOption option_data={option}/>
                                        </>
                                    )
                                }
                            )
                        }
                    </ul>
                </div>
            </div>
        </>
    )
}

export default function EditingPage({ room_data, changePage }){
    const this_room_data = {
        room_name:"Greetings",
        room_users:1,
        active_file:"none", //To be used for the download feature
    }

    useEffect(()=>{
        console.log("editing room open")
    }, [])    

    return(
        <>
            <Ribbon
                ribbon_data={{
                    room_name:this_room_data.room_name,
                    room_users:this_room_data.room_users
                }}
            />
        </>
    )
}