import { useEffect, useState } from "react"
import
style from './HomeAdmin.module.css'

export const HomeAdmin = () => {
    const [user,setUser]=useState({})

    useEffect(() => {
        let admin = false

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
                if (data.role === "ADMIN") {
                    admin = true;
                    setUser(data)
                }
            })
            .finally(
                () => {
                    if (admin !== true) {
                        window.location.replace("/sesion")
                    }
                }
            )
    },
        [])



    return (

        <div className={style.home_admin}>
            <section>
                <h1>Bienvenido {user.name}</h1>
                <section className={style.container_search}>
                    <section className={style.section_search}>
                        <div>
                            <h1 className={style.search_title}>Buscar Visitas</h1>
                        </div>
                        <div className={style.search_info}>
                            <form action="submit">
                                <div className={style.form_group}>
                                    <label htmlFor="search">Buscar por:</label>
                                    <select id="search" name="search" required>
                                        <option value="name">Name</option>
                                        <option value="lastName">Last Name</option>
                                        <option value="patent">Patent</option>
                                    </select>
                                </div>
                                <div className={style.form_group}>
                                    <label htmlFor="query">Datos:</label>
                                    <input type="text" id="query" name="query" required />
                                </div>
                                <div className={style.form_group}>
                                    <button type="submit">Search</button>
                                </div>
                            </form>
                        </div>
                    </section>
                </section>

                <h2>Autorizados</h2>
                <table className={style.admin_table}>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Correo</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                Marcos
                            </td>
                            <td>
                                Gonzalez
                            </td>
                            <td>
                                ldm726
                            </td>
                            <td className={style.button_action}>
                                <button className={style.button_delete_table}>Eliminar</button>
                                <button className={style.button_allow_table}>Habilitar</button>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Lucas
                            </td>
                            <td>
                                Astesiano
                            </td>
                            <td>
                                jhi592
                            </td>
                            <td className={style.button_action}>
                                <button className={style.button_delete_table}>Eliminar</button>
                                <button className={style.button_allow_table}>Habilitar</button>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Tomas
                            </td>
                            <td>
                                Martinez
                            </td>
                            <td>
                                erh095
                            </td>
                            <td className={style.button_action}>
                                <button className={style.button_delete_table}>Eliminar</button>
                                <button className={style.button_allow_table}>Habilitar</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </section>
            <section>
                <h2>Historial</h2>
                <table style={{ width: 1000 }}>
                    <thead>
                        <tr>Nombre</tr>
                        <tr>Apellido</tr>
                        <tr>Correo</tr>
                    </thead>
                </table>
            </section>
        </div>
    )
}
