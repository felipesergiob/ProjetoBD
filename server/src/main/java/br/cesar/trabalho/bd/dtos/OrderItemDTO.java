package br.cesar.trabalho.bd.dtos;

import lombok.Data;

@Data
public class OrderItemDTO {
  private Integer productId;
  private Integer quantity;
}
