import { Auth_signup, Auth_login, Chat, NavBar } from './components';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import { ChatContextProvider } from './context/chatContext';


function App() {

  const { user } = useContext(AuthContext);

  return (
    <ChatContextProvider user={user}>
      <NavBar />
      <Container className='text-secondary'>
        <Routes>
          <Route path='/' element={user ? <Chat /> : <Auth_signup />} />
          <Route path='/authSignup' element={user ? <Chat /> : <Auth_signup />} />
          <Route path='/authlogin' element={user ? <Chat /> : <Auth_login />} />
        </Routes>
      </Container>
    </ChatContextProvider>
  );
}

export default App;
