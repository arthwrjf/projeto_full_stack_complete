import { Dispatch, SetStateAction } from "react";
import { Contact, User } from "../../pages/Dashboard";
import { useForm } from "react-hook-form";
import { EditContactData, schema } from "./validator";
import { Modal } from "../modal";
import { api } from "../../services/api";
import jwt from "jsonwebtoken"
import { zodResolver } from "@hookform/resolvers/zod";

interface ModalCreateContactProps {
    contactToEdit: Contact
    setContacts: Dispatch<SetStateAction<Contact[]>>
    toggleOpenEditContactModal: () => void
}

export const ModalEditContact = ({  contactToEdit ,setContacts, toggleOpenEditContactModal }: ModalCreateContactProps) => {
    const { register, handleSubmit } = useForm<EditContactData>({
      resolver: zodResolver(schema),
    });
  
    const token = localStorage.getItem("contackBook:token");
  
    const editContact = (formData: EditContactData) => {
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

        api
        .patch(`/contacts/${contactToEdit.id}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log("Contact edited successfully!");

          setContacts((prevContacts) =>
            prevContacts.map((contact) =>
              contact.id === contactToEdit.id ? response.data : contact
            )
          );

          toggleOpenEditContactModal();
        })
        .catch((error) => {
          console.error("Error editing contact:", error);
        });
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  };

  
    return (
      <Modal toggleModal={toggleOpenEditContactModal}>
        <h3>Editar Contato</h3>
        <form onSubmit={handleSubmit(editContact)}>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" {...register("name")} />
  
          <label htmlFor="emailPrincipal">Email</label>
          <input type="email" id="emailPrincipal" {...register("emailPrincipal")} />
  
          <label htmlFor="emailSecondary">Email Secundário</label>
          <input
            type="email"
            id="emailSecondary"
            placeholder="Opcional"
            {...register("emailSecondary")}
          />
  
          <label htmlFor="telephonePrincipal">Telefone</label>
          <input
            type="tel"
            id="telephonePrincipal"
            {...register("telephonePrincipal")}
          />
  
          <label htmlFor="telephoneSecondary">Telefone Secundário</label>
          <input
            type="tel"
            id="telephoneSecondary"
            placeholder="Opcional"
            {...register("telephoneSecondary")}
          />
  
          <button type="submit">Editar</button>
        </form>
      </Modal>
    );
  };