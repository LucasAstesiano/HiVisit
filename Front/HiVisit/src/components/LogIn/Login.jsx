import { useContext, useState } from 'react'
import styles from '../LogIn/Login.module.css'
import { UserContext } from '../../context/UserContext'
export const Login = () => {

    const [newUser, setNewUser] = useState(false)


    const [userLog, setUserLog] = useState({
        dni: '',
        password: ''
    })
    


    const handleClick = () => {
        setNewUser(!newUser)
    }

    const handleChange = (e) => {
        setUserLog({
            ...userLog,
            [e.target.name]: e.target.value
        })
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        //
        try {
            const urlLogin = 'http://localhost:8080/api/auth/login';
            const config = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userLog)
            };
            const response = await fetch(urlLogin, config);
            const data = await response.json();
            console.log(data)

            if (data.token) {
                localStorage.setItem('user', true);
                localStorage.setItem("jwt", data.token);                
                localStorage.setItem("dni",userLog.dni)
                window.location.href = "/";
            } else {
                alert('Error de autenticación');
            }
        } catch (error) {
            console.error('Error en el inicio de sesión:', error);
            alert('Ocurrió un error durante el inicio de sesión');
        }
        
        
    }

    //REGISTRAR UN NUEVO USUARIO

    const [createUser, setCreateUser] = useState({
        name: "",
        lastName: "",
        phone: "",
        dni: "",
        password:""
    })
    const handleCreateChange = (e) => {
        setCreateUser({
            ...createUser,
            [e.target.name]: e.target.value
        })
    }

    const handleCreateUser = (e) => {
        e.preventDefault();
        const urlCreateUser = 'http://localhost:8080/api/auth/register';
        const config = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(createUser)
        }
        fetch(urlCreateUser, config)
            .then(response => response.json())
            .then(data => data.token !== "Error: El DNI ingresado ya esta registrado" ? setNewUser(!newUser) : alert(data.token))
        localStorage.setItem('user', createUser.dni)
        /* window.location.href = '/' */
    }


    return (
        <section className={styles.section_login}>
            {newUser ?
                <div >
                    <form type='submit' className={`${styles.form_Login} ${newUser == true ? styles.y : ''}`} onSubmit={(e) => { handleCreateUser(e) }}>
                        {
                            newUser ? <h2>Registrarse</h2> : <h2>Iniciar Sesión</h2>
                        }
                        <div className={styles.form}>
                            <label htmlFor="name">Nombre de usuario</label>
                            <input type="text" id="name" name="name" value={createUser.name} onChange={(e) => { handleCreateChange(e) }} required />
                        </div>
                        <div className={styles.form}>
                            <label htmlFor="lastName">Apellido</label>
                            <input type="text" id="lastName" name="lastName" value={createUser.lastName} onChange={(e) => { handleCreateChange(e) }} required />
                        </div>
                        <div className={styles.form}>
                            <label htmlFor="phone">Telefono</label>
                            <input type="text" id="phone" name="phone" value={createUser.phone} onChange={(e) => { handleCreateChange(e) }} required />
                        </div>
                        <div className={styles.form}>
                            <label htmlFor="dni">dni</label>
                            <input type="text" id="dni" name="dni" value={createUser.dni} onChange={(e) => { handleCreateChange(e) }} required />
                        </div>
                        <div className={styles.form}>
                            <label htmlFor="password">Contraseña</label>
                            <input type="password" id="password" name="password" value={createUser.password} onChange={(e) => { handleCreateChange(e) }} required />
                        </div>
                        <button type="submit" onSubmit={(e) => { handleCreateUser(e) }}>Crear Usuario</button>
                        <p>Ya tienes una cuenta, <a className={styles.log_change} onClick={handleClick}>Inicia sesion</a></p>
                    </form>
                </div>
                :
                <div >
                    <form type='submit' className={styles.form_Login} onSubmit={(e) => { handleSubmit(e) }}>
                        <h2>Iniciar Sesión</h2>
                        <div className={styles.form}>
                            <label htmlFor="dni">Usuario</label>
                            <input type="text" id="dni" name="dni" placeholder='Ingrese su DNI' value={userLog.username} onChange={(e) => { handleChange(e) }} required />
                        </div>
                        <div className={styles.form}>
                            <label htmlFor="password">Contraseña</label>
                            <input type="password" id="password" name="password"  value={userLog.password} onChange={(e) => { handleChange(e) }} required />
                        </div>
                        <button type="submit" onSubmit={(e) => { handleSubmit(e) }}>Ingresar</button>
                        <p>No tienes una cuenta, <a onClick={handleClick} className={styles.log_change}>registrate</a></p>
                    </form>
                </div>
            }
        </section>
    )
}
