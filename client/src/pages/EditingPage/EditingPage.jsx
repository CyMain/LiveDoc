import { useEffect, useRef, useState } from "react"
import { usePageHandler } from "../../providers/PageHandlerProvider"
import { useRoomContext } from "../../providers/RoomHandlerProvider"
import "./EditingPage.css"
import Editor from "@monaco-editor/react";

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
                <div className="background-shape"></div>
                <span>
                    { option_data.option_name }
                </span>
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

    const {changePage} = usePageHandler()

    
    function handleLeave(){
        changePage("home")
    }

    return(
        <>
            <div className="ribbon">
                <div className="top">
                    <div className="top">
                        <h1 className="room-name">{room_name}</h1>
                        <span>Users:{room_users}</span>
                    </div>
                    <button
                        className="leave-room-btn"
                        onClick={handleLeave}
                    >
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

function EditingArea({ active_file_data }){
    console.log("rendering editor...")
    const [currContent, setCurrContent] = useState(active_file_data.file_content)

    function handleTextChange(e){
        setCurrContent(e.target.value)
    }

    // rendering or mounting
    if (active_file_data.file_ext == "py"){
        return(<>
            <div className="editor-wrapper">
                <Editor
                    height={"100dvh"}
                    width={"100%"}
                    value={active_file_data.file_content}
                    language={"python"}
                    theme="vs-dark"
                />
            </div>
        </>)
    } else if( active_file_data.file_ext == "txt"){
         return (<>
         <div className="">
            <textarea 
                name=""
                id=""
                value={currContent}
                onChange={handleTextChange}
            ></textarea>
         </div>
        </>)
    }
    
}

export default function EditingPage(){
    const [this_room_data, set_this_room_data] = useState({
        room_name:"Greetings",
        room_users:1,
        active_file:"none", //To be used for the download feature
    })
    const {editRoomData} = usePageHandler()
    let files_breakdown = null

    const {room_files, filesBreakdown} = useRoomContext() 

    useEffect(()=>{
        if (editRoomData){
            set_this_room_data((prev)=>({
                ...prev,
                ...editRoomData
            }))
        }
        console.log("editing room open")
        console.log("room_data: ", this_room_data)
        console.log("picked_room_data: ", editRoomData)
    }, [editRoomData])    

    useEffect(()=>{
        if (room_files){
            console.log("Room Files: ", room_files)
            async function loadBreakdown(){
                const promiseList = filesBreakdown()
                files_breakdown = await Promise.all(promiseList)
                console.log("Files Breakdown: ", files_breakdown)
                set_this_room_data((prev)=>({
                    ...prev,
                    active_file: files_breakdown[0]
                }))
            }

            loadBreakdown()
        }

    },[room_files])

    return(
        <>
            <Ribbon
                ribbon_data={{
                    room_name:this_room_data.room_name,
                    room_users:this_room_data.room_users
                }}
            />

            <div className="">
                <EditingArea
                    active_file_data={this_room_data.active_file}
                />
            </div>
        </>
    )
}