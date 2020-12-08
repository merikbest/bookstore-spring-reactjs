package com.gmail.merikbest2015.bookstore.domain;

import com.sun.istack.NotNull;
import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
@Data
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @NotNull
    private String title;
    @NotNull
    private String author;
    @NotNull
    private String coverPhotoURL;
    @NotNull
    private Long isbnNumber;
    @NotNull
    private Double price;
    @NotNull
    private String language;
    @NotNull
    private String genre;
}
