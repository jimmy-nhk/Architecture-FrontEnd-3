import { Route, Routes } from 'react-router-dom';
import LoginPage from './components/page/LoginPage/LoginPage';
import MainPage from './components/page/MainPage';
import PostsPage from './components/page/PostsPage';
import SignupPage from './components/page/SigupPage/SignupPage';
import PostCreatePage from './components/post/PostCreatePage/PostCreatePage';
import PostPage from './components/post/PostPage/PostPage';
import { useState, useEffect} from 'react'
import axios from 'axios';
import { TokenStorageService } from './app/service/token-storage.service';
import ProfilePage from './components/user/ProfilePage/ProfilePage';

export type Account = {
  gmail: string,
  password: string
}



function App() {

  const [account, setAccount] = useState<Account | null>(null)

  let tokenStorage = new TokenStorageService()

  useEffect(() => {

    console.log(account?.gmail + " gmail")

    axios.interceptors.request.use(request =>{

      if (tokenStorage.getToken()){
        // request.headers.common.Authorization = `Bearer ${tokenStorage.getToken()}`
        if (request.headers){
          request.headers['Authorization'] = `Bearer ${tokenStorage.getToken()}`
        }
      }
      return request
    })


  }, [account])

  const  randomGen = () : number => {
    var number = Math.random()
    console.log(number)
    return number
  }

  return (
    <div>
      <Routes>
        <Route path="/" element={<MainPage account={account} setAccount={setAccount}/>} />
        <Route path="/posts/:category" element={<PostsPage />} />
        <Route path="/post/:id" element={<PostPage/>} />
        
        <Route path="/postCreate"  element={<PostCreatePage/>} />
        

        <Route path="/user"  element={<ProfilePage/>}/>
        <Route path="/login" element={<LoginPage setAccount={setAccount}/>}  />
        <Route path="/signup" element={<SignupPage />} />
       </Routes>
      
    </div>
  );
}

export default App;
