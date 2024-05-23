package br.cesar.trabalho.bd.entities;

import lombok.Data;

@Data
public class OrderItem {
  private Integer id;
  private Integer productId;
  private Integer quantity;
  private Integer orderId;
}
