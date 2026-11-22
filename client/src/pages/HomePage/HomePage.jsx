function SocialsLinks(){
    return(
        <>
            <ul>
                <li>
                    <a href="#">LinkedIn</a>
                </li>
                <li>
                    <a href="#">Github</a>
                </li>
            </ul>
        </>
    )
}

export default function HomePage({ changePage }){

    function toCreatePage(){
        changePage("create")
    }

    function toRoomsListPage(){
        changePage("rooms")
    }

    return(
        <>
            <h1>LiveDoc</h1>
            <span>work on files and documents with colleagues or partners!</span>
            <br />
            <input
                type="text"
                placeholder="default:User"
                />
            <button
                className="create-room-button"
                onClick={toCreatePage}
            >
                Create a Room
            </button>
            <button
                className="rooms-list-button"
                onClick={toRoomsListPage}
            >
                Join a Room
            </button>

            <SocialsLinks/>

        </>
    )
}