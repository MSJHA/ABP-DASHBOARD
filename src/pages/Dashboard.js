import React, { useEffect } from 'react';
import '../pages/Dashboard.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const cookies = new Cookies();
    const navigate = useNavigate();

    useEffect(() => {

        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/');
        }
        const toastShownBefore = cookies.get('toastShown');

        if (!toastShownBefore) {
            toast.success('Login successful', {
                position: 'top-right',
                autoClose: 3000,
                theme:"colored",
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            
            cookies.set('toastShown', 'true', { maxAge: 60 * 60 * 24 * 7 }); 
        }
    }, [cookies, navigate]);

    

    return (
        <>
           <div className='dashboard'>
                    <h1>Welcome to Dashboard</h1>
                </div>
            <ToastContainer />
        </>
        
    );
};

export default Dashboard;


