import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

// Initialize Resend with API key (will be validated at runtime)
const resend = new Resend(process.env.RESEND_API_KEY || "dummy-key-for-build");

export async function POST(request: NextRequest) {
  try {
    // Check if API key is configured
    if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY === "dummy-key-for-build") {
      return NextResponse.json(
        { 
          success: false, 
          error: "Email service is not configured. Please set RESEND_API_KEY in your environment variables." 
        },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { name, phone, address, email, items, total, paymentMethod } = body;

    // Validate required fields
    if (!name || !phone || !address || !email || !items || !total || !paymentMethod) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Format order items for email
    const orderItemsHtml = items
      .map(
        (item: { name: string; quantity: number; price: number }) => `
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #e0e0e0;">${item.name}</td>
          <td style="padding: 8px; border-bottom: 1px solid #e0e0e0; text-align: center;">${item.quantity}</td>
          <td style="padding: 8px; border-bottom: 1px solid #e0e0e0; text-align: right;">$${item.price.toFixed(2)}</td>
          <td style="padding: 8px; border-bottom: 1px solid #e0e0e0; text-align: right;">$${(item.price * item.quantity).toFixed(2)}</td>
        </tr>
      `
      )
      .join("");

    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>New Order from Fata Morgana</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #fffbe6 60%, #f5e9c6 100%); padding: 20px; border-radius: 10px; border: 3px solid #d4af37; margin-bottom: 20px;">
            <h1 style="color: #d4af37; margin: 0; text-align: center;">🏺 New Order Received! 🏺</h1>
          </div>
          
          <div style="background: white; padding: 20px; border-radius: 10px; border: 2px solid #d4af37; margin-bottom: 20px;">
            <h2 style="color: #d4af37; border-bottom: 2px solid #d4af37; padding-bottom: 10px;">Customer Information</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Delivery Address:</strong><br>${address}</p>
            <p><strong>Payment Method:</strong> <span style="background: #d4af37; color: white; padding: 4px 8px; border-radius: 4px;">${paymentMethod}</span></p>
          </div>

          <div style="background: white; padding: 20px; border-radius: 10px; border: 2px solid #d4af37; margin-bottom: 20px;">
            <h2 style="color: #d4af37; border-bottom: 2px solid #d4af37; padding-bottom: 10px;">Order Details</h2>
            <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
              <thead>
                <tr style="background: #fffbe6;">
                  <th style="padding: 10px; text-align: left; border-bottom: 2px solid #d4af37;">Item</th>
                  <th style="padding: 10px; text-align: center; border-bottom: 2px solid #d4af37;">Qty</th>
                  <th style="padding: 10px; text-align: right; border-bottom: 2px solid #d4af37;">Price</th>
                  <th style="padding: 10px; text-align: right; border-bottom: 2px solid #d4af37;">Total</th>
                </tr>
              </thead>
              <tbody>
                ${orderItemsHtml}
              </tbody>
              <tfoot>
                <tr style="background: #fffbe6; font-weight: bold; font-size: 1.1em;">
                  <td colspan="3" style="padding: 12px; text-align: right; border-top: 2px solid #d4af37;">Grand Total:</td>
                  <td style="padding: 12px; text-align: right; color: #d4af37; border-top: 2px solid #d4af37;">$${total.toFixed(2)}</td>
                </tr>
              </tfoot>
            </table>
          </div>

          <div style="background: #fffbe6; padding: 15px; border-radius: 10px; border: 2px solid #d4af37; text-align: center;">
            <p style="margin: 0; color: #7c5c13;">
              Please contact the customer at <strong>${phone}</strong> to confirm the order and arrange delivery.
            </p>
          </div>

          <div style="margin-top: 20px; text-align: center; color: #999; font-size: 12px;">
            <p>This is an automated notification from Fata Morgana Egyptian Restaurant</p>
          </div>
        </body>
      </html>
    `;

    // Send email
    const data = await resend.emails.send({
      from: "Fata Morgana Orders <onboarding@resend.dev>",
      to: ["mmmoo136@gmail.com"],
      subject: `🏺 New Order from ${name} - $${total.toFixed(2)}`,
      html: emailHtml,
    });

    return NextResponse.json({ success: true, data });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Failed to send email";
    console.error("Error sending email:", error);
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}
