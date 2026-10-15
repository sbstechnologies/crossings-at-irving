import { siteConfig } from "@/app/config/content";
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

const cstTime = new Intl.DateTimeFormat("en-US", {
  timeZone: "America/Chicago",
  dateStyle: "full",
  timeStyle: "medium",
}).format(new Date());

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

function getTrustedClientIp(request: Request): string {
  // On Vercel, use the platform-provided client IP header when available.
  // Only trust forwarding headers when your hosting platform sanitizes them.
  const realIp = request.headers.get("x-real-ip")?.trim();
  if (realIp) return realIp;

  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    const ip = forwardedFor.split(",")[0]?.trim();
    if (ip) return ip;
  }

  // Allows local development where proxy IP headers may be absent.
  return "unknown";
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
  remoteIp?: string,
): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;

  if (!secret) {
    console.error(
      "Turnstile configuration error: TURNSTILE_SECRET_KEY is missing.",
    );
    throw new Error("TURNSTILE_SECRET_MISSING");
  }

  if (!token || token.length > 2048) {
    return false;
  }

  try {
    const params = new URLSearchParams({
      secret,
      response: token,
    });

    if (remoteIp && remoteIp !== "unknown") {
      params.set("remoteip", remoteIp);
    }

    const response = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params,
        cache: "no-store",
        signal: AbortSignal.timeout(10000),
      },
    );

    if (!response.ok) {
      console.error("Turnstile Siteverify returned HTTP", response.status);
      throw new Error("TURNSTILE_SERVICE_UNAVAILABLE");
    }

    const result: {
      success?: boolean;
      hostname?: string;
      "error-codes"?: string[];
    } = await response.json();

    if (!result.success) {
      // Do not log the secret or the submitted token.
      console.warn(
        "Turnstile rejected the token:",
        result["error-codes"] ?? [],
      );
      return false;
    }

    return true;
  } catch (error) {
    console.error("Turnstile verification request failed:", error);
    throw new Error("TURNSTILE_SERVICE_UNAVAILABLE");
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

    let verified: boolean;

    try {
      verified = await verifyTurnstile(turnstileToken, clientIp);
    } catch (error) {
      console.error("Turnstile is temporarily unavailable:", error);

      return NextResponse.json(
        {
          success: false,
          message:
            "Security verification is temporarily unavailable. Please try again shortly.",
        },
        { status: 503 },
      );
    }

    if (!verified) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Security verification failed. Please refresh the verification and try again.",
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
      subject: `Contact Form - ${subject?.trim() || "General Inquiry"}`,
      text: [
        "New Contact Form Submission",
        "Crossings at Irving",
        "",
        `Full Name: ${fullName}`,
        `Email: ${email}`,
        `Phone: ${formatPhoneNumber(phone)}`,
        `Resident Type: ${resident}`,
        `Subject: ${subject?.trim() || "General Inquiry"}`,
        `Submitted On: ${submittedAt}`,
        "",
        "Message:",
        message,
      ].join("\n"),
      html: `
  <!-- Header -->
  <div
    style="
      background:linear-gradient(135deg,#1E3872,#2E5AAC);
      padding:30px;
      text-align:center;
      color:#ffffff;
    "
  >
    <h1
      style="
        margin:0;
        font-size:28px;
        font-weight:700;
      "
    >
      New Contact Form Submission
    </h1>

    <p
      style="
        margin-top:8px;
        font-size:14px;
        opacity:0.9;
      "
    >
        ${escapeHtml(siteConfig.name)} - A new inquiry has been received from the website
   
    </p>
  </div>

  <!-- Content -->
  <div style="padding:30px;">

    <div
      style="
        background:#eef5ff;
        border-left:4px solid #1E3872;
        padding:15px 18px;
        border-radius:8px;
        margin-bottom:25px;
        color:#374151;
      "
    >
      A ${escapeHtml(
        resident || "Future Resident",
      )} has submitted a contact request.
      Details are listed below.
    </div>

    <h3
      style="
        margin:0 0 20px;
        color:#111827;
        font-size:20px;
      "
    >
      Contact Details
    </h3>

    <table
      width="100%"
      cellpadding="12"
      cellspacing="0"
      style="border-collapse:collapse;"
    >

      <tr>
        <td
          width="180"
          style="
            font-weight:600;
            color:#6b7280;
            border-bottom:1px solid #e5e7eb;
          "
        >
          Full Name
        </td>

        <td
          style="
            border-bottom:1px solid #e5e7eb;
          "
        >
          ${escapeHtml(fullName)}
        </td>
      </tr>

      <tr>
        <td
          style="
            font-weight:600;
            color:#6b7280;
            border-bottom:1px solid #e5e7eb;
          "
        >
          Email Address
        </td>

        <td
          style="
            border-bottom:1px solid #e5e7eb;
          "
        >
          <a
            href="mailto:${escapeHtml(email)}"
            style="
              color:#1E3872;
              text-decoration:none;
            "
          >
            ${escapeHtml(email)}
          </a>
        </td>
      </tr>

      <tr>
        <td
          style="
            font-weight:600;
            color:#6b7280;
            border-bottom:1px solid #e5e7eb;
          "
        >
          Phone Number
        </td>

        <td
          style="
            border-bottom:1px solid #e5e7eb;
          "
        >
          ${escapeHtml(formatPhoneNumber(phone || "Not Provided"))}
        </td>
      </tr>

      <tr>
        <td
          style="
            font-weight:600;
            color:#6b7280;
            border-bottom:1px solid #e5e7eb;
          "
        >
          I am a
        </td>

        <td
          style="
            border-bottom:1px solid #e5e7eb;
          "
        >
          ${escapeHtml(resident || "Future Resident")}
        </td>
      </tr>

      <tr>
        <td
          style="
            font-weight:600;
            color:#6b7280;
            border-bottom:1px solid #e5e7eb;
          "
        >
          Subject
        </td>

        <td
          style="
            border-bottom:1px solid #e5e7eb;
          "
        >
          ${escapeHtml(subject || "General Inquiry")}
        </td>
      </tr>

      <tr>
        <td
          style="
            font-weight:600;
            color:#6b7280;
          "
        >
          Submitted On
        </td>

        <td>
          ${escapeHtml(cstTime)}
        </td>
      </tr>

    </table>

    <!-- Message -->

    <div style="margin-top:30px;">

      <h3
        style="
          margin-bottom:12px;
          color:#111827;
          font-size:20px;
        "
      >
        Message
      </h3>

      <div
        style="
          background:#f9fafb;
          border:1px solid #e5e7eb;
          border-radius:10px;
          padding:20px;
          color:#374151;
          line-height:1.8;
          white-space:pre-wrap;
        "
      >
        ${escapeHtml(message)}
      </div>

    </div>

    <!-- Reply Button -->

    <div
      style="
        margin-top:30px;
        text-align:center;
      "
    >
      <a
        href="mailto:${escapeHtml(email)}"
        style="
          display:inline-block;
          background:#1E3872;
          color:#ffffff;
          text-decoration:none;
          padding:14px 28px;
          border-radius:8px;
          font-weight:600;
        "
      >
        Reply to ${escapeHtml(resident || "Future Resident")}
      </a>
    </div>

  </div>

  <!-- Footer -->

  <div
    style="
      background:#111827;
      padding:24px;
      text-align:center;
      color:#9ca3af;
      font-size:13px;
    "
  >

    <div
      style="
        color:#ffffff;
        font-size:18px;
        font-weight:700;
      "
    >
       ${escapeHtml(siteConfig.name)}
    </div>

    <div style="margin-top:8px;">
      ${escapeHtml(siteConfig.address)}
    </div>

    <div style="margin-top:6px;">
      Phone: ${escapeHtml(siteConfig.phone)}
    </div>

    <div style="margin-top:6px;">
      Email: ${escapeHtml(siteConfig.email)}
    </div>

    <div style="margin-top:15px;">
      This email was automatically generated
      from  ${escapeHtml(siteConfig.name)} website contact form.
    </div>

    <div style="margin-top:10px;">
       &copy; ${new Date().getFullYear()}
      ${escapeHtml(siteConfig.name)}. All Rights Reserved.
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
