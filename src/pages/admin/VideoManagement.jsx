import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiUpload, FiTrash2, FiPlay, FiPlus, FiAlertCircle, FiCheck } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const VideoManagement = () => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api') + '/videos';
    const token = localStorage.getItem('token');

    useEffect(() => {
        fetchVideos();
    }, []);

    const fetchVideos = async () => {
        try {
            const res = await axios.get(API_URL);
            setVideos(res.data.videos);
        } catch (err) {
            setError('Failed to fetch videos');
        } finally {
            setLoading(false);
        }
    };

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);
        setError('');
        const formData = new FormData();
        formData.append('file', file);

        try {
            await axios.post(`${API_URL}/upload`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            setSuccess('Video uploaded successfully!');
            fetchVideos();
            setTimeout(() => setSuccess(''), 3000);
        } catch (err) {
            setError(err.response?.data?.msg || 'Upload failed');
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this video?')) return;

        try {
            await axios.delete(`${API_URL}/${id}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setSuccess('Video deleted successfully');
            setVideos(videos.filter(v => v.id !== id));
            setTimeout(() => setSuccess(''), 3000);
        } catch (err) {
            setError('Delete failed');
        }
    };

    return (
        <div className="video-management-page p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2 className="text-navy font-bold">Hero Video Management</h2>
                    <p className="text-muted">Manage the background videos for your home page hero section.</p>
                </div>
                <div className="upload-btn-wrapper">
                    <input
                        type="file"
                        accept="video/*"
                        onChange={handleFileUpload}
                        id="video-upload"
                        hidden
                    />
                    <label htmlFor="video-upload" className="btn btn-primary d-flex align-items-center gap-2 cursor-pointer">
                        {uploading ? 'Uploading...' : <><FiPlus /> Upload New Video</>}
                    </label>
                </div>
            </div>

            {error && (
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="alert alert-danger d-flex align-items-center gap-2">
                    <FiAlertCircle /> {error}
                </motion.div>
            )}

            {success && (
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="alert alert-success d-flex align-items-center gap-2">
                    <FiCheck /> {success}
                </motion.div>
            )}

            {loading ? (
                <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status"></div>
                </div>
            ) : (
                <div className="video-grid row">
                    <AnimatePresence>
                        {videos.map((video) => (
                            <motion.div
                                key={video.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="col-md-4 mb-4"
                            >
                                <div className="video-card glass-card p-0 overflow-hidden position-relative group">
                                    <video
                                        src={video.url.startsWith('http') ? video.url : `${(import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace(/\/api$/, '')}${video.url}`}
                                        className="w-100"
                                        style={{ height: '200px', objectFit: 'cover' }}
                                        muted
                                        onMouseOver={e => e.target.play()}
                                        onMouseOut={e => { e.target.pause(); e.target.currentTime = 0; }}
                                    />
                                    <div className="video-info p-3 d-flex justify-content-between align-items-center">
                                        <span className="text-navy font-sm truncate text-truncate" style={{ maxWidth: '180px' }}>
                                            {video.filename.includes('hero_videos/') 
                                                ? video.filename.replace('hero_videos/', '') 
                                                : (video.filename.includes('_') ? video.filename.split('_').slice(2).join('_') || video.filename : video.filename)}
                                        </span>
                                        <button
                                            onClick={() => handleDelete(video.id)}
                                            className="btn btn-sm btn-outline-danger border-0"
                                            title="Delete video"
                                        >
                                            <FiTrash2 />
                                        </button>
                                    </div>
                                    <div className="play-overlay position-absolute top-50 start-50 translate-middle opacity-0 group-hover:opacity-100 transition-all pointer-events-none">
                                        <FiPlay size={40} className="text-white" />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                    {videos.length === 0 && (
                        <div className="col-12 text-center py-5">
                            <div className="p-5 glass-card">
                                <FiUpload size={50} className="text-muted mb-3" />
                                <h3>No Hero Videos Found</h3>
                                <p className="text-muted">Upload your first video to get started.</p>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default VideoManagement;
