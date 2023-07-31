import { useEffect, useState } from "react"
import { api } from "../../services/api"
import jwt, { JwtPayload } from "jsonwebtoken"

export interface Contact {
    id: string,
    name: string,
    emailPrincipal: string,
    emailSecondary: string,
    telephonePrincipal: string,
    telephoneSecondary: string
}

export interface TokenPayload extends JwtPayload {
    userId?: string;

}

export const Dashboard = () => {

    const [contacts, setContacts] = useState<Contact[]>([])
    const token = localStorage.getItem("contackBook:token")


    useEffect(() => {
        const contactData = async () => {

            try {

                if(!token) {
                    console.error("Access token not found in localStorage.")
                }

                const decodedToken = jwt.decode(token!) as TokenPayload

                if (!decodedToken.userId) {
                    console.error('Invalid or missing "userId" in the token.');
                  }

                const userId = decodedToken.userId

                const response = await api.get<Contact[]>(`/contacts/users/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                })

                setContacts(response.data)

            } catch(error) {

                console.error('Error fetching user data:', error)
            }
        }

        contactData()
        
    },[token])

    return (
        <>
        <h1>Dashboard</h1>
        <ul>
            {
            contacts.map((contact) => <li key={contact.id}>
              <p>Name: {contact.name}</p>
              <p>Email Principal: {contact.emailPrincipal}</p>
              <p>Email Secondary: {contact.emailSecondary}</p>
              <p>Telephone Principal: {contact.telephonePrincipal}</p>
              <p>Telephone Secondary: {contact.telephoneSecondary}</p>
            </li>)
            }
        </ul>
        </>
    )
}