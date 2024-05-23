package br.cesar.trabalho.bd.repositories;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementCreator;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

import br.cesar.trabalho.bd.dtos.CreateUserDTO;
import br.cesar.trabalho.bd.entities.User;

@Repository
public class UserRepository {

  @Autowired
  private JdbcTemplate jdbcTemplate;

  public List<User> findAllUsers() {
    String sql = "SELECT * FROM users;";

    return jdbcTemplate.query(sql, (rs, rowNum) -> {
      User user = new User();
      user.setName(rs.getString("name"));
      user.setPassword(rs.getString("password"));
      user.setEmail(rs.getString("email"));
      user.setId(rs.getInt("id"));

      return user;
    });
  }

  public Optional<User> findUserById(Integer userId) {
    String sql = "SELECT * FROM users WHERE id = ?";

    List<User> users = jdbcTemplate.query(new PreparedStatementCreator() {
      @Override
      public PreparedStatement createPreparedStatement(Connection connection) throws SQLException {
        PreparedStatement preparedStatement = connection.prepareStatement(sql);
        preparedStatement.setInt(1, userId);
        return preparedStatement;
      }
    }, new UserRowMapper());

    return users.isEmpty() ? Optional.empty() : Optional.of(users.get(0));
  }

  public Optional<User> findByEmail(String email) {
    String sql = "SELECT * FROM users WHERE email = ?";

    List<User> users = jdbcTemplate.query(new PreparedStatementCreator() {
      @Override
      public PreparedStatement createPreparedStatement(Connection connection) throws SQLException {
        PreparedStatement preparedStatement = connection.prepareStatement(sql);
        preparedStatement.setString(1, email);
        return preparedStatement;
      }
    }, new UserRowMapper());

    return users.isEmpty() ? Optional.empty() : Optional.of(users.get(0));
  }
  
  private static class UserRowMapper implements RowMapper<User> {
    @Override
    public User mapRow(ResultSet rs, int rowNum) throws SQLException {
        User user = new User();
        user.setId(rs.getInt("id"));
        user.setName(rs.getString("name"));
        user.setEmail(rs.getString("email"));
        user.setPassword(rs.getString("password"));
        return user;
    }
  }

  public void create(CreateUserDTO userDto) {
    String sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
    jdbcTemplate.update(sql, userDto.getName(), userDto.getEmail(), userDto.getPassword());
  }

  public void delete(Integer id) {
    String sql = "DELETE FROM users WHERE id = ?";

    jdbcTemplate.update(sql, id);
  }
}