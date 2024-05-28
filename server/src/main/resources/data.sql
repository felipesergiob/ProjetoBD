SET FOREIGN_KEY_CHECKS = 0; 
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS products_images; 
DROP TABLE IF EXISTS users_address;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS orders_items;
DROP TABLE IF EXISTS favorites;
DROP TABLE IF EXISTS products_colors;
SET FOREIGN_KEY_CHECKS = 1; 

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(250) NOT NULL,
  password VARCHAR(250) NOT NULL,
  email VARCHAR(250) NOT NULL,
  role VARCHAR(250) DEFAULT 'USER'
);

CREATE TABLE users_address (
  id INT AUTO_INCREMENT PRIMARY KEY,
  street VARCHAR(250) NOT NULL,
  neighbourhood VARCHAR(250) NOT NULL,
  number INT NOT NULL,
  city VARCHAR(250) NOT NULL,
  state VARCHAR(250) NOT NULL,
  cep VARCHAR(250) NOT NULL,
  user_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(250) NOT NULL,
  description VARCHAR(250) NOT NULL
);

CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(250) NOT NULL,
  description VARCHAR(250) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  category_id INT NOT NULL,
  FOREIGN KEY (category_id) REFERENCES categories(id)
);

CREATE TABLE products_colors (
  id INT AUTO_INCREMENT PRIMARY KEY,
  product_id INT NOT NULL,
  color VARCHAR(250) NOT NULL,
  FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE products_images (
  id INT AUTO_INCREMENT,
  url VARCHAR(250) NOT NULL,
  product_id INT NOT NULL,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
  PRIMARY KEY (id, product_id)
);

CREATE TABLE orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  total DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE orders_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  product_id INT NOT NULL,
  order_id INT NOT NULL,
  user_id INT NOT NULL,
  quantity INT NOT NULL,
  FOREIGN KEY (product_id) REFERENCES products(id),
  FOREIGN KEY (order_id) REFERENCES orders(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE favorites (
  id INT AUTO_INCREMENT PRIMARY KEY,
  product_id INT NOT NULL,
  user_id INT NOT NULL,
  FOREIGN KEY (product_id) REFERENCES products(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

INSERT INTO users (name, password, email, role) VALUES
('Edmar', 'teste123', 'edmar@gmail.com', 'ADMIN'),
('Gabriel', 'teste123', 'gabriel@gmail.com', 'USER'),
('Pepe', 'teste123', 'pepe@gmail.com', 'ADMIN');

INSERT INTO categories (name, description) VALUES 
('Calças', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus a velit nemo odit ab dolorum adipisci amet.'),
('Camisas', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus a velit nemo odit ab dolorum adipisci amet.'),
('Jaquetas', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus a velit nemo odit ab dolorum adipisci amet.');

INSERT INTO products (name, description, price, category_id) VALUES
('Calça Brança', 'Melhor calça preta do mercado', 249.99, 1),
('Camisa Preta', 'Melhor camisa básica do mercado', 99.99, 2),
('Jaqueta verde', 'Melhor jaqueta do mercado', 150.00, 3),
('Camisa Branca', 'Melhor jaqueta do mercado', 25.00, 3),
('Camisa Testes', 'Melhor jaqueta do mercado', 25.00, 3);

INSERT INTO products_images (url, product_id) VALUES 
('https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 1),
('https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 1),
('https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=2797&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 2),
('https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=2797&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 3),
('https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=2797&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 4),
('https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=2797&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 5);

-- yyyy-mm-dd hh:mm:ss
INSERT INTO orders (total, created_at) VALUES
(100, '2024-03-10 10:30:00'),
(100, '2024-05-10 10:30:00');

INSERT INTO favorites (product_id, user_id) VALUES
(1, 1),
(1, 2),
(1, 3);

INSERT INTO orders_items (product_id, order_id, user_id, quantity) VALUES 
(1, 1, 1, 1),
(2, 1, 1, 2),
(1, 2, 1, 1),
(1, 2, 1, 1);

-- INSERT INTO orders_items (product_id, order_id, quantity) VALUES 
-- (1, 1, 1),
-- (2, 1, 1),
-- (2, 2, 1);