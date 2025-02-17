import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  //const [count, setCount] = useState(0)
  
  //inserire l'url dell'api relativa ai post
  const postsUrl = 'https://jsonplaceholder.typicode.com/posts';

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    
    const getPosts = async () => {
      const posts = await fetch(postsUrl)
        .then(res => res.json())
        setPosts(posts.slice(0,10))
        
    }
    getPosts()
    return () => {
    }
  }, [])
  

  return (
    <>
      <div>
        <main>
          <h1>PostMania</h1>
          <ul>
            {
              posts.map(post => 
                <li className="post-card" key={post.id}>
                <h3>{post.title}</h3>
                <p>{post.body}</p>
              </li>)
            }
          </ul>
        </main>
        
      </div>
    </>
  )
}

export default App
