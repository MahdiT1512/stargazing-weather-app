import React, { useState } from 'react';
import { doSignInWithEmailAndPassword } from '../firebase/auth';
import { useAuth } from '../contexts/authContext';
import './LoginModal.css';

const LoginModal = ({ onClose, switchToSignup }) => {

    const { userLoggedIn} = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSigningIn, setIsSigningIn] = useState(false);
    // const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!isSigningIn) {
            setIsSigningIn(true)
            await doSignInWithEmailAndPassword(email, password)
        }
        onClose(); // check 
    };

    return (
        <div className="login-overlay">
            <div className="login-modal">
                <button className="close-btn" onClick={onClose}>×</button>
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Login</button>
                </form>
                <p>
                    Don’t have an account?{' '}
                    <span onClick={switchToSignup}>Sign up</span>
                </p>
            </div>
        </div>
    );
};

export default LoginModal;