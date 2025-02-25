import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import './index.css';
import './App.css';

function App() {
  //const [count, setCount] = useState(0)
  
  //API relative ai post e agli utenti
  const postsUrl = 'https://jsonplaceholder.typicode.com/posts';

  const usersUrl = 'https://jsonplaceholder.typicode.com/users';

  //gestione di utenti e post
  const [posts, setPosts] = useState([]);

  const [users, setUsers] = useState([]);

  //gestione della selezione di utenti e post
  const [userSelected, setUserSelected] = useState("");

  const [filteredPosts, setFilteredPosts] = useState([]);

  //creazione dell'endpoint per ricevere i dati dei post
  useEffect(() => {
    const getPosts = async () => {
      const response = await fetch(postsUrl);
      const data = await response.json();
      setPosts(data);
    };
    getPosts();
  }, []);

  //endpoint che riceve i dati degli utenti
  useEffect(() => {
    const getUsers = async () => {
      const response = await fetch(usersUrl);
      const data = await response.json();
      setUsers(data);
    };
    getUsers();
  }, []);
  
  useEffect(() => {
    if (userSelected) {
      setFilteredPosts(posts.filter((post) => post.userId === userSelected));
    } else {
      setFilteredPosts([]);
    }
  }, [userSelected, posts]);

  const changeUser = (e) => {
    setUserSelected(e.target.value ? parseInt(e.target.value) : null || "")
  }

  return (
    <>
      <div>
        <main>
          <h1>PostMania</h1>

          <div className="form-container">

            {/* select che elenca i nomi degli utenti */}
            <div className="input-box">
              <select name="user" id="user" onChange={changeUser}>
                <option value="">Seleziona utente</option>
                {
                  users.map(u => <option value={u.id} key={u.id}>{u.name}</option>)
                }
              </select>
             
            </div>

            {/* select che elenca i nomi dei post */}
            <div className="input-box">
              <select name="posts" id="posts">
                <option value="">Seleziona post</option>
                {
                  filteredPosts.map(p => <option value={p.id} key={p.id}>{p.title}</option>)
                }
                
              </select>
              
            </div>
            
          </div>

          {/* cards che presentano i post presenti */}
          <ul className="card-box">
              {
                filteredPosts.map(post =>
                    <li className="post-card" key={post.id}>
                      <header className="post-header">
                        <small>{post.userId} ha pubblicato:</small>
                        <small className="btn-box">

                          {/* React router che rimanda al singolo post */}
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
