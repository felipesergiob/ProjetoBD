package br.cesar.trabalho.bd.repositories;

import org.json.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementCreator;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import br.cesar.trabalho.bd.entities.Order;
import br.cesar.trabalho.bd.entities.OrderItem;

@Repository
public class OrderRepository {

  @Autowired
  private JdbcTemplate jdbcTemplate;

  public List<Order> findAll() {
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
        oi.user_id = 1
      GROUP BY 
        oi.order_id, o.total
      ORDER BY 
        oi.order_id;
    """;

    return jdbcTemplate.query(sql, (rs, rowNum) -> {
        Order order = new Order();
        order.setTotal(rs.getBigDecimal("total"));
        order.setId(rs.getInt("id"));
        order.setCreatedAt(rs.getTimestamp("created_at"));

        JSONArray jsonArray = new JSONArray(rs.getString("order_items"));

        List<OrderItem> orderItems = new ArrayList<OrderItem>();

        for (int i = 0; i < jsonArray.length(); i++) {
            Integer productId = (Integer)jsonArray.getJSONObject(i).get("product_id");
            Integer quantity = (Integer)jsonArray.getJSONObject(i).get("quantity");
            Integer userId = (Integer)jsonArray.getJSONObject(i).get("user_id");
            Integer id = (Integer)jsonArray.getJSONObject(i).get("id");

            OrderItem orderItem = new OrderItem();
            orderItem.setId(id);
            orderItem.setOrderId(order.getId());
            orderItem.setProductId(productId);
            orderItem.setQuantity(quantity);
            orderItem.setUserId(userId);
            
            orderItems.add(orderItem);
        }   

        order.setOrdersItems(orderItems);

        return order;
    });
  }

  public Integer create(Integer userId, BigDecimal total) {
    String sql = "INSERT INTO orders (total) VALUES (?)";

    GeneratedKeyHolder holder = new GeneratedKeyHolder();
    jdbcTemplate.update(new PreparedStatementCreator() {
        @Override
        public PreparedStatement createPreparedStatement(Connection con) throws SQLException {
            PreparedStatement statement = con.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            statement.setBigDecimal(1, total);
            return statement;
        }
    }, holder);
    
    Integer primaryKey = holder.getKey().intValue();
    
    return primaryKey;
  }
}