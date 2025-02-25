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
          <form action="#" class="form-container">
            <div className="input-box">
              <select name="posts" id="posts">
                <option value="">Seleziona post</option>
                {
                  posts.map(p => <option value={p.id} key={p.id}>{p.title}</option>)
                }
                
              </select>
              <button class="search">Cerca</button>
            </div>
            <div className="input-box">
              <select name="user" id="user">
                <option value="">Seleziona utente</option>
                {
                  users.map(u => <option value={u.id} key={u.id}>{u.name}</option>)
                }

              </select>
              <button class="search">Cerca</button>
            </div>
            
          </form>
          <ul className="card-box">
              {
                posts.map(post =>
                    <li className="post-card" key={post.id}>
                      <header className="post-header">
                        <small>{post.userId} ha pubblicato:</small>
                        <small className="btn-box">
                          <Link to={`/post/${post.id}`} className="btn btn-link">
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
