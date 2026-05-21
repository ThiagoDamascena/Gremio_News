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
        name,
        matricula,
        email,
        senha
    } = req.body

    const sql = `
        INSERT INTO aluno
        (name, matricula, email, senha)
        VALUES (?, ?, ?, ?)
    `

    db.query(
        sql,
        [name, matricula, email, senha],

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

app.listen(3000, () => {
    console.log("Servidor rodando")
})