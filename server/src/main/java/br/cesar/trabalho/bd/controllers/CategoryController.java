package br.cesar.trabalho.bd.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.cesar.trabalho.bd.entities.Category;
import br.cesar.trabalho.bd.repositories.CategoryRepository;

@RestController
@RequestMapping("categories")
public class CategoryController {
  
  @Autowired
  private CategoryRepository categoryRepository;

  @GetMapping()
  public List<Category> findAll() {
    return categoryRepository.findAllCategories();
  }
}
