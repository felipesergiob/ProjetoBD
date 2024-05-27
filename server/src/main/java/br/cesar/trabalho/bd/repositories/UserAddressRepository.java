package br.cesar.trabalho.bd.repositories;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementCreator;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import br.cesar.trabalho.bd.dtos.CreateAddressDTO;
import br.cesar.trabalho.bd.entities.Address;

@Repository
public class UserAddressRepository {
  
  @Autowired
  private JdbcTemplate jdbcTemplate;

  public Optional<Address> findByUserId(Integer userId) {
    String sql = "SELECT * FROM users_address WHERE user_id = ?";

    List<Address> addresses = jdbcTemplate.query(new PreparedStatementCreator() {
      @Override
      public PreparedStatement createPreparedStatement(Connection connection) throws SQLException {
        PreparedStatement preparedStatement = connection.prepareStatement(sql);
        preparedStatement.setInt(1, userId);
        return preparedStatement;
      }
    }, new UserAddressMapper());

    return addresses.isEmpty() ? Optional.empty() : Optional.of(addresses.get(0));
  }
  
  private static class UserAddressMapper implements RowMapper<Address> {
    @Override
    public Address mapRow(ResultSet rs, int rowNum) throws SQLException {
        Address address = new Address();
        address.setId(rs.getInt("id"));
        address.setCep(rs.getString("cep"));
        address.setCity(rs.getString("city"));
        address.setNeighbourhood(rs.getString("neighbourhood"));
        address.setNumber(rs.getInt("number"));
        address.setStreet(rs.getString("street"));
        address.setUserId(rs.getInt("user_id"));
        address.setState(rs.getString("state"));
        return address;
    }
  }

  public void create(CreateAddressDTO address) {
    String sql = "INSERT INTO users_address (street, neighbourhood, number, city, state, cep, user_id) VALUES (?, ?, ?, ?, ?, ?, ?)";
    jdbcTemplate.update(sql, address.getStreet(), address.getNeighbourhood(), address.getNumber(), address.getCity(), address.getState(), address.getCep(), address.getUserId());
  }
}
