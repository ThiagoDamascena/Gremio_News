CREATE DATABASE gremio_estudantil CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE gremio_estudantil;

-- Tabela administrador

CREATE TABLE administrador (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  nome VARCHAR(150) NOT NULL,
  matricula VARCHAR(50) NOT NULL,
  email VARCHAR(150) NOT NULL,
  senha VARCHAR(255) NOT NULL,
  foto LONGBLOB DEFAULT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_admin_email (email),
  UNIQUE KEY uq_admin_matricula (matricula)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabela aluno

CREATE TABLE aluno (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  nome VARCHAR(150) NOT NULL,
  matricula VARCHAR(50) NOT NULL,
  email VARCHAR(150) NOT NULL,
  senha VARCHAR(255) NOT NULL,
  foto LONGBLOB DEFAULT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_aluno_email (email),
  UNIQUE KEY uq_aluno_matricula (matricula)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabela noticias (criada por administrador)

CREATE TABLE noticias (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  titulo VARCHAR(255) NOT NULL,
  conteudo TEXT NOT NULL,
  data_publicacao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  admin_id INT UNSIGNED NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_noticias_admin (admin_id),
  CONSTRAINT fk_noticias_admin FOREIGN KEY (admin_id)
    REFERENCES administrador(id) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Adcição na tabela notícias

ALTER TABLE noticias
ADD imagem VARCHAR(255);

-- tabela para armazenar as imagens do banner

CREATE TABLE banners (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  imagem VARCHAR(255) NOT NULL,
  admin_id INT UNSIGNED NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_banners_admin (admin_id),
  CONSTRAINT fk_banners_admin FOREIGN KEY (admin_id)
    REFERENCES administrador(id)
    ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabela banco_de_resumos (escritos por alunos)

CREATE TABLE banco_de_resumos (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  titulo VARCHAR(255) NOT NULL,
  conteudo TEXT NOT NULL,
  aluno_id INT UNSIGNED NOT NULL,
  criado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  atualizado_em DATETIME NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_resumos_aluno (aluno_id),
  CONSTRAINT fk_resumos_aluno FOREIGN KEY (aluno_id)
    REFERENCES aluno(id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabela formulario (id auto_increment)

CREATE TABLE formulario (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  nome VARCHAR(150) NOT NULL,
  email VARCHAR(150) NOT NULL,
  conteudo TEXT NOT NULL,
  turma VARCHAR(100) DEFAULT NULL,
  aluno_id INT UNSIGNED DEFAULT NULL,
  criado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  lido_por_admin BOOLEAN NOT NULL DEFAULT FALSE,
  PRIMARY KEY (id),
  KEY idx_formulario_aluno (aluno_id),
  CONSTRAINT fk_formulario_aluno FOREIGN KEY (aluno_id)
    REFERENCES aluno(id) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabela leitura_noticias (many-to-many: alunos leem noticias)

CREATE TABLE leitura_noticias (
  aluno_id INT UNSIGNED NOT NULL,
  noticia_id INT UNSIGNED NOT NULL,
  lido_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (aluno_id, noticia_id),
  KEY idx_leitura_noticia (noticia_id),
  CONSTRAINT fk_leitura_aluno FOREIGN KEY (aluno_id)
    REFERENCES aluno(id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_leitura_noticia FOREIGN KEY (noticia_id)
    REFERENCES noticias(id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;