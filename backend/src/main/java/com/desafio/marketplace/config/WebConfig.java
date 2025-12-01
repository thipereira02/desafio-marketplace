package com.desafio.marketplace.config;

import org.springframework.beans.factory.annotation.Value; // Importante para injetar
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    // Injeta o valor da propriedade 'cors.allowed-origin'
    @Value("${cors.allowed-origin}") 
    private String allowedOrigin;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // Usa a string injetada, permitindo que o valor seja dinâmico (Render ou Codespaces)
        registry.addMapping("/**")
                .allowedOrigins(allowedOrigin)
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS");
    }
}