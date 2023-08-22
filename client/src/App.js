import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux';

// components
import './App.css'
import Header from './components/Header';
import HomePage from './pages/HomePage';
import VideoPage from './pages/VideoPage'
import SignIn from './pages/SignIn';
import SideBar from './pages/SideBar';
import ChannelPage from './pages/ChannelPage';
import UploadVideo from './pages/UploadVideo';
import { checkLogged } from './auth/auth'
import { userInfo } from './redux/action';
import ChannalList from './pages/ChannalList';
import UpdateChannalPage from './pages/UpdateChannalPage';

function App() {
  const [darkMode, setDarkMode] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    async function getUser(){
      const response = await checkLogged();

      if (response === null) {

        dispatch(userInfo(null))
      } else {
        // const user = await response.json()
        dispatch(userInfo(response))
        console.log('user: ', response)
      }
    }

    getUser()
  }, [dispatch])

  return (
    <BrowserRouter>
      <div className={darkMode ? 'App' : 'App light'}>
        <Header darkMode={darkMode}/>
        <SideBar setDarkMode={setDarkMode} darkMode={darkMode} />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/video'>
            <Route path=':id' element={<VideoPage />} />
            <Route path='upload' element={<UploadVideo />} />
            {/* <Route path='/update/:id' element={<VideoPage />} /> */}
          </Route>
          <Route path='/channel'>
            <Route path=':id' element={<ChannalList />} />
            <Route path='create' element={<ChannelPage />} />
            <Route path='update'  > 
                <Route path=':id' element={<UpdateChannalPage />} />
            </Route>
          </Route>
          <Route path='/sign-in' element={<SignIn />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
