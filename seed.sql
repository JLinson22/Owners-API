DELETE FROM homes;
DELETE FROM owners;
DROP TABLE IF EXISTS homes CASCADE;
DROP TABLE IF EXISTS owners CASCADE;

CREATE TABLE owners (
    owner_id serial,
    name varchar(10),
    age integer,
    PRIMARY KEY(owner_id)
);

CREATE TABLE homes (
    home_id serial,
    owner_id serial,
    price integer,
    location varchar(20),
    for_sale boolean,
    CONSTRAINT fk_owner FOREIGN KEY (owner_id) REFERENCES owners(owner_id) ON DELETE CASCADE
);

INSERT INTO owners (name, age) VALUES ('John', 28);
INSERT INTO owners (name, age) VALUES ('Micheal', 32);
INSERT INTO owners (name, age) VALUES ('Abigail', 30);

INSERT INTO homes (price, location, for_sale, owner_id) VALUES (100000, 'Texas', true, 1);
INSERT INTO homes (price, location, for_sale, owner_id) VALUES (350000, 'New Mexico', false, 2);
INSERT INTO homes (price, location, for_sale, owner_id) VALUES (700000, 'California', true, 3);