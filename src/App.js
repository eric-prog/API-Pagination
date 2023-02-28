// import logo from './logo.svg';
import { useEffect, useState } from "react";
import Posts from "./components/Posts";
import Pagination from "./components/Pagination";
import './App.css';

function App() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage] = useState(10)

  useEffect(() => {
    const getData = async () => {
      setLoading(true)
      const response = await fetch("https://jsonplaceholder.typicode.com/posts");
      const responseData = await response.json()
      setPosts(responseData)
      setLoading(false)
    }

    getData()
  }, []) // without dependencies it would loop forever

  // get posts
  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPost = posts.slice(indexOfFirstPost, indexOfLastPost)

  const paginate = (number) => {
    setCurrentPage(number)
  }

  return (
    <div className="App">
       <Posts loading={loading} posts={currentPost} />
       <Pagination postsPerPage={postsPerPage} totalPosts={posts.length} paginate={paginate} />
    </div>
  );
}

export default App;
