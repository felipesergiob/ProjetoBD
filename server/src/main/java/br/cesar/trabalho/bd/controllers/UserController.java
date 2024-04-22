package br.cesar.trabalho.bd.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import br.cesar.trabalho.bd.dtos.CreateUserDTO;
import br.cesar.trabalho.bd.entities.User;
import br.cesar.trabalho.bd.repositories.UserRepository;


@RestController
@RequestMapping("users")
public class UserController {

  @Autowired
  private UserRepository userRepository;

  @GetMapping()
  public List<User> findUsers() {
    return userRepository.findAllUsers();
  }

  @GetMapping("/{id}")
  public ResponseEntity<Object> findUser(@PathVariable Integer id) {
    Optional<User> user = userRepository.findUserById(id);

    if (user.isEmpty()) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    return ResponseEntity.status(200).body(user);
  }

  @PostMapping()
  public ResponseEntity<CreateUserDTO> post(@RequestBody CreateUserDTO userDto) {
    userRepository.create(userDto);

    return ResponseEntity.status(HttpStatus.CREATED).body(userDto);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Object> delete(@PathVariable Integer id) {
    userRepository.delete(id);

    return ResponseEntity.status(HttpStatus.OK).build();
  }
}