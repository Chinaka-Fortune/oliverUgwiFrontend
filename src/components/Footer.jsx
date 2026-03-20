import React from 'react';
import { Link } from 'react-router-dom';
import { FiMapPin, FiPhone, FiMail, FiFacebook, FiTwitter, FiInstagram, FiLinkedin, FiYoutube } from 'react-icons/fi';
import logo from '../assets/oliver-ugwi-logo.jpeg';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer pt-5">
            <div className="container">
                <div className="footer-grid">
                    <div className="footer-col brand-col">
                        <Link to="/">
                            <img src={logo} alt="OLIVER-UGWI Logo" className="footer-logo-img" />
                        </Link>
                        <p className="motto">“… Think Import/Export, Think Us!”</p>
                        <p className="desc mt-3">Connecting businesses worldwide with innovative and sustainable logistics solutions since 2017.</p>
                        <div className="social-links mt-4">
                            <a href="https://www.facebook.com/oliverugwi06" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FiFacebook /></a>
                            <a href="https://www.twitter.com/OliverUgwiGSL" target="_blank" rel="noopener noreferrer" aria-label="Twitter"><FiTwitter /></a>
                            <a href="https://www.instagram.com/oliverugwigsl" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FiInstagram /></a>
                            <a href="https://ng.linkedin.com/company/oliver-ugwi-global-services-ltd" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FiLinkedin /></a>
                            <a href="https://youtube.com/@oeugwi06?si=stsFUfOIr0ttpLvz" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><FiYoutube /></a>
                        </div>
                    </div>

                    <div className="footer-col links-col">
                        <h3>Quick Links</h3>
                        <ul>
                            <li><Link to="/about">About Us</Link></li>
                            <li><Link to="/tracking">Track Shipment</Link></li>
                            <li><Link to="/blog">Industry Insights</Link></li>
                            <li><Link to="/careers">Careers</Link></li>
                            <li><Link to="/contact">Contact Support</Link></li>
                        </ul>
                    </div>

                    <div className="footer-col services-col">
                        <h3>Our Services</h3>
                        <ul>
                            <li><Link to="/services/maritime">Maritime Logistics</Link></li>
                            <li><Link to="/services/air-cargo">Air Cargo Logistics</Link></li>
                            <li><Link to="/services/merchandise">General Merchandise</Link></li>
                        </ul>
                    </div>

                    <div className="footer-col contact-col">
                        <h3>Contact Us</h3>
                        <ul className="contact-info">
                            <li>
                                <FiMapPin className="contact-icon" />
                                <span>14 Erekusu Estate,<br />Apapa-Oshodi Expressway,<br />Ijesha, Lagos State, Nigeria</span>
                            </li>
                            <li>
                                <FiPhone className="contact-icon" />
                                <span>+234 813 211 2909<br />+234 818 267 8808</span>
                            </li>
                            <li>
                                <FiMail className="contact-icon" />
                                <span>INFO@OLIVERUGWI.COM</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="footer-bottom mt-5">
                    <div className="footer-bottom-content">
                        <p>&copy; {new Date().getFullYear()} OLIVER-UGWI GLOBAL SERVICES LTD. All rights reserved.</p>
                        <div className="footer-legal">
                            <Link to="/company-policy">Company Policy</Link>
                            <Link to="/incoterms">Incoterms® 2020</Link>
                            <Link to="/privacy">Privacy Policy</Link>
                            <Link to="/terms">Terms of Service</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
