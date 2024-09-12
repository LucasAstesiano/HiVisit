import { HistorialVisitas } from '../components/HistorialVisitas/HistorialVisitas'

export const History = () => {
  const user=localStorage.getItem("user")

    if (!user) {
        window.location.replace("/sesion")
        
    }
  return (
    <>
    <HistorialVisitas/>
    </>
  )
}
