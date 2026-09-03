// app/api/contact/route.ts

import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const escapeHtml = (text: string) =>
  text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);

    if (!body) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid request body",
        },
        { status: 400 },
      );
    }

    const {
      fullName,
      email,
      phone,
      resident,
      subject,
      message,
    }: {
      fullName: string;
      email: string;
      phone?: string;
      resident?: string;
      subject?: string;
      message: string;
    } = body;

    // Validation
    if (!fullName?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "Full name, email, and message are required.",
        },
        { status: 400 },
      );
    }

    const cstTime = new Intl.DateTimeFormat("en-US", {
      timeZone: "America/Chicago",
      dateStyle: "full",
      timeStyle: "medium",
    }).format(new Date());

    function formatPhoneNumber(phone: string) {
      const cleaned = phone.replace(/\D/g, "");

      if (cleaned.length === 10) {
        return `(${cleaned.slice(0, 3)})-${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
      }

      return phone; // return original if invalid
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email address.",
        },
        { status: 400 },
      );
    }

    // Environment variables check
    const EMAIL_USER = process.env.EMAIL_USER;
    const EMAIL_PASS = process.env.EMAIL_PASS;

    if (!EMAIL_USER || !EMAIL_PASS) {
      console.error("Missing email environment variables");

      return NextResponse.json(
        {
          success: false,
          message: "Email service configuration is missing.",
        },
        { status: 500 },
      );
    }

    // Nodemailer transporter
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

    const ccRecipients: string[] = [];

    if (resident === "Current Resident") {
      ccRecipients.push(
        "daniel@livenjoymgt.com",
        "admin@livenjoymgt.com",
        "officeadmin@livenjoymgt.com",
      );
    }

    // Verify SMTP connection
    await transporter.verify();

    // Send email
    await transporter.sendMail({
      from: `"Website Contact Form" <${EMAIL_USER}>`,
      to: toRecipients.join(", "),
      cc: ccRecipients.length ? ccRecipients.join(", ") : undefined,
      // CC recipients
      replyTo: email,
      subject: `Contact Form - ${subject?.trim() || "General Inquiry"}`,

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
      Crossings at Irving -
      A new inquiry has been received from the website
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
      Crossings at Irving
    </div>

<div style="margin-top:8px;">
  1900 Estrada Pkwy,<br />
  Irving, TX 75061
</div>

<div style="margin-top:6px;">
  📞 (972) 457-0421
</div>

<div style="margin-top:6px;">
  ✉️ crossingsmanager@livenjoymgt.com
</div>

    <div style="margin-top:15px;">
      This email was automatically generated
      from the Crossings at Irving website contact form.
    </div>

    <div style="margin-top:10px;">
      © ${new Date().getFullYear()}
      Crossings at Irving.
      All Rights Reserved.
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
  } catch (error: any) {
    console.error("CONTACT FORM ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to send email.",
        error:
          process.env.NODE_ENV === "development" ? error?.message : undefined,
      },
      { status: 500 },
    );
  }
}
