import { Route, Routes } from 'react-router';
import LoginPage from './components/page/LoginPage/LoginPage';
import MainPage from './components/page/MainPage';
import PostsPage from './components/page/PostsPage';
import SignupPage from './components/page/SigupPage/SignupPage';
import PostCreatePage from './components/post/PostCreatePage/PostCreatePage';
import PostPage from './components/post/PostPage/PostPage';
import { useState} from 'react'

// export type Account = {
//   gmail: string,
//   password: string
// }



function App() {



  return (
    <div style={{background: "#d9d9d9"}}>
      <Routes>
        <Route path="/" element={<MainPage/>} />
        <Route path="/posts" element={<PostsPage/>} />
        <Route path="/post" element={<PostPage/>}/>
        <Route path="/postCreate"  element={<PostCreatePage/>}/>
        <Route path="/login" element={<LoginPage />}  />

        <Route path="/signup" element={<SignupPage />} />
      </Routes>
      
    </div>
  );
}

export default App;
