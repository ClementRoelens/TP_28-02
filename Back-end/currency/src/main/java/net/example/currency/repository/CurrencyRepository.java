package net.example.currency.repository;

import net.example.currency.entity.Currency;
import org.springframework.data.r2dbc.repository.*;
import reactor.core.publisher.Mono;

import java.util.UUID;

public interface CurrencyRepository extends R2dbcRepository<Currency,Integer> {
public Mono<Currency> findById(String id);
public void deleteById(String id);
}
