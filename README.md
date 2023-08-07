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
<hr noshade />

<h3>GET - /users/{ID}</h3>
<h2>Listar users por ID</h2>
<strong>Necessita de um token</strong>

<pre>
{
  "id": 1,
  "name": "teste",
  "emailPrincipal": "teste@teste.com",
  "emailSecondary": "Opcional",
  "telephonePrincipal": "9999999",
  "telephoneSecondary": "Opcional",
  "createdAt": "data da criação",
}
</pre>
<hr noshade />

<h3>PATCH - /users/{ID}</h3>
<h2>Atualiza um user por ID</h2>
<strong>Necessita de um token</strong>

<pre>
{
  "id": 1,
  "name": "teste update",
  "emailPrincipal": "testeupdate@teste.com",
  "emailSecondary": "Opcional",
  "telephonePrincipal": "9999999",
  "telephoneSecondary": "Opcional",
  "createdAt": "data da criação",
}
</pre>

<hr noshade />

<h3>DELETE - /users/{ID}</h3>
<h2>Deleta um user por ID</h2>
<strong>Necessita de um token</strong>

<pre>
{}
</pre>
<hr noshade />

<h3>LOGIN - /login</h3>
<h2>permite acesso do user para atualização de cadastro e criação de contatos</h2>
<strong>Necessita de um token</strong>

<pre>
{
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiY29udGF0byAyMiIsImlkIjoyLCJpYXQiOjE2OTEzNzc5NDAsImV4cCI6MTY5MTQ2NDM0MCwic3ViIjoiMiJ9.v1dPz3dHmT4N9TPWc_pcb0MUnfLdmZCgb9aakGjMGJk"
}
</pre>



