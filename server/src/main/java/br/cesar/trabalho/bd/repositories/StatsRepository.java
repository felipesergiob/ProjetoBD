package br.cesar.trabalho.bd.repositories;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import br.cesar.trabalho.bd.dtos.MainStatsDTO;
import br.cesar.trabalho.bd.dtos.MonthlyStatsDTO;

@Repository
public class StatsRepository {
  @Autowired
  private JdbcTemplate jdbcTemplate;

  public List<MainStatsDTO> findMainStats() {
    String sql = """
      SELECT
        sum(total) as lucro,
        count(id) as total_pedidos,
        (select count(products.id) from products) as total_produtos
      from orders;
    """;

    return jdbcTemplate.query(sql, (rs, rowNum) -> {
      MainStatsDTO mainStatsDTO = new MainStatsDTO();

      mainStatsDTO.setLucro(rs.getInt("lucro"));
      mainStatsDTO.setTotalPedidos(rs.getInt("total_pedidos"));
      mainStatsDTO.setTotalProdutos(rs.getInt("total_produtos"));

      return mainStatsDTO;
    });
  }

  public List<MonthlyStatsDTO> findMonthlyStats() {
    String sql = """
      SELECT
        DATE_FORMAT(created_at, '%Y-%m') AS month,
        SUM(total) AS total
      FROM
          orders
      GROUP BY
          DATE_FORMAT(created_at, '%Y-%m')
      ORDER BY
          month;
    """;    

    return jdbcTemplate.query(sql, (rs, rowNum) -> {
      MonthlyStatsDTO monthlyStatsDTO = new MonthlyStatsDTO();

      monthlyStatsDTO.setMonth(rs.getString("month"));
      monthlyStatsDTO.setTotal(rs.getInt("total"));

      return monthlyStatsDTO;
    });
  }
}
