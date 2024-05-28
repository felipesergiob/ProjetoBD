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

-- INSERT INTO categories (name, description) VALUES 
-- ('Calças', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus a velit nemo odit ab dolorum adipisci amet.'),
-- ('Camisas', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus a velit nemo odit ab dolorum adipisci amet.'),
-- ('Jaquetas', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus a velit nemo odit ab dolorum adipisci amet.');

INSERT INTO categories (name, description) VALUES 
('Camisa', 'Camisas de várias cores e estilos para diversas ocasiões, confeccionadas com materiais de alta qualidade.'),
('Calça', 'Calças confortáveis e elegantes para o dia a dia, proporcionando um visual leve e moderno'),
('Vestido', 'Vestidos elegantes e casuais para todas as ocasiões. É a escolha perfeita para quem busca sofisticação e conforto em uma única peça..'),
('Sapato', 'Sapatos variados, desde casuais até formais. É a combinação perfeita de elegância, conforto e durabilidade..');

INSERT INTO products (name, description, price, category_id) VALUES
('Camisa Polo Azul', 'Camisa polo azul de alta qualidade, confeccionada em algodão premium, ideal para um look casual e elegante.', 79.99, 1),
('Calça Jeans', 'Calça jeans confortável e resistente, com corte moderno e detalhes em lavagem clara, perfeita para o dia a dia.', 129.99, 2),
('Vestido Florido', 'Vestido florido ideal para o verão, feito de tecido leve e arejado, proporcionando conforto e estilo.', 149.99, 3),
('Sapato Social Preto', 'Sapato social preto, ideal para eventos formais, confeccionado em couro legítimo com acabamento refinado.', 249.99, 4),
('Camisa Social Branca', 'Camisa social branca para o trabalho, feita em tecido de algodão de alta qualidade, oferecendo conforto e sofisticação.', 99.99, 1),
('Calça de Sarja', 'Calça de sarja para um look casual, com ajuste perfeito e tecido durável, disponível em várias cores.', 119.99, 2),
('Vestido de Festa', 'Vestido de festa deslumbrante, com detalhes em renda e brilho, ideal para ocasiões especiais.', 299.99, 3),
('Tênis Branco', 'Tênis branco casual e confortável, com design moderno e solado antiderrapante, ideal para o dia a dia.', 199.99, 4),
('Camisa Xadrez', 'Camisa casual xadrez, perfeita para um estilo descontraído, feita de flanela macia e aconchegante.', 89.99, 1),
('Calça Esportiva', 'Calça esportiva de alta performance, feita com tecido respirável e elástico, ideal para atividades físicas.', 139.99, 2),
('Vestido Midi', 'Vestido midi elegante, com corte evasê e tecido fluido, perfeito para eventos sociais e ocasiões especiais.', 189.99, 3),
('Mocassim Marrom', 'Mocassim marrom, feito em couro, com design clássico e confortável, ideal para um look casual chic.', 229.99, 4);

INSERT INTO products_images (url, product_id) VALUES 
('https://www.jardelatacadao.com.br/lojas/00050181/prod/camisa_polo_50_algodao_50_dry_tradicional_jardel_azul_royal_jardel_atacadao_000041B.jpg', 1),
('https://images.tcdn.com.br/img/img_prod/914261/camisa_polo_masculina_mescla_azul_royal_1775_1_0a56f3b587f5720741cb5d7c0cad80f9.jpg', 1),
('https://static.ferju.com.br/public/ferju/imagens/produtos/calca-jeans-masculina-infantil-73-05-0142-gangster-jeans-claro-63ade1e7a5df2.jpg', 2),
('https://www.hangar33.com.br/dw/image/v2/BFCG_PRD/on/demandware.static/-/Sites-masterCatalog_Lunelli/default/dw2e52ed2c/large/hangar33-1.75882-008878-D1.jpg?sw=900&sfrm=jpg&sm=fit&q=80', 2),
('https://m.media-amazon.com/images/I/51QbQ7zPHbL._AC_SY1000_.jpg', 3),
('https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTN8WRdNp-v28S2xyUpTtyr7ACqFDTczqDRQYgI0Kb-RzW5oI8yps-wku8KCQ4dHUMbhyPChjA55SLFjmOWeLceRijfeuSmeNrbl5DrLoOM7wSSX9LxR3NiKQ&usqp=CAE', 3),
('https://img.irroba.com.br/fit-in/600x600/filters:fill(fff):quality(80)/cnscalca/catalog/solado-de-couro/10-1-dsc9416.jpeg', 4),
('https://img.irroba.com.br/fit-in/600x600/filters:fill(fff):quality(80)/ransteri/catalog/z-layout-novo/produtos/social/015/015-preto-2.JPG', 4),
('https://images.tcdn.com.br/img/img_prod/745575/camisa_social_tradicional_passa_facil_maquinetada_branca_9_1_20201216141835.jpg', 5),
('https://www.makermockup.com/wp-content/uploads/2020/06/1.jpg', 5),
('https://ph-cdn1.ecosweb.com.br/imagens01/foto/moda-masculina/calca-sarja/calca-sarja-com-elastano-cinza-niquel_531880_600_1.jpg', 6),
('https://a-static.mlcdn.com.br/450x450/calca-masculina-plus-size-sarja-twill-diametro-marrom-rovitex-plus-size/rovitex/217380/7443a3875a4465f86f394b385a16b409.jpeg', 6),
('https://photos.enjoei.com.br/vestido-longo-preto-festa-luxo-bordado-a-mao-franjas-89398995/800x800/czM6Ly9waG90b3MuZW5qb2VpLmNvbS5ici9wcm9kdWN0cy8xMDE1NDg2My8yYWI2MDQyOGU5NmEzYzA3ZGFmM2JjY2IxODhjZjA5MS5qcGc', 7),
('https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcS0o13CXJQen3Q2ztSY_54QyMjdoRtberSB9BRCWP-WdKsBT_x6aY7JenJtB6KOIRHfAVugmiEMLKI5i-lEqPZmGf3JWNP508IWdIeYQFnkGy3M2E0WYIFQ_41K95_tkHqT1DeWdngn&usqp=CAc', 7),
('https://img.lojasrenner.com.br/item/552100149/zoom/3.jpg', 8),
('https://img.irroba.com.br/fit-in/600x600/filters:fill(fff):quality(80)/tenehico/catalog/produto/tenis/123/123-1.jpg', 8),
('https://www.calitta.com/3980-large_default/camisa-xadrez-vermelha-masculina-manga-longa-elegante-festa-clube.jpg', 9),
('https://static.ferju.com.br/public/ferju/imagens/produtos/camisa-xadrez-masculina-adulto-manga-longa-soft-com-bolso-fullmoon-canary-vermelho-e-marinho-64dbe133ac008.jpg', 9),
('https://imgcentauro-a.akamaihd.net/1366x1366/M08L1L02A3.jpg', 10),
('https://cdn.awsli.com.br/600x700/66/66821/produto/55834956/06ce6ec68d.jpg', 10),
('https://m.media-amazon.com/images/I/51YnpfjM0nL._AC_UY1000_.jpg', 11),
('https://i.pinimg.com/236x/06/95/71/06957145a265e02cc92dc3f2ca5c3645.jpg', 11),
('https://img.irroba.com.br/fit-in/600x600/filters:fill(fff):quality(80)/sopraffi/catalog/modelos-novos-dezembro/drive-marrom-464/013-dsc1111.jpeg', 12),
('https://m.media-amazon.com/images/I/41tDBXRTCmL._AC_.jpg', 12);

INSERT INTO products_colors (color, product_id) VALUES 
('Rosa', 11),
('Vermelho', 11),
('Vermelho', 9),
('Azul', 9),
('Preto', 7),
('Azul', 7);

-- INSERT INTO products (name, description, price, category_id) VALUES
-- ('Calça Brança', 'Melhor calça preta do mercado', 249.99, 1),
-- ('Camisa Preta', 'Melhor camisa básica do mercado', 99.99, 2),
-- ('Jaqueta verde', 'Melhor jaqueta do mercado', 150.00, 3),
-- ('Camisa Branca', 'Melhor jaqueta do mercado', 25.00, 3),
-- ('Camisa Testes', 'Melhor jaqueta do mercado', 25.00, 3);

-- INSERT INTO products_images (url, product_id) VALUES 
-- ('https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 1),
-- ('https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 1),
-- ('https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=2797&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 2),
-- ('https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=2797&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 3),
-- ('https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=2797&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 4),
-- ('https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=2797&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 5);

-- INSERT INTO products_colors (color, product_id) VALUES
-- ('Branco', 1),
-- ('Preto', 1);

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