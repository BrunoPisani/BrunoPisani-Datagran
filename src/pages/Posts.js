import React, { useState, useEffect } from 'react';
import './Posts.css';

export default function Posts() {
    const [posts, setPosts] = useState([]);
    const [postsByUser, setPostsByUser] = useState(null);
    const [postComments, setPostComments] = useState(null);
    const [selectedPostId, setSelectedPostId] = useState(null);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then(json => {
            setPosts(json);
        })
    }, []);

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/posts/${selectedPostId}/comments`)
        .then(response => response.json())
        .then(json => {
            setPostComments(json);
        })
    }, [selectedPostId]);

    const handleUserIdClick = (postUserId) => {
        setPostsByUser(posts.filter((post)=>{return postUserId === post.userId}));
    }

    const handleIdClick = (postId) => {
        setSelectedPostId(postId);
    }

    return (
        <>
            <h2>Posts</h2>
            <table class="Posts">
                <thead>
                    <tr> 
                        <th>user id</th>
                        <th>id</th>
                        <th>post</th>
                        <th>title</th>
                        <th>body</th>
                    </tr>
                </thead>
                <tbody>
                {posts && posts.map((post) => {
                    return (
                        <tr key={post.id}> 
                            <td><div onClick={()=>handleUserIdClick(post.userId)}>{post.userId}</div></td>
                            <td><div onClick={()=>handleIdClick(post.id)}>{post.id}</div></td>
                            <td>POST</td>
                            <td>{post.title}</td>
                            <td>{post.body}</td>
                        </tr> 
                    )
                })}
                </tbody>
            </table>
            {
                postsByUser && (
                    <>
                        <h2>Post By User #{postsByUser[0].userId} Comments</h2>
                        <table class="PostsByUser">
                            <thead>
                                <tr> 
                                    <th>user id</th>
                                    <th>id</th>
                                    <th>title</th>
                                    <th>posts</th>
                                </tr>
                            </thead>
                            <tbody>
                            { postsByUser.map((post) => {
                                return (
                                    <tr key={post.id+'ByUser'+post.userId}> 
                                        <td>{post.userId}</td>
                                        <td><div onClick={()=>handleIdClick(post.id)}>{post.id}</div></td>
                                        <td>{post.title}</td>
                                        <td>{post.body}</td>
                                    </tr> 
                                )
                            })}
                            </tbody>
                        </table>
                    </>
                )
            }
            {
                postComments && selectedPostId && (
                    <>
                        <h2>Post #{selectedPostId} Comments</h2>
                        <table class="Comments">
                            <thead>
                                <tr> 
                                    <th>post id</th>
                                    <th>id</th>
                                    <th>comment</th>
                                    <th>name</th>
                                    <th>email</th>
                                </tr>
                            </thead>
                            <tbody>
                            { postComments.map((post) => {
                                return (
                                    <tr key={post.id+'RegardingComment'+post.postId}> 
                                        <td>{post.postId}</td>
                                        <td>{post.id}</td>
                                        <td>{post.body}</td>
                                        <td>{post.name}</td>
                                        <td>{post.email}</td>
                                    </tr> 
                                )
                            })}
                            </tbody>
                        </table>
                    </>
                )
            }
        </>
    )
}
