package com.desafio.marketplace.controller;

import com.desafio.marketplace.dto.CartItemDTO;
import com.desafio.marketplace.model.Order;
import com.desafio.marketplace.service.CheckoutService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/cart")
@CrossOrigin(origins = "*")
public class CartController {

    private final CheckoutService checkoutService;

    public CartController(CheckoutService checkoutService) {
        this.checkoutService = checkoutService;
    }

    @PostMapping("/checkout")
    public ResponseEntity<?> checkout(@RequestBody List<CartItemDTO> cartItems) {
        try {
            Order order = checkoutService.checkout(cartItems);
            return ResponseEntity.ok(order);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}