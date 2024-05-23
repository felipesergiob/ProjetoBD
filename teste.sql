USE trabalho_bd;

select * from products
inner join categories on products.category_id = categories.id;

# get products
select 
	p.*, 
    group_concat(i.url) as images,
    c.name as category_name
from products p
inner join categories c on p.category_id = c.id
inner join products_images i on i.product_id = p.id
group by p.id;

# gpt (create order)

INSERT INTO orders (total, user_id)
VALUES
    (0, 1); -- replace user_id with the actual ID of the user placing the order

-- Get the ID of the newly inserted order
SELECT LAST_INSERT_ID() AS new_order_id;

-- Now you have the ID of the newly inserted order, you can use it to create the order item(s)
-- For example, let's say you want to add product with id = 1 and quantity = 2,
-- and product with id = 2 and quantity = 3 to the order item

-- You can calculate the total for each product based on their price and quantity
-- Let's assume you have a 'products' table with id and price columns

-- Example query to calculate total for each product
SELECT 
    product_id,
    quantity * price AS total_per_product
FROM 
    orders_items
JOIN 
    products ON orders_items.product_id = products.id
WHERE 
    order_id = new_order_id; -- use the newly inserted order ID here

-- Now, to create the order item, you can use INSERT INTO statement
-- You will need to replace the values in the query with your actual values
-- Here's an example of how you can insert the order item for the new order

INSERT INTO orders_items (product_id, order_id, quantity)
VALUES
    (1, new_order_id, 2), -- Product with id = 1, quantity = 2
    (2, new_order_id, 3); -- Product with id = 2, quantity = 3

-- To get the total for the entire order, you can sum the totals for each product
-- You can do this by summing the total_per_product calculated earlier
-- Here's an example query to get the total for the new order

SELECT 
    SUM(quantity * price) AS total
FROM 
    orders_items
JOIN 
    products ON orders_items.product_id = products.id
WHERE 
    order_id = new_order_id; -- use the newly inserted order ID here
