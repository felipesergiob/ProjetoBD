package br.cesar.trabalho.bd.entities;

import lombok.Data;

@Data
public class Favorite {
  private Integer id;
  private Integer productId;
  private Integer userId;
}
