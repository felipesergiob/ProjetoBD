package br.cesar.trabalho.bd.repositories;

import org.json.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementCreator;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import br.cesar.trabalho.bd.dtos.OrderItemDTO;
import br.cesar.trabalho.bd.entities.Order;
import br.cesar.trabalho.bd.entities.OrderItem;

@Repository
public class OrderItemRepository {

  @Autowired
  private JdbcTemplate jdbcTemplate;

  public List<Order> findManyByUserId(Integer userId) {
    String sql = """
      SELECT 
        oi.order_id as id,
        o.total,
        o.created_at,
        JSON_ARRAYAGG(
          JSON_OBJECT(
            'id', oi.id,
            'product_id', oi.product_id,
            'quantity', oi.quantity
          )
        ) AS items
      FROM 
        orders_items oi
      JOIN 
        orders o ON oi.order_id = o.id
      WHERE 
        oi.user_id = ?
      GROUP BY 
        oi.order_id, o.total
      ORDER BY 
        oi.order_id;    
    """;

    List<Order> orders = jdbcTemplate.query(new PreparedStatementCreator() {
      @Override
      public PreparedStatement createPreparedStatement(Connection connection) throws SQLException {
        PreparedStatement preparedStatement = connection.prepareStatement(sql);
        preparedStatement.setInt(1, userId);
        return preparedStatement;
      }
    }, new OrderMapper());

    return orders;
  }

  public void create(Integer orderId, OrderItemDTO orderItemDTO) {
    String sql = "INSERT INTO orders_items (order_id, product_id, user_id, quantity) VALUES (?, ?, ?, ?)";
    jdbcTemplate.update(sql, orderId, orderItemDTO.getProductId(), orderItemDTO.getUserId(), orderItemDTO.getQuantity());
  }

  public void delete(Integer id) {
    String sql = "DELETE FROM users WHERE id = ?";

    jdbcTemplate.update(sql, id);
  }

  private static class OrderMapper implements RowMapper<Order> {
    @Override
    public Order mapRow(ResultSet rs, int rowNum) throws SQLException {
      Order order = new Order();

      order.setTotal(rs.getBigDecimal("total"));
      order.setUserId(null);
      order.setId(rs.getInt("id"));
      order.setCreatedAt(rs.getTimestamp("created_at"));

      JSONArray jsonArray = new JSONArray(rs.getString("items"));

      List<OrderItem> orderItems = new ArrayList<OrderItem>();

      for (int i = 0; i < jsonArray.length(); i++) {
        Integer productId = (Integer)jsonArray.getJSONObject(i).get("product_id");
        Integer quantity = (Integer)jsonArray.getJSONObject(i).get("quantity");
        Integer id = (Integer)jsonArray.getJSONObject(i).get("id");

        OrderItem orderItem = new OrderItem();
        orderItem.setId(id);
        orderItem.setOrderId(order.getId());
        orderItem.setProductId(productId);
        orderItem.setQuantity(quantity);
        
        orderItems.add(orderItem);
      }   

      order.setOrdersItems(orderItems);

      return order;
    }
  }
}