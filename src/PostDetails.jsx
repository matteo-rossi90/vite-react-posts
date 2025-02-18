import { React } from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './index.css';
import './PostDetails.css';

function PostDetails(){

    const { id } = useParams();

    const postsUrl = "https://jsonplaceholder.typicode.com/posts";
    const commentsUrl = "https://jsonplaceholder.typicode.com/comments";

    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);

    function strChar(str) {
        return str[0].toUpperCase()
    }

    useEffect(() => {
        const getPost = async () => {
            try {
                const res = await fetch(`${postsUrl}/${id}`);
                if (!res.ok) throw new Error("Errore nel recupero del post");
                const data = await res.json();
                console.log("Post trovato:", data); 
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
                console.log("Commenti trovati:", data); 
                setComments(data);
            } catch (error) {
                console.error(error);
            }
        };
        getComments();
    }, [id]);

    return(
        <div className="container">
            <div className="card-box">
                <div className="post-details">
                    <h2>{post.title}</h2>
                    <p>{post.body}</p>
                </div>
                <div className="post-details">
                    <h2>Commenti:</h2>
                    <ul className="comment-list">
                        {comments.length > 0 ? (
                            comments.map((comment) => (
                                <li key={comment.id} className="comment-line">
                                    <div className="box-avatar">
                                        <div className="avatar">
                                            <h2>{strChar(comment.name)}</h2>
                                        </div>
                                    </div>
                                    <div className="comment">
                                        <strong>
                                            {comment.name} ha scritto:
                                        </strong>
                                        <p>{comment.body}</p>
                                    </div>
                                </li>
                            ))
                        ) : (
                            <p>Ancora nessun commento</p>
                        )
                        }
                    </ul>
                </div>
                <Link to="/" className="btn btn-back">
                    <span>Indietro</span>
                </Link>
            </div>

        </div>
    )
}

export default PostDetails