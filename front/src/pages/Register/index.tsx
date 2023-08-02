import { useForm } from "react-hook-form"
import { RegisterData, schema } from "./validatorRegister"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAuth } from "../../hooks/useAuth"
import { styled } from "styled-components";

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f2f5;
  color: #1c1e21;
`;

const H2 = styled.h2`
  font-size: 5rem;
  margin-bottom: 5rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  background-color: #fff;
`;

const Label = styled.label`
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #1877f2;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const Span = styled.span`
  color: #ff0000;
  margin-bottom: 10px;
`;

export const Register = () => {

    const { register, handleSubmit, formState: { errors }} = useForm<RegisterData>({
        resolver: zodResolver(schema)
    })

    const {signUp} = useAuth()

    const onSubmit = (data: RegisterData) => {
        console.log('Form data:', data)
        signUp(data)
    }

    return (
        <Main>

            <H2>Register</H2>

            <Form onSubmit={handleSubmit(onSubmit)}>
                <Label htmlFor="Nome">Nome</Label>
                <Input type="name" id="name" {...register("name")}/>
                {errors.name && <Span>{errors.name.message}</Span>}

                <Label htmlFor="Email">Email</Label>
                <Input type="emailPrincipal" id="emailPrincipal" {...register("emailPrincipal")}/>
                {errors.emailPrincipal && <Span>{errors.emailPrincipal.message}</Span>}

                <Label htmlFor="Email">Email Secundário</Label>
                <Input type="emailSecondary" id="emailSecondary" placeholder="Opcional" {...register("emailSecondary")}/>

                <Label htmlFor="Password">Password</Label>
                <Input type="password" id="password" {...register("password")}/>
                {errors.password && <Span>{errors.password.message}</Span>}

                <Label htmlFor="Telefone">Telefone</Label>
                <Input type="telephonePrincipal" id="telephonePrincipal" {...register("telephonePrincipal")}/>
                {errors.telephonePrincipal && <Span>{errors.telephonePrincipal.message}</Span>}

                <Label htmlFor="Telefone">Telefone Secundário</Label>
                <Input type="telephoneSecondary" id="telephoneSecondary" placeholder="Opcional"{...register("telephoneSecondary")}/>

                <Button>Registrar</Button>
    

            </Form>
        </Main>
    )
}