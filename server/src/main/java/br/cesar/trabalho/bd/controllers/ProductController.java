package br.cesar.trabalho.bd.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import br.cesar.trabalho.bd.dtos.CreateProductDTO;
import br.cesar.trabalho.bd.entities.Product;
import br.cesar.trabalho.bd.repositories.ProductRepository;

@RestController
@RequestMapping("products")
public class ProductController {
  
  @Autowired
  private ProductRepository productRepository;

  @GetMapping()
  public List<Product> findAll(@RequestParam("categoryId") Optional<Integer> categoryId) {
    if (categoryId.isEmpty()) {
      return productRepository.findAllProducts();
    } else {
      return productRepository.findAllByCategoryId(categoryId.get());
    }
  }

  @GetMapping("/{id}")
  public ResponseEntity<Object> findById(@PathVariable Integer id) {
    Optional<Product> product = productRepository.findProductById(id);

    if (product.isEmpty()) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    return ResponseEntity.status(200).body(product);
  }

  @PostMapping()
  public ResponseEntity<Object> create(@RequestBody CreateProductDTO productDTO) {
    Integer productId = productRepository.create(productDTO);

    for (String url : productDTO.getImages()) {
      productRepository.createImage(url, productId);
    }

    return ResponseEntity.status(201).build();
  }

  @PutMapping("/{id}")
  public ResponseEntity<Object> update(@RequestBody CreateProductDTO productDTO, @PathVariable Integer id) {
    productRepository.update(productDTO, id);

    return ResponseEntity.status(204).build();
  }
}
