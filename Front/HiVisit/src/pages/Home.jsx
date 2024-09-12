import { AddVisit } from "../components/AddVisit/AddVisit"
import { VisitList } from "../components/visitList/VisitList"
import '../App.css'
import { useContext, useEffect } from "react"
import { UserContext } from "../context/UserContext"

export const Home = () => {

    const token=localStorage.getItem("jwt")
    const {user}=useContext(UserContext)
    
    useEffect(() => {
        let admin=false
        const config = {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('jwt'),
            },
        }
        fetch(`http://localhost:8080/api/users/dni/${localStorage.getItem("dni")}`,config)
            .then(res => res.json())
            .then((data) => {
                if (data.role === "ADMIN") {
                    admin=true;
                }
            })
            .finally(
                () => {
                    if (admin == true) {
                        window.location.replace("/admin")     
                    }
                }
            )
            
    }, []);

    

    if (!token) {
        window.location.replace("/sesion")    
    }
    

    return (
        <section className="home">
            <AddVisit />
            <VisitList />
        </section> 
    )
}
