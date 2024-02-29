package net.example.currency.repository;

import net.example.currency.entity.Currency;
import org.springframework.data.r2dbc.repository.*;
import reactor.core.publisher.*;

public interface CurrencyRepository extends R2dbcRepository<Currency,Integer> {
public Mono<Currency> findById(String id);
@Modifying
@Query("UPDATE currency SET name = :name WHERE id = :id")
Mono<Void> updateByCurrency(String id, String name);

@Query("DELETE FROM currency WHERE id = :id")
public Mono<Void> deleteById(String id);


}
