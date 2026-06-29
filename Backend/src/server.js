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

const FRONTEND = path.resolve(__dirname, "..", "..", "Frontend");

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

app.get("/news", (req, res) => {
  res.sendFile(path.join(FRONTEND, "pages/news/index_news.html"));
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

app.post("/register", async (req, res) => {

    const {
        nome,
        matricula,
        email,
        senha
    } = req.body

    try {
        await db.query(
            `
                INSERT INTO aluno
                (nome, matricula, email, senha)
                VALUES (?, ?, ?, ?)
            `,
            [nome, matricula, email, senha]
        )

        res.json({
            mensagem: "Usuário cadastrado"
        })
    } catch (err) {
        console.log(err)

        return res
            .status(500)
            .json({
                erro: "Erro ao cadastrar"
            })
    }
})

// LOGIN ADMIN

app.post("/admin-login", async (req, res) => {
    const { matricula, senha } = req.body

    try {
        const [result] = await db.query(
            `
                SELECT *
                FROM administrador
                WHERE matricula = ?
            `,
            [matricula]
        )

        if (result.length === 0) {
            return res
                .status(401)
                .json({
                    erro: "Administrador não encontrado"
                })
        }

        const admin = result[0]

        if (admin.senha !== senha) {
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
    } catch (err) {
        console.error(err)
        return res
            .status(500)
            .json({
                erro: "Erro no servidor"
            })
    }
})

// LOGIN ALUNO

app.post("/login-form", async (req, res) => {

    const { matricula, senha } = req.body;

    try {
        const [result] = await db.query(
            `
                SELECT *
                FROM aluno
                WHERE matricula = ?
            `,
            [matricula]
        );

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
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            erro: "Erro no servidor"
        });
    }
});

app.post(
    "/noticias",
    upload.single("imagem"),
    async (req, res) => {

        const {
            titulo,
            conteudo,
            admin_id
        } = req.body

        const imagem =
            req.file
            ? req.file.filename
            : null

        try {
            await db.query(
                `
                    INSERT INTO noticias
                    (
                        titulo,
                        conteudo,
                        imagem,
                        admin_id
                    )
                    VALUES (?, ?, ?, ?)
                `,
                [
                    titulo,
                    conteudo,
                    imagem,
                    admin_id
                ]
            )

            res.json({
                mensagem: "Notícia publicada"
            })
        } catch (err) {
            console.log(err)

            return res.status(500).json({
                erro: "Erro ao publicar notícia"
            })
        }
    }
)



app.get("/noticias", async (req, res) => {

    const sql = `
        SELECT *
        FROM noticias
        ORDER BY data_publicacao DESC
    `;

    try {
        const [rows] = await db.query(sql);
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ erro: "Erro ao buscar notícias" });
    }
});

app.get("/noticias/:id", (req, res) => {
    res.sendFile(path.join(FRONTEND, "/pages/news/noticia/index_noticia.html"));
});

app.get("/api/noticias/:id", async (req, res) => {

    const id = req.params.id;

    const [noticia] = await db.query(
        "SELECT * FROM noticias WHERE id = ?",
        [id]
    );

    res.json(noticia[0]);
});

app.listen(3000, () => {
    console.log("Servidor rodando")
})