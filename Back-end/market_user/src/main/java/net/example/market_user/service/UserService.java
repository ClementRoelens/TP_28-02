package net.example.market_user.service;

import net.example.market_user.entity.User;
import org.springframework.stereotype.Service;
import reactor.core.publisher.*;

@Service
public class UserService {

    private final Sinks.Many<User> userSink;

    public UserService() {this.userSink = Sinks.many().multicast().onBackpressureBuffer();}

    public void postUser(User user) {userSink.tryEmitNext(user);}

    public Flux<User> getUser() {return userSink.asFlux();}

}
