import React, { useState } from 'react';
import { FiUser, FiMail, FiPhone, FiLock, FiSave, FiAlertTriangle, FiEye, FiEyeOff } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

const Profile = () => {
    const { user, token, updateUser } = useAuth();
    const [profileData, setProfileData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        address: user?.address || ''
    });
    const [passwordData, setPasswordData] = useState({
        current: '',
        new: '',
        confirm: ''
    });
    const [loading, setLoading] = useState(false);
    const [profileImage, setProfileImage] = useState(null);
    const [show2FAModal, setShow2FAModal] = useState(false);
    const [twoFactorStep, setTwoFactorStep] = useState(1);
    const [showPasswords, setShowPasswords] = useState(false);
    const [is2FAEnabled, setIs2FAEnabled] = useState(false);
    const [notifications, setNotifications] = useState({
        email: true,
        sms: true,
        darkMode: false
    });

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
            const response = await fetch(`${apiUrl}/auth/update-profile`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    name: profileData.name,
                    phone: profileData.phone,
                    address: profileData.address
                })
            });

            const data = await response.json();
            if (response.ok) {
                updateUser(data.user);
                showNotification("Profile details saved successfully!", "success");
            } else {
                showNotification(data.msg || "Failed to update profile", "error");
            }
        } catch (error) {
            showNotification("Connection error. Please try again later.", "error");
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (!passwordData.current) {
            showNotification("Please enter your current password.", "error");
            return;
        }
        if (passwordData.new.length < 8) {
            showNotification("New password must be at least 8 characters long.", "error");
            return;
        }
        if (passwordData.new !== passwordData.confirm) {
            showNotification("New passwords do not match!", "error");
            return;
        }

        setLoading(true);
        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
            const response = await fetch(`${apiUrl}/auth/update-password`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    current_password: passwordData.current,
                    new_password: passwordData.new
                })
            });

            const data = await response.json();
            if (response.ok) {
                showNotification("Password updated successfully!", "success");
                setPasswordData({ current: '', new: '', confirm: '' });
            } else {
                showNotification(data.msg || "Failed to update password", "error");
            }
        } catch (error) {
            showNotification("Connection error. Please try again later.", "error");
        } finally {
            setLoading(false);
        }
    };

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            if (file.size > 2 * 1024 * 1024) {
                showNotification("Image size should be less than 2MB", "error");
                return;
            }
            const reader = new FileReader();
            reader.onload = (event) => setProfileImage(event.target.result);
            reader.readAsDataURL(file);
            showNotification("Profile image preview updated. Click 'Save Changes' to persist.", "info");
        }
    };

    const handleEnable2FA = () => {
        setIs2FAEnabled(true);
        setShow2FAModal(false);
        setTwoFactorStep(1);
        showNotification("Two-Factor Authentication (2FA) has been enabled for your account.", "success");
    };

    const toggle2FAStatus = () => {
        if (is2FAEnabled) {
            if (window.confirm("Are you sure you want to disable 2FA? This decreases your account security.")) {
                setIs2FAEnabled(false);
                showNotification("Two-Factor Authentication has been disabled.", "warning");
            }
        } else {
            setShow2FAModal(true);
        }
    };

    const showNotification = (message, type) => {
        alert(`${type.toUpperCase()}: ${message}`);
    };

    return (
        <div>
            <div className="mb-4">
                <h2>Account Settings</h2>
                <p className="text-muted">Manage your profile information and account security.</p>
            </div>

            <div className="row">
                <div className="col-lg-7">
                    <div className="dashboard-card mb-4">
                        <h4 className="mb-4 d-flex align-items-center gap-2">
                            <FiUser className="text-primary-blue" /> Personal Information
                        </h4>
                        <form onSubmit={handleUpdateProfile}>
                            <div className="text-center mb-4 pb-3 border-bottom">
                                <div
                                    className="avatar bg-navy text-white mx-auto mb-2 position-relative"
                                    style={{ width: '80px', height: '80px', fontSize: '2rem', overflow: 'hidden' }}
                                >
                                    {profileImage ? (
                                        <img src={profileImage} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    ) : profileData.name.charAt(0)}
                                </div>
                                <label className="btn btn-sm btn-link text-primary-navy p-0 font-xs" style={{ cursor: 'pointer' }}>
                                    Update Profile Photo
                                    <input type="file" hidden accept="image/*" onChange={handleImageChange} />
                                </label>
                            </div>

                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label className="d-block mb-1 font-weight-bold font-sm">Full Name</label>
                                    <input
                                        type="text"
                                        className="form-control w-100 p-2 border rounded"
                                        value={profileData.name}
                                        onChange={e => setProfileData({ ...profileData, name: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="d-block mb-1 font-weight-bold font-sm">Email Address</label>
                                    <input
                                        type="email"
                                        className="form-control w-100 p-2 border rounded bg-light"
                                        value={profileData.email}
                                        readOnly
                                    />
                                    <small className="text-muted">Email cannot be changed.</small>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label className="d-block mb-1 font-weight-bold font-sm">Phone Number</label>
                                    <input
                                        type="text"
                                        className="form-control w-100 p-2 border rounded"
                                        value={profileData.phone}
                                        onChange={e => setProfileData({ ...profileData, phone: e.target.value })}
                                    />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="d-block mb-1 font-weight-bold font-sm">Address</label>
                                    <input
                                        type="text"
                                        className="form-control w-100 p-2 border rounded"
                                        value={profileData.address}
                                        onChange={e => setProfileData({ ...profileData, address: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="mt-3">
                                <button type="submit" className="btn btn-primary d-flex align-items-center gap-2">
                                    <FiSave /> Save Changes
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className="dashboard-card">
                        <h4 className="mb-4 d-flex align-items-center gap-2">
                            <FiLock className="text-primary-blue" /> Security & Password
                        </h4>
                        <form onSubmit={handleResetPassword}>
                            <div className="mb-3">
                                <label className="d-block mb-1 font-weight-bold font-sm">Current Password</label>
                                <div className="position-relative">
                                    <input
                                        type={showPasswords ? "text" : "password"}
                                        className="form-control w-100 p-2 border rounded pe-5"
                                        placeholder="Enter current password"
                                        value={passwordData.current}
                                        onChange={e => setPasswordData({ ...passwordData, current: e.target.value })}
                                    />
                                    <div 
                                        onClick={() => setShowPasswords(!showPasswords)}
                                        style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', color: '#6c757d' }}
                                    >
                                        {showPasswords ? <FiEyeOff /> : <FiEye />}
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label className="d-block mb-1 font-weight-bold font-sm">New Password</label>
                                    <div className="position-relative">
                                        <input
                                            type={showPasswords ? "text" : "password"}
                                            className="form-control w-100 p-2 border rounded pe-5"
                                            placeholder="Min 8 characters"
                                            value={passwordData.new}
                                            onChange={e => setPasswordData({ ...passwordData, new: e.target.value })}
                                        />
                                        <div 
                                            onClick={() => setShowPasswords(!showPasswords)}
                                            style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', color: '#6c757d' }}
                                        >
                                            {showPasswords ? <FiEyeOff /> : <FiEye />}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="d-block mb-1 font-weight-bold font-sm">Confirm New Password</label>
                                    <div className="position-relative">
                                        <input
                                            type={showPasswords ? "text" : "password"}
                                            className="form-control w-100 p-2 border rounded pe-5"
                                            placeholder="Repeat new password"
                                            value={passwordData.confirm}
                                            onChange={e => setPasswordData({ ...passwordData, confirm: e.target.value })}
                                        />
                                        <div 
                                            onClick={() => setShowPasswords(!showPasswords)}
                                            style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', color: '#6c757d' }}
                                        >
                                            {showPasswords ? <FiEyeOff /> : <FiEye />}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-3">
                                <button type="submit" className="btn btn-outline d-flex align-items-center gap-2">
                                    <FiLock /> Update Password
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="col-lg-5">
                    <div className="dashboard-card h-100 text-center">
                        <div className="avatar bg-navy text-white mx-auto mb-4" style={{ width: '100px', height: '100px', fontSize: '2.5rem', overflow: 'hidden' }}>
                            {profileImage ? <img src={profileImage} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : profileData.name.charAt(0)}
                        </div>
                        <h3>{profileData.name}</h3>
                        <p className="text-muted">{user?.role === 'admin' ? 'System Administrator' : 'Valued Customer'}</p>

                        <div className="border-top mt-5 pt-4 text-left">
                            <h5 className="mb-3">Account Status</h5>
                            <div className="d-flex justify-content-between align-items-center mb-2">
                                <span>Verification Status:</span>
                                <span className="badge bg-success text-white">Verified</span>
                            </div>
                            <div className="d-flex justify-content-between align-items-center mb-2">
                                <span>Member Since:</span>
                                <span className="font-weight-600">Sept 2023</span>
                            </div>
                            <div className="d-flex justify-content-between align-items-center mb-2">
                                <span>Login Activity:</span>
                                <span className="text-primary-navy">Lagos, NG (Today)</span>
                            </div>
                        </div>

                        <div className="mt-5 p-3 bg-light rounded border border-warning d-flex align-items-start gap-3 text-left mb-3">
                            <FiAlertTriangle className="text-warning mt-1" />
                            <div className="flex-grow-1">
                                <div className="d-flex justify-content-between">
                                    <strong className="font-sm d-block">Two-Factor Authentication</strong>
                                    {is2FAEnabled && <span className="badge bg-success text-white font-xs" style={{ padding: '2px 5px' }}>ON</span>}
                                </div>
                                <p className="font-xs text-muted mb-0">Enable 2FA to add an extra layer of security to your account.</p>
                                {!is2FAEnabled ? (
                                    <button className="btn btn-link p-0 text-primary-navy font-sm mt-1 underline" onClick={toggle2FAStatus}>Enable Now &rarr;</button>
                                ) : (
                                    <button className="btn btn-link p-0 text-danger font-sm mt-1 underline" onClick={toggle2FAStatus}>Disable 2FA</button>
                                )}
                            </div>
                        </div>

                        <div className="mt-4 text-left">
                            <h5 className="mb-3">Preferences</h5>
                            <div className="form-check mb-2 d-flex align-items-center">
                                <input
                                    className="form-check-input mt-0"
                                    type="checkbox"
                                    checked={notifications.email}
                                    id="notifyEmail"
                                    onChange={(e) => setNotifications({ ...notifications, email: e.target.checked })}
                                />
                                <label className="form-check-label ml-2 font-sm" htmlFor="notifyEmail">Email Notifications</label>
                            </div>
                            <div className="form-check mb-2 d-flex align-items-center">
                                <input
                                    className="form-check-input mt-0"
                                    type="checkbox"
                                    checked={notifications.sms}
                                    id="notifySMS"
                                    onChange={(e) => setNotifications({ ...notifications, sms: e.target.checked })}
                                />
                                <label className="form-check-label ml-2 font-sm" htmlFor="notifySMS">SMS Alerts</label>
                            </div>
                            <div className="form-check d-flex align-items-center">
                                <input
                                    className="form-check-input mt-0"
                                    type="checkbox"
                                    checked={notifications.darkMode}
                                    id="darkMode"
                                    onChange={(e) => setNotifications({ ...notifications, darkMode: e.target.checked })}
                                />
                                <label className="form-check-label ml-2 font-sm" htmlFor="darkMode">Enable Dark Mode (Beta)</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 2FA Modal */}
            {show2FAModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div className="dashboard-card" style={{ width: '100%', maxWidth: '400px', textAlign: 'center' }}>
                        <div className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-4">
                            <h3 className="mb-0">Setup 2FA</h3>
                            <button className="btn btn-sm" onClick={() => { setShow2FAModal(false); setTwoFactorStep(1); }} style={{ fontSize: '1.5rem', padding: 0, lineHeight: 1 }}>&times;</button>
                        </div>

                        {twoFactorStep === 1 ? (
                            <div>
                                <div className="p-3 bg-light rounded mb-4 mx-auto" style={{ width: '150px', height: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px dashed #ccc' }}>
                                    <span className="text-muted font-sm">[QR Code Placeholder]</span>
                                </div>
                                <p className="font-sm mb-4">Scan this QR code with your authenticator app (Google Authenticator, Authy, etc.) to continue.</p>
                                <button className="btn btn-primary w-100" onClick={() => setTwoFactorStep(2)}>I've scanned it</button>
                            </div>
                        ) : (
                            <div>
                                <p className="font-sm mb-3">Enter the 6-digit code from your app to verify setup.</p>
                                <div className="d-flex gap-2 justify-content-center mb-4">
                                    {[1, 2, 3, 4, 5, 6].map((i) => (
                                        <input key={i} type="text" maxLength="1" className="form-control text-center p-0" style={{ width: '40px', height: '50px', fontSize: '1.2rem' }} defaultValue={i === 1 ? '0' : ''} />
                                    ))}
                                </div>
                                <button className="btn btn-primary w-100" onClick={handleEnable2FA}>Complete Setup</button>
                                <button className="btn btn-link mt-2 font-xs" onClick={() => setTwoFactorStep(1)}>&larr; Back to QR Code</button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;
