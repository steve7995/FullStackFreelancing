import React, {useState} from "react";
import { Link } from 'react-router-dom';
import { useLocation } from "react-router-dom";

import './styles.css';

const SideBarItem = ({ item, active }) => {
    const path=useLocation().pathname
    const [hover, setHover] = useState(false);
    return (
        <Link 
            to={item.path} 
            className={active ? 'sidebar-item-active' : 'sidebar-item'} >
            <span className='sidebar-item-label'>{item.pathname}</span>
        </Link>
    )
}
export default SideBarItem;
