package br.cesar.trabalho.bd.dtos;

import java.math.BigDecimal;
import java.util.List;

import lombok.Data;

@Data
public class CreateProductDTO {
  private String name;
  private String description;
  private BigDecimal price;
  private Integer categoryId;
  private List<String> images;
}
