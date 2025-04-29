import { NextResponse } from 'next/server';

// This is a simplified API route for demonstration
// In a production environment, you would use something like:
// - Nodemailer with an SMTP server
// - A service like SendGrid, Mailgun, etc.
// - Store in a database before sending

export async function POST(request: Request) {
  try {
    // Get the form data from the request
    const formData = await request.json();
    const { name, email, subject, message } = formData;

    // Validate the form data (basic validation)
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate email format (basic validation)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // In a real application, you would send an email here
    // For demonstration, we'll just log the data and simulate a success
    console.log('Contact form submission:', {
      name,
      email,
      subject,
      message,
      timestamp: new Date().toISOString(),
    });

    // Simulate sending an email (replace with actual email sending logic)
    // await sendEmail({ name, email, subject, message });

    // Return a success response
    return NextResponse.json(
      {
        message: 'Message sent successfully',
        timestamp: new Date().toISOString()
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { error: 'An error occurred while processing your request' },
      { status: 500 }
    );
  }
}
