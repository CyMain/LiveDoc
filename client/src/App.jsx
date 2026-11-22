import HomePage from './pages/HomePage/HomePage'
import { useState } from 'react'
import './App.css'

function App() {
  const [page, setPage] = useState("home")

  function changePage(targetPage){
    setPage(targetPage)
  }

  if (page === "home"){
    return (
      <>
        <HomePage
          changePage={changePage}
        />
      </>
    )
  }else if(page === "create"){
    return (
      <>
        <CreateRoomPage
          changePage={changePage}
        />
      </>
    )
  }else if(page === "rooms"){
    return (
      <>
        <RoomsListPage
          changePage={changePage}
        />
      </>
    )
  }else if(page === "edit"){
    return (
      <>
        <EdittingPage
          changePage={changePage}
        />
      </>
    )
  }else {
    return(
      <>
        <h1>wRONG PAGE BRAH</h1>
        <button
          onClick={()=>changePage("home")}
        >Back To Home</button>
      </>
    )
  }

}

export default App
