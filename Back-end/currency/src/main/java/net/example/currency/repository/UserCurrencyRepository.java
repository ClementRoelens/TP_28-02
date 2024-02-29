package net.example.currency.repository;

import net.example.currency.entity.UserCurrency;
import org.springframework.data.r2dbc.repository.*;
import reactor.core.publisher.*;

public interface UserCurrencyRepository extends R2dbcRepository<UserCurrency,Integer> {
    public Mono<UserCurrency> findById(String id);
@Modifying
@Query("UPDATE usercurrency SET amount = :amount WHERE id = :id")
Mono<Void> updateByCurrency(String id, String name);

@Query("DELETE FROM usercurrency WHERE id = :id")
public Mono<Void> deleteById(String id);

}
