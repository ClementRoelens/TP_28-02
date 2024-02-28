package net.example.currency.entity;

import lombok.*;

import java.util.UUID;


@Data
@Builder
public class Currency {
    String id;
    String name;
}
