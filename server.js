const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql2');
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const path = require('path')

app.use(express.static('public'));

const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'healthbox',
});

connection.connect(function (err) {
  if (!err) {
    console.log("Conexão como o Banco realizada com sucesso!!!");
  } else {
    console.log("Erro: Conexão NÃO realizada", err);
  }
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/Pag.login.html')
})



app.post('/Pag.login', (req, res) => {
  let email = req.body.email;
  let senha = req.body.senha;

  connection.query("SELECT * FROM usuario where email_usuario = '" + email + "'", function (err, rows, fields) {
    console.log("Results:", rows);
    if (!err) {
      if (rows.length > 0) {

        if (rows[0].senha_usuario === senha) {
          res.send('Login com Sucesso!!!');
        res.sendFile(__dirname + '/Páginas/index.html')
            } else {
             res.send('Senha incorreta');
            }

      } else {
        res.send('Login Falhou - Email não cadastrado');
      }
    } else {
      console.log("Erro: Consulta não realizada", err);
      res.send('Login failed');
    }
  });
});



app.get('/cadastro', (req, res) => {
  res.sendFile(__dirname + '/Páginas/cadastro.html')
})

app.post('/cadastro', (req, res) => {
  let nome = req.body.nome;
  let email = req.body.email;
  let senha = req.body.senha;
  let data = req.body.data;
  let telefone = req.body.telefone;

    connection.query( "INSERT INTO `user`(`nome`, `email`, `senha`, `data`,`telefone`) VALUES  ('" + nome + "','" + email + "','" + senha + "','" + data + "','" + telefone + "')", function (err, rows, fields) {
    console.log("Results:", rows);
    if (!err) {
      if (rows.length > 0) {

        if (rows[0].senha_usuario === senha) {
          res.send('Login com Sucesso!!!');
          res.sendFile(__dirname + '/Páginas/login.html')
        } else {
          res.send('Senha incorreta');
        }
      } else {
        res.send('Login Falhou - Email não cadastrado');
      }
    } else {
      console.log("Erro: Consulta não realizada", err);
      res.send('Login failed');
    }
  });
});

  
  connection.query( "INSERT INTO `user`(`nome`, `sobrenome`, `cpf`, `email`,`senha`) VALUES  ('" + nome + "','" + sobrenome + "','" + cpf + "','" + email + "','" + password + "')", function (err, rows, fields) {
    console.log("Results:", rows);
    if (!err) {
      console.log("Cadastro feito com sucesso!!");
      res.sendFile(__dirname + '/public/login.html')
    } else {
      console.log("Erro: Consulta não realizada", err);
      res.send('Login failed');
    }
  });
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000!')
})
