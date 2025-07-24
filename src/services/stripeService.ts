
export async function createStripePayment(email: string): Promise<string | null> {
  try {
    console.log("Creating Stripe payment for:", email);
    console.log("Using price ID: price_1RMSVO9fz0HDrbzJLi4Iazfk");
    
    // Use the environment variable for the secret key
    const stripeSecretKey = import.meta.env.VITE_STRIPE_SECRET_KEY;
    
    if (!stripeSecretKey) {
      console.error("Stripe secret key is missing. Please set VITE_STRIPE_SECRET_KEY in your environment.");
      throw new Error("Stripe configuration error: secret key missing");
    }

    console.log("Using Stripe key:", stripeSecretKey.substring(0, 20) + "...");
    
    // Create a checkout session with your price ID
    const requestBody = new URLSearchParams({
      "success_url": `${window.location.origin}/dashboard?success=true`,
      "cancel_url": `${window.location.origin}/get-started?canceled=true`,
      "payment_method_types[0]": "card",
      "mode": "subscription",
      "customer_email": email,
      "line_items[0][price]": "price_1RMSVO9fz0HDrbzJLi4Iazfk",
      "line_items[0][quantity]": "1",
      "allow_promotion_codes": "true",
    });

    console.log("Request body:", requestBody.toString());

    const response = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${stripeSecretKey}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: requestBody,
    });

    console.log("Stripe response status:", response.status);
    console.log("Stripe response headers:", Object.fromEntries(response.headers.entries()));

    const responseText = await response.text();
    console.log("Stripe response text:", responseText);

    if (!response.ok) {
      console.error("Stripe API error details:", {
        status: response.status,
        statusText: response.statusText,
        body: responseText
      });
      
      try {
        const errorData = JSON.parse(responseText);
        console.error("Stripe error data:", errorData);
        throw new Error(`Stripe error: ${errorData.error?.message || responseText}`);
      } catch (parseError) {
        throw new Error(`Payment creation failed with status ${response.status}: ${responseText}`);
      }
    }

    let session;
    try {
      session = JSON.parse(responseText);
    } catch (parseError) {
      console.error("Failed to parse Stripe response:", parseError);
      throw new Error("Invalid response from Stripe");
    }

    console.log("Stripe session created successfully:", {
      id: session.id,
      url: session.url,
      customer_email: session.customer_email
    });
    
    return session.url;
  } catch (error) {
    console.error("Comprehensive error creating Stripe payment:", {
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      email
    });
    return null;
  }
}
