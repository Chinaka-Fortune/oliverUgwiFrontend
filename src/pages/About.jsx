import React from 'react';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiTarget, FiEye, FiShield, FiUser } from 'react-icons/fi';
import SEO from '../components/SEO';
import './About.css';

const About = () => {
    const timeline = [
        { year: '2017', title: 'Company Foundation', description: 'OLIVER-UGWI GLOBAL SERVICES LTD was founded in Lagos, Nigeria.' },
        { year: '2018', title: 'Service Expansion', description: 'Expansion of services to include Haulage & Storage.' },
        { year: '2019', title: 'General Merchandise', description: 'Launching of General Merchandise trading.' },
        { year: '2020', title: 'Quality Improvement', description: 'Adoption of state-of-the-art technology to improve service quality.' },
        { year: '2021', title: 'Integrated Platform', description: 'Development of an integrated logistics platform.' },
        { year: '2022', title: 'Global Outreach', description: 'Opening of international liaison offices.' },
        { year: '2023', title: 'Export processing', description: 'Registration with Nigeria Export Promotion Council for seamless export processing.' },
        { year: '2023', title: 'Sustainability', description: 'Adoption of eco-friendly practices.' }
    ];

    const team = [
        { name: 'OLIVER EHIDIAMEN UGWI', role: 'Chief Executive Officer', image: '/team/ceo.jpeg' },
        { name: 'CHINEDUM NWABUEZE OLIVER-UGWI', role: 'Chief Financial Officer', image: '/team/cfo.jpeg' },
        { name: 'SIMON OMOKHOMION UGWI', role: 'Chief Operating Officer', image: '/team/coo.jpeg' },
        { name: 'Ngozi Nkwachi Okamgba', role: 'Chief Human Resources Officer', image: '/team/human-resources-officer.jpeg' },
        { name: 'Praise Ekene Israel', role: 'Chief Technology Officer', image: '/team/cto.jpeg' },
        { name: 'Michael Eghosa Iyawe', role: 'Chief Accounting Officer', image: '/team/cao.jpeg' },
        { name: 'Ugochi Wachuku, Esq.', role: 'Legal Advisor', image: '/team/legal-adviser.jpeg' }
    ];

    return (
        <div className="about-page">
            <SEO
                title="About Us | Logistics Company in Lagos Nigeria"
                description="Learn about OLIVER-UGWI GLOBAL SERVICES LTD, a leading logistics and freight forwarding company in Lagos, Nigeria since 2017. Providing reliable maritime and air cargo solutions."
                keywords="Logistics company in Lagos, Freight forwarding Lagos Nigeria, Shipping company Lagos, Logistics company Ijesha Lagos, Nigeria logistics services"
            />
            {/* Page Header */}
            <section className="standard-page-header">
                <div className="container text-center">
                    <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>About Us</motion.h1>
                    <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                        A legacy of excellence in global logistics and trade since 2017.
                    </motion.p>
                </div>
            </section>

            {/* Company Overview */}
            <section className="section-padding">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-md-6 text-column">
                            <span className="subtitle">Who We Are</span>
                            <h2 className="section-title">OLIVER-UGWI GLOBAL SERVICES LTD</h2>
                            <p className="mt-4">
                                "... Think Import/ Export, Think Us!"
                            </p>
                            <div className="description-text">
                                <p className="mb-4">
                                    OLIVER-UGWI GLOBAL SERVICES LTD is a dynamic and versatile logistics company, with a reputation for providing cutting-edge solutions and unparalleled customer service.
                                </p>
                                <p className="mb-4">
                                    Since its establishment on 8th September, 2017, the company has developed a diverse portfolio of services, including maritime and air cargo logistics, general merchandise, and much more.
                                </p>
                                <p className="mb-4">
                                    With a team of highly skilled and dedicated professionals, OLIVER-UGWI GLOBAL SERVICES LTD is committed to delivering excellence in the global trade and logistics industry.
                                </p>
                            </div>
                            <div className="stats-mini row mt-4">
                                <div className="col-6">
                                    <h3 className="text-accent" style={{ fontSize: '2rem' }}>2017</h3>
                                    <p>Year Founded</p>
                                </div>
                                <div className="col-6">
                                    <h3 className="text-accent" style={{ fontSize: '2rem' }}>100%</h3>
                                    <p>Delivery Rate</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 about-img-wrapper mt-5 mt-md-0">
                            <div className="about-img-box bg-navy" style={{ minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '12px', overflow: 'hidden' }}>
                                <img src="/team/ceo.jpeg" alt="OLIVER UGWI" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                            <div className="glass float-card">
                                <h4 style={{ color: 'var(--primary-navy)' }}>Trusted by 500+</h4>
                                <p>Businesses Globally</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Industry Positioning Section */}
            <section className="section-padding bg-navy text-white">
                <div className="container">
                    <div className="row text-center mb-5">
                        <div className="col-12">
                            <span className="subtitle" style={{ color: 'var(--accent-gold)' }}>Industry Positioning</span>
                            <h2 className="text-white">Positioned at the Heart of Global Trade</h2>
                            <p className="mx-auto max-w-2xl mt-3 lead" style={{ color: 'rgba(255,255,255,0.8)' }}>
                                OLIVER-UGWI GLOBAL SERVICES LTD operates at the intersection of international trade, maritime logistics, air cargo logistics, and supply chain facilitation, delivering reliable logistics and freight solutions for businesses engaged in global commerce.
                            </p>
                        </div>
                    </div>

                    <div className="row g-5">
                        <div className="col-lg-6">
                            <div className="glass-card mb-4 p-4" style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)' }}>
                                <h3 className="h4 text-accent mb-3">Strategically Located</h3>
                                <p><strong>14 Erekusu Estate, Apapa-Oshodi Expressway, Ijesha, Lagos State, Nigeria</strong></p>
                                <p style={{ color: 'rgba(255,255,255,0.8)' }}>
                                    The company sits within one of Nigeria’s most critical logistics and industrial corridors, connecting major seaports, airports, and commercial distribution networks across the country.
                                </p>
                                <p style={{ color: 'rgba(255,255,255,0.8)' }}>
                                    This strategic positioning enables the company to efficiently coordinate cargo movement between Nigeria and global markets, supporting importers, exporters, manufacturers, and trading companies with seamless logistics operations.
                                </p>
                            </div>

                            <div className="glass-card p-4" style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)' }}>
                                <h3 className="h4 text-accent mb-3">Operating Within the Global Logistics Ecosystem</h3>
                                <p style={{ color: 'rgba(255,255,255,0.8)' }}>Modern logistics depends on integrated supply chains linking ports, airports, warehouses, customs authorities, and transportation networks across continents. Within this ecosystem, we function as a specialized logistics and freight facilitation partner, helping businesses navigate the complexities of international cargo movement.</p>
                                <p style={{ color: 'rgba(255,255,255,0.8)' }} className="mb-2"><strong>Key logistics services support:</strong></p>
                                <ul style={{ color: 'rgba(255,255,255,0.8)' }} className="pl-3">
                                    <li>Maritime freight coordination</li>
                                    <li>Air cargo logistics</li>
                                    <li>Customs documentation and clearance support</li>
                                    <li>Import and export logistics facilitation</li>
                                    <li>Cargo movement and haulage coordination</li>
                                    <li>Supply chain support services</li>
                                </ul>
                            </div>
                        </div>

                        <div className="col-lg-6">
                            <div className="glass-card mb-4 p-4" style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)' }}>
                                <h3 className="h4 text-accent mb-3">Strategic Advantage Within Nigeria’s Logistics Corridor</h3>
                                <p style={{ color: 'rgba(255,255,255,0.8)' }}>Lagos remains the commercial and maritime gateway of Nigeria, handling the majority of the nation’s international cargo traffic. By operating along the Apapa-Oshodi Expressway logistics corridor, we maintain close proximity to critical trade infrastructure, including:</p>
                                <ul style={{ color: 'rgba(255,255,255,0.8)' }} className="pl-3 mb-3">
                                    <li>Apapa Port Complex</li>
                                    <li>Tin-Can Island Port</li>
                                    <li>Major freight terminals</li>
                                    <li>Murtala Muhammed International Airport cargo facilities</li>
                                    <li>Inland transport and distribution networks</li>
                                </ul>
                                <p style={{ color: 'rgba(255,255,255,0.8)' }}>This location allows the company to coordinate cargo movement efficiently between sea, air, and inland logistics channels.</p>
                            </div>

                            <div className="glass-card p-4" style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)' }}>
                                <h3 className="h4 text-accent mb-3">Supporting Businesses in Global Commerce</h3>
                                <p style={{ color: 'rgba(255,255,255,0.8)' }}>Our mission centers on enabling trade by simplifying logistics processes. We support international trading companies, manufacturing and industrial firms, import and export merchants, supply chain distributors, and general merchandise businesses.</p>
                            </div>
                        </div>

                        <div className="col-12 mt-4">
                            <div className="glass-card p-4 text-center" style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)' }}>
                                <h3 className="h4 text-accent mb-3">Commitment to Professional Logistics Standards</h3>
                                <p style={{ color: 'rgba(255,255,255,0.8)' }}>Under the leadership of OLIVER EHIDIAMEN UGWI, the company is guided by a strong commitment to professionalism, efficiency, and dependable logistics service delivery.</p>
                                <blockquote className="blockquote mt-4 mb-4" style={{ fontSize: '1.5rem', color: '#fff', fontStyle: 'italic', borderLeft: '4px solid var(--accent-gold)', paddingLeft: '1rem' }}>
                                    "Competence Meets Commitment."
                                </blockquote>
                                <div className="row mt-4">
                                    <div className="col-md-6 text-md-left">
                                        <p style={{ color: 'rgba(255,255,255,0.8)' }}><strong>This guiding principle drives our focus on:</strong></p>
                                        <ul style={{ color: 'rgba(255,255,255,0.8)', listStyleType: 'none', paddingLeft: 0 }}>
                                            <li><FiCheckCircle className="text-accent mr-2" /> Operational reliability</li>
                                            <li><FiCheckCircle className="text-accent mr-2" /> Transparent service delivery</li>
                                            <li><FiCheckCircle className="text-accent mr-2" /> Professional logistics coordination</li>
                                            <li><FiCheckCircle className="text-accent mr-2" /> Customer-centered solutions</li>
                                        </ul>
                                    </div>
                                    <div className="col-md-6 text-md-left mt-4 mt-md-0">
                                        <h4 className="h5 text-accent mb-2">Vision for Global Logistics Connectivity</h4>
                                        <p style={{ color: 'rgba(255,255,255,0.8)' }}>As global trade continues to evolve, we aim to strengthen our role as a trusted logistics partner connecting Nigeria to international markets. Through strategic partnerships, innovation, and industry expertise, we position ourselves as a reliable gateway for cargo movement across borders and continents.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* MVV Section (Mission, Vision, Values) */}
            <section className="mvv-section section-padding bg-light">
                <div className="container">
                    <div className="row text-center mb-5">
                        <div className="col-12">
                            <h2>Our Driving Force</h2>
                            <p className="mx-auto max-w-2xl mt-3 lead">The core principles that guide our daily operations and long-term strategic decisions.</p>
                        </div>
                    </div>
                    <div className="row mvv-grid">
                        <motion.div whileHover={{ y: -10 }} className="mvv-card glass-card mvv-card-split">
                            <div className="mvv-img-box">
                                <img src="/mission-illustration.png" alt="Our Mission" className="mvv-img" />
                                <div className="mvv-overlay"></div>
                                <div className="mvv-icon-floating"><FiTarget size={30} /></div>
                            </div>
                            <div className="mvv-content p-4">
                                <h3>Our Mission</h3>
                                <p className="mt-2 text-muted">Connecting businesses worldwide with innovative and sustainable logistics solutions.</p>
                            </div>
                            <div className="mvv-img-box bottom-img-box">
                                <img src="/mission-illustration.png" alt="" className="mvv-img" />
                                <div className="mvv-overlay"></div>
                            </div>
                        </motion.div>
                        <motion.div whileHover={{ y: -10 }} className="mvv-card glass-card mvv-card-split">
                            <div className="mvv-img-box">
                                <img src="/mission-illustration.png" alt="Our Vision" className="mvv-img" />
                                <div className="mvv-overlay"></div>
                                <div className="mvv-icon-floating"><FiEye size={30} /></div>
                            </div>
                            <div className="mvv-content p-4">
                                <h3>Our Vision</h3>
                                <p className="mt-2 text-muted">A better world for businesses to thrive, and where logistics will be effortless for all.</p>
                            </div>
                            <div className="mvv-img-box bottom-img-box">
                                <img src="/mission-illustration.png" alt="" className="mvv-img" />
                                <div className="mvv-overlay"></div>
                            </div>
                        </motion.div>
                        <motion.div whileHover={{ y: -10 }} className="mvv-card glass-card">
                            <div className="mvv-img-box">
                                <img src="/global-logistics-bg.png" alt="Core Values" className="mvv-img" />
                                <div className="mvv-overlay"></div>
                                <div className="mvv-icon-floating"><FiShield size={30} /></div>
                            </div>
                            <div className="mvv-content p-4">
                                <h3>Core Values</h3>
                                <ul className="values-list text-left mt-3">
                                    <li className="mb-4">
                                        <div className="d-flex align-items-start">
                                            <div className="mr-3" style={{ marginRight: '1rem' }}>
                                                <FiCheckCircle className="text-accent mt-1 flex-shrink-0" size={24} />
                                            </div>
                                            <span><strong>Professionalism:</strong> Our experienced team of experts ensures that your maritime and air cargo needs are handled with the utmost professionalism and efficiency.</span>
                                        </div>
                                    </li>
                                    <li className="mb-4">
                                        <div className="d-flex align-items-start">
                                            <div className="mr-3" style={{ marginRight: '1rem' }}>
                                                <FiCheckCircle className="text-accent mt-1 flex-shrink-0" size={24} />
                                            </div>
                                            <span><strong>Customer Satisfaction:</strong> We prioritize customer satisfaction by providing tailor-made solutions that meet your unique requirements.</span>
                                        </div>
                                    </li>
                                    <li className="mb-4">
                                        <div className="d-flex align-items-start">
                                            <div className="mr-3" style={{ marginRight: '1rem' }}>
                                                <FiCheckCircle className="text-accent mt-1 flex-shrink-0" size={24} />
                                            </div>
                                            <span><strong>Reliability:</strong> Clients trust us to deliver on time, every time, and we take this trust seriously.</span>
                                        </div>
                                    </li>
                                    <li className="mb-4">
                                        <div className="d-flex align-items-start">
                                            <div className="mr-3" style={{ marginRight: '1rem' }}>
                                                <FiCheckCircle className="text-accent mt-1 flex-shrink-0" size={24} />
                                            </div>
                                            <span><strong>Teamwork:</strong> Our employees work collaboratively to address the unique challenges and complexities of the maritime and air cargo sector, ultimately leading to successful and reliable operations.</span>
                                        </div>
                                    </li>
                                    <li className="mb-4">
                                        <div className="d-flex align-items-start">
                                            <div className="mr-3" style={{ marginRight: '1rem' }}>
                                                <FiCheckCircle className="text-accent mt-1 flex-shrink-0" size={24} />
                                            </div>
                                            <span><strong>Innovation:</strong> We stay at the forefront of industry trends and technologies to offer innovative solutions that keep your business competitive.</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Competitive Advantage Section */}
            <section className="section-padding bg-light">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6 mb-4 mb-lg-0">
                            <span className="subtitle">Why Choose Us</span>
                            <h2 className="mb-4">OUR COMPETITIVE ADVANTAGE</h2>
                            <ul className="advantage-list list-unstyled">
                                <li className="mb-4">
                                    <div className="d-flex align-items-start">
                                        <FiCheckCircle className="text-accent mt-1 mr-3 flex-shrink-0" size={24} style={{ marginRight: '1rem' }} />
                                        <div>
                                            <h4 className="h5 mb-2">Global Network:</h4>
                                            <p className="text-muted mb-0">Our extensive network of partners and agents worldwide allows us to offer comprehensive logistics services to virtually any destination.</p>
                                        </div>
                                    </div>
                                </li>
                                <li className="mb-4">
                                    <div className="d-flex align-items-start">
                                        <FiCheckCircle className="text-accent mt-1 mr-3 flex-shrink-0" size={24} style={{ marginRight: '1rem' }} />
                                        <div>
                                            <h4 className="h5 mb-2">Technology-Driven:</h4>
                                            <p className="text-muted mb-0">We leverage the latest technology to provide real-time tracking, transparent reporting, and streamlined processes, giving you full visibility and control over your cargo.</p>
                                        </div>
                                    </div>
                                </li>
                                <li className="mb-4">
                                    <div className="d-flex align-items-start">
                                        <FiCheckCircle className="text-accent mt-1 mr-3 flex-shrink-0" size={24} style={{ marginRight: '1rem' }} />
                                        <div>
                                            <h4 className="h5 mb-2">Dedicated Team:</h4>
                                            <p className="text-muted mb-0">Our team consists of industry veterans and young, dynamic professionals who work together to overcome logistical challenges and deliver results.</p>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="d-flex align-items-start">
                                        <FiCheckCircle className="text-accent mt-1 mr-3 flex-shrink-0" size={24} style={{ marginRight: '1rem' }} />
                                        <div>
                                            <h4 className="h5 mb-2">Commitment to Sustainability:</h4>
                                            <p className="text-muted mb-0">We are committed to reducing our environmental footprint by optimizing routes, minimizing waste, and employing eco-friendly practices wherever possible.</p>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="col-lg-6">
                            <div className="main-img-box">
                                <img src="/images/merchandise.jpg" alt="Competitive Advantage" className="advantage-img" style={{ borderRadius: '12px', boxShadow: 'var(--shadow-lg)' }} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Concerns & Recommendations Section */}
            <section className="section-padding">
                <div className="container">
                    <div className="text-center mb-5">
                        <span className="subtitle">Industry Challenges</span>
                        <h2 className="mb-3">Concerns & Recommendations</h2>
                        <p className="mx-auto max-w-2xl lead text-muted">How we navigate industry obstacles to ensure your operations remain smooth.</p>
                    </div>

                    <div className="row g-4">
                        {[
                            {
                                concern: "Supply Chain Disruptions",
                                issue: "Unexpected events such as natural disasters, geopolitical conflicts, or pandemics can disrupt global supply chains.",
                                rec: "Develop robust supply chain contingency plans, diversify suppliers, and monitor global events for potential disruptions."
                            },
                            {
                                concern: "Customs and Regulatory Compliance",
                                issue: "Navigating complex customs and regulatory requirements in different countries can lead to delays and compliance issues.",
                                rec: "Employ customs experts, implement digital documentation systems, and stay updated on changing regulations to ensure compliance."
                            },
                            {
                                concern: "Transportation Capacity Challenges",
                                issue: "Fluctuations in transportation capacity, including shortages of shipping containers or air cargo space, can impact logistics operations.",
                                rec: "Maintain strong relationships with transportation providers, forecast capacity needs, and explore alternative transportation options."
                            },
                            {
                                concern: "Security Threats",
                                issue: "Security threats, such as cargo theft or cyber-attacks, pose risks to the safety of cargo and data.",
                                rec: "Invest in robust security measures, including tracking systems, secure data management, and employee training on security protocols."
                            },
                            {
                                concern: "Environmental Concerns",
                                issue: "Growing environmental awareness has led to increased scrutiny of the carbon footprint of logistics operations.",
                                rec: "Embrace sustainable practices, adopt eco-friendly technologies, and offer 'green' logistics options to environmentally conscious clients."
                            },
                            {
                                concern: "Currency Exchange Volatility",
                                issue: "Fluctuations in currency exchange rates can impact pricing and profitability in International Trade.",
                                rec: "Develop currency risk management strategies, including hedging, and maintain financial flexibility."
                            }
                        ].map((item, index) => (
                            <div key={index} className="col-lg-6 mb-4">
                                <motion.div
                                    whileHover={{ y: -5 }}
                                    className="p-4 rounded h-100"
                                    style={{ border: '1px solid var(--border-light)', background: 'var(--bg-main)' }}
                                >
                                    <h4 className="mb-3" style={{ color: 'var(--primary-navy)' }}>{item.concern}</h4>
                                    <div className="mb-3">
                                        <h6 className="text-uppercase mb-1" style={{ fontSize: '0.8rem', letterSpacing: '1px', color: 'var(--status-pending)' }}>Concern</h6>
                                        <p className="text-muted mb-0">{item.issue}</p>
                                    </div>
                                    <div>
                                        <h6 className="text-uppercase mb-1" style={{ fontSize: '0.8rem', letterSpacing: '1px', color: 'var(--status-delivered)' }}>Recommendation</h6>
                                        <p className="text-muted mb-0">{item.rec}</p>
                                    </div>
                                </motion.div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Timeline Section */}
            <section className="timeline-section section-padding">
                <div className="container">
                    <div className="text-center mb-5">
                        <span className="subtitle">Our Journey</span>
                        <h2>Company Milestones</h2>
                    </div>
                    <div className="timeline">
                        {timeline.map((item, index) => (
                            <div key={index} className="timeline-item">
                                <div className="timeline-dot"></div>
                                <div className="timeline-content glass-card p-4">
                                    <h3 className="text-accent">{item.year}</h3>
                                    <h4 className="my-2">{item.title}</h4>
                                    <p className="text-muted">{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="team-section section-padding bg-light">
                <div className="container">
                    <div className="text-center mb-5">
                        <span className="subtitle">Our Experts</span>
                        <h2>Meet Our Leadership Team</h2>
                        <p className="mx-auto max-w-2xl mt-3 lead">A team of highly skilled and dedicated professionals committed to delivering excellence.</p>
                    </div>
                    <div className="leadership-arrangement">
                        {/* Top Cluster */}
                        <div className="top-row">
                            {/* CEO Card (Large Left) */}
                            <div className="ceo-wrapper">
                                <motion.div whileHover={{ y: -5 }} className="profile-card ceo-card">
                                    <div className="image-crop">
                                        <img src={team[0].image} alt={team[0].name} className="profile-img" />
                                    </div>
                                    <div className="custom-banner ceo-banner">
                                        <h3>{team[0].name}</h3>
                                        <p>{team[0].role}</p>
                                    </div>
                                </motion.div>
                            </div>

                            {/* CFO & COO Column (Stacked Right) */}
                            <div className="stacked-column">
                                <motion.div whileHover={{ y: -5 }} className="profile-card small-card">
                                    <div className="image-crop">
                                        <img src={team[1].image} alt={team[1].name} className="profile-img" />
                                    </div>
                                    <div className="custom-banner small-banner">
                                        <h3>{team[1].name}</h3>
                                        <p>{team[1].role}</p>
                                    </div>
                                </motion.div>

                                <motion.div whileHover={{ y: -5 }} className="profile-card small-card">
                                    <div className="image-crop">
                                        <img src={team[2].image} alt={team[2].name} className="profile-img" />
                                    </div>
                                    <div className="custom-banner small-banner">
                                        <h3>{team[2].name}</h3>
                                        <p>{team[2].role}</p>
                                    </div>
                                </motion.div>
                            </div>
                        </div>

                        {/* Bottom Row (4 Equal Columns) */}
                        <div className="bottom-row">
                            {team.slice(3).map((member, index) => (
                                <motion.div key={index} whileHover={{ y: -5 }} className="profile-card bottom-row-card">
                                    <div className="image-crop">
                                        {member.image ? (
                                            <img src={member.image} alt={member.name} className="profile-img" />
                                        ) : (
                                            <div className="d-flex align-items-center justify-content-center h-100 w-100 position-absolute top-0 start-0" style={{ background: '#eee', color: '#ccc' }}>
                                                <FiUser size={40} />
                                            </div>
                                        )}
                                    </div>
                                    <div className="custom-banner bottom-banner">
                                        <h3>{member.name}</h3>
                                        <p>{member.role}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
