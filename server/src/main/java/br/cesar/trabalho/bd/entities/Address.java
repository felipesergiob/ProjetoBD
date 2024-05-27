package br.cesar.trabalho.bd.entities;

import lombok.Data;

@Data
public class Address {
  private Integer id;
  private Integer number;
  private String street;
  private String neighbourhood;
  private String city;
  private String state;
  private String cep;
  private Integer userId;
}
