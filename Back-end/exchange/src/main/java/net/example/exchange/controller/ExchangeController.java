package net.example.exchange.controller;

import net.example.exchange.entity.Exchange;
import net.example.exchange.repository.ExchangeRepository;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.*;

import java.time.LocalDateTime;
import java.util.UUID;

@RestController
@RequestMapping("/api/exchange")
public class ExchangeController {

    private final ExchangeRepository exchangeRepository;

    public ExchangeController(ExchangeRepository exchangeRepository) {
        this.exchangeRepository = exchangeRepository;
    }

    @GetMapping("list")
    public Flux<Exchange> getAll() {
        return exchangeRepository.findAll();
    }

    @GetMapping("{id}")
    public Mono<Exchange> getOne(@PathVariable("id") String id) {
        return exchangeRepository.findById(id);
    }


    @PostMapping
    public Mono<Exchange> PostOne(@RequestBody Exchange exchange) {
        exchange.setId(UUID.randomUUID().toString());
exchange.setExchange_datetime(LocalDateTime.now());
        return exchangeRepository.save(exchange);
    }

    @PutMapping("{id}")
    public void PutOne(@PathVariable("id") String id, @RequestBody Exchange exchange) {
        try {
            exchange.setExchange_datetime(LocalDateTime.now());
            exchangeRepository.updateByExchange(id, exchange.getRate(),exchange.getExchange_datetime()).subscribe();
        } catch (Exception exception) {
            System.out.println("Cet id n'existe pas.");
            exception.fillInStackTrace();
        }
    }


    @DeleteMapping("{id}")
    public boolean DeleteOne(@PathVariable("id") String id) {
        boolean test = false;
        try {
            exchangeRepository.deleteById(id).subscribe();
            test = true;
        } catch (Exception exception) {
            System.out.println("Cet id n'existe pas.");
            exception.fillInStackTrace();
        }
        return test;
    }
}
