package com.todo.domain;

import org.hibernate.annotations.GenericGenerator;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "todolists")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Todolist {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator="seq")
    @GenericGenerator(name = "seq", strategy="increment")
    private Long id;

    private String title;
    
    @ManyToOne
    @JoinColumn(name = "user_id")
    @NotNull(message="THE OWNER USER DOESN'T EXIST")
    private User user;
}
