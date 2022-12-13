import { Link, useNavigate } from "react-router-dom"
import { UserChoiceContext } from '../context/UserChoiceContext';
import { useContext } from "react";

export default function Header() {
    const { user, setUser } = useContext(UserChoiceContext)
    const navigate = useNavigate()
    function SignOut() {
        setUser()
        navigate('/home')

    }
    return (
        <div className="header-container">
            <Link to={'/home'}>
                <button className="button-header" type="link" htmlType="button">
                    Home
                </button>
            </Link>
            <Link to={'/add-new'}>
                <button className="button-header" type="link" htmlType="button">
                    Add Recipe
                </button>
            </Link>
            {user ?
                <button className="button-header" type="link" htmlType="button" onClick={SignOut}>
                    Sign-Out
                </button>
                :
                <Link to={'/sign-in'} >
                    <button className="button-header" type="link" htmlType="button">
                        Sign-in
                    </button>
                </Link>
            }
        </div>
    )
}