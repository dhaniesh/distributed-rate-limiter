# Distributed Rate Limiter

This project implements various distributed rate limiting algorithms.

## Rate Limiting Methods

### Fixed Window Counter
This method counts requests within a fixed time window. If the request count exceeds a threshold within that window, further requests are blocked until the next window begins. It's simple but can suffer from a "burst" problem at the edge of a window.

### Leaky Bucket
The Leaky Bucket algorithm processes requests at a constant rate. Requests are added to a queue (the "bucket") and are processed at a steady outflow rate. If the bucket overflows (i.e., too many requests arrive too quickly), new requests are dropped. This smooths out bursts of traffic.

### Token Bucket
Similar to Leaky Bucket, the Token Bucket algorithm allows a burst of requests up to the capacity of the bucket. Tokens are added to the bucket at a fixed rate, and each request consumes a token. If no tokens are available, the request is typically dropped or queued. It's effective for controlling both overall rate and burstiness.