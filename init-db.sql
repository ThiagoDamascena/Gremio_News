CREATE USER IF NOT EXISTS 'eva_admin'@'localhost' IDENTIFIED BY '190326';
GRANT ALL PRIVILEGES ON gremio_estudantil.* TO 'eva_admin'@'localhost';
CREATE USER IF NOT EXISTS 'eva_admin'@'%' IDENTIFIED BY '190326';
GRANT ALL PRIVILEGES ON gremio_estudantil.* TO 'eva_admin'@'%';
FLUSH PRIVILEGES;
