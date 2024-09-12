import { User } from '../components/user/User'

export const UserAdministration = () => {
  const user=localStorage.getItem("user")

    if (!user) {
        window.location.replace("/sesion")
        
    }
  return (
    <div><User/></div>
  )
}
