package com.example.assemble.service;

import com.example.assemble.dto.CurrencyDTO;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
public class CurrencyService {


    private final WebClient webClient;

    public CurrencyService() {
        this.webClient = WebClient.builder().baseUrl("http://localhost:2103").build();
    }

    public Mono<CurrencyDTO[]> get(String id) {
        return webClient.get().uri("api/currency/" + id).retrieve().bodyToMono(CurrencyDTO[].class);
    }
}
