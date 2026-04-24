import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiAnchor, FiSend, FiPackage, FiArrowRight, FiCheckCircle } from 'react-icons/fi';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import SEO from '../components/SEO';
import './Home.css';

const DEFAULT_VIDEOS = [
    '/videos/hero-1.mp4',
    '/videos/hero-2.mp4',
    '/videos/hero-3.mp4',
    '/videos/hero-4.mp4',
    '/videos/hero-5.mp4'
];

const FALLBACK_VIDEO = '/videos/fallback.mp4';

const Home = () => {
    const [currentVideo, setCurrentVideo] = useState(0);
    const [videos, setVideos] = useState(DEFAULT_VIDEOS);
    const [isLoading, setIsLoading] = useState(true);
    const [isVideoBuffering, setIsVideoBuffering] = useState(true);
    const [testimonials, setTestimonials] = useState([]);
    const [isLoadingTestimonials, setIsLoadingTestimonials] = useState(true);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
                const baseUrl = apiUrl.replace(/\/api$/, '');
                const response = await axios.get(`${apiUrl}/videos/`);
                if (response.data.videos && response.data.videos.length > 0) {
                    const adminVideos = response.data.videos.map(v => ({ 
                        ...v, 
                        url: v.url.startsWith('http') ? v.url : `${baseUrl}${v.url}` 
                    }));
                    setVideos([...adminVideos.map(v => v.url), ...DEFAULT_VIDEOS]);
                }
                setError('');
            } catch (err) {
                console.error("Failed to fetch hero videos", err);
            } finally {
                setIsLoading(false);
            }
        };

        const fetchTestimonials = async () => {
            try {
                const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
                const res = await axios.get(`${apiUrl}/testimonials/`);
                if (res.data && res.data.length > 0) {
                    setTestimonials(res.data);
                } else {
                    // Fallback to static if none exist in DB yet
                    setTestimonials([
                        {
                            name: "Chizoba Ezirim",
                            role: "Senior Partner, LENab Consulting",
                            text: "Working with OLIVER-UGWI GLOBAL SERVICES LTD has been an absolute pleasure. Their team of skilled professionals is not only knowledgeable in their field but also dedicated to providing top-notch service and support. They took the time to understand our unique needs and developed a tailored solution that exceeded our expectations. I cannot recommend OLIVER-UGWI GLOBAL SERVICES LTD highly enough for any business seeking innovative maritime solutions and exceptional customer care."
                        },
                        {
                            name: "Daniel Ogwara",
                            role: "MD/CEO, Ogwara Haulage Services",
                            text: "Every time We have used OLIVER-UGWI GLOBAL SERVICES LTD, We have been pleased with their service delivery. The professionalism and efficiency with which they render their services are satisfactory and We highly recommend them. Their dedication to ensuring our cargo moves smoothly through the complex logistics process is truly commendable."
                        },
                        {
                            name: "Angela Ibeneme",
                            role: "MD, M & D Delite Foods",
                            text: "OLIVER-UGWI GLOBAL SERVICES LTD has been our go-to choice for maritime and air cargo logistics, and they've never disappointed. Their team go above and beyond to ensure our consignments are handled with care and precision. Their competitive rates and swift response to our requirements have saved us both time and money. It's a pleasure working with a company that values customer satisfaction as much as they do."
                        },
                        {
                            name: "Godwin Aigbadon",
                            role: "CEO, Sagacity Global Projects",
                            text: "OLIVER-UGWI GLOBAL SERVICES LTD has consistently been our trusted partner for clearing and forwarding services. Their reliability and attention to detail have made our import operations significantly smoother. They have a deep understanding of the maritime industry, and their solutions are always tailored to our specific needs. We appreciate their commitment to excellence."
                        },
                        {
                            name: "Amechi Afam",
                            role: "CEO, God's Grace Enterprise",
                            text: "In the international trade industry, OLIVER-UGWI GLOBAL SERVICES LTD stands out as a beacon of professionalism and reliability. Their team's dedication to customer satisfaction is evident in every interaction. We have experienced reduced delays and improved efficiency in our operations since partnering with them. Their integrated logistics approach has truly made a difference."
                        }
                    ]);
                }
            } catch (err) {
                console.error("Failed to fetch testimonials", err);
                // Fallback to static on error
                setTestimonials([
                    {
                        name: "Chizoba Ezirim",
                        role: "Senior Partner, LENab Consulting",
                        text: "Working with OLIVER-UGWI GLOBAL SERVICES LTD has been an absolute pleasure. Their team of skilled professionals is not only knowledgeable in their field but also dedicated to providing top-notch service and support. They took the time to understand our unique needs and developed a tailored solution that exceeded our expectations. I cannot recommend OLIVER-UGWI GLOBAL SERVICES LTD highly enough for any business seeking innovative maritime solutions and exceptional customer care."
                    },
                    {
                        name: "Daniel Ogwara",
                        role: "MD/CEO, Ogwara Haulage Services",
                        text: "Every time We have used OLIVER-UGWI GLOBAL SERVICES LTD, We have been pleased with their service delivery. The professionalism and efficiency with which they render their services are satisfactory and We highly recommend them. Their dedication to ensuring our cargo moves smoothly through the complex logistics process is truly commendable."
                    },
                    {
                        name: "Angela Ibeneme",
                        role: "MD, M & D Delite Foods",
                        text: "OLIVER-UGWI GLOBAL SERVICES LTD has been our go-to choice for maritime and air cargo logistics, and they've never disappointed. Their team go above and beyond to ensure our consignments are handled with care and precision. Their competitive rates and swift response to our requirements have saved us both time and money. It's a pleasure working with a company that values customer satisfaction as much as they do."
                    },
                    {
                        name: "Godwin Aigbadon",
                        role: "CEO, Sagacity Global Projects",
                        text: "OLIVER-UGWI GLOBAL SERVICES LTD has consistently been our trusted partner for clearing and forwarding services. Their reliability and attention to detail have made our import operations significantly smoother. They have a deep understanding of the maritime industry, and their solutions are always tailored to our specific needs. We appreciate their commitment to excellence."
                    },
                    {
                        name: "Amechi Afam",
                        role: "CEO, God's Grace Enterprise",
                        text: "In the international trade industry, OLIVER-UGWI GLOBAL SERVICES LTD stands out as a beacon of professionalism and reliability. Their team's dedication to customer satisfaction is evident in every interaction. We have experienced reduced delays and improved efficiency in our operations since partnering with them. Their integrated logistics approach has truly made a difference."
                    }
                ]);
            } finally {
                setIsLoadingTestimonials(false);
            }
        };

        fetchVideos();
        fetchTestimonials();
    }, []);

    // Handle transition to the next video when the current one ends or fails
    const handleVideoEnd = () => {
        if (videos.length > 0) {
            setCurrentVideo((prev) => (prev + 1) % videos.length);
        }
    };

    const handleVideoError = (e) => {
        console.error("Video failed to load, skipping...", e.target.src);
        handleVideoEnd();
    };

    // Ensure the current video plays whenever it changes (sequence loop)
    useEffect(() => {
        const activeVideo = document.getElementById(`hero-video-${currentVideo}`);
        if (activeVideo) {
            // Use a small timeout to avoid AbortError from rapid switching 
            // and ensure DOM is ready
            const playPromise = activeVideo.play();
            if (playPromise !== undefined) {
                playPromise.catch(err => {
                    if (err.name !== 'AbortError') {
                        console.error("Playback error:", err);
                    }
                });
            }
        }
    }, [currentVideo, videos]);

    return (
        <div className="home-page">
            <SEO
                title="Logistics & Freight Forwarding Company in Nigeria"
                description="OLIVER-UGWI GLOBAL SERVICES LTD provides professional maritime logistics, air cargo logistics, freight forwarding, and import-export solutions in Lagos, Nigeria. Reliable global cargo movement and supply chain support for businesses."
                keywords="Logistics company in Nigeria, Freight forwarding company Nigeria, Import and export services Nigeria, Maritime logistics Nigeria, Air cargo logistics Nigeria, Freight forwarding Lagos, Shipping and logistics company Lagos"
            />
            {/* Hero Section */}
            <section className="hero">
                <div className="hero-video-container">
                    <motion.video
                        src={FALLBACK_VIDEO}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="hero-video"
                        style={{
                            opacity: isVideoBuffering ? 1 : 0,
                            position: 'absolute',
                            zIndex: isVideoBuffering ? 2 : 0,
                            pointerEvents: 'none'
                        }}
                    />
                    {videos.map((video, index) => (
                        <motion.video
                            key={`${video}-${index}`} // Use src in key to force re-render on same index change
                            id={`hero-video-${index}`}
                            src={video}
                            muted
                            playsInline
                            onWaiting={() => setIsVideoBuffering(true)}
                            onPlaying={() => setIsVideoBuffering(false)}
                            onCanPlay={() => setIsVideoBuffering(false)}
                            onEnded={handleVideoEnd}
                            onError={handleVideoError}
                            className={`hero-video hero-carousel-video ${currentVideo === index ? 'active' : ''}`}
                            initial={{ opacity: 0 }}
                            animate={{
                                opacity: currentVideo === index ? 1 : 0,
                                zIndex: currentVideo === index ? 1 : 0
                            }}
                            transition={{ duration: 1.5 }}
                            style={{
                                display: currentVideo === index ? 'block' : 'none',
                                position: 'absolute'
                            }}
                        />
                    ))}
                </div>
                <div className="hero-overlay"></div>
                <div className="container hero-content">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="hero-text"
                    >
                        <h1>Reliable Logistics Company <br /><span className="text-accent">in Nigeria</span></h1>
                        <p>OLIVER-UGWI GLOBAL SERVICES LTD: Connecting businesses worldwide with innovative and sustainable maritime logistics and freight forwarding solutions. “… Think Import/ Export, Think Us!”</p>
                        <div className="hero-buttons">
                            <Link to="/tracking" className="btn btn-primary btn-lg">Track Shipment</Link>
                            <Link to="/quote" className="btn btn-outline btn-lg text-white border-white hover-accent">Request a Quote</Link>
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="hero-quick-track glass"
                    >
                        <h3>Quick Track</h3>
                        <p>Enter your tracking ID to get real-time status</p>
                        <form 
                            className="track-input-group mt-3"
                            onSubmit={(e) => {
                                e.preventDefault();
                                const id = e.target.elements.trackingId.value;
                                if (id.trim()) {
                                    window.location.href = `/tracking?id=${id}`;
                                }
                            }}
                        >
                            <input 
                                type="text" 
                                name="trackingId"
                                placeholder="e.g. OUGSL-123456" 
                                className="track-input" 
                                required
                            />
                            <button type="submit" className="btn btn-accent"><FiArrowRight /></button>
                        </form>
                    </motion.div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="stats-section">
                <div className="container stats-grid">
                    <div className="stat-card">
                        <h2>9+</h2>
                        <p>Years Experience</p>
                    </div>
                    <div className="stat-card">
                        <h2>150+</h2>
                        <p>Global Partners</p>
                    </div>
                    <div className="stat-card">
                        <h2>10k+</h2>
                        <p>Shipments Delivered</p>
                    </div>
                    <div className="stat-card">
                        <h2>99%</h2>
                        <p>Client Satisfaction</p>
                    </div>
                </div>
            </section>

            {/* Core Services */}
            <section className="services-section section-padding bg-light">
                <div className="container">
                    <div className="section-header text-center">
                        <span className="subtitle">What We Do</span>
                        <h2>Our Core Logistics Services</h2>
                        <p className="mx-auto mt-3 max-w-2xl">We offer comprehensive supply chain solutions tailored to meet the unique demands of global trade and commerce.</p>
                    </div>

                    <div className="services-grid mt-5">
                        <motion.div whileHover={{ y: -10 }} className="service-card">
                            <div className="service-icon"><FiAnchor /></div>
                            <h3>Maritime Logistics</h3>
                            <p>Expert port operations, cargo handling, and freight forwarding ensuring secure ocean transit.</p>
                            <Link to="/services/maritime" className="service-link">Read More <FiArrowRight /></Link>
                        </motion.div>

                        <motion.div whileHover={{ y: -10 }} className="service-card">
                            <div className="service-icon"><FiSend /></div>
                            <h3>Air Cargo Logistics</h3>
                            <p>Swift airfreight forwarding and airport services for time-critical express shipments globally.</p>
                            <Link to="/services/air-cargo" className="service-link">Read More <FiArrowRight /></Link>
                        </motion.div>

                        <motion.div whileHover={{ y: -10 }} className="service-card">
                            <div className="service-icon"><FiPackage /></div>
                            <h3>General Merchandise</h3>
                            <p>End-to-end product sourcing, quality distribution, and reliable supply chain management.</p>
                            <Link to="/services/merchandise" className="service-link">Read More <FiArrowRight /></Link>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Competitive Advantage */}
            <section className="advantage-section section-padding">
                <div className="container row align-items-center">
                    <div className="col-md-6 advantage-img-col">
                        <div className="main-img-box">
                            <img src="/tinkan-port-1.jpeg" alt="OLIVER-UGWI Advantage" className="advantage-img" />
                            <div className="experience-badge glass-dark">
                                <h3>Registered</h3>
                                <p>Export Compliance</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 advantage-text-col">
                        <span className="subtitle">Why Choose Us</span>
                        <h2 className="mb-4">The OLIVER-UGWI Advantage</h2>
                        <ul className="advantage-list">
                            <li>
                                <FiCheckCircle className="check-icon" />
                                <div>
                                    <h4>Professionalism</h4>
                                    <p>Our experienced team of experts ensures that your maritime and air cargo needs are handled with the utmost professionalism and efficiency.</p>
                                </div>
                            </li>
                            <li>
                                <FiCheckCircle className="check-icon" />
                                <div>
                                    <h4>Reliability</h4>
                                    <p>Clients trust us to deliver on time, every time, and we take this trust seriously.</p>
                                </div>
                            </li>
                            <li>
                                <FiCheckCircle className="check-icon" />
                                <div>
                                    <h4>Innovation</h4>
                                    <p>We stay at the forefront of industry trends and technologies to offer innovative solutions that keep your business competitive.</p>
                                </div>
                            </li>
                        </ul>
                        <Link to="/about" className="btn btn-primary mt-4">Discover Our Story</Link>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="testimonials-section section-padding bg-light">
                <div className="container">
                    <div className="section-header text-center">
                        <span className="subtitle">Client Success Stories</span>
                        <h2>What Our Clients Say</h2>
                        <p className="mx-auto mt-3 max-w-2xl">Don't just take our word for it. Hear from businesses that trust us with their global logistics and supply chain needs.</p>
                    </div>

                    <div className="testimonials-carousel mt-5">
                        {isLoadingTestimonials ? (
                            <div className="text-center w-100 py-5">
                                <div className="spinner-border text-primary" role="status"></div>
                            </div>
                        ) : (
                            <Swiper
                                modules={[Autoplay, Pagination, Navigation]}
                                spaceBetween={30}
                                slidesPerView={1}
                                autoplay={{ delay: 5000, disableOnInteraction: false }}
                                pagination={{ clickable: true }}
                                navigation
                                breakpoints={{
                                    768: { slidesPerView: 2 },
                                    1024: { slidesPerView: 3 },
                                }}
                                className="testimonials-swiper"
                            >
                                {testimonials.map((testimonial, index) => (
                                    <SwiperSlide key={testimonial.id || index}>
                                        <div className="testimonial-card">
                                            <div className="quote-icon">"</div>
                                            <p className="testimonial-text">{testimonial.text}</p>
                                            <div className="testimonial-author mt-4">
                                                <div className="author-avatar">
                                                    {testimonial.image_url ? (
                                                        <img src={testimonial.image_url.startsWith('http') ? testimonial.image_url : `${(import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace(/\/api$/, '')}${testimonial.image_url}`} alt={testimonial.name} />
                                                    ) : (
                                                        <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.name)}&background=0b2447&color=d4af37&size=150&font-size=0.4&bold=true`} alt={testimonial.name} />
                                                    )}
                                                </div>
                                                <div className="author-info">
                                                    <h4>{testimonial.name}</h4>
                                                    <p>{testimonial.role}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        )}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section text-center">
                <div className="container">
                    <h2>Ready to streamline your supply chain?</h2>
                    <p className="mt-3 mb-4">Partner with OLIVER-UGWI today for reliable, secure, and fast logistics operations.</p>
                    <Link to="/quote" className="btn btn-accent btn-lg">Request a Free Quote</Link>
                </div>
            </section>
        </div>
    );
};

export default Home;
