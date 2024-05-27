package br.cesar.trabalho.bd.controllers;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.cesar.trabalho.bd.entities.Address;
import br.cesar.trabalho.bd.repositories.UserAddressRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("address")
public class AddressController {

  @Autowired
  private UserAddressRepository userAddressRepository;

  @GetMapping("/{userId}")
  public Optional<Address> findAddressByUserId(@PathVariable Integer userId) {
    return userAddressRepository.findByUserId(userId);
  }
}
