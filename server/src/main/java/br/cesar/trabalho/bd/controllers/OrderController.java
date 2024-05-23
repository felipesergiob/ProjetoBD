package br.cesar.trabalho.bd.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.cesar.trabalho.bd.dtos.CreateOrderDTO;
import br.cesar.trabalho.bd.dtos.OrderItemDTO;
import br.cesar.trabalho.bd.entities.Order;
import br.cesar.trabalho.bd.entities.Product;
import br.cesar.trabalho.bd.repositories.OrderItemRepository;
import br.cesar.trabalho.bd.repositories.OrderRepository;
import br.cesar.trabalho.bd.repositories.ProductRepository;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("orders")
public class OrderController {

  @Autowired
  private OrderRepository orderRepository;

  @Autowired
  private ProductRepository productRepository;

  @Autowired
  private OrderItemRepository orderItemRepository;

  @GetMapping()
  public List<Order> findAll() {
      return orderRepository.findAll();
  }

  @GetMapping("/{userId}")
  public List<Order> findByUserId(@PathVariable Integer userId) {
    List<Order>  orders = orderRepository.findAll();

    List<Order> filteredOrders = orders.stream()
      .filter(p -> p.getUserId() == userId).collect(Collectors.toList());

    return filteredOrders;
  }
  
  @PostMapping()
  public ResponseEntity<Object> create(@RequestBody CreateOrderDTO body) {
    BigDecimal total = new BigDecimal("0");

    for (OrderItemDTO orderItemDTO : body.getOrderItems()) {
      Product product = productRepository.findProductById(orderItemDTO.getProductId()).orElseThrow();

      total = total.add(product.getPrice().multiply(new BigDecimal(orderItemDTO.getQuantity())));
    }

    Integer orderId = orderRepository.create(body.getUserId(), total);

    for (OrderItemDTO orderItemDTO : body.getOrderItems()) {
      orderItemRepository.create(orderId, orderItemDTO);
    }

    return ResponseEntity.status(200).build();
  }  
}
