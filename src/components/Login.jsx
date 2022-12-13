import { useState } from "react"
import { initializeApp } from "firebase/app"
//A Firebase App is a container-like object that stores common configuration and shares authentication across Firebase services. 
//After you initialize a Firebase App object in your code, you can add and start using Firebase services.
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { useNavigate } from "react-router-dom";
import '../assets/Styles.css';

const firebaseConfig = {
    apiKey: "AIzaSyA2jXLKtI-EDrnGtltPjXiThAXQyJ3Qos0",
    authDomain: "web-quickcook-af.firebaseapp.com",
    projectId: "web-quickcook-af",
    storageBucket: "web-quickcook-af.appspot.com",
    messagingSenderId: "139608300553",
    appId: "1:139608300553:web:faadedc2196b5f31d8acd8"
};

export default function Login({ setUser }) {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const handleLogin = async (e) => {
        e.preventDefault()
        const app = initializeApp(firebaseConfig) // connects to Firebase
        const auth = getAuth(app) // connects us to Firebase Auth
        const response = await signInWithEmailAndPassword(auth, email, password)
            .catch(alert)
        setUser(response.user)
        navigate('/home')
    }
    const handleGoogleLogin = async () => {
        const app = initializeApp(firebaseConfig) // connects to Firebase
        const auth = getAuth(app) // connects us to Firebase Auth
        const provider = new GoogleAuthProvider()
        provider.setCustomParameters({
            prompt: 'select_account',
          });
        const response = await signInWithPopup(auth, provider)
            .catch(alert)
        setUser(response.user)
        navigate('/home')
        }
    return (
        <div className="login-container">

            <h1 className="login-title">Login</h1>
            <form onSubmit={handleLogin}>
                <label className="login-email" htmlFor="email">Email:{' '}
                    <input type="email" name="email"
                        value={email} onChange={e => setEmail(e.target.value)}
                        placeholder="yourname@domain.com" />
                </label>
                <br />
                <label className="login-password" htmlFor="password">Password:{' '}
                    <input type="password" name="password"
                        value={password} onChange={e => setPassword(e.target.value)}
                        placeholder="•••••••" />
                </label>
                <br />
                <div className="login-button">
                    <button type="submit">Login</button>
                </div>
            </form>
            <br />
            <div className="google-login-container">

                <button onClick={handleGoogleLogin}>Sign in with Google</button>
            </div>
        </div>
    )
}
