import express from "express";
//commonjs const express = require('express')

const app = express();

//configurar aplicação para receber dados do formulario

app.use(express.urlencoded({ extended: true}))


const porta = 3000;
const host = "0.0.0.0"; //IP se refere-se a todas as interfaces locais (Placas de rede) no seu PC


var listaProds = []; //Variavel global - Lista para armazenar os cadastros
//implementar a tareda para entregar um formulario html para o cliente

function CadsProdsView(req, resp) {
  resp.send(`
        <html>
                <head>
                    <tittle>Cadastro de Produtos</tittle>
                    
                </head>
                <body>
                    <div class="container text-center">
                        <h1>Cadastro de Produtos</h1>

        <form method="POST" action="/Produto" class="row g-3">
        <div class="col-md-4">
          <label for="validationDefault01"  class="form-label">Nome do produto:</label>
          <input type="text" class="form-control" id="nome" name="nome" value="" required>
        </div>
        <div class="col-md-4">
          <label for="validationDefault02"  class="form-label">Descrição</label>
          <input type="text" class="form-control" id="desc" name="desc" value="" required>
        </div>
        
        </div>
        <div class="col-md-6">
          <label for="validationDefault03" name="cod" class="form-label">Codigo</label>
          <input type="text" class="form-control" id="cod" name="cod" required>
        </div>

        
        <div class="col-12">
          <button class="btn btn-primary" type="submit">Cadastrar produto</button>
        </div>
      </form>

                    </div>
                </body>
                
        </html>
    `);
}

function menuView(req,resp)
{
    resp.send(`
        <head>
            <tittle>Menu de cadastro de alunos</tittle>
        </head>
        <body>
             <nav class="navbar navbar-expand-lg bg-body-tertiary">
                <div class="container-md">
                    <a class="navbar-brand" href="/Produto">Cadastrar Produtos</a>
                 </div>
            </nav>
        </body>
        `);
}

function CadastraProduto(req,resp)
{
    //recuperar os dados do formulario enviado para o servidor
    //adicionar o produto na lista
    const nome = req.body.nome;
    const desc = req.body.desc;
    const cod = req.body.cod;

    const produtos = {nome, desc, cod};
    listaProds.push(produtos);

    //mostrar a lista de produtos
    resp.write(`
            <html>
                <head>
                    <tittle>Produtos Cadastrados</tittle>
                    <meta charset = "utf-8">
                </head>

                 <body>
                    <table class="table">
                         <thead>
                        <tr>
                           
                             <th scope="col">Nome do produto</th>
                            <th scope="col">Descrição</th>
                              <th scope="col">Codigo</th>
                             </tr>
                                </thead>
                                     <tbody>`);
    //adicionar as linhas da tabela, para cada produto nos devemos criar uma linha
    for(var i =0; i<listaProds.length; i++)
    {
        resp.write(`<tr>
                        <td>${listaProds[i].nome}</td>
                        <td>${listaProds[i].desc}</td>
                        <td>${listaProds[i].cod}</td>
                    </tr>`)
    }
   
  
  resp.write(`</tbody>
            </table>
             </body>
            </html>
        `);
    resp.end();//sera enviada a resposta

    
}


app.get('/',menuView);
app.get("/Produto", CadsProdsView); //enviar o formulario para cadastrar o aluno
//novidade desta aula é o metodo post
app.post('/Produto',CadastraProduto);

app.listen(porta, host, () => {
  console.log(
    `Servidor iniciado e em execução no endereço http:// ${host}:${porta}`
  );
});
