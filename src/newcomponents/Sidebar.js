import React, { useState } from 'react';
import {
    FaKey,
    FaBars,
    FaUserAlt,
    FaEdit,
    FaSignOutAlt,
    FaRust,
    FaTable,
    FaList,
} from "react-icons/fa";

import '../newcomponents/Sidebar.css';
import { NavLink, useNavigate } from 'react-router-dom';
import logoutAPI from '../utils/logoutAPI';
import Cookies from 'universal-cookie';


const Sidebar = ({ children }) => {
    const navigate = useNavigate();
    const cookies = new Cookies();
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const menuItem = [
        {
            path: "/UserList2",
            name: "ABP Users",
            icon: <FaUserAlt />
        },
        
        // {
        //     path: "/ChangePassword",
        //     name: "Settings",
        //     icon: <FaKey />
        // },
        
        {
            path: "/profiledata",
            name: "Profile",
            icon: <FaEdit />
        },
        {
            path: "/changePassword",
            name: "Settings",
            icon: <FaKey />
        },
     
        {
            path: "/dashboard",
            name: "LogOut",
            icon: <FaSignOutAlt />
        },
       
        {
            path: "/UsersList",
            name: "UserList",
            icon: <FaList />
        },
        {
            path: "/assignrole",
            name: "Assignrole",
            icon: <FaRust />
        },
        {
            path: "/modules",
            name: "Modules",
            icon: <FaTable />
        }
    ];

    
    
    const handleLogout = async () => {
        await logoutAPI();
        localStorage.clear();

        navigate('/');

    };
    return (
        <div className="container-data">
            <div className={`sidebar ${isOpen ? 'sidebar-expanded' : 'sidebar-collapsed'}`}>
                
                <div className="top_section">
                    <h1 style={{ display: isOpen ? "block" : "none" }} className="logo">Options</h1>
                    <div style={{ marginLeft: isOpen ? "30px" : "0px" }} className="bars">
                        <FaBars onClick={toggle} />
                    </div>
                </div>
                {menuItem.map((item, index) => (
    <NavLink
        to={item.path}
        key={index}
        className="link"
        // activeClassName="active"
        onClick={item.name === 'LogOut' ? handleLogout : undefined}
    >
        <div className="icon">{item.icon}</div>
        <div style={{ display: isOpen ? 'block' : 'none' }} className="link_text">
            {item.name}
        </div>
    </NavLink>
))}
            </div>
            <main>{children}</main>
        </div>
    );
};

export default Sidebar;