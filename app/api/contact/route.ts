import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

interface ContactRequest {
  fullName?: unknown;
  email?: unknown;
  phone?: unknown;
  resident?: unknown;
  subject?: unknown;
  message?: unknown;
  turnstileToken?: unknown;
  website?: unknown;
}

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 60_000;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[0-9+\-()\s.]{8,20}$/;

const SPAM_KEYWORDS = [
  "buy backlinks",
  "backlink service",
  "guest post service",
  "seo services",
  "link building service",
  "rank your website",
  "increase domain authority",
  "cheap traffic",
];

const ALLOWED_SUBJECTS = new Set([
  "Schedule a Tour",
  "Pricing & Availability",
  "Pet Policy",
  "Maintenance Request",
  "General Inquiry",
]);

const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

function getString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, "");

  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)})-${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }

  return phone || "Not Provided";
}

function getTrustedClientIp(request: Request): string | null {
  const forwardedFor = request.headers.get("x-forwarded-for");

  if (!forwardedFor) return null;

  const ip = forwardedFor.split(",")[0]?.trim();

  return ip || null;
}

function checkRateLimit(ip: string) {
  const now = Date.now();

  for (const [key, entry] of rateLimitStore.entries()) {
    if (now >= entry.resetAt) {
      rateLimitStore.delete(key);
    }
  }

  const current = rateLimitStore.get(ip);

  if (!current || now >= current.resetAt) {
    const resetAt = now + RATE_WINDOW_MS;

    rateLimitStore.set(ip, {
      count: 1,
      resetAt,
    });

    return {
      allowed: true,
      resetAt,
    };
  }

  if (current.count >= RATE_LIMIT) {
    return {
      allowed: false,
      resetAt: current.resetAt,
    };
  }

  current.count += 1;

  return {
    allowed: true,
    resetAt: current.resetAt,
  };
}

async function verifyTurnstile(
  token: string,
  remoteIp: string,
): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;

  if (!secret || !token) return false;

  try {
    const params = new URLSearchParams({
      secret,
      response: token,
      remoteip: remoteIp,
    });

    const response = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params,
        cache: "no-store",
        signal: AbortSignal.timeout(5000),
      },
    );

    if (!response.ok) return false;

    const result: {
      success?: boolean;
      hostname?: string;
      "error-codes"?: string[];
    } = await response.json();

    if (!result.success) return false;

    return true;
  } catch (error) {
    console.error("Turnstile verification failed:", error);
    return false;
  }
}

function isSpam(data: {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}): boolean {
  const { fullName, email, phone, subject, message } = data;

  if (
    !fullName ||
    !email ||
    !message ||
    fullName.length > 100 ||
    email.length > 254 ||
    phone.length > 30 ||
    subject.length > 150 ||
    message.length > 5000
  ) {
    return true;
  }

  const combined = `${fullName} ${email} ${subject} ${message}`.toLowerCase();

  if (SPAM_KEYWORDS.some((keyword) => combined.includes(keyword))) {
    return true;
  }

  if (/(.)\1{9,}/i.test(message)) {
    return true;
  }

  const links = message.match(/https?:\/\/|www\./gi) ?? [];

  if (links.length >= 3) {
    return true;
  }

  return false;
}

export async function POST(request: Request) {
  try {
    const body: ContactRequest | null = await request.json().catch(() => null);

    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid request body.",
        },
        { status: 400 },
      );
    }

    const fullName = getString(body.fullName);
    const email = getString(body.email);
    const phone = getString(body.phone);
    const resident = getString(body.resident) || "Future Resident";
    const subject = getString(body.subject) || "General Inquiry";
    const message = getString(body.message);
    const turnstileToken = getString(body.turnstileToken);
    const website = getString(body.website);

    if (website) {
      return NextResponse.json(
        {
          success: false,
          message: "Unable to process your request.",
        },
        { status: 400 },
      );
    }

    if (!fullName || !email || !message) {
      return NextResponse.json(
        {
          success: false,
          message: "Full name, email, and message are required.",
        },
        { status: 400 },
      );
    }

    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email address.",
        },
        { status: 400 },
      );
    }

    if (phone && !PHONE_REGEX.test(phone)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid phone number.",
        },
        { status: 400 },
      );
    }

    if (resident !== "Future Resident" && resident !== "Current Resident") {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid resident type.",
        },
        { status: 400 },
      );
    }

    if (!ALLOWED_SUBJECTS.has(subject)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid subject.",
        },
        { status: 400 },
      );
    }

    const clientIp = getTrustedClientIp(request);

    if (!clientIp) {
      return NextResponse.json(
        {
          success: false,
          message: "Unable to process your request.",
        },
        { status: 400 },
      );
    }

    const limit = checkRateLimit(clientIp);

    if (!limit.allowed) {
      return NextResponse.json(
        {
          success: false,
          message: "Too many requests. Please try again later.",
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(
              Math.max(1, Math.ceil((limit.resetAt - Date.now()) / 1000)),
            ),
          },
        },
      );
    }

    const verified = await verifyTurnstile(turnstileToken, clientIp);

    if (!verified) {
      return NextResponse.json(
        {
          success: false,
          message: "Security verification failed. Please try again.",
        },
        { status: 403 },
      );
    }

    if (isSpam({ fullName, email, phone, subject, message })) {
      console.warn("Contact form submission rejected by spam filter.");

      return NextResponse.json(
        {
          success: false,
          message:
            "Unable to process your message. Please review your details.",
        },
        { status: 400 },
      );
    }

    const EMAIL_USER = process.env.EMAIL_USER;
    const EMAIL_PASS = process.env.EMAIL_PASS;

    if (!EMAIL_USER || !EMAIL_PASS) {
      console.error("Missing email environment variables.");

      return NextResponse.json(
        {
          success: false,
          message: "Email service configuration is missing.",
        },
        { status: 500 },
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });

    const toRecipients = [
      "crossingsmanager@livenjoymgt.com",
      "info@livenjoymgt.com",
    ];

    if (resident === "Future Resident") {
      toRecipients.push("crossings-at-irving@rentbamboo.ai");
    }

    const ccRecipients =
      resident === "Current Resident"
        ? [
            "daniel@livenjoymgt.com",
            "admin@livenjoymgt.com",
            "officeadmin@livenjoymgt.com",
          ]
        : [];

    const submittedAt = new Intl.DateTimeFormat("en-US", {
      timeZone: "America/Chicago",
      dateStyle: "full",
      timeStyle: "medium",
    }).format(new Date());

    await transporter.sendMail({
      from: `"Website Contact Form" <${EMAIL_USER}>`,
      to: toRecipients.join(", "),
      cc: ccRecipients.length ? ccRecipients.join(", ") : undefined,
      replyTo: email,
      subject: `Contact Form - ${subject}`,
      text: [
        "New Contact Form Submission",
        "Crossings at Irving",
        "",
        `Full Name: ${fullName}`,
        `Email: ${email}`,
        `Phone: ${formatPhoneNumber(phone)}`,
        `Resident Type: ${resident}`,
        `Subject: ${subject}`,
        `Submitted On: ${submittedAt}`,
        "",
        "Message:",
        message,
      ].join("\n"),
      html: `
        <div style="font-family:Arial,sans-serif;color:#374151;max-width:700px;margin:auto;">
          <div style="background:#1E3872;padding:24px;color:#fff;text-align:center;">
            <h1>New Contact Form Submission</h1>
            <p>Crossings at Irving</p>
          </div>

          <div style="padding:24px;">
            <h2>Contact Details</h2>
            <table style="width:100%;border-collapse:collapse;">
              <tr>
                <td style="padding:10px;border-bottom:1px solid #eee;">Full Name</td>
                <td style="padding:10px;border-bottom:1px solid #eee;">${escapeHtml(fullName)}</td>
              </tr>
              <tr>
                <td style="padding:10px;border-bottom:1px solid #eee;">Email Address</td>
                <td style="padding:10px;border-bottom:1px solid #eee;">
                  <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a>
                </td>
              </tr>
              <tr>
                <td style="padding:10px;border-bottom:1px solid #eee;">Phone Number</td>
                <td style="padding:10px;border-bottom:1px solid #eee;">${escapeHtml(formatPhoneNumber(phone))}</td>
              </tr>
              <tr>
                <td style="padding:10px;border-bottom:1px solid #eee;">Resident Type</td>
                <td style="padding:10px;border-bottom:1px solid #eee;">${escapeHtml(resident)}</td>
              </tr>
              <tr>
                <td style="padding:10px;border-bottom:1px solid #eee;">Subject</td>
                <td style="padding:10px;border-bottom:1px solid #eee;">${escapeHtml(subject)}</td>
              </tr>
              <tr>
                <td style="padding:10px;">Submitted On</td>
                <td style="padding:10px;">${escapeHtml(submittedAt)}</td>
              </tr>
            </table>

            <h2 style="margin-top:28px;">Message</h2>
            <div style="background:#f9fafb;padding:20px;border:1px solid #e5e7eb;border-radius:8px;white-space:pre-wrap;">${escapeHtml(message)}</div>

            <p style="margin-top:24px;">
              <a href="mailto:${escapeHtml(email)}" style="display:inline-block;background:#1E3872;color:#fff;padding:12px 20px;text-decoration:none;border-radius:6px;">Reply to ${escapeHtml(fullName)}</a>
            </p>
          </div>

          <div style="background:#111827;color:#d1d5db;padding:20px;text-align:center;">
            <strong style="color:#fff;">Crossings at Irving</strong>
            <p>1900 Estrada Pkwy, Irving, TX 75061</p>
            <p>(972) 457-0421</p>
            <p>© ${new Date().getFullYear()} Crossings at Irving. All Rights Reserved.</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Message sent successfully.",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Contact form processing failed:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to send email.",
        error:
          process.env.NODE_ENV === "development" && error instanceof Error
            ? error.message
            : undefined,
      },
      { status: 500 },
    );
  }
}
