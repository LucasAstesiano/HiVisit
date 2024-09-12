import style from '../user/User.module.css'
import {faEdit} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'

export const User = () => {

    const [edit,setEdit]=useState(false)
    
    const [user,setUser]=useState({
        name: '',
        email: 'lucasagustinastesiano@gmail.com',
        telefono:'',
        dni:'',
    })

    useEffect(() => {
        const dni=localStorage.getItem('dni')
        const config = {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('jwt'),
            },
        }

        const visitrUrl=`http://localhost:8080/api/users/dni/${dni}`
        fetch(visitrUrl,config)
        .then(response => response.json())
        .then(data =>{
            console.log(data);
         setUser({
            name: data.name + " " + data.lastName,           // Name del usuario
            email: 'Example@gmail.com', // Email predefinido
            telefono: data.phone,      // Telefono
            dni: data.dni,             // DNI
        })})
    },[])

    const hanldeInputChange=(e)=>{
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }
    const handelSubmit=(e)=>{
        e.preventDefault();
    }
    const handleClose=()=>{
        localStorage.removeItem('user')
        localStorage.removeItem('jwt')
        localStorage.removeItem('dni')
        window.location.reload()
    }
    const handleEdit=()=>{
        setEdit(!edit)
    }

    return (
        <section className={style.container_user}>
            <section className={style.section_user}>
                <div>
                    <h1 className={style.user_title}>Administración de usuario</h1>
                </div>
                <div className={style.info_user}> 
                    <form action="submit">
                        <div className={style.form_group}>
                            <label htmlFor="name">Nombre:</label>
                            <input type="text" id="name" name="name" value={user.name} onChange={(e)=>{hanldeInputChange(e)}} required disabled={!edit} />

                            <FontAwesomeIcon icon={faEdit} className={style.edit} onClick={handleEdit}/>
                        </div>
                        <div className={style.form_group}>
                            <label htmlFor="email">Email:</label>
                            <input type="email" id="email" name="email" value={user.email} onChange={(e)=>{hanldeInputChange(e)}} required disabled={!edit}/>
                        </div>
                        <div className={style.form_group}>
                            <label htmlFor="telefono">Número de Teléfono:</label>
                            <input type="tel" id="telefono" name="telefono" value={user.telefono} onChange={(e)=>{hanldeInputChange(e)}} required disabled={!edit}/>
                        </div>
                        <div className={style.form_group}>
                            <label htmlFor="dni">Dni:</label>
                            <input type="text" id="dni" name="dni" value={user.dni} onChange={(e)=>{hanldeInputChange(e)}} required disabled={!edit}/>
                        </div>
                        <div className={style.form_group}>
                            <button type="submit" onSubmit={(e)=>{handelSubmit(e)}}>Actualizar</button>
                        </div>
                    </form>
                </div>
                <div>
                    <button className={style.close} onClick={handleClose}>Cerrar sesión</button>
                </div>
            </section>
        </section>
    )
}
