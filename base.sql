USE trabalho_bd;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(250) NOT NULL,
  password VARCHAR(250) NOT NULL,
  email VARCHAR(250) DEFAULT NULL
);

CREATE TABLE users_address (
  id INT AUTO_INCREMENT PRIMARY KEY,
  street VARCHAR(250) NOT NULL,
  neighbourhood VARCHAR(250) NOT NULL,
  number INT NOT NULL,
  city VARCHAR(250) NOT NULL,
  state VARCHAR(250) NOT NULL,
  country VARCHAR(250) NOT NULL,
  cep VARCHAR(250) NOT NULL,
  user_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(250) NOT NULL
);

CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(250) NOT NULL,
  description VARCHAR(250) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  category_id INT NOT NULL,
  FOREIGN KEY (category_id) REFERENCES categories(id)
);

CREATE TABLE products_images (
  id INT AUTO_INCREMENT PRIMARY KEY,
  url VARCHAR(250) NOT NULL,
  product_id INT NOT NULL,
  FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  total INT NOT NULL,
  user_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE orders_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  product_id INT NOT NULL,
  order_id INT NOT NULL,
  quantity INT NOT NULL,
  FOREIGN KEY (product_id) REFERENCES products(id),
  FOREIGN KEY (order_id) REFERENCES orders(id)
);

INSERT INTO users (name, password, email) VALUES
('Edmar', 'teste123', 'edmar@gmail.com'),
('Gabriel', 'teste123', 'gabriel@gmail.com'),
('Pepe', 'teste123', 'pepe@gmail.com');

INSERT INTO categories (name) VALUES 
('Calças'),
('Camisas'),
('Jaquetas');

INSERT INTO products (name, description, price, category_id) VALUES
('Calça', 'Melhor calça preta do mercado', 249.99, 1),
('Camisa', 'Melhor camisa básica do mercado', 99.99, 2);

INSERT INTO products_images (url, product_id) VALUES 
('https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 1),
('https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 1),
('https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=2797&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 2);
