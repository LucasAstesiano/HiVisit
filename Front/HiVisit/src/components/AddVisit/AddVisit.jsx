import { useContext, useEffect, useState } from 'react'
import styles from '../AddVisit/AddVisit.module.css'
import VisitContext from '../../context/VisitContext'
import {toast} from 'sonner'
import { Toaster } from 'sonner'


export const AddVisit = () => {

    const [user, setUser] = useState({})
    const { visits, setVisits } = useContext(VisitContext)

    const [visit, setVisit] = useState({
        name: '',
        date: '',
        plate: '',
        dni: ''
    })

    const handleInputChange = (e) => {
        setVisit({
            ...visit,
            [e.target.name]: e.target.value
        })
    }
    useEffect(() => {
        const config = {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('jwt'),
            },
        }
        fetch(`http://localhost:8080/api/users/dni/${localStorage.getItem("dni")}`, config)
            .then(res => res.json())
            .then((data) => {
                setUser(data)

            })
    }, [])

    const handleClick = () => {
        const visitUrl = `http://localhost:8080/api/dni/${localStorage.getItem("dni")}/visits`
        const config = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            },
            body: JSON.stringify(visit)
        }

        fetch(visitUrl, config)
            .then(response => response.json())
            .then(() => {
                setVisits([...visits, visit])
                toast.success(`Se ha registrado a ${visit.name}`)

            })
            .catch((error) => {
                alert("Ha ocurrido un error" + ": " +error )
            })



    }

    return (
        <>
            <Toaster/>
            <section>
                <div className={styles.saludo}>
                    <h3>Hola {user.name}</h3>
                </div>
                <section className={styles.container_add}>
                    <section className={styles.add_section}>
                        <h2>Agregar visita</h2>
                        <div className={styles.form}>
                            <div className={styles.box}>
                                <p>Nombre</p>
                                <input type="text" name='name' placeholder='Ingrese el nombre de su visita' onChange={(e) => { handleInputChange(e) }} required />
                            </div>
                            <div className={styles.box}>
                                <p>Fecha</p>
                                <input type="DATE" name='date' placeholder=' dd-mm-yy' onChange={(e) => { handleInputChange(e) }} required />
                            </div>
                            <div className={styles.box}>
                                <p>Patente</p>
                                <input type="text" name='plate' onChange={(e) => { handleInputChange(e) }} required />
                            </div>
                            <div className={styles.box}>
                                <p>Dni</p>
                                <input type="text" name='dni' onChange={(e) => { handleInputChange(e) }} required />
                            </div>
                        </div>
                        <button onClick={handleClick}>Agregar Visita</button>
                    </section>
                </section>
            </section>
        </>
    )
}
