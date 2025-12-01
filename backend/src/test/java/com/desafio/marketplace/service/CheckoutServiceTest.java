package com.desafio.marketplace.service;

import com.desafio.marketplace.dto.CartItemDTO;
import com.desafio.marketplace.model.Order;
import com.desafio.marketplace.model.Product;
import com.desafio.marketplace.repository.OrderRepository;
import com.desafio.marketplace.repository.ProductRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class CheckoutServiceTest {

    @Mock
    private ProductRepository productRepository;

    @Mock
    private OrderRepository orderRepository;

    @InjectMocks
    private CheckoutService checkoutService;

    @Test
    void shouldCreateOrder_WhenStockIsSufficient() {
        Product product = new Product(1L, "Mouse", new BigDecimal("100.00"), 10);
        
        CartItemDTO itemDTO = new CartItemDTO();
        itemDTO.setProductId(1L);
        itemDTO.setQuantity(2);

        when(productRepository.findById(1L)).thenReturn(Optional.of(product));
        when(orderRepository.save(any(Order.class))).thenAnswer(i -> i.getArguments()[0]);

        Order createdOrder = checkoutService.checkout(List.of(itemDTO));

        assertNotNull(createdOrder);
        assertEquals(new BigDecimal("200.00"), createdOrder.getTotal());
        assertEquals(8, product.getStock());
    }

    @Test
    void shouldThrowException_WhenStockIsInsufficient() {
        Product product = new Product(1L, "Teclado", new BigDecimal("50.00"), 1);
        
        CartItemDTO itemDTO = new CartItemDTO();
        itemDTO.setProductId(1L);
        itemDTO.setQuantity(5);

        when(productRepository.findById(1L)).thenReturn(Optional.of(product));

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            checkoutService.checkout(List.of(itemDTO));
        });

        assertTrue(exception.getMessage().contains("Estoque insuficiente para o produto"));
    }
}