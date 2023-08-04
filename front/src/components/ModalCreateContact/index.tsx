import { Dispatch, SetStateAction } from "react";
import { Contact, User } from "../../pages/Dashboard";
import { useForm } from "react-hook-form";
import { CreateContactData, schema } from "./validator";
import { Modal } from "../modal";
import { api } from "../../services/api";
import jwt from "jsonwebtoken"
import { zodResolver } from "@hookform/resolvers/zod";

interface ModalCreateContactProps {
    setContacts: Dispatch<SetStateAction<Contact[]>>
    toggleOpenCreateContactModal: () => void
}

export const ModalCreateContact = ({ setContacts, toggleOpenCreateContactModal }: ModalCreateContactProps) => {
    const { register, handleSubmit } = useForm<CreateContactData>({
      resolver: zodResolver(schema),
    });
  
    const token = localStorage.getItem("contackBook:token");
  
    const createContact = (formData: CreateContactData) => {
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
        .post("/contacts", formData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((response) => {
            console.log("Contact created successfully!");
          
            setContacts((prevContacts) => [...prevContacts, response.data]);
 
            toggleOpenCreateContactModal();
        })
        .catch((error) => {
            console.error("Error creating contact:", error);
        });
} catch (error) {
    console.error("Error decoding token:", error);
}
  };
  
    return (
      <Modal toggleModal={toggleOpenCreateContactModal}>
        <h3>Criar Contato</h3>
        <form onSubmit={handleSubmit(createContact)}>
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
  
          <button type="submit">Criar</button>
        </form>
      </Modal>
    );
  };