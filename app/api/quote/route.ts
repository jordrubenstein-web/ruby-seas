import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const QUOTE_TO = "wes@rubyseas.com";

const quoteSchema = z.object({
  buyerType: z.enum(["retailer", "wholesaler", "international"]),
  products: z.array(z.string()).min(1),
  volume: z.string().min(2),
  frequency: z.string().min(2),
  company: z.string().min(2),
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(7),
  message: z.string().optional(),
});

const BUYER_LABELS: Record<string, string> = {
  retailer: "Retailer",
  wholesaler: "Wholesaler",
  international: "International buyer",
};

const PRODUCT_LABELS: Record<string, string> = {
  fish: "Wild-caught & responsibly sourced fish",
  shellfish: "Premium shellfish",
  "value-added": "Value-added & ready meals",
  lobster: "Bahamas spiny lobster (MSC)",
};

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not configured");
    return NextResponse.json(
      { error: "Quote email is not configured. Please try again later." },
      { status: 503 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = quoteSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please check the form and try again." },
      { status: 400 },
    );
  }

  const data = parsed.data;
  const from =
    process.env.QUOTE_FROM_EMAIL?.trim() ||
    "Ruby Seas Quotes <onboarding@resend.dev>";

  const products = data.products.map((p) => PRODUCT_LABELS[p] ?? p);
  const productList = products.map((p) => `• ${p}`).join("\n");
  const notes = data.message?.trim() || "(none)";

  const text = [
    "New quote request from ruby-seas.vercel.app / rubyseas.com",
    "",
    `Buyer type: ${BUYER_LABELS[data.buyerType] ?? data.buyerType}`,
    `Company: ${data.company}`,
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone}`,
    "",
    "Products of interest:",
    productList,
    "",
    `Volume / MOQ: ${data.volume}`,
    `Order frequency: ${data.frequency}`,
    "",
    "Notes:",
    notes,
  ].join("\n");

  const html = `
    <h2>New quote request</h2>
    <p><strong>Buyer type:</strong> ${escapeHtml(BUYER_LABELS[data.buyerType] ?? data.buyerType)}</p>
    <p><strong>Company:</strong> ${escapeHtml(data.company)}</p>
    <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
    <p><strong>Email:</strong> <a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></p>
    <p><strong>Phone:</strong> ${escapeHtml(data.phone)}</p>
    <p><strong>Products of interest:</strong></p>
    <ul>${products.map((p) => `<li>${escapeHtml(p)}</li>`).join("")}</ul>
    <p><strong>Volume / MOQ:</strong> ${escapeHtml(data.volume)}</p>
    <p><strong>Order frequency:</strong> ${escapeHtml(data.frequency)}</p>
    <p><strong>Notes:</strong><br/>${escapeHtml(notes).replace(/\n/g, "<br/>")}</p>
  `;

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to: [QUOTE_TO],
      replyTo: data.email,
      subject: `Quote request — ${data.company} (${data.name})`,
      text,
      html,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Unable to send quote request. Please try again." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Quote send failed:", err);
    return NextResponse.json(
      { error: "Unable to send quote request. Please try again." },
      { status: 502 },
    );
  }
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
