import React, { useState, useEffect } from "react";
import Image from 'next/image';
import { headerNav } from "@/constants";
import LetzLogo from '@/assets/img/wadiz.svg'

const Header = () => {
    const [activeLink, setActiveLink] = useState("#intro");

    const handleClick = (e, url) => {
        e.preventDefault();
        setActiveLink(url);
        document.querySelector(url).scrollIntoView({ behavior: 'smooth' });
    }

    const handleScroll = () => {
        headerNav.forEach(nav => {
            const element = document.querySelector(nav.url);
            if (element && window.scrollY >= element.offsetTop && window.scrollY < element.offsetTop + element.offsetHeight) {
                setActiveLink(nav.url);
            }
        });
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, []);

    return (
        <header id="header" role="banner">
            <div className="header__inner">
                <div className="letz_logo">
                    <a href="/">
                    <Image
                        src={LetzLogo}
                        alt="Letz Logo" 
                        width={67.32} 
                        height={17.79}
                    />
                    </a>
                </div>
                
                <nav 
                    className="header__nav" 
                    role="navigation" 
                    aria-label="메인 메뉴"
                >
                    <ul>
                        {headerNav.map((nav, key) => (
                            <li key={key}>
                                <a 
                                    href={nav.url} 
                                    onClick={(e) => handleClick(e, nav.url)} 
                                    style={activeLink === nav.url ? { color: 'rgba(0, 255, 255, 1)', fontWeight:'bold' } : {}}
                                >
                                    {nav.title}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
            
        </header>
    )
}

export default Header
