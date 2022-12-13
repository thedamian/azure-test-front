import React, { useContext } from 'react';
import Login from '../components/Login'
import Signup from '../components/Signup';
import { UserChoiceContext } from '../context/UserChoiceContext';


export default function Signin() {
    const { user, setUser } = useContext(UserChoiceContext)
    return (
        <>
            <Login setUser={setUser} />

            <Signup setUser={setUser} />
        </>
    )
}