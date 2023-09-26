import React, {useEffect, useState} from 'react';
import { useLocation } from 'react-router-dom';

import SideBarItem from './sidebar-item';

import './styles.css';
import logo from '../../assets/images/white-logo.png';
import LogoutIcon from '../../assets/icons/logout.svg';
import { Link } from 'react-router-dom';

function SideBar ({ menu }) {
    const location = useLocation();
    const path=useLocation().pathname;
    const [active, setActive] = useState(1);

    useEffect(() => {
        menu.forEach(element => {
            if (location.pathname === element.path) {
                setActive(element.id);
            }
        });
    }, [location.pathname])

    const __navigate = (id) => {
        setActive(id);
    }

    return(
        <nav className='sidebar'>
            <div className='sidebar-container'>
                <div className='sidebar-logo-container'>
                    {/* <img
                        src={logo}
                        alt="logo" /> */}
                </div>

                <div className='sidebar-container'>
                    <div className='sidebar-items'>
                        <SideBarItem item={{path:"/services",pathname:"Services"}} active={path.includes("/services")}/>   
                        <SideBarItem item={{path:"/users",pathname:"Users"}} active={path.includes("/users")}/>
                    </div>

                    <div className='sidebar-footer'>
                        <Link to='/' style={{textDecoration: "none"}}> <span className='sidebar-item-label'>Logout</span> </Link>
                        <img 
                            src={LogoutIcon}
                            alt='icon-logout'
                            className='sidebar-item-icon' />
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default SideBar;