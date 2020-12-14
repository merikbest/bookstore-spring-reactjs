package com.gmail.merikbest2015.bookstore.controller;

import com.gmail.merikbest2015.bookstore.domain.Book;
import com.gmail.merikbest2015.bookstore.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Arrays;
import java.util.Set;
import java.util.TreeSet;

@RestController
@RequestMapping("/books")
@CrossOrigin(origins = "http://localhost:3000")
public class BookRestController {

    private final BookService bookService;

    @Autowired
    public BookRestController(BookService bookService) {
        this.bookService = bookService;
    }

    @GetMapping
    public ResponseEntity<Page<Book>> findAllBooks(Integer page, Integer size, String sortBy, String sortDir) {
        return new ResponseEntity<>(bookService.findAll(
                PageRequest.of(
                        page, size,
                        sortDir.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending()
                )), HttpStatus.OK);
    }

    @GetMapping("/search/{searchText}")
    public ResponseEntity<Page<Book>> searchBooks(Pageable pageable, @PathVariable String searchText) {
        return new ResponseEntity<>(bookService.findAllBooks(pageable, searchText), HttpStatus.OK);
    }

    @GetMapping("{id}")
    public ResponseEntity<Book> getBook(@PathVariable Long id) {
        if (id == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        Book book = bookService.findById(id);

        if (book == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(book, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Book> saveBook(@RequestBody @Valid Book book) {
        if (book == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(bookService.saveOrUpdate(book), HttpStatus.CREATED);
    }

    @PutMapping
    public ResponseEntity<Book> updateBook(@RequestBody @Valid Book book) {
        if (book == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(bookService.saveOrUpdate(book), HttpStatus.OK);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Book> deleteBook(@PathVariable Long id) {
        Book book = bookService.findById(id);

        if (book == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        bookService.deleteById(id);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/languages")
    public ResponseEntity<Set<String>> getAllLanguages() {
        Set<String> languages = new TreeSet<>(
                Arrays.asList("French", "Portuguese", "English", "Russian", "Hindi", "Arabic", "Spanish", "Chinese"));

        return new ResponseEntity<>(languages, HttpStatus.OK);
    }

    @GetMapping("/genres")
    public ResponseEntity<Set<String>> getAllGenres() {
        TreeSet<String> genres = new TreeSet<>(
                Arrays.asList("Technology", "Science", "History", "Fantasy", "Biography", "Horror", "Romance"));

        return new ResponseEntity<>(genres, HttpStatus.OK);
    }
}
