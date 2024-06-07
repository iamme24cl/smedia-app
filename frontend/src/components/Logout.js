import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = ({ setAuth }) => {
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem('smedia-token');
        localStorage.removeItem('smedia-user');
        setAuth(false);
        navigate('/login');
    }, [navigate, setAuth]);

    return null;
};

export default Logout;