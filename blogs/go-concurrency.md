# Go Concurrency Patterns

*Published on Nov 02, 2023*

Go's concurrency model based on goroutines and channels is one of its strongest features.

## Goroutines

A goroutine is a lightweight thread managed by the Go runtime.

```go
go func() {
    fmt.Println("Hello from a goroutine")
}()
```

## Channels

Channels are the pipes that connect concurrent goroutines. You can send values into channels from one goroutine and receive those values into another goroutine.

```go
messages := make(chan string)
go func() { messages <- "ping" }()
msg := <-messages
fmt.Println(msg)
```
