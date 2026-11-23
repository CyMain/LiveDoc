import { useState, useContext, createContext } from "react";

const PageContext = createContext(null)
const default_edit_room_data = {
  room_name:"John's Room",
  room_users:1
}

export function PageHandlerProvider({ children }){
    const [page, setPage] = useState("home")
    const [editRoomData, setEditRoomData] = useState(default_edit_room_data)

    function toEditRoom(data=null){
    changePage("edit")
        if (data){
            setEditRoomData(data)
        }
    }

    function changePage(targetPage){
    setPage(targetPage)
    }

    const value = {
        page,
        changePage,
        toEditRoom,
        editRoomData
    }

    return(
        <>
            <PageContext value={value}>
                {children}
            </PageContext>
        </>
    )
}

export function usePageHandler(){
    const context = useContext(PageContext)
    if (!context){
        throw new Error("usePageHandler needs to be used inside a PageHandlerProvider")
    }
    return context;
}