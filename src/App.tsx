import { Route, Routes } from 'react-router';
import MainPage from './components/page/MainPage';
import PostsPage from './components/page/PostsPage';
import PostPage from './components/post/PostPage/PostPage';


function App() {
  return (
    <div style={{background: "#d9d9d9"}}>
      <Routes>
        <Route path="/" element={<MainPage/>}/>
        <Route path="/posts" element={<PostsPage/>} />
        <Route path="/post" element={<PostPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
