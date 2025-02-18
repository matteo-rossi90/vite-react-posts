import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import './index.css';
import './App.css';

function App() {
  //const [count, setCount] = useState(0)
  
  //inserire l'url dell'api relativa ai post
  const postsUrl = 'https://jsonplaceholder.typicode.com/posts';

  const usersUrl = 'https://jsonplaceholder.typicode.com/users';

  const [posts, setPosts] = useState([]);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    
    const getPosts = async () => {
      const posts = await fetch(postsUrl)
        .then(res => res.json())
        setPosts(posts.slice(0,35))
        
    }
    getPosts()
    return () => {
    }
  }, [])

  useEffect(() => {

    const getUsers = async () => {
       const users = await fetch(usersUrl)
         .then(res => res.json())
       setUsers(users)

     }
     getUsers()
     return () => {
     }
   }, [])
  

  return (
    <>
      <div>
        <main>
          <h1>PostMania</h1>
          <ul className="card-box">
              {
                posts.map(post =>
                    <li className="post-card" key={post.id}>
                      <header className="post-header">
                        <small>{post.userId} ha pubblicato:</small>
                        <small className="btn-box">
                          <Link to={`/post/${post.id}`} className="btn-link">
                            <span>Visualizza</span>
                          </Link>
                        </small>
                      </header>
                      
                      <h3>{post.title}</h3>
                      <p>{post.body}</p>
                    </li>
                  )
              }
          </ul>
        </main>
        
      </div>
    </>
  )
}

export default App
