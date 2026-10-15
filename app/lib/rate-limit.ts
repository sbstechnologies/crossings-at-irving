interface RateLimitEntry {
  count: number;
  resetAt: number;
}

interface RateLimitOptions {
  limit?: number;
  windowMs?: number;
}

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  resetAt: number;
}

const requestStore = new Map<string, RateLimitEntry>();

const DEFAULT_LIMIT = 5;
const DEFAULT_WINDOW_MS = 60 * 1000;

/**
 * Check whether a client can make another request.
 *
 * @param identifier A trusted client identifier, such as an IP address.
 * @param options Optional request limit and time window.
 */
export function rateLimit(
  identifier: string,
  options: RateLimitOptions = {},
): RateLimitResult {
  const limit = options.limit ?? DEFAULT_LIMIT;
  const windowMs = options.windowMs ?? DEFAULT_WINDOW_MS;
  const now = Date.now();

  if (!identifier || limit < 1 || windowMs < 1) {
    return {
      success: false,
      limit,
      remaining: 0,
      resetAt: now + windowMs,
    };
  }

  const current = requestStore.get(identifier);

  // Start a new window when no record exists or the previous window expires.
  if (!current || now >= current.resetAt) {
    const resetAt = now + windowMs;

    requestStore.set(identifier, {
      count: 1,
      resetAt,
    });

    return {
      success: true,
      limit,
      remaining: limit - 1,
      resetAt,
    };
  }

  // Reject requests after the limit has been reached.
  if (current.count >= limit) {
    return {
      success: false,
      limit,
      remaining: 0,
      resetAt: current.resetAt,
    };
  }

  current.count += 1;
  requestStore.set(identifier, current);

  return {
    success: true,
    limit,
    remaining: limit - current.count,
    resetAt: current.resetAt,
  };
}

/**
 * Remove expired entries to reduce memory usage.
 */
export function cleanupRateLimitStore(): void {
  const now = Date.now();

  for (const [identifier, entry] of requestStore.entries()) {
    if (now >= entry.resetAt) {
      requestStore.delete(identifier);
    }
  }
}
