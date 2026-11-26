import HomePage from './pages/HomePage/HomePage';
import CreateRoomPage from './pages/CreateRoomPage/CreateRoomPage';
import RoomsListPage from './pages/RoomsListPage/RoomsListPage';
import EditingPage from './pages/EditingPage/EditingPage';
import { PageHandlerProvider } from './providers/PageHandlerProvider';
import { RoomHandlerProvider } from './providers/RoomHandlerProvider';
import './App.css';
import { usePageHandler } from './providers/PageHandlerProvider';


function AppContent(){
  const {page, changePage}= usePageHandler()

  if (page === "home") {
    return <HomePage />;
  } else if (page === "create") {
    return <CreateRoomPage />;
  } else if (page === "rooms") {
    return <RoomsListPage />;
  } else if (page === "edit") {
    return <EditingPage />;
  } else {
    return (
      <>
        <h1>wRONG PAGE BRAH</h1>
        <button onClick={() => changePage("home")}>Back To Home</button>
      </>
    );
  }
}

function App() {
  return(
    <>
      <PageHandlerProvider>
        <RoomHandlerProvider>
          <AppContent/>
        </RoomHandlerProvider>
      </PageHandlerProvider>
    </>
  )
}

export default App
