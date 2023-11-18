import { useDispatch, useSelector } from 'react-redux';
import '../styles/LayoutStyles.css'
import { adminMenu, userMenu } from './../Data/data';
import { NavLink,  useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import {  Badge} from 'antd';
import { useState } from 'react';
import { setUser } from '../store/slices/userSlice';

const Layout = ({ children }) => {
    const { user } = useSelector(state => state.user);
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [sidebarVisible, setSidebarVisible] = useState(false);


    //     SIDEBAR MENU 
    const handleMenuClick = () => {
        setSidebarVisible(!sidebarVisible);
      };
    

    //  Logout

    const handleLogout = () => {
        toast.success('Logout Successfully');
        localStorage.removeItem('token');
        dispatch(setUser(null))
    }

    ///////////Doctor menu//////////////
    const doctorMenu = [
        {
            name: "Home",
            path: "/",
            icon: "fa-solid fa-house",
        },
        {
            name: "About",
            path: "/about",
            icon: "fa fa-info-circle",
          },
        {
            name: "Appointments",
            path: "/doctor-appointments",
            icon: "fa-solid fa-list",
        },
        {
            name: "Profile",
            path: `/doctor/profile/${user?._id}`,
            icon: "fa-solid fa-user",
        }, {
            name: "Visit Doctors",
            path: "/user/doctors",
            icon: "fa-solid fa-stethoscope",
        },
    ];
    ///////////Doctor menu//////////////


    // rendering menu list
    const siderbarMenu = user?.isAdmin ? adminMenu : user?.isDoctor ? doctorMenu : userMenu;
    return (
        <>
            <div className="main">
                <div className="layout">
                    <div className={`sidebar ${sidebarVisible ? 'show' : ''}`}>
                        <i  className='fa fa-times closeMenue' onClick={handleMenuClick}></i>
                        <div className="logo"><i className="fas fa-heartbeat"></i>carezone <hr /></div>
                        <div className="menu">
                            {siderbarMenu.map((item, index) => {
                                const isActive = location.pathname === item.path
                                return (


                                    <div key={index} className={`menu-item ${isActive && 'active'}`} >
                                        <i className={item.icon}></i>
                                        <NavLink to={item.path}>{item.name}</NavLink>
                                    </div>
                                )
                            })}

                            <div className='menu-item' onClick={handleLogout}>
                                <i className='fa-solid fa-right-from-bracket'></i>
                                <NavLink to='/login'>Logout</NavLink>
                            </div>

                        </div>

                    </div>
                    <div className="content">
                        <div className="header">
                        <div className="logo headLogo"><i className="fas fa-heartbeat"></i>carezone</div>

                            <div className="header-content ">

                                <i className="fa-solid fa-bars menu-bar"onClick={handleMenuClick}></i>

                                <Badge count={user?.notification.length} onClick={() => navigate('/notifications')}>
                                    <i className='fa-solid fa-bell'></i>
                                </Badge>
                                <NavLink to='/user/profile'> {user?.name}</NavLink>
                            </div>
                        </div>
                        <div className="body"> {children} </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Layout
