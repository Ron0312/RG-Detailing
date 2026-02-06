## 2024-05-22 - Rate Limit Memory Exhaustion
**Vulnerability:** In-memory rate limiting map lacked a maximum size cap, allowing attackers to cause OOM crashes by flooding with unique identifiers.
**Learning:** Simple Map-based caches in long-running processes are DoS vectors if unbounded.
**Prevention:** Always enforce a `MAX_SIZE` on in-memory caches and use eviction policies (FIFO/LRU).
