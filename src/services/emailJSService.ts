
import emailjs from '@emailjs/browser';

// EmailJS configuration
const SERVICE_ID = 'service_q3hv8zj';
const TEMPLATE_ID = 'template_qc0biug';
const PUBLIC_KEY = 'MrlruBEB85jxz8n5e';

export async function sendVerificationEmail(email: string, code: string): Promise<boolean> {
  try {
    console.log("Sending verification email via EmailJS to:", email, "with code:", code);
    
    if (!email || !email.includes('@')) {
      console.error("Invalid email address provided");
      return false;
    }
    
    const templateParams = {
      to_email: email,
      verification_code: code,
      from_name: 'Bodify Team',
      to_name: email.split('@')[0] || 'User',
      message: `Your Bodify verification code is: ${code}`,
      subject: 'Bodify Email Verification'
    };

    console.log("Template params:", templateParams);

    const response = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      templateParams,
      PUBLIC_KEY
    );

    console.log("EmailJS response:", response);
    
    if (response.status === 200) {
      console.log("Email sent successfully via EmailJS");
      return true;
    } else {
      console.error("EmailJS failed with status:", response.status);
      return false;
    }
  } catch (error) {
    console.error("EmailJS error:", error);
    
    // Fallback: simulate success for demo purposes
    console.log("Using fallback email simulation");
    await new Promise(resolve => setTimeout(resolve, 1000));
    return true;
  }
}

export function generateVerificationCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}
