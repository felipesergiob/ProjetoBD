package br.cesar.trabalho.bd.repositories;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

import br.cesar.trabalho.bd.dtos.OrderItemDTO;
import br.cesar.trabalho.bd.entities.User;

@Repository
public class OrderItemRepository {

  @Autowired
  private JdbcTemplate jdbcTemplate;

  public List<User> findAllUsers() {
    String sql = "SELECT * FROM users;";

    return jdbcTemplate.query(sql, (rs, rowNum) -> {
      User user = new User();
      user.setName(rs.getString("name"));
      user.setPassword(rs.getString("password"));
      user.setEmail(rs.getString("email"));
      user.setId(rs.getInt("id"));

      return user;
    });
  }

  public void create(Integer orderId, OrderItemDTO orderItemDTO) {
    String sql = "INSERT INTO orders_items (order_id, product_id, quantity) VALUES (?, ?, ?)";
    jdbcTemplate.update(sql, orderId, orderItemDTO.getProductId(), orderItemDTO.getQuantity());
  }

  public void delete(Integer id) {
    String sql = "DELETE FROM users WHERE id = ?";

    jdbcTemplate.update(sql, id);
  }
}