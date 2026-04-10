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
        
        try {
            // 1. Get Secure Signature from our Backend
            const sigRes = await axios.get(`${API_URL}/signature`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const { signature, timestamp, cloud_name, api_key, folder } = sigRes.data;

            // 2. Upload directly to Cloudinary API
            const cloudFormData = new FormData();
            cloudFormData.append('file', file);
            cloudFormData.append('signature', signature);
            cloudFormData.append('timestamp', timestamp);
            cloudFormData.append('api_key', api_key);
            cloudFormData.append('folder', folder);

            const uploadRes = await axios.post(
                `https://api.cloudinary.com/v1_1/${cloud_name}/video/upload`, 
                cloudFormData
            );

            // 3. Save the results back to our Database
            await axios.post(`${API_URL}/save`, {
                url: uploadRes.data.secure_url,
                public_id: uploadRes.data.public_id
            }, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            setSuccess('Video uploaded directly to Cloudinary successfully!');
            fetchVideos();
            setTimeout(() => setSuccess(''), 3000);
        } catch (err) {
            console.error("Direct Upload Error:", err);
            setError(err.response?.data?.msg || err.response?.data?.error?.message || 'Upload failed due to connection or size');
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
                        {/* 1. Show DATABASE Videos (Cloudinary/Admin) */}
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
                                        <div className="d-flex flex-column">
                                            <span className="text-navy font-sm truncate text-truncate" style={{ maxWidth: '180px' }}>
                                                {video.filename.includes('hero_videos/') 
                                                    ? video.filename.replace('hero_videos/', '') 
                                                    : (video.filename.includes('_') ? video.filename.split('_').slice(2).join('_') || video.filename : video.filename)}
                                            </span>
                                            <small className="text-primary-blue font-bold" style={{ fontSize: '0.7rem' }}>ADMIN UPLOAD</small>
                                        </div>
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

                        {/* 2. Show REPO Default Videos (Local / Read-Only) */}
                        {['/videos/hero-1.mp4', '/videos/hero-2.mp4', '/videos/hero-3.mp4', '/videos/hero-4.mp4', '/videos/hero-5.mp4'].map((url, idx) => (
                            <motion.div
                                key={`default-${idx}`}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="col-md-4 mb-4"
                            >
                                <div className="video-card glass-card p-0 overflow-hidden position-relative group border-primary">
                                    <video
                                        src={url}
                                        className="w-100"
                                        style={{ height: '200px', objectFit: 'cover' }}
                                        muted
                                        onMouseOver={e => e.target.play()}
                                        onMouseOut={e => { e.target.pause(); e.target.currentTime = 0; }}
                                    />
                                    <div className="video-info p-3 d-flex justify-content-between align-items-center bg-light">
                                        <div className="d-flex flex-column">
                                            <span className="text-navy font-sm font-bold">hero-{idx + 1}.mp4</span>
                                            <small className="text-muted" style={{ fontSize: '0.7rem' }}>SYSTEM DEFAULT (READ-ONLY)</small>
                                        </div>
                                        <div className="text-primary-blue">
                                            <FiCheck title="Active System Video" />
                                        </div>
                                    </div>
                                    <div className="play-overlay position-absolute top-50 start-50 translate-middle opacity-0 group-hover:opacity-100 transition-all pointer-events-none">
                                        <FiPlay size={40} className="text-white" />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                    
                    {videos.length === 0 && (
                        <div className="col-12 mt-4">
                            <div className="alert alert-info text-center">
                                Showing 5 System Defaults. No custom admin videos uploaded yet.
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default VideoManagement;
