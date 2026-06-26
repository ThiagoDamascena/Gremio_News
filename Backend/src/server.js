const express = require("express")
const path = require("path")
const cors = require("cors")
const multer = require("multer")

const db = require("./database")

const app = express();

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"]
}));

app.use(express.json())

const FRONTEND = path.resolve("/Frontend");

app.use(express.static(FRONTEND));

app.get("/", (req, res) => {
  res.sendFile(path.join(FRONTEND, "pages/home/index_home.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(FRONTEND, "pages/login/index_login.html"));
});

app.get("/admin", (req, res) => {
  res.sendFile(path.join(FRONTEND, "pages/admin/index_admin.html"));
});



const storage = multer.diskStorage({

    destination: (req, file, cb) => {

        cb(
        null,
        path.join(__dirname, "uploads")
    )
    },

    filename: (req, file, cb) => {

        const nome =
            Date.now() +
            path.extname(file.originalname)

        cb(null, nome)
    }

})

const upload = multer({
    storage
})

app.use(
    "/uploads",
    express.static(
        path.join(__dirname, "uploads")
    )
)

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

app.post(
    "/noticias",
    upload.single("imagem"),
    (req, res) => {

        const {
            titulo,
            conteudo,
            admin_id
        } = req.body

        const imagem =
            req.file
            ? req.file.filename
            : null

        const sql = `
            INSERT INTO noticias
            (
                titulo,
                conteudo,
                imagem,
                admin_id
            )
            VALUES (?, ?, ?, ?)
        `

        db.query(
            sql,
            [
                titulo,
                conteudo,
                imagem,
                admin_id
            ],
            (err, result) => {

                if(err){

                    console.log(err)

                    return res.status(500).json({
                        erro: "Erro ao publicar notícia"
                    })
                }

                res.json({
                    mensagem: "Notícia publicada"
                })
            }
        )
    }
)



app.get("/noticias", (req, res) => {

    const sql = `
        SELECT *
        FROM noticias
        ORDER BY data_publicacao DESC
        LIMIT 3
    `;

    db.query(sql, (err, result) => {

        if (err) {
            console.log("🔥 ERRO MYSQL COMPLETO:");
            console.log(err);

            return res.status(500).json({
                erro: err.message,
                code: err.code,
                sqlMessage: err.sqlMessage
            });
        }

        res.json(result);
    });
});

app.listen(3000, () => {
    console.log("Servidor rodando")
})