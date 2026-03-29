package com.backend.prod.model.Usuario;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.backend.prod.model.Pessoa.Funcionario;
import com.backend.prod.model.Usuario.DTO.LoginDTO;
import com.backend.prod.model.Usuario.DTO.UsuarioCadastroDTO;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity(name = "Usuarios")
@Table(name = "usuario")
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(of = "id")

public class Usuario {

    public Usuario(UsuarioCadastroDTO dados, Funcionario funcionario) {
        this.funcionario = funcionario;
        this.senha = new BCryptPasswordEncoder().encode(dados.senhaUsuario());
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String senha;

    @OneToOne
    @JoinColumn(name = "funcionario_id")
    private Funcionario funcionario;
    private boolean userGerente;

    public boolean login(LoginDTO dados) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

        if (!encoder.matches(dados.senha(), this.senha)) {
            throw new IllegalArgumentException("Senha incorreta");
        }
        return true;
    }
}
