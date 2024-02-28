package net.example.market_user.entity;

import lombok.*;


@Data
@Builder
public class User {
    String id;
    String email;
    String password;
}
