package br.cesar.trabalho.bd.repositories;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

import br.cesar.trabalho.bd.entities.Category;

@Repository
public class CategoryRepository {

  @Autowired
  private JdbcTemplate jdbcTemplate;

  public List<Category> findAllCategories() {
    String sql = "SELECT * FROM categories";

    return jdbcTemplate.query(sql, (rs, rowNum) -> {
      Category category = new Category();
      category.setName(rs.getString("name"));
      category.setId(rs.getInt("id"));
      category.setDescription(rs.getString("description"));

      return category;
    });
  }
}