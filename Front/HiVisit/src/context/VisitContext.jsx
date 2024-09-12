import { createContext, useState } from "react";

const VisitContext = createContext();

// eslint-disable-next-line react/prop-types
export const VisitProvider = ({children})=>{
    const [visits, setVisits] = useState([]);
    const [newVisitAdded, setNewVisitAdded] = useState(false);

  const addVisit = (newVisit) => {
    setVisits([...visits, newVisit]);
    setNewVisitAdded(true);
  };

    return(
        <VisitContext.Provider value={{visits, setVisits,newVisitAdded, addVisit}}>
            {children}
        </VisitContext.Provider>
    )
}
export default VisitContext;