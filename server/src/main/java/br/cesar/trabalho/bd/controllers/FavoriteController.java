package br.cesar.trabalho.bd.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.cesar.trabalho.bd.dtos.FavoriteProductDTO;
import br.cesar.trabalho.bd.entities.Favorite;
import br.cesar.trabalho.bd.entities.Product;
import br.cesar.trabalho.bd.repositories.FavoriteRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("favorites")
public class FavoriteController {
  
  @Autowired
  private FavoriteRepository favoriteRepository;

  @GetMapping("/{id}")
  public List<Product> findManyByUserId(@PathVariable Integer id) {
      return favoriteRepository.findManyByUserId(id);
  }

  @PostMapping()
  public ResponseEntity<Object> create(@RequestBody FavoriteProductDTO body) {
    Optional<Favorite> favorite = favoriteRepository.findByUserIdAndProductId(body.getProductId(), body.getUserId());

    // se existir favorito, deleta, se não existir cria um
    if (favorite.isPresent()) {
      favoriteRepository.delete(favorite.get().getId());
      return ResponseEntity.ok().build();
    } else {
      favoriteRepository.create(body.getProductId(), body.getUserId());
      return ResponseEntity.ok().build();
    }
  }
}
