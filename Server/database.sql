CREATE DATABASE gremio_estudantil CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE gremio_estudantil;

-- Tabela administrador

CREATE TABLE administrador (
  id_admin INT UNSIGNED NOT NULL AUTO_INCREMENT,
  nome VARCHAR(150) NOT NULL,
  matricula VARCHAR(50) NOT NULL,
  email VARCHAR(150) NOT NULL,
  senha VARCHAR(255) NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id_admin),
  UNIQUE KEY uq_admin_email (email),
  UNIQUE KEY uq_admin_matricula (matricula)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabela aluno

CREATE TABLE aluno (
  id_aluno INT UNSIGNED NOT NULL AUTO_INCREMENT,
  nome VARCHAR(150) NOT NULL,
  matricula VARCHAR(50) NOT NULL,
  email VARCHAR(150) NOT NULL,
  senha VARCHAR(255) NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id_aluno),
  UNIQUE KEY uq_aluno_email (email),
  UNIQUE KEY uq_aluno_matricula (matricula)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabela noticias (criada por administrador)

CREATE TABLE noticias (
  id_noticia INT UNSIGNED NOT NULL AUTO_INCREMENT,
  titulo VARCHAR(255) NOT NULL,
  conteudo TEXT NOT NULL,
  data_publicacao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  admin_id INT UNSIGNED NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id_noticia),
  KEY idx_noticias_admin (admin_id),
  CONSTRAINT fk_noticias_admin FOREIGN KEY (admin_id)
    REFERENCES administrador(id_admin) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

ALTER TABLE noticias
ADD imagem VARCHAR(255);

-- Tabela banco_de_resumos (escritos por alunos)

CREATE TABLE banco_de_resumos (
  id_resumo INT UNSIGNED NOT NULL AUTO_INCREMENT,
  titulo VARCHAR(255) NOT NULL,
  conteudo TEXT NOT NULL,
  aluno_id INT UNSIGNED NOT NULL,
  criado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  atualizado_em DATETIME NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id_resumo),
  KEY idx_resumos_aluno (aluno_id),
  CONSTRAINT fk_resumos_aluno FOREIGN KEY (aluno_id)
    REFERENCES aluno(id_aluno) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabela formulario (id auto_increment)

CREATE TABLE formulario (
  id_formulario INT UNSIGNED NOT NULL AUTO_INCREMENT,
  nome VARCHAR(150) NOT NULL,
  email VARCHAR(150) NOT NULL,
  conteudo TEXT NOT NULL,
  turma VARCHAR(100) DEFAULT NULL,
  aluno_id INT UNSIGNED DEFAULT NULL,
  criado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  lido_por_admin BOOLEAN NOT NULL DEFAULT FALSE,
  PRIMARY KEY (id_formulario),
  KEY idx_formulario_aluno (aluno_id),
  CONSTRAINT fk_formulario_aluno FOREIGN KEY (aluno_id)
    REFERENCES aluno(id_aluno) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabela leitura_noticias (many-to-many: alunos leem noticias)

CREATE TABLE leitura_noticias (
  aluno_id INT UNSIGNED NOT NULL,
  noticia_id INT UNSIGNED NOT NULL,
  lido_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (aluno_id, noticia_id),
  KEY idx_leitura_noticia (noticia_id),
  CONSTRAINT fk_leitura_aluno FOREIGN KEY (aluno_id)
    REFERENCES aluno(id_aluno) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_leitura_noticia FOREIGN KEY (noticia_id)
    REFERENCES noticias(id_noticia) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;