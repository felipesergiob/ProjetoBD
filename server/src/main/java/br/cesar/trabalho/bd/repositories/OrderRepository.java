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
        orders.id,
        orders.total,
        orders.user_id,
        orders.created_at,
        JSON_ARRAYAGG(
            JSON_OBJECT(
                'id', orders_items.id,
                'product_id', orders_items.product_id,
                'quantity', orders_items.quantity
            )
          ) AS order_items
      FROM 
          orders
      INNER JOIN 
          orders_items ON orders_items.order_id = orders.id
      GROUP BY 
          orders.id;
    """;

    return jdbcTemplate.query(sql, (rs, rowNum) -> {
        Order order = new Order();
        order.setTotal(rs.getBigDecimal("total"));
        order.setUserId(rs.getInt("user_id"));
        order.setId(rs.getInt("id"));
        order.setCreated_at(rs.getTimestamp("created_at"));

        JSONArray jsonArray = new JSONArray(rs.getString("order_items"));

        List<OrderItem> orderItems = new ArrayList<OrderItem>();

        for (int i=0; i<jsonArray.length(); i++) {
            System.out.println();
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
    });
  }

  public Integer create(Integer userId, BigDecimal total) {
    String sql = "INSERT INTO orders (total, user_id) VALUES (?, ?)";

    GeneratedKeyHolder holder = new GeneratedKeyHolder();
    jdbcTemplate.update(new PreparedStatementCreator() {
        @Override
        public PreparedStatement createPreparedStatement(Connection con) throws SQLException {
            PreparedStatement statement = con.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            statement.setBigDecimal(1, total);
            statement.setInt(2, userId);
            return statement;
        }
    }, holder);
    
    Integer primaryKey = holder.getKey().intValue();
    
    return primaryKey;
  }
}