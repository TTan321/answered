import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LogoutButton from '../auth/LogoutButton';
import './ProfileButton.css'

function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const [showMenu, setShowMenu] = useState(false);

    console.log('USER: ', user)

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;
        const closeMenu = () => {
            setShowMenu(false);
        };
        document.addEventListener('click', closeMenu);
        return () => document.removeEventListener('click', closeMenu);
    }, [showMenu])

    return (
        <div>
            <div id='profileContainer' onClick={openMenu}>
                <i className="fas fa-user-circle fa-2x" />
            </div>
            {showMenu && (
                <ul className="profile-details">
                    <li className="profile-details-li">
                        <div>{user.firstname} {user.lastname}</div>
                    </li>
                    <li className="profile-details-li">
                        <LogoutButton />
                    </li>
                </ul>
            )}
        </div>
    )
}

export default ProfileButton
