interface TurnstileVerificationOptions {
  token: string;
  remoteIp?: string;
}

interface TurnstileSiteverifyResponse {
  success?: boolean;
  hostname?: string;
  action?: string;
  "error-codes"?: string[];
}

/**
 * Verify a Turnstile token with Cloudflare.
 * This function must only be called from server-side code.
 */
export async function verifyTurnstileToken({
  token,
  remoteIp,
}: TurnstileVerificationOptions): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;

  if (!secret || !token) return false;

  try {
    const body = new URLSearchParams({
      secret,
      response: token,
    });

    if (remoteIp) body.set("remoteip", remoteIp);

    const response = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body,
        cache: "no-store",
        signal: AbortSignal.timeout(5000),
      },
    );

    if (!response.ok) return false;

    const result: TurnstileSiteverifyResponse = await response.json();
    return result.success === true;
  } catch (error) {
    console.error("Turnstile verification request failed:", error);
    return false;
  }
}
