package net.example.exchange.entity;

import lombok.*;
import java.time.LocalDateTime;


@Data
@Builder
public class Exchange {
    String id;
    double rate;
    LocalDateTime exchange_datetime;
}
