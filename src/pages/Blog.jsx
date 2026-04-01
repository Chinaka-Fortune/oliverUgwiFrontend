import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiSearch, FiCalendar, FiUser, FiArrowRight } from 'react-icons/fi';
import SEO from '../components/SEO';
import './Blog.css';

const Blog = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    const categories = ['All', 'Logistics Trends', 'Customs & Compliance', 'Sustainability', 'Global Trade'];

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
                const response = await fetch(`${apiUrl}/blogs/`);
                const data = await response.json();
                if (response.ok) {
                    setPosts(data.blogs);
                }
                setLoading(false);
            } catch (err) {
                console.error("Failed to fetch blogs:", err);
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    const filteredPosts = posts.filter(post => {
        const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
        const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="blog-page">
            <SEO
                title="Logistics Insights & Industry News Nigeria"
                description="Stay updated with the latest trends in global logistics, freight forwarding, and maritime trade in Nigeria and West Africa."
                keywords="Logistics industry insights, Freight forwarding news Nigeria, Maritime trade updates, Supply chain trends Africa"
            />
            <section className="standard-page-header blog-header">
                <div className="container text-center">
                    <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>Industry Insights</motion.h1>
                    <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                        Latest news, trends, and expert analysis in global logistics.
                    </motion.p>
                </div>
            </section>

            <section className="section-padding bg-light">
                <div className="container">
                    {/* Controls */}
                    <div className="blog-controls mb-5">
                        <div className="search-bar">
                            <FiSearch className="search-icon" />
                            <input
                                type="text"
                                placeholder="Search articles..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        <div className="category-filters">
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    className={`btn-filter ${activeCategory === cat ? 'active' : ''}`}
                                    onClick={() => setActiveCategory(cat)}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Grid */}
                    <div className="row blog-grid justify-content-center">
                        {loading ? (
                            <div className="col-12 text-center py-5">
                                <h3>Loading articles...</h3>
                            </div>
                        ) : filteredPosts.length > 0 ? (
                            filteredPosts.map(post => (
                                <div key={post.id} className="col-md-6 col-lg-4 mb-4">
                                    <motion.div
                                        whileHover={{ y: -5 }}
                                        className="blog-card glass-card"
                                    >
                                        <div
                                            className="blog-img"
                                            style={post.image_url ? {
                                                backgroundImage: `url(${post.image_url.startsWith('http') ? post.image_url : (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace(/\/api$/, '') + post.image_url})`,
                                                backgroundSize: 'cover',
                                                backgroundPosition: 'center',
                                                backgroundRepeat: 'no-repeat',
                                                backgroundColor: '#f8f9fa'
                                            } : { backgroundColor: 'var(--primary-navy)' }}
                                        >
                                            <span className="category-badge scale-up">{post.category}</span>
                                        </div>
                                        <div className="blog-content">
                                            <div className="blog-meta">
                                                <span><FiCalendar /> {new Date(post.created_at).toLocaleDateString()}</span>
                                                <span><FiUser /> {post.author}</span>
                                            </div>
                                            <h3><Link to={`/blog/${post.id}`}>{post.title}</Link></h3>
                                            <p>{post.excerpt}</p>
                                            <Link to={`/blog/${post.id}`} className="read-more">Read Article <FiArrowRight /></Link>
                                        </div>
                                    </motion.div>
                                </div>
                            ))
                        ) : (
                            <div className="col-12 text-center py-5">
                                <h3>No articles found matching your criteria.</h3>
                                <p className="text-muted">Try adjusting your search or category filters.</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Blog;
