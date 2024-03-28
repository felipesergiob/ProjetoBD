package br.cesar.trabalho.bd.entities;

import lombok.Data;

@Data
public class User {
  private String name;
  private String password;
  private String email;
  private Integer id;
}
