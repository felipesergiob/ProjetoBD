package br.cesar.trabalho.bd.repositories;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementCreator;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import br.cesar.trabalho.bd.entities.Product;

@Repository
public class ProductRepository {

  @Autowired
  private JdbcTemplate jdbcTemplate;

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
    }, new ProductRowMapper());

    return products;
  }

  public Optional<Product> findProductById(Integer productId) {
    String sql = "SELECT products.*, group_concat(i.url) as images FROM products INNER JOIN products_images i ON i.product_id = products.id WHERE products.id = ?";

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
        product.setName(rs.getString("name"));
        product.setCategoryId(rs.getInt("category_id"));
        product.setDescription(rs.getString("description"));
        product.setPrice(rs.getBigDecimal("price"));
        product.setId(rs.getInt("id"));

        String imagesConcatenated = rs.getString("images");
        if (imagesConcatenated != null) {
            String[] imagesArray = imagesConcatenated.split(",");
            List<String> imagesList = Arrays.asList(imagesArray);
            product.setImages(imagesList); // Assuming you have a method setImages(List<String>) in your Product class
        }

        return product;
    }
  }
}