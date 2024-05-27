package br.cesar.trabalho.bd.dtos;

import lombok.Data;

@Data
public class CreateAddressDTO {
  private Integer number;
  private String street;
  private String neighbourhood;
  private String city;
  private String state;
  private String cep;
  private Integer userId;
}
