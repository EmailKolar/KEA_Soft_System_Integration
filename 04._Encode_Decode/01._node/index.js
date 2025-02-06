const message = "hello world";

const encoded = btoa(message);

console.log(encoded)

const decoded = atob(encoded)
console.log(decoded)