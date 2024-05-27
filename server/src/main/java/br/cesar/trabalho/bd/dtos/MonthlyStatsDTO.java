package br.cesar.trabalho.bd.dtos;

import lombok.Data;

@Data
public class MonthlyStatsDTO {
  private String month;
  private Integer total;
}
