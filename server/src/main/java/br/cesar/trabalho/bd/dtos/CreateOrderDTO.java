package br.cesar.trabalho.bd.dtos;

import java.util.List;

import lombok.Data;

@Data
public class CreateOrderDTO {
  private String street;
  private String number;
  private String complement;
  private String neighbourhood;
  private String cep;
  private String city;
  private String state;
  private String country;

  private Integer userId;

  private String cardName;
  private String cardNumber;
  private String expirationDate;
  private String cvc;

  private List<OrderItemDTO> orderItems;
}
