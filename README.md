# ContactBook

# Descrição do projeto
Você deverá criar um cadastro de clientes que poderá conter muitos contatos associados. Depois deste processo deverá ter um relatório em tela, ou PDF que mostre dados do cliente e os contatos vinculados a este cliente.

Obs: nesse desafio utilize Javascript e/ou Typescript

<h3>POST - /users</h3>
<h2>Criação de users</h2>

<pre>
{
  "id": 1,
  "name": "teste",
  "emailPrincipal": "teste@teste.com",
  "emailSecondary": "Opcional",
  "password": "1234"
  "telephonePrincipal": "9999999",
  "telephoneSecondary": "Opcional",
  "createdAt": "data da criação",
}
</pre>
<hr noshade />

<h3>GET - /users</h3>
<h2>Listar todos os users criados</h2>
<strong>Necessita de um token</strong>

<pre>
[
  {
  "id": 1,
  "name": "teste",
  "emailPrincipal": "teste@teste.com",
  "emailSecondary": "Opcional",
  "password": "1234"
  "telephonePrincipal": "9999999",
  "telephoneSecondary": "Opcional",
  "createdAt": "data da criação",
 },
 {
  "id": 2,
  "name": "teste2",
  "emailPrincipal": "teste2@teste.com",
  "emailSecondary": "Opcional",
  "password": "1234"
  "telephonePrincipal": "9999999",
  "telephoneSecondary": "Opcional",
  "createdAt": "data da criação",
 }
</pre>

