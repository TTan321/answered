import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// import LogoutButton from '../auth/LogoutButton';
import { logout } from '../../store/session'
import AddQuestionModal from '../questions/AddQuestionModal';
import './ProfileButton.css'

function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const [showMenu, setShowMenu] = useState(false);


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

    const runLogout = async (e) => {
        e.preventDefault()
        await dispatch(logout())
    }

    return (
        <div>
            <div id='profileContainer' onClick={openMenu}>
                <i className="fas fa-user-circle fa-2x navProfileIcon" />
                <AddQuestionModal user={user} />
            </div>
            {showMenu && (
                <ul className="profile-details">
                    <li className="profile-details-li navbar-name" onClick={() => history.push(`/user/${user.id}`)} >
                        <div>
                            <div id='navbarNoImageIcon'>
                                {user.firstname.slice(0, 1).toUpperCase()}
                            </div>
                            <div>{user.firstname} {user.lastname}</div>
                        </div>
                    </li>
                    {/* <li className="profile-details-li" onClick={() => history.push(`/users/${user.id}/questions`)}>
                        My Questions
                    </li> */}
                    <li className="profile-details-li" onClick={(e) => runLogout(e)}>
                        {/* <LogoutButton /> */}
                        Logout
                    </li>
                </ul>
            )
            }
        </div >
    )
}

export default ProfileButton
