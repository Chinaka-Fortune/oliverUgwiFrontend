import React, { useState, useEffect } from 'react';
import { FiPlus, FiEdit, FiTrash2, FiEye, FiImage, FiTag } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

const BlogManagement = () => {
    const { token } = useAuth();
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingBlog, setEditingBlog] = useState(null);
    const [blogToDelete, setBlogToDelete] = useState(null);
    const [deleteError, setDeleteError] = useState('');
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        category: 'Logistics Trends',
        content: '',
        excerpt: '',
        image_url: ''
    });
    const [uploading, setUploading] = useState(false);
    const fileInputRef = React.useRef(null);

    const categories = ['Logistics Trends', 'Customs & Compliance', 'Sustainability', 'Global Trade'];

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            setLoading(true);
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
            const response = await fetch(`${apiUrl}/blogs/`);
            const data = await response.json();
            if (response.ok) {
                setBlogs(data.blogs);
            }
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const uploadFormData = new FormData();
        uploadFormData.append('file', file);

        try {
            setUploading(true);
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
            const response = await fetch(`${apiUrl}/blogs/upload`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token || localStorage.getItem('token')}`
                },
                body: uploadFormData
            });

            const data = await response.json();
            if (response.ok) {
                setFormData({ ...formData, image_url: data.url });
                alert("Image uploaded successfully!");
            } else {
                alert(data.msg || "Upload failed");
            }
        } catch (err) {
            console.error("Upload error:", err);
            alert("Connection error during upload");
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
        const url = editingBlog
            ? `${apiUrl}/blogs/${editingBlog.id}`
            : `${apiUrl}/blogs/`;
        const method = editingBlog ? 'PUT' : 'POST';

        try {
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token || localStorage.getItem('token')}`
                },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            if (response.ok) {
                alert(editingBlog ? "Blog updated successfully" : "Blog created successfully");
                fetchBlogs();
                setShowModal(false);
                setEditingBlog(null);
                setFormData({ title: '', category: 'Logistics Trends', content: '', excerpt: '', image_url: '' });
            } else {
                alert(data.msg || "Operation failed");
            }
        } catch (err) {
            alert("Connection error");
        }
    };

    const handleEdit = (blog) => {
        setEditingBlog(blog);
        setFormData({
            title: blog.title,
            category: blog.category,
            content: blog.content,
            excerpt: blog.excerpt || '',
            image_url: blog.image_url || ''
        });
        setShowModal(true);
    };

    const handleDelete = async (idToDelete) => {
        if (!idToDelete) return;
        setDeleteError('');
        setDeleteLoading(true);

        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
            const response = await fetch(`${apiUrl}/blogs/${idToDelete}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token || localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                setBlogs(blogs.filter(b => b.id !== idToDelete));
                setBlogToDelete(null);
                setDeleteLoading(false);
                fetchBlogs();
            } else {
                let errMsg = "Server error";
                try {
                    const data = await response.json();
                    errMsg = data.msg || errMsg;
                } catch (e) {
                    errMsg = response.statusText;
                }
                setDeleteError(`Failed to delete: ${errMsg}`);
                setDeleteLoading(false);
            }
        } catch (err) {
            setDeleteError(`Network Error: ${err.message}`);
            setDeleteLoading(false);
        }
    };

    return (
        <div className="admin-blogs">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Blog & Insights Management</h2>
                <button
                    className="btn btn-primary d-flex align-items-center gap-2"
                    onClick={() => {
                        setEditingBlog(null);
                        setFormData({ title: '', category: 'Logistics Trends', content: '', excerpt: '', image_url: '' });
                        setShowModal(true);
                    }}
                >
                    <FiPlus /> Create New Post
                </button>
            </div>

            {loading ? (
                <div className="text-center py-5">Loading articles...</div>
            ) : (
                <div className="dashboard-card">
                    <div className="table-responsive">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Category</th>
                                    <th>Author</th>
                                    <th>Stats</th>
                                    <th>Date</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {blogs.map(blog => (
                                    <tr key={blog.id}>
                                        <td>
                                            <div className="d-flex align-items-center gap-3">
                                                {blog.image_url ? (
                                                    <img src={blog.image_url.startsWith('http') ? blog.image_url : `${(import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace(/\/api$/, '')}${blog.image_url}`} alt="" style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} />
                                                ) : (
                                                    <div style={{ width: '40px', height: '40px', background: '#eee', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FiImage /></div>
                                                )}
                                                <span className="font-weight-bold">{blog.title}</span>
                                            </div>
                                        </td>
                                        <td><span className="badge bg-light text-dark">{blog.category}</span></td>
                                        <td>{blog.author}</td>
                                        <td>
                                            <small className="d-block text-muted">{blog.likes_count} Likes</small>
                                            <small className="d-block text-muted">{blog.comments_count} Comments</small>
                                        </td>
                                        <td>{new Date(blog.created_at).toLocaleDateString()}</td>
                                        <td>
                                            <div className="d-flex gap-2">
                                                <button className="btn btn-sm btn-outline" title="Edit" onClick={() => handleEdit(blog)}><FiEdit /></button>
                                                <button className="btn btn-sm btn-outline text-danger" title="Delete" onClick={() => { setDeleteError(''); setBlogToDelete(blog.id); }}><FiTrash2 /></button>
                                                <a href={`/blog/${blog.id}`} target="_blank" rel="noreferrer" className="btn btn-sm btn-outline" title="View Public"><FiEye /></a>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Create/Edit Modal */}
            {showModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
                    <div className="dashboard-card" style={{ width: '100%', maxWidth: '800px', maxHeight: '90vh', overflowY: 'auto' }}>
                        <div className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-4">
                            <h3 className="mb-0">{editingBlog ? 'Edit Blog Post' : 'Create New Blog Post'}</h3>
                            <button className="btn btn-sm" onClick={() => setShowModal(false)} style={{ fontSize: '1.5rem' }}>&times;</button>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-md-8">
                                    <div className="form-group mb-3">
                                        <label className="d-block mb-1 font-weight-bold">Title</label>
                                        <input name="title" type="text" className="form-control" value={formData.title} onChange={handleInputChange} required placeholder="Post title" />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group mb-3">
                                        <label className="d-block mb-1 font-weight-bold">Category</label>
                                        <select name="category" className="form-control" value={formData.category} onChange={handleInputChange}>
                                            {categories.map(c => <option key={c} value={c}>{c}</option>)}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="form-group mb-4">
                                <label className="d-block mb-1 font-weight-bold">Featured Image</label>
                                <div className="d-flex gap-2 align-items-center mb-2">
                                    <input
                                        name="image_url"
                                        type="text"
                                        className="form-control"
                                        value={formData.image_url}
                                        onChange={handleInputChange}
                                        placeholder="Enter image URL or upload below"
                                    />
                                    {formData.image_url && (
                                        <div className="mt-2">
                                            <img src={formData.image_url.startsWith('http') ? formData.image_url : `${(import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace(/\/api$/, '')}${formData.image_url}`} alt="Preview" style={{ width: '100%', height: '150px', objectFit: 'contain', borderRadius: '4px', backgroundColor: '#f8f9fa' }} />
                                        </div>
                                    )}
                                </div>
                                <div className="upload-wrapper p-3 bg-light border rounded text-center">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="d-none"
                                        ref={fileInputRef}
                                        onChange={handleFileUpload}
                                    />
                                    <button
                                        type="button"
                                        className="btn btn-sm btn-outline-secondary d-flex align-items-center gap-2 mx-auto"
                                        onClick={() => fileInputRef.current.click()}
                                        disabled={uploading}
                                    >
                                        <FiImage /> {uploading ? 'Uploading...' : 'Upload Image from Computer'}
                                    </button>
                                    <small className="text-muted d-block mt-1">Recommended: 1200x800px (Max 5MB)</small>
                                </div>
                            </div>

                            <div className="form-group mb-3">
                                <label className="d-block mb-1 font-weight-bold">Excerpt (Short Summary)</label>
                                <textarea name="excerpt" className="form-control" rows="2" value={formData.excerpt} onChange={handleInputChange} placeholder="Brief summary of the post..."></textarea>
                            </div>

                            <div className="form-group mb-3">
                                <label className="d-block mb-1 font-weight-bold">Content (Markdown supported)</label>
                                <textarea name="content" className="form-control" rows="10" value={formData.content} onChange={handleInputChange} required placeholder="Full article content..."></textarea>
                            </div>

                            <div className="text-right mt-4 pt-3 border-top">
                                <button type="button" className="btn btn-outline mr-2" onClick={() => setShowModal(false)}>Cancel</button>
                                <button type="submit" className="btn btn-primary">{editingBlog ? 'Update Post' : 'Publish Post'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {/* Delete Confirmation Modal */}
            {blogToDelete && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
                    <div className="dashboard-card text-center" style={{ width: '100%', maxWidth: '400px' }}>
                        <h4 className="mb-3 text-danger">Confirm Deletion</h4>
                        <p className="mb-4">Are you sure you want to delete this blog post? This action cannot be undone.</p>

                        {deleteError && (
                            <div className="alert alert-danger mb-3 p-2 font-sm text-left" style={{ background: '#fee2e2', color: '#b91c1c', borderRadius: '4px' }}>
                                <strong>Error:</strong> {deleteError}
                            </div>
                        )}

                        <div className="d-flex justify-content-center gap-3">
                            <button type="button" className="btn btn-outline" onClick={() => setBlogToDelete(null)} disabled={deleteLoading}>Cancel</button>
                            <button
                                type="button"
                                className="btn btn-primary"
                                style={{ backgroundColor: '#dc3545', borderColor: '#dc3545' }}
                                onClick={() => handleDelete(blogToDelete)}
                                disabled={deleteLoading}
                            >
                                {deleteLoading ? 'Deleting...' : 'Delete Post'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BlogManagement;
