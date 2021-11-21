import './App.css';
import Header from './components/generic/header/Header';
import MainBackground from './components/generic/mainBackground/MainBackground';
import PostContainer from './components/post/postContainer/PostContainer';
import Footer from './components/generic/footer/Footer';

function App() {
  return (
    <div className="App">
      <Header />
      <MainBackground />
      
      <PostContainer />
      <Footer />
    </div>
  );
}

export default App;
