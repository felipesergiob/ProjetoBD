package br.cesar.trabalho.bd.entities;

import java.math.BigDecimal;
import java.util.List;

import lombok.Data;

@Data
public class Product {
  private Integer id;
  private String name;
  private String description;
  private BigDecimal price;
  private Integer categoryId;

  private List<String> images;
}
