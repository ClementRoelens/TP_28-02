package net.example.market_user.entity;

import lombok.*;
import org.springframework.data.annotation.Id;


@Data
@Builder
public class User {
    String id;
    String email;
    String password;
}
