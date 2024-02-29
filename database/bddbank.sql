CREATE DATABASE IF NOT EXISTS bddbank;

USE bddbank;


CREATE TABLE IF NOT EXISTS user(
id CHAR(36) NOT NULL PRIMARY KEY,
email VARCHAR(50) UNIQUE,
password VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS currency(
id CHAR(36) NOT NULL PRIMARY KEY,
name VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS exchange(
id CHAR(36) NOT NULL PRIMARY KEY,
rate DOUBLE,
exchange_datetime DATETIME,
id_currency CHAR(36),
CONSTRAINT fk_id_currency FOREIGN KEY(id_currency) REFERENCES currency(id)
);

CREATE TABLE IF NOT EXISTS usercurrency (
id CHAR(36) NOT NULL PRIMARY KEY,
  id_user CHAR(36),
  id_currency CHAR(36),
  amount DOUBLE,
  CONSTRAINT fk_user_id FOREIGN KEY (id_user) REFERENCES user(id),
  CONSTRAINT fk_currency_id FOREIGN KEY (id_currency) REFERENCES currency(id)
);

-- DROP TABLE usercurrency;
-- DROP TABLE exchange;
-- DROP TABLE currency;
-- DROP TABLE user;

-- DELETE FROM owns;
-- DELETE FROM exchange;
-- DELETE FROM currency;
-- DELETE FROM user;


