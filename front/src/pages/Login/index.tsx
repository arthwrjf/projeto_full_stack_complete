import { useForm } from "react-hook-form"
import { LoginData, schema } from "./validatorLogin"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAuth } from "../../hooks/useAuth"
import styled from "styled-components";
import { Link } from "react-router-dom";

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

const SpanRegister = styled.span`
  margin-top: 2rem;
  align-self: center;
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`

export const Login = () => {

    const { register, handleSubmit, formState: {errors} } = useForm<LoginData>({
        resolver: zodResolver(schema)
    })

    const {signIn} = useAuth()

    const onSubmit = (data: LoginData) => {
      console.log('Form data:', data)
      signIn(data)
    }

    return (
        <Main>
            <H2>Login</H2>

            <Form onSubmit={handleSubmit(onSubmit)}>
                <Label htmlFor="Email">Email</Label>
                <Input type="email" id="email" {...register("email")} />
                {errors.email && <Span>{errors.email.message}</Span>}
                <Label htmlFor="password">Senha</Label>
                <Input type="password" id="password" {...register("password")} />
                {errors.password && <Span>{errors.password.message}</Span>}

                <Button>Entrar</Button>
                <SpanRegister>Não possui cadastro?<Link to = "/register" >Clique aqui!</Link></SpanRegister>
            </Form>
        </Main>
    )
}