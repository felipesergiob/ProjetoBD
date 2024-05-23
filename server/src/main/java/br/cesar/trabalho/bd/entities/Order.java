package br.cesar.trabalho.bd.entities;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.List;

import lombok.Data;

@Data
public class Order {
  private Integer id;
  private Integer userId;
  private BigDecimal total;
  private Timestamp created_at;

  List<OrderItem> ordersItems;
}
