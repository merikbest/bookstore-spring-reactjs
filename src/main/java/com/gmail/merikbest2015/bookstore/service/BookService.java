package com.gmail.merikbest2015.bookstore.service;

import com.gmail.merikbest2015.bookstore.domain.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface BookService {
    Page<Book> findAllBooks(Pageable pageable, String searchText);

    Page<Book> findAll(Pageable pageable);

    Book findById(Long id);

    Book saveOrUpdate(Book book);

    void deleteById(Long id);
}
