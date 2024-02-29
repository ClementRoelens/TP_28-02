package net.example.currency.controller;

import net.example.currency.entity.Currency;
import net.example.currency.repository.CurrencyRepository;
import net.example.currency.repository.UserCurrencyRepository;
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
    public void PutOne(@PathVariable("id") String id, @RequestBody Currency currency) {
        try {
            currencyRepository.updateByCurrency(id, currency.getName()).subscribe();
        } catch (Exception exception) {
            System.out.println("Cet id n'existe pas.");
            exception.fillInStackTrace();
        }
    }


    @DeleteMapping("{id}")
    public boolean DeleteOne(@PathVariable("id") String id) {
        boolean test = false;
        try {
            currencyRepository.deleteById(id).subscribe();
            test = true;
        } catch (Exception exception) {
            System.out.println("Cet id n'existe pas.");
            exception.fillInStackTrace();
        }
        return test;
    }
}
