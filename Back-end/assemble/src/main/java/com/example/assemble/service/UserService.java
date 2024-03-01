package com.example.assemble.service;

import com.example.assemble.dto.UserDTO;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
public class UserService {


    private final WebClient webClient;

    public UserService() {
        this.webClient = WebClient.builder().baseUrl("http://localhost:1234").build();
    }

    public Mono<UserDTO[]> get(String id) {
        return webClient.get().uri("api/user/" + id).retrieve().bodyToMono(UserDTO[].class);
    }
}
