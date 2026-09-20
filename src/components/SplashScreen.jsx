import React from 'react'
import Logo from "../assets/Logo.png"

const SplashScreen = ({ splashFade }) => {
    return (
        <div className={splashFade ? 'splash-screen fade-out' : 'splash-screen'}>
            <img
                className='splash-logo'
                src={Logo}
                alt="LiftLab"
            />
        </div>
    )
}

export default SplashScreen