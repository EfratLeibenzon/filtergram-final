import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { userService } from '../services/user.service.js'
import { login } from '../store/user.actions.js'
import { signup } from '../store/user.actions.js'
import { useRef, useState } from 'react'
import filtergramLogo from '../assets/img/filtergramLogo.png'

export function CredentialsForm({ onSubmit, isSignup }) {
    const [user, setUser] = useState(userService.getEmptyUser())

    function handleChange({ target }) {
        const { name: field, value } = target
        setUser(prevCreds => ({ ...prevCreds, [field]: value }))
    }

    function handleSubmit(ev) {
        ev.preventDefault()
        onSubmit(user)
    }

    return (
        <div className='login-container'>
            <form className="credentials-form" onSubmit={handleSubmit}>
                <section>
                <img src={filtergramLogo} alt="Logo" className="logo" />
                <input
                    className="txt-input username"
                    type="text"
                    name="userName"
                    placeholder="Username"
                    onChange={handleChange}
                    required
                    autoFocus
                />
                <input className="txt-input password"
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    required
                />
                {isSignup && <input
                    className="txt-input fullname"
                    type="text"
                    name="fullName"
                    placeholder="Full name"
                    onChange={handleChange}
                    required
                />}
                <button className="btn log-btn">{isSignup ? 'Signup' : 'Login'}</button>
                <span class="or"><span>OR</span></span>
                {/* <button className="btn demo-user" onClick={() => userService._createGuest()}>Demo user</button> */}
                <button className="btn demo-user" onClick={() => { userService._createGuest(); window.location.reload();}}>Have fun with a Demo user</button>
                </section>
            </form>
        </div>
    )
}
