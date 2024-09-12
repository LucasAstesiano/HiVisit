import { useContext, useEffect, useState } from 'react';
import styles from '../visitList/visitList.module.css'
import { UserContext } from '../../context/UserContext';
import VisitContext from '../../context/VisitContext';
import { faRefresh } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { redirect } from 'react-router-dom';


export const VisitList = () => {
    const { visits, setVisits } = useContext(VisitContext)
    const { user } = useContext(UserContext)
    const [refresh, setRefresh] = useState(false)


    useEffect(() => {
        console.log(visits);
        const config = {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('jwt'),
            },
        }
        const visitrUrl = `http://localhost:8080/api/dni/${localStorage.getItem("dni")}/visits`;
        fetch(visitrUrl, config)
            .then(response => response.json())
            .then(data => setVisits(data));
    }, [refresh])


    const handleOn = (index) => {
        const updatedObjectList = [...visits]; // Crear copia 
        updatedObjectList[index].state = !visits[index].state; // Actualizar objeto
        setVisits(updatedObjectList);
    }

    const handleRefresh = () => {
        setRefresh(!refresh)
    }



    return (
        <section className={styles.visit_section}>
            <div className={styles.visit_container}>
                <div className={styles.visit_head}>
                    <h2>Visitas</h2>
                    <div>
                        <label htmlFor="search">Buscar </label>
                        <input type="text" name='search' key='search' className={styles.search_visit} />
                            <a   className={styles.refresh} href='#fin'>
                                <FontAwesomeIcon icon={faRefresh} size='1x' onClick={handleRefresh} />
                            </a>
                    </div>
                </div>
                <div>
                    {visits.map((item, index) => (
                        <div className={styles.card_visit} key={index}>
                            <h2>{item.name}</h2>
                            <p>{item.dni}</p>
                            <p>ultima visita: {item.date}</p>
                            <p>Patente: {item.plate}</p>
                            <div className={styles.button_cart}>
                                {item.state ? <button onClick={() => handleOn(index)} style={{ color: "white", backgroundColor: "green" }}>on</button> : <button onClick={() => handleOn(index)}>off</button>}
                                {item.state ? <p>active</p> : <p style={{ color: "red" }}>inactive</p>}
                            </div>
                        </div>
                    ))}
                    <span id='fin'></span>
                </div>
            </div>
        </section>
    )
}
