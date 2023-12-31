CREATE DATABASE divvy;

CREATE TABLE bill(
    bill_id SERIAL PRIMARY KEY,
    restaurant VARCHAR(255)
);