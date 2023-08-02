import { useEffect, useState } from "react"
import { api } from "../../services/api"
import jwt from "jsonwebtoken"

export interface Contact {
    id: string,
    name: string,
    emailPrincipal: string,
    emailSecondary: string,
    telephonePrincipal: string,
    telephoneSecondary: string,
    createdAt: string,
}

interface User {
    id: number,
    name: string,
    emailPrincipal: string,
    emailSecondary: string,
    telephonePrincipal: string,
    telephoneSecondary: string,
    createdAt: string,
    contacts: Contact[]
}



export const Dashboard = () => {


 
    const token = localStorage.getItem("contackBook:token")

    const [contacts, setContacts] = useState<Contact[]>([])
    const [users, setUsers] = useState<User[]>([])

    useEffect(() => {
        const contactData = async () => {

            try {

                if(!token) {
                    console.error("Access token not found in localStorage.")
                }

                const decodedToken = jwt.decode(token!) as User

                const userId = decodedToken.id

                if (!decodedToken.id) {
                    console.error('Invalid or missing "userId" in the token.');
                  }



                const response = await api.get(`/contacts/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                })

                console.log("users")
                setUsers(response.data)
                setContacts(response.data.contacts)
 console.log(response.data.contacts)
 console.log(userId)
            } catch(error) {

                console.error('Error fetching user data:', error)
            }
        }

       contactData()
        
    },[])

    return (
        <>
        <h1>Dashboard</h1>
        <ul>
            {
            users?.map((user) =><li key={user.id}>
            <p>Name: {user.name}</p>
              <p>Email Principal: {user.emailPrincipal}</p>
              <p>Email Secondary: {user.emailSecondary}</p>
              <p>Telephone Principal: {user.telephonePrincipal}</p>
              <p>Telephone Secondary: {user.telephoneSecondary}</p>
              <p>Registrado em: {user.createdAt}</p>
            </li>)

            }
        </ul>
        <ul>
            {
            contacts.map((contact) => <li key={contact.id}>
              <p>Name: {contact.name}</p>
              <p>Email Principal: {contact.emailPrincipal}</p>
              <p>Email Secondary: {contact.emailSecondary}</p>
              <p>Telephone Principal: {contact.telephonePrincipal}</p>
              <p>Telephone Secondary: {contact.telephoneSecondary}</p>
              <p>Telephone Secondary: {contact.createdAt}</p>
            </li>)
            }
        </ul>
        </>
    )
}