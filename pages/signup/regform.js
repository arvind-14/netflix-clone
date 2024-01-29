import React, { useState } from 'react'
import SignupNav from './SignupNav'
import styles from './Signuppage.module.css'
import { useRecoilState } from 'recoil'
import { tempemailvar, tempassvar } from '../../atoms/temuserdata'
import { useAuth } from '../../Auth/AuthContext'
import { useRouter } from 'next/router'

const regform = () => {
    const [email, setemail] = useRecoilState(tempemailvar)
    const [password, setpassword] = useRecoilState(tempassvar)

    const { user, signIn, signUp, logout } = useAuth();

    const [emailerr, setemailerr] = useState('')
    const [passwderr, setpasswderr] = useState('')
    const router = useRouter();

    const checkemailerr = () => {
        if (email == '') {
            setemailerr('Email required')
        }
    }
    const checkpasswderr = () => {
        if (password == '') {
            setpasswderr('Password required')
        }
        // console.log(password)
    }



    const handleSignup = (e) => {
        e.preventDefault();
        // console.log(data);
        if (email === '') {
            setemailerr('Email required')
        }
        if (password === '') {
            setpasswderr('Password required')
        }

        signUp(email, password).then((res) => {
            if (res == 'signup success') {
                alert('Signup Successful')
                router.push('/signup')
            }
            if (res == 'FirebaseError: Firebase: Error (auth/invalid-email).') {
                setemailerr('Invalid Email')
            }
            if (res == 'FirebaseError: Firebase: Error (auth/missing-password).') {
                setpasswderr('Password required')
            }

            if (res == 'FirebaseError: Firebase: Error (auth/email-already-in-use).') {
                setemailerr('Email already in use')
            }
            if (res == 'FirebaseError: Firebase: Password should be at least 6 characters (auth/weak-password).') {
                setpasswderr('Enter a Strong Password')
            }
            // console.log(res);
        })
    }


    // console.log(email)
    return (
        <div className={styles.outer}>
            <SignupNav />
            <div className={styles.hrline}></div>
            <div className={styles.s2}>
                <div className={styles.s2_2}>
                    <p>STEP <span>1</span> OF <span>3</span></p>
                    <h1>Create a password to start your membership</h1>
                    <h2>Just a few more steps and you're done!<br />
                        We hate paperwork, too.</h2>

                    <input placeholder='Email' type={'email'} value={email} onBlur={checkemailerr}
                        onChange={(e) => {
                            setemailerr('')
                            setemail(e.target.value)
                        }} />
                    {emailerr && <div className={styles.err}>{emailerr}</div>}

                    <input placeholder='Password' type={'password'} value={password} onBlur={checkpasswderr}
                        onChange={(e) => {
                            setpasswderr('')
                            setpassword(e.target.value)
                        }}
                    />
                    {passwderr && <div className={styles.err}>{passwderr}</div>}

                    <button onClick={handleSignup}>Next</button>
                </div>
            </div>
        </div>
    )
}

export default regform

