package net.example.currency.controller;

import net.example.currency.entity.Currency;
import net.example.currency.repository.CurrencyRepository;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/currency")
public class CurrencyController {

    private final CurrencyRepository currencyRepository;

    public CurrencyController(CurrencyRepository currencyRepository) {
        this.currencyRepository = currencyRepository;
    }
    @GetMapping("list")
    public Flux<Currency> getAll() {
        return currencyRepository.findAll();
    }

    @GetMapping("{id}")
    public Mono<Currency> getOne(@PathVariable("id") String id) {
        return currencyRepository.findById(id);
    }


    @PostMapping
    public Mono<Currency> PostOne(@RequestBody Currency currency) {
        currency.setId(UUID.randomUUID().toString());
        return currencyRepository.save(currency);
    }

    @PutMapping("{id}")
    public boolean DeleteOne(@PathVariable("id") String id, @RequestBody Currency currency) {
        Boolean test = false;
        try {
            currency.setId(id);
            currencyRepository.save(currency);
            test = true;
        } catch (Exception exception) {
            System.out.println("Cet id n'existe pas.");
            exception.fillInStackTrace();
        }
        return test;
    }

    @DeleteMapping("{id}")
    public boolean DeleteOne(@PathVariable("id") String id) {
        Boolean test = false;
        try {
            currencyRepository.deleteById(id);
            test = true;
        } catch (Exception exception) {
            System.out.println("Cet id n'existe pas.");
            exception.fillInStackTrace();
        }
        return test;
    }
}
