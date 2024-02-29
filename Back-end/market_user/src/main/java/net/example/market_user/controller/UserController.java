package net.example.market_user.controller;

import net.example.market_user.entity.User;
import net.example.market_user.repository.UserRepository;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("list")
    public Flux<User> getAll() {
        return userRepository.findAll();
    }

    @GetMapping("{id}")
    public Mono<User> getOne(@PathVariable("id") String id) {
        return userRepository.findById(id);
    }


    @PostMapping
    public Mono<User> PostOne(@RequestBody User user) {
        user.setId(UUID.randomUUID().toString());
        return userRepository.save(user);
    }

    @PutMapping("{id}")
    public void PutOne(@PathVariable("id") String id, @RequestBody User user) {
        try {
            userRepository.updateByUser(id, user.getEmail(), user.getPassword()).subscribe();
        } catch (Exception exception) {
            System.out.println("Cet id n'existe pas.");
            exception.fillInStackTrace();
        }
    }


    @DeleteMapping("{id}")
    public boolean DeleteOne(@PathVariable("id") String id) {
        boolean test = false;
        try {
            userRepository.deleteById(id).subscribe();
            test = true;
        } catch (Exception exception) {
            System.out.println("Cet id n'existe pas.");
            exception.fillInStackTrace();
        }
        return test;
    }
}
