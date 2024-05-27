package br.cesar.trabalho.bd.controllers;

import org.springframework.web.bind.annotation.RestController;

import br.cesar.trabalho.bd.dtos.MainStatsDTO;
import br.cesar.trabalho.bd.dtos.MonthlyStatsDTO;
import br.cesar.trabalho.bd.repositories.StatsRepository;

import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("stats")
public class StatsController {
  @Autowired
  private StatsRepository statsRepository;
  
  @GetMapping("/main")
  public MainStatsDTO findMainStats() {
    return statsRepository.findMainStats().get(0);
  }
  
  @GetMapping("/monthly")
  public List<MonthlyStatsDTO> findMonthlyStats() {
    return statsRepository.findMonthlyStats();
  }
}
