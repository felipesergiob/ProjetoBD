DROP PROCEDURE IF EXISTS get_product_with_images;

DELIMITER $$
CREATE PROCEDURE get_product_with_images(
    IN product_id INT
)
BEGIN
    SELECT JSON_OBJECT(
        'id', p.id,
        'name', p.name,
        'description', p.description,
        'price', p.price,
        'category_id', p.category_id,
        'images', (SELECT JSON_ARRAYAGG(i.url) FROM products_images i WHERE i.product_id = product_id)
    )
    INTO @result
    FROM products p
    WHERE p.id = product_id;
    
    SELECT @result AS product_with_images;
END$$

DELIMITER ;

CALL get_product_with_images(2);