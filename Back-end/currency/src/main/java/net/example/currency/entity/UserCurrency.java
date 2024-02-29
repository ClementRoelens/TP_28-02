package net.example.currency.entity;

import lombok.*;
import org.springframework.data.annotation.Id;

@Data
@Builder
public class UserCurrency {

    String id;
    double amount;
}
