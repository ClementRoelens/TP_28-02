package net.example.exchange.repository;

import net.example.exchange.entity.Exchange;
import org.springframework.data.r2dbc.repository.*;
import reactor.core.publisher.Mono;
import java.time.LocalDateTime;

public interface ExchangeRepository extends R2dbcRepository<Exchange,Integer> {
    public Mono<Exchange> findById(String id);
    @Modifying
    @Query("UPDATE Exchange SET rate = :rate, exchange_datetime = :exchange_datetime WHERE id = :id")
    Mono<Void> updateByExchange(String id, double rate, LocalDateTime exchange_datetime);


    @Query("DELETE FROM Exchange WHERE id = :id")
    public Mono<Void> deleteById(String id);


}