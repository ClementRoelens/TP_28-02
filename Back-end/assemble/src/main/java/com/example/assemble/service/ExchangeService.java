package com.example.assemble.service;

import com.example.assemble.dto.ExchangeDTO;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
public class ExchangeService {


    private final WebClient webClient;

    public ExchangeService() {
        this.webClient = WebClient.builder().baseUrl("http://localhost:6969").build();
    }

    public Mono<ExchangeDTO[]> get(String id) {
        return webClient.get().uri("api/exchange/" + id).retrieve().bodyToMono(ExchangeDTO[].class);
    }
}
