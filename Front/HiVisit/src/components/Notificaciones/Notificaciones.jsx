import style from './Notificaciones.module.css'
export const Notificaciones = ({visible}) => {
    

  return (
    <div className={visible==true ? style.notificaciones : style.notificacionesOff}>

        <div>
            <h3>Notificaciones</h3>
            <ul>
                <li>° Julieta a ingresado</li>
                <li>° Juan a ingresado</li>
                <li>° Gregorio a ingresado</li>
            </ul>
        </div>
    </div>
  )
}
