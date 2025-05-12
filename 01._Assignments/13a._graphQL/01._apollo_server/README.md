go to / graphql to get apollo query playground


sample queries:


1. get all books 

```
query GetAllBooks {
  books {
    id
    title
    releaseYear
    author {
      id
      name
    }
  }
}
```

2. Get a Book by ID

```
query GetBookById {
  book(id: "1") {
    id
    title
    releaseYear
    author {
      id
      name
    }
  }
}
```


note: subscription yet not implemented