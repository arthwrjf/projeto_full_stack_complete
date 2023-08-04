import { Dispatch, SetStateAction } from "react";
import { User } from "../../pages/Dashboard";
import { useForm } from "react-hook-form";
import { EditUserData, schema } from "./validator";
import { Modal } from "../modal";
import { api } from "../../services/api";
import jwt from "jsonwebtoken"
import { zodResolver } from "@hookform/resolvers/zod";

interface ModalEditUserProps {
    setUsers: Dispatch<SetStateAction<User[]>>
    toggleEditModal: () => void
}

export const ModalEditUser = ({ setUsers, toggleEditModal }: ModalEditUserProps) => {

    const { register, handleSubmit } = useForm<EditUserData>({
      resolver: zodResolver(schema),
    });
  
    const token = localStorage.getItem("contackBook:token");
  
    const editUserData = (formData: EditUserData) => {
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
        .patch(`/users/${userId}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log("User data updated successfully!");
          setUsers((previousUser) => {
            const index = previousUser.findIndex((user) => user.id === response.data.id);
            
            if (index === -1) {
              return previousUser;
            }
          
            const updatedUsers = [...previousUser];
            updatedUsers[index] = response.data;
            
            return updatedUsers;
          });
          toggleEditModal()
        })
        .catch((error) => {
          console.error("Error updating user data:", error);
        });
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  };
  
    return (
      <Modal toggleModal={toggleEditModal}>
        <h3>Criar Contato</h3>
        <form onSubmit={handleSubmit(editUserData)}>

          <label htmlFor="name">Name</label>
          <input type="text" id="name" {...register("name")} />
  
          <label htmlFor="emailPrincipal">Email</label>
          <input type="emailPrincipal" id="emailPrincipal" {...register("emailPrincipal")} />
  
          <label htmlFor="emailSecondary">Email Secundário</label>
          <input type="emailSecondary" id="emailSecondary" placeholder="Opcional" {...register("emailSecondary")}/>
  
          <label htmlFor="telephonePrincipal">Telefone</label>
          <input type="telephonePrincipal" id="telephonePrincipal" {...register("telephonePrincipal")}/>
  
          <label htmlFor="telephoneSecondary">Telefone Secundário</label>
          <input type="teltelephoneSecondary" id="telephoneSecondary" placeholder="Opcional" {...register("telephoneSecondary")}/>
  
          <button type="submit">Editar</button>
        </form>
      </Modal>
    );
  };
