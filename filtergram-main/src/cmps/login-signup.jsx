import { useState, useEffect } from 'react'
import { userService } from '../services/user.service'
import { ImgUploader } from '../cmps/img-uploader'
import { login, signup } from '../store/user.actions.js'
import { CredentialsForm } from './credentials-form.jsx'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'

export function LoginSignup() {

    const [isSignup, setIsSignUp] = useState(false)
    const [message, setMessage] = useState('')
    function onSubmit(user) {
        isSignup ? onSignup(user) : onLogin(user)
    }

    function onLogin(user) {
        login(user)
            .then(() => { showSuccessMsg('Logged in successfully') })
            .catch((err) => { setMessage("Wrong username/password") })
    }

    function onSignup(user) {
        signup(user)
            .then(() => { showSuccessMsg('Signed in successfully') })
            .catch((err) => { showErrorMsg('Oops try again') })
    }

    // async function onSignup(user) {
    //     try {
    //         const savedUser = await onAddUser(user)
    //         if (savedUser) onLogin(savedUser)
    //     } catch (err) {
    //         console.log('Cannot login', err)
    //         throw err
    //     }
    // }

    return (
        <div className='login-screen'>
            <CredentialsForm
                onSubmit={onSubmit} isSignup={isSignup}
                />
                    <span>{message}</span>
            <div className="new-user">
                <a onClick={() => setIsSignUp((prev) => !prev)}>
                    {isSignup ?
                        'Already a member? Click here' :
                        'Don\'t have an account? Signup here'
                    }
                </a >
            </div>
        </div >
    )
}