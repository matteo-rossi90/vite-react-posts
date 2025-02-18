import { React } from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import './index.css'
import './PostDetails.css'

function PostDetails(){

    const { id } = useParams();

    const postsUrl = "https://jsonplaceholder.typicode.com/posts";
    const commentsUrl = "https://jsonplaceholder.typicode.com/comments";

    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const getPost = async () => {
            try {
                const res = await fetch(`${postsUrl}/${id}`);
                if (!res.ok) throw new Error("Errore nel recupero del post");
                const data = await res.json();
                console.log("Post trovato:", data); // Debug
                setPost(data);
            } catch (error) {
                console.error(error);
            }
        };
        getPost();
    }, [id]);

    useEffect(() => {
        const getComments = async () => {
            try {
                const res = await fetch(`${commentsUrl}?postId=${id}`);
                if (!res.ok) throw new Error("Errore nel recupero dei commenti");
                const data = await res.json();
                console.log("Commenti trovati:", data); // Debug
                setComments(data);
            } catch (error) {
                console.error(error);
            }
        };
        getComments();
    }, [id]);

    return(
        <div className="card-box">
            <div className="post-card">
                <h2>Dettagli di {post.title}</h2>
                <p>{post.body}</p>
            </div>
            <div className="post-card">
                <h2>Commenti:</h2>
                <ul>
                    {comments.length > 0 ? (
                        comments.map((comment) => (
                            <li key={comment.id} className="">
                                <strong>
                                    {comment.name}
                                </strong>
                                <p>{comment.body}</p>
                            </li>
                        ))
                    ) : (
                        <p>Ancora nessun commento</p>
                    )
                    }
                </ul>
            </div>
        </div>
    )
}

export default PostDetails