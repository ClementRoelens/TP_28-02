package net.example.market_user.repository;

import net.example.market_user.entity.User;
import org.springframework.data.r2dbc.repository.Modifying;
import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.r2dbc.repository.R2dbcRepository;
import reactor.core.publisher.Mono;

public interface UserRepository extends R2dbcRepository<User,Integer> {

    public Mono<User> findById(String id);
    @Modifying
    @Query("UPDATE User SET email = :email, password = :password WHERE id = :id")
    Mono<Void> updateByUser(String id, String email, String password);


    @Query("DELETE FROM User WHERE id = :id")
    public Mono<Void> deleteById(String id);


}
