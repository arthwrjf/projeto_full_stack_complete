import { useEffect, useState } from "react"
import { api } from "../../services/api"
import jwt from "jsonwebtoken"
import { DashboardContainer, UserInfoWrapper, UserName, UserInfoItem, ContactCard, ContactName, ContactInfoItem, EditButton, RemoveButton } from "./style"
import { ModalEditUser } from "../../components/ModalEditUser"
import { ModalCreateContact } from "../../components/ModalCreateContact"
import { ModalEditContact } from "../../components/ModalEditContact"


export interface Contact {
    id: number,
    name: string,
    emailPrincipal: string,
    emailSecondary: string,
    telephonePrincipal: string,
    telephoneSecondary: string,
    createdAt: string,
}

export interface User {
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
    const token = localStorage.getItem("contackBook:token");
  
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [isOpenEditModal, setIsOpenEditModal] = useState(false)
    const [isOpenCreateContactModal, setIsOpenCreateContactModal] = useState(false)
    const [isOpenEditContactModal, setIsOpenEditContactModal] = useState(false)
    const [editingContact, setEditingContact] = useState<Contact | null>(null)

    const toggleEditModal = () => setIsOpenEditModal((prev) => !prev)
    const toggleOpenCreateContactModal = () => setIsOpenCreateContactModal((prev) => !prev)
    const toggleOpenEditContactModal = () => setIsOpenEditContactModal((prev) => !prev)

    
    const handleLogout = () => {
        localStorage.removeItem("contackBook:token");
        window.location.href = "/";
    };

    useEffect(() => {
      const contactData = () => {
        try {
          if (!token) {
            console.error("Access token not found in localStorage.");
            return;
          }
  
          const decodedToken = jwt.decode(token) as User | null;
  
          if (!decodedToken || !decodedToken.id) {
            console.error('Invalid or missing "userId" in the token.');
            return;
          }
  
          const userId = decodedToken.id;
  
          api
            .get(`/contacts/${userId}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((response) => {
              console.log("users");
              setUsers([response.data])
              setContacts(response.data.contacts)

            })
            .catch((error) => {
              console.error("Error fetching user data:", error);
            });
        } catch (error) {
          console.error("Error decoding token:", error);
        }
      }
  
      contactData()
    }, []);

    const handleRemoveContact = (contactId: number) => {
      api
        .delete(`/contacts/${contactId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          setContacts((prevContacts) =>
            prevContacts.filter((contact) => contact.id !== contactId)
          );
        })
        .catch((error) => {
          console.error("Error removing contact:", error);
        });
    };

    const handleOpenEditContactModal = (contact: Contact) => {
      setEditingContact(contact)
      toggleOpenEditContactModal()
    };

    return (
      <DashboardContainer>
        <h1>Dashboard</h1>
        {
            isOpenEditModal && <ModalEditUser setUsers={setUsers} toggleEditModal={toggleEditModal}></ModalEditUser> 
        }
        {
            isOpenCreateContactModal && <ModalCreateContact setContacts={setContacts} toggleOpenCreateContactModal={toggleOpenCreateContactModal}></ModalCreateContact> 
        }
        {
           editingContact && isOpenEditContactModal && <ModalEditContact contactToEdit={editingContact} setContacts={setContacts} toggleOpenEditContactModal={toggleOpenEditContactModal}></ModalEditContact> 
        }

        <ul>
          {users.map((user) => (
            <UserInfoWrapper key={user.id}>
              <UserName>Nome: {user.name}</UserName>
              <UserInfoItem>Email Principal: {user.emailPrincipal}</UserInfoItem>
              <UserInfoItem>Email Secundário: {user.emailSecondary}</UserInfoItem>
              <UserInfoItem>Telephone Principal: {user.telephonePrincipal}</UserInfoItem>
              <UserInfoItem>Telephone Secundário: {user.telephoneSecondary}</UserInfoItem>
              <UserInfoItem>Registrado em: {user.createdAt}</UserInfoItem>
              <EditButton onClick={toggleEditModal}>Editar</EditButton>
              <RemoveButton onClick={handleLogout}>Logout</RemoveButton>
            </UserInfoWrapper>
          ))}
        </ul>
        <EditButton onClick={toggleOpenCreateContactModal}>Criar Contato</EditButton>
        <ul>
          {contacts.map((contact) => (
            <ContactCard key={contact.id}>
              <ContactName>Nome: {contact.name}</ContactName>
              <ContactInfoItem>Email Principal: {contact.emailPrincipal}</ContactInfoItem>
              <ContactInfoItem>Email Secundário: {contact.emailSecondary}</ContactInfoItem>
              <ContactInfoItem>Telephone Principal: {contact.telephonePrincipal}</ContactInfoItem>
              <ContactInfoItem>Telephone Secundário: {contact.telephoneSecondary}</ContactInfoItem>
              <ContactInfoItem>Criado em: {contact.createdAt}</ContactInfoItem>
              <EditButton onClick={() => handleOpenEditContactModal(contact)}>Editar</EditButton>
              <RemoveButton onClick={() => handleRemoveContact(contact.id)}>Remover</RemoveButton>
            </ContactCard>
          ))}
        </ul>
     </DashboardContainer> 
    )
}