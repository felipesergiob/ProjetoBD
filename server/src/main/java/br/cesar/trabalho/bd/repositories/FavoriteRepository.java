package br.cesar.trabalho.bd.repositories;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementCreator;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import br.cesar.trabalho.bd.entities.Favorite;
import br.cesar.trabalho.bd.entities.Product;

@Repository
public class FavoriteRepository {
  @Autowired
  private JdbcTemplate jdbcTemplate;

  public void create(Integer productId, Integer userId) {
    String sql = "INSERT INTO favorites (product_id, user_id) VALUES (?, ?)";
    jdbcTemplate.update(sql, productId, userId);
  }

  public void delete(Integer id) {
    String sql = "DELETE FROM favorites WHERE id = ?";

    jdbcTemplate.update(sql, id);
  }

  public List<Product> findManyByUserId(Integer userId) {
    String sql = "SELECT p.name, p.description, p.id, p.price FROM favorites f JOIN products p ON p.id = f.product_id WHERE f.user_id = ?";

    List<Product> products = jdbcTemplate.query(new PreparedStatementCreator() {
      @Override
      public PreparedStatement createPreparedStatement(Connection connection) throws SQLException {
        PreparedStatement preparedStatement = connection.prepareStatement(sql);
        preparedStatement.setInt(1, userId);
        return preparedStatement;
      }
    }, new ProductRowMapper());

    return products;
  }

  public Optional<Favorite> findByUserIdAndProductId(Integer productId, Integer userId) {
    String sql = "SELECT * FROM favorites WHERE product_id = ? AND user_id = ?";

    List<Favorite> favorites = jdbcTemplate.query(new PreparedStatementCreator() {
      @Override
      public PreparedStatement createPreparedStatement(Connection connection) throws SQLException {
        PreparedStatement preparedStatement = connection.prepareStatement(sql);
        preparedStatement.setInt(1, productId);
        preparedStatement.setInt(2, userId);
        return preparedStatement;
      }
    }, new FavoriteRowMapper());

    return favorites.isEmpty() ? Optional.empty() : Optional.of(favorites.get(0));
  }
  
  private static class FavoriteRowMapper implements RowMapper<Favorite> {
    @Override
    public Favorite mapRow(ResultSet rs, int rowNum) throws SQLException {
        Favorite favorite = new Favorite();
        favorite.setId(rs.getInt("id"));
        favorite.setProductId(rs.getInt("product_id"));
        favorite.setUserId(rs.getInt("user_id"));

        return favorite;
    }
  }

  private static class ProductRowMapper implements RowMapper<Product> {
    @Override
    public Product mapRow(ResultSet rs, int rowNum) throws SQLException {
        Product product = new Product();
        product.setName(rs.getString("name"));
        product.setDescription(rs.getString("description"));
        product.setPrice(rs.getBigDecimal("price"));
        product.setId(rs.getInt("id"));

        return product;
    }
  }
}
