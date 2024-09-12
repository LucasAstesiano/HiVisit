import { useEffect, useState } from 'react';
import styles from '../HistorialVisitas/HistorialVisitas.module.css'


export const HistorialVisitas = () => {

    const [visit, setVisit] = useState([]);
    useEffect(()=>{
        
        const config = {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('jwt'),
            },
        }
        const visitrUrl=`http://localhost:8080/api/dni/${localStorage.getItem("dni")}/visits`;
        fetch(visitrUrl,config)
        .then(response => response.json())
        .then(data => setVisit(data));
    },)

    return (
        <section className={styles.general_history}>
            <h1>Historial de visitas</h1>
            <div className={styles.contenedor_historial}>
                <div className={styles.search_item}>
                    <label>Buscar por:</label>
                    <select name="buscar" id="buscar">
                        <option value="Patente">Patente</option>
                        <option value="Nombre">Nombre</option>
                        <option value="Fecha">Fecha</option>
                    </select>
                    <input type="text" placeholder='insert text' />
                    <button className={styles.btn_search}>Buscar</button>
                </div>
                <div className={styles.table_visit}>
                    <div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Fechas</th>
                                    <th>Horarios</th>
                                    <th>Patente</th>
                                </tr>
                            </thead>
                            <tbody>
                                {visit.map((item,index)=>(
                                    <tr key={index}>
                                        <td>{item.name}</td>
                                        <td>{item.date}</td>
                                        <td>10:00 AM </td>
                                        <td>{item.plate}</td>
                                    </tr>

                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    )
}
