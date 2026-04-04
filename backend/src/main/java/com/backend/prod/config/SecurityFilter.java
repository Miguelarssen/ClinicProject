package com.backend.prod.config;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.backend.prod.repository.FuncionarioRepository;
import com.backend.prod.repository.UsuarioRepository;
import com.backend.prod.service.TokenService;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import java.util.Collections;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class SecurityFilter extends OncePerRequestFilter {

    @Autowired
    private TokenService tokenService;

    @Autowired
    private FuncionarioRepository funcionarioRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        var tokenJWT = recuperarToken(request);

        if (tokenJWT != null) {
            var subject = tokenService.getSubject(tokenJWT);

            if (subject != null) {
                var funcionario = funcionarioRepository.findByEmail(subject);
                if (funcionario != null) {
                    var usuario = usuarioRepository.findByFuncionario(funcionario);
                    if (usuario != null) {
                        var authorities = Collections
                                .singletonList(new SimpleGrantedAuthority("ROLE_" + usuario.getRole().name()));
                        var authentication = new UsernamePasswordAuthenticationToken(usuario, null, authorities);
                        SecurityContextHolder.getContext().setAuthentication(authentication);
                    }
                }
            }
        }

        filterChain.doFilter(request, response);
    }

    private String recuperarToken(HttpServletRequest request) {
        var authorizationHeader = request.getHeader("Authorization");
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            return authorizationHeader.replace("Bearer ", "");
        }
        return null;
    }
}
