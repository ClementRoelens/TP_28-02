package net.example.exchange.service;

import net.example.exchange.entity.Exchange;
import org.springframework.stereotype.Service;
import reactor.core.publisher.*;

@Service
public class ExchangeService {

    private final Sinks.Many<Exchange> exchangeSink;

    public ExchangeService() {this.exchangeSink = Sinks.many().multicast().onBackpressureBuffer();}

    public void postExchange(Exchange exchange) {exchangeSink.tryEmitNext(exchange);}

    public Flux<Exchange> getExchange() {return exchangeSink.asFlux();}

}
