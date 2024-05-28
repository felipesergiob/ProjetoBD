package br.cesar.trabalho.bd.repositories;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementCreator;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import br.cesar.trabalho.bd.dtos.CreateProductDTO;
import br.cesar.trabalho.bd.entities.Product;

@Repository
public class ProductRepository {

  @Autowired
  private JdbcTemplate jdbcTemplate;

  public Integer create(CreateProductDTO productDTO) {
    String sql = "INSERT INTO products (name, description, price, category_id) VALUES (?, ?, ?, ?)";

    GeneratedKeyHolder holder = new GeneratedKeyHolder();
    jdbcTemplate.update(new PreparedStatementCreator() {
        @Override
        public PreparedStatement createPreparedStatement(Connection con) throws SQLException {
            PreparedStatement statement = con.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            statement.setString(1, productDTO.getName());
            statement.setString(2, productDTO.getDescription());
            statement.setBigDecimal(3, productDTO.getPrice());
            statement.setInt(4, productDTO.getCategoryId());
            return statement;
        }
    }, holder);
    
    Integer primaryKey = holder.getKey().intValue();
    
    return primaryKey;
  }

  public void createImage(String image, Integer productId) {
    String sql = "INSERT INTO products_images (url, product_id) VALUES (?, ?)";

    jdbcTemplate.update(sql, image, productId);
  }

  public void createColor(String color, Integer productId) {
    String sql = "INSERT INTO products_colors (color, product_id) VALUES (?, ?)";

    jdbcTemplate.update(sql, color, productId);
  }

  public void update(CreateProductDTO productDTO, Integer productId) {
    String sql = "UPDATE products SET name = ?, description = ?, price = ?, category_id = ? WHERE id = ?";

    jdbcTemplate.update(sql, productDTO.getName(), productDTO.getDescription(), productDTO.getPrice(), productDTO.getCategoryId(), productId);
  }

  public List<Product> findAllProducts() {
    String sql = "SELECT products.*, group_concat(i.url) as images FROM products INNER JOIN products_images i ON i.product_id = products.id GROUP BY products.id;";

    return jdbcTemplate.query(sql, (rs, rowNum) -> {
      Product product = new Product();
      product.setName(rs.getString("name"));
      product.setCategoryId(rs.getInt("category_id"));
      product.setDescription(rs.getString("description"));
      product.setPrice(rs.getBigDecimal("price"));
      product.setId(rs.getInt("id"));

      String imagesConcatenated = rs.getString("images");
      if (imagesConcatenated != null) {
          String[] imagesArray = imagesConcatenated.split(",");
          List<String> imagesList = Arrays.asList(imagesArray);
          product.setImages(imagesList); 
      }

      return product;
    });
  }

  public List<Product> findAllByCategoryId(Integer categoryId) {
    String sql = "SELECT products.*, group_concat(i.url) as images FROM products INNER JOIN products_images i ON i.product_id = products.id WHERE products.category_id = ? GROUP BY products.id;";

    List<Product> products = jdbcTemplate.query(new PreparedStatementCreator() {
      @Override
      public PreparedStatement createPreparedStatement(Connection connection) throws SQLException {
        PreparedStatement preparedStatement = connection.prepareStatement(sql);
        preparedStatement.setInt(1, categoryId);
        return preparedStatement;
      }
    }, new ProductRowMapperNoColor());

    return products;
  }

  public Optional<Product> findProductById(Integer productId) {
    String sql = "CALL get_product_with_images(?);";

    List<Product> products = jdbcTemplate.query(new PreparedStatementCreator() {
      @Override
      public PreparedStatement createPreparedStatement(Connection connection) throws SQLException {
        PreparedStatement preparedStatement = connection.prepareStatement(sql);
        preparedStatement.setInt(1, productId);
        return preparedStatement;
      }
    }, new ProductRowMapper());

    return products.isEmpty() ? Optional.empty() : Optional.of(products.get(0));
  }
  
  private static class ProductRowMapper implements RowMapper<Product> {
    @Override
    public Product mapRow(ResultSet rs, int rowNum) throws SQLException {
        Product product = new Product();

        JSONObject jsonObject = new JSONObject(rs.getString("product_with_images"));
        product.setId(jsonObject.getInt("id"));
        product.setName(jsonObject.getString("name"));
        product.setDescription(jsonObject.getString("description"));
        product.setPrice(jsonObject.getBigDecimal("price"));
        product.setCategoryId(jsonObject.getInt("category_id"));

        JSONArray imagesArray = jsonObject.getJSONArray("images");
        List<String> images = new ArrayList<>();
        for (int i = 0; i < imagesArray.length(); i++) {
            images.add(imagesArray.getString(i));
        }
        product.setImages(images);

        try {
          
          JSONArray colorsArray = jsonObject.getJSONArray("colors");

          if (colorsArray != null) {
            List<String> colors = new ArrayList<>();
            for (int i = 0; i < colorsArray.length(); i++) {
                colors.add(colorsArray.getString(i));
            }
            product.setColors(colors);
          }
        } catch (Exception e) {
          // TODO: handle exception
        }

        return product;
    }
  }
  
  private static class ProductRowMapperNoColor implements RowMapper<Product> {
    @Override
    public Product mapRow(ResultSet rs, int rowNum) throws SQLException {
      Product product = new Product();
      product.setName(rs.getString("name"));
      product.setCategoryId(rs.getInt("category_id"));
      product.setDescription(rs.getString("description"));
      product.setPrice(rs.getBigDecimal("price"));
      product.setId(rs.getInt("id"));

      String imagesConcatenated = rs.getString("images");
      if (imagesConcatenated != null) {
          String[] imagesArray = imagesConcatenated.split(",");
          List<String> imagesList = Arrays.asList(imagesArray);
          product.setImages(imagesList); 
      }

      return product;
    }
  }
}