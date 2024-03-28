package br.cesar.trabalho.bd.dtos;

import lombok.Data;

@Data
public class CreateUserDTO {
  private String name;
  private String password;
  private String email;
}
