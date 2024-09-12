import styles from '../header/Header.module.css'
import { faUser, faCalendar, faBell } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom'
import { Notificaciones } from '../Notificaciones/Notificaciones';
import { useState } from 'react';

export const Header = () => {

    const navigate = useNavigate();
    const [isBellOn,setIsBellOn]=useState(false)

    const handleClick = (word) => {
        switch (word) {
            case "home":
                navigate('/')
                break;
            case "user":
                navigate('user')
                break;
            case "history":
                navigate('history')
                break;
            default:
                break;
        }
    }
    const handleClickBell=()=>{
        setIsBellOn(true)
    }
    const handleLeaveBell=()=>{
        setIsBellOn(false)
    }

    return (
        <div className={styles.nav}>
            <div className={styles.block}>
                <div onClick={() => { handleClick("home") }}>
                    <h2>HiVisit</h2>
                </div>
                <div onClick={() => { handleClick("user") }}>
                    <FontAwesomeIcon icon={faUser} className={styles.icon} />
                </div>
            </div>
            <div className={styles.block}>
                <FontAwesomeIcon icon={faBell} className={styles.notify} onMouseOver={handleClickBell} onMouseLeave={handleLeaveBell} />
                <Notificaciones visible={isBellOn}/>
                <button onClick={() => { handleClick("history") }}><FontAwesomeIcon icon={faCalendar} /> Historial de visitas</button>
            </div>
        </div>
    )
}
