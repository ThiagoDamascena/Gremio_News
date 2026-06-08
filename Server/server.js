const express = require("express")
const cors = require("cors")

const db = require("./database")

const app = express()

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
    res.send("Servidor funcionando")
})

app.post("/register", (req, res) => {

    const {
        nome,
        matricula,
        email,
        senha
    } = req.body

    const sql = `
        INSERT INTO aluno
        (nome, matricula, email, senha)
        VALUES (?, ?, ?, ?)
    `

    db.query(
        sql,
        [nome, matricula, email, senha],

        (err, result) => {

            if(err){
                console.log(err)

                return res
                .status(500)
                .json({
                    erro: "Erro ao cadastrar"
                })
            }

            res.json({
                mensagem: "Usuário cadastrado"
            })
        }
    )
})

// LOGIN ADMIN

app.post("/admin-login", (req, res) => {

    const { matricula, senha } = req.body

    const sql = `
        SELECT *
        FROM administrador
        WHERE matricula = ?
    `

    db.query(
        sql,
        [matricula],
        (err, result) => {

            if(err){
                return res
                .status(500)
                .json({
                    erro: "Erro no servidor"
                })
            }

            if(result.length === 0){
                return res
                .status(401)
                .json({
                    erro: "Administrador não encontrado"
                })
            }

            const admin = result[0]

            if(admin.senha !== senha){
                return res
                .status(401)
                .json({
                    erro: "Senha incorreta"
                })
            }

            res.json({
                mensagem: "Login realizado",
                admin: {
                    id: admin.id,
                    nome: admin.nome,
                    matricula: admin.matricula
                }
            })
        }
    )
})

// LOGIN ALUNO

app.post("/login-form", (req, res) => {

    const { matricula, senha } = req.body;

    const sql = `
        SELECT *
        FROM aluno
        WHERE matricula = ?
    `;

    db.query(sql, [matricula], (err, result) => {

        if (err) {
            return res.status(500).json({
                erro: "Erro no servidor"
            });
        }

        if (result.length === 0) {
            return res.status(401).json({
                erro: "Matrícula não encontrada"
            });
        }

        const aluno = result[0];

        if (aluno.senha !== senha) {
            return res.status(401).json({
                erro: "Senha incorreta"
            });
        }

        res.json({
            mensagem: "Login realizado",
            aluno: {
                id: aluno.id,
                nome: aluno.nome,
                matricula: aluno.matricula
            }
        });

    });
});

app.listen(5000, () => {
    console.log("Servidor rodando")
})