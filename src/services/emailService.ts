
// Updated Resend API key
const RESEND_API_KEY = "re_KYMVbP66_53VYr9g2ALpFef8CVwB14eT9";

export async function sendVerificationEmail(email: string, code: string): Promise<boolean> {
  try {
    console.log("Sending verification email to:", email, "with code:", code);
    console.log("Using API key:", RESEND_API_KEY);
    
    const requestBody = {
      from: "Bodify <onboarding@resend.dev>",
      to: [email],
      subject: "Verify your Bodify account",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #8B5CF6 0%, #F97316 100%); padding: 30px; border-radius: 10px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px;">Welcome to Bodify!</h1>
          </div>
          <div style="background: #f8f9fa; padding: 30px; border-radius: 10px; margin-top: 20px;">
            <h2 style="color: #333; margin-bottom: 20px;">Verify your email address</h2>
            <p style="color: #666; font-size: 16px; line-height: 1.5;">
              Thanks for signing up! Please use the verification code below to complete your registration:
            </p>
            <div style="background: white; border: 2px solid #8B5CF6; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0;">
              <span style="font-size: 32px; font-weight: bold; color: #8B5CF6; letter-spacing: 4px;">${code}</span>
            </div>
            <p style="color: #666; font-size: 14px;">
              This code will expire in 10 minutes. If you didn't request this code, please ignore this email.
            </p>
          </div>
          <div style="text-align: center; margin-top: 20px; color: #999; font-size: 12px;">
            © 2025 Bodify Inc. All rights reserved.
          </div>
        </div>
      `,
    };

    console.log("Request body:", JSON.stringify(requestBody, null, 2));

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    console.log("Response status:", response.status);
    console.log("Response headers:", Object.fromEntries(response.headers.entries()));

    const responseText = await response.text();
    console.log("Response text:", responseText);

    if (!response.ok) {
      console.error("Resend API error details:", {
        status: response.status,
        statusText: response.statusText,
        body: responseText
      });
      
      // Try to parse the error response
      try {
        const errorData = JSON.parse(responseText);
        console.error("Parsed error data:", errorData);
        throw new Error(`Resend API error: ${errorData.message || responseText}`);
      } catch (parseError) {
        throw new Error(`Email sending failed with status ${response.status}: ${responseText}`);
      }
    }

    let data;
    try {
      data = JSON.parse(responseText);
    } catch (parseError) {
      console.error("Failed to parse success response:", parseError);
      // If we can't parse but got a 200, assume success
      if (response.status === 200) {
        console.log("Email sent successfully (unparseable response but 200 status)");
        return true;
      }
      throw new Error("Invalid response from email service");
    }

    console.log("Email sent successfully:", data);
    return true;
  } catch (error) {
    console.error("Comprehensive error in sendVerificationEmail:", {
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      apiKey: RESEND_API_KEY ? `${RESEND_API_KEY.substring(0, 10)}...` : 'missing'
    });
    return false;
  }
}

export function generateVerificationCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}
