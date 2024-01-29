import React, { useState } from 'react'
import Navlogo from '../components/Navlogo'
import styles from '../styles/Signin.module.css'
import Link from 'next/dist/client/link'
import { useAuth } from '../Auth/AuthContext'
import { useRouter } from 'next/router'

const signin = () => {

    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')

    const [emailerr, setemailerr] = useState('')
    const [passwderr, setpasswderr] = useState('')

    const checkemailerr = () => {
        if (email == '') {
            setemailerr('Email required')
        }
    }
    const checkpasswderr = () => {
        if (password == '') {
            setpasswderr('Password required')
        }
    }
    const { user, signIn, signUp, logout } = useAuth();
    const router = useRouter();


    const handleSignin = (e) => {
        e.preventDefault();
        // console.log(data);
        if (email === '') {
            setemailerr('Email required')
        }
        if (password === '') {
            setpasswderr('Password required')
        }

        signIn(email, password).then((res) => {
            if (res == 'signin success') {
                alert('Signin Successful')
                router.push('/')
            }
            
            if (res == 'FirebaseError: Firebase: Error (auth/invalid-email).') {
               
                setemailerr('Invalid Email')
            }
            if (res == 'FirebaseError: Firebase: Error (auth/missing-password).') {
               
                setpasswderr('Password required')
            }
            if (res == 'FirebaseError: Firebase: Error (auth/invalid-login-credentials).') {
               
                setpasswderr('Wrong Password')
            }
            
            // console.log(res)
        }).catch((err) => {
            console.log(err)
        }
        )
    }

    return (
        <div className={styles.outer}>
            <div className={styles.content}>
                <Navlogo />
                <div className={styles.container}>
                    <div className={styles.form}>
                        <form>
                            <h1>Sign In</h1>
                            {emailerr && <p className={styles.error}>{emailerr}</p>}
                            <input placeholder="Email or phone number" onBlur={checkemailerr} onChange={(e) => {
                                setemail(e.target.value)
                                setemailerr('')
                            }} />
                            {passwderr && <p className={styles.error}>{passwderr}</p>}
                            <input placeholder="Password" type="password" onBlur={checkpasswderr} onChange={(e) => {
                                setpassword(e.target.value)
                                setpasswderr('')
                            }} />
                            
                            <button onClick={handleSignin}>Sign In</button>
                            <div className={styles.forms1}>
                                <div>
                                    <input type="checkbox" id="reme" name="Remember Me" value="Remember Me" />
                                    <label for="reme"> Remember me</label><br></br>
                                </div>
                                <p>Need help?</p>
                            </div>
                        </form>

                        <div className={styles.forms2}>
                            <h1>New to Netflix? <Link href='/signup/regform'><span>Sign up now</span></Link></h1>
                            <p>This page is protected by Google reCAPTCHA to ensure you're not a bot.
                                <span>Learn more.</span>
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default signin