import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiArrowLeft, FiCalendar, FiUser, FiHeart, FiMessageSquare, FiSend, FiTrash2 } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import SEO from '../components/SEO';

const BlogArticle = () => {
    const { id } = useParams();
    const { token, user } = useAuth();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [comment, setComment] = useState('');
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        fetchPost();
    }, [id, token]);

    const fetchPost = async () => {
        try {
            setLoading(true);
            const headers = {};
            if (token || localStorage.getItem('token')) {
                headers['Authorization'] = `Bearer ${token || localStorage.getItem('token')}`;
            }
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
            const response = await fetch(`${apiUrl}/blogs/${id}`, { headers });
            const data = await response.json();
            if (response.ok) {
                setPost(data.blog);
            }
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    const handleLike = async () => {
        if (!user) {
            alert("Please login to like this post");
            return;
        }
        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
            const response = await fetch(`${apiUrl}/blogs/${id}/like`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token || localStorage.getItem('token')}`
                }
            });
            const data = await response.json();
            if (response.ok) {
                setPost({
                    ...post,
                    likes_count: data.count,
                    user_liked: data.liked
                });
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleComment = async (e) => {
        e.preventDefault();
        if (!user) {
            alert("Please login to comment");
            return;
        }
        if (!comment.trim()) return;

        try {
            setSubmitting(true);
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
            const response = await fetch(`${apiUrl}/blogs/${id}/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token || localStorage.getItem('token')}`
                },
                body: JSON.stringify({ content: comment })
            });
            const data = await response.json();
            if (response.ok) {
                setPost({
                    ...post,
                    comments: [data.comment, ...(post.comments || [])],
                    comments_count: post.comments_count + 1
                });
                setComment('');
            }
            setSubmitting(false);
        } catch (err) {
            alert("Failed to post comment");
            setSubmitting(false);
        }
    };

    const handleDeleteComment = async (commentId) => {
        if (window.confirm("Delete this comment?")) {
            try {
                const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
                const response = await fetch(`${apiUrl}/blogs/comments/${commentId}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token || localStorage.getItem('token')}`
                    }
                });
                if (response.ok) {
                    setPost({
                        ...post,
                        comments: post.comments.filter(c => c.id !== commentId),
                        comments_count: post.comments_count - 1
                    });
                }
            } catch (err) {
                alert("Failed to delete comment");
            }
        }
    };

    if (loading) return <div className="section-padding text-center"><h3>Loading article...</h3></div>;
    if (!post) return <div className="section-padding text-center"><h3>Article not found.</h3><Link to="/blog">Back to Blog</Link></div>;

    return (
        <div className="blog-article-page section-padding bg-light" style={{ paddingTop: 'calc(152px + 5rem)' }}>
            <style>{`
                @media (max-width: 992px) {
                    .blog-article-page { padding-top: calc(70px + 3rem) !important; }
                }
            `}</style>
            <SEO
                title={post.title}
                description={post.excerpt || (post.content ? post.content.substring(0, 160) : "Read this article on OLIVER-UGWI's Logistics Insights.")}
                keywords={`${post.category}, Logistics, Nigeria, Freight Forwarding`}
            />
            <div className="container" style={{ maxWidth: '900px' }}>
                <Link to="/blog" className="btn btn-outline mb-4"><FiArrowLeft /> Back to Blog</Link>

                <article className="glass-card p-0 overflow-hidden mb-5">
                    {post.image_url && (
                        <div style={{
                            width: '100%',
                            height: '400px',
                            backgroundImage: `url(${post.image_url.startsWith('http') ? post.image_url : (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace(/\/api$/, '') + post.image_url})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            backgroundColor: '#f8f9fa'
                        }}></div>
                    )}
                    <div className="p-5">
                        <span className="category-badge mb-3 d-inline-block">{post.category}</span>
                        <h1 className="mb-4">{post.title}</h1>
                        <div className="blog-meta mb-4 d-flex gap-4">
                            <span><FiCalendar /> {new Date(post.created_at).toLocaleDateString()}</span>
                            <span><FiUser /> {post.author}</span>
                        </div>

                        <div className="article-body mb-5" style={{ fontSize: '1.1rem', lineHeight: '1.8', whiteSpace: 'pre-wrap' }}>
                            {post.content}
                        </div>

                        <div className="article-actions border-top pt-4 d-flex justify-content-between align-items-center">
                            <button
                                className={`btn d-flex align-items-center gap-2 ${post.user_liked ? 'text-danger' : 'text-muted'}`}
                                onClick={handleLike}
                                style={{ border: 'none', background: 'none', fontSize: '1.2rem' }}
                            >
                                <FiHeart fill={post.user_liked ? "currentColor" : "none"} />
                                <span>{post.likes_count} Likes</span>
                            </button>
                            <div className="text-muted d-flex align-items-center gap-2">
                                <FiMessageSquare /> {post.comments_count} Comments
                            </div>
                        </div>
                    </div>
                </article>

                {/* Interaction Section */}
                <section className="interaction-section mb-5">
                    <h3 className="mb-4">Comments</h3>

                    {user ? (
                        <form className="mb-5 glass-card p-4" onSubmit={handleComment}>
                            <div className="d-flex gap-3">
                                <div className="avatar bg-accent text-navy" style={{ width: '40px', height: '40px', flexShrink: 0 }}>
                                    {user.name.charAt(0)}
                                </div>
                                <div className="flex-grow-1">
                                    <textarea
                                        className="form-control mb-3"
                                        placeholder="Add a comment..."
                                        rows="3"
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                        required
                                    ></textarea>
                                    <button type="submit" className="btn btn-primary d-flex align-items-center gap-2" disabled={submitting}>
                                        <FiSend /> {submitting ? 'Posting...' : 'Post Comment'}
                                    </button>
                                </div>
                            </div>
                        </form>
                    ) : (
                        <div className="alert bg-white border mb-5 p-4 text-center">
                            <p className="mb-3">Log in to join the conversation.</p>
                            <Link to="/login" className="btn btn-primary">Login</Link>
                        </div>
                    )}

                    <div className="comments-list">
                        {post.comments && post.comments.length > 0 ? (
                            post.comments.map(c => (
                                <div key={c.id} className="comment-item mb-4 glass-card p-4">
                                    <div className="d-flex justify-content-between">
                                        <div className="d-flex gap-3">
                                            <div className="avatar bg-light-navy text-white" style={{ width: '40px', height: '40px', fontSize: '0.9rem' }}>
                                                {c.user_name.charAt(0)}
                                            </div>
                                            <div>
                                                <h5 className="mb-0">{c.user_name}</h5>
                                                <small className="text-muted">{new Date(c.created_at).toLocaleDateString()}</small>
                                                <p className="mt-2 mb-0">{c.content}</p>
                                            </div>
                                        </div>
                                        {(user?.id === c.user_id || user?.role === 'admin') && (
                                            <button className="btn btn-sm text-danger" onClick={() => handleDeleteComment(c.id)}>
                                                <FiTrash2 />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-muted py-4">No comments yet. Be the first to share your thoughts!</p>
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default BlogArticle;
