package net.example.market_user.repository;

import net.example.market_user.entity.User;
import org.springframework.data.r2dbc.repository.R2dbcRepository;

public interface CurrencyRepository extends R2dbcRepository<User,Integer> {
}
