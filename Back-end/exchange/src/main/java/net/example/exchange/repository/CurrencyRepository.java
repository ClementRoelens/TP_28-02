package net.example.exchange.repository;

import net.example.exchange.entity.Exchange;
import org.springframework.data.r2dbc.repository.R2dbcRepository;

public interface CurrencyRepository extends R2dbcRepository<Exchange,Integer> {
}
