# Setting Up the Contact Form with EmailJS

This portfolio uses EmailJS to handle the contact form submissions. EmailJS allows the contact form to send emails directly from the browser without requiring a backend. It's free for up to 200 emails per month.

## Setup Instructions

1. Sign up for a free account at [EmailJS](https://www.emailjs.com/)

2. Create a new service:
   - Click on "Add New Service"
   - Choose "Gmail" (or another email provider)
   - Connect your Gmail account
   - Name your service (e.g., "portfolio_gmail")
   - Note down the Service ID (will look like `service_xxxxxxx`)

3. Create an email template:
   - Go to "Email Templates"
   - Click on "Create New Template"
   - Name your template (e.g., "contact_form")
   - Design your email template with the following variables:
     - `{{name}}`: Sender's name
     - `{{email}}`: Sender's email
     - `{{subject}}`: Email subject
     - `{{message}}`: Message content
   - Save the template
   - Note down the Template ID (will look like `template_xxxxxxx`)

4. Get your Public Key:
   - Go to "Account" → "API Keys"
   - Note down your Public Key

5. Update the configuration in the contact form:
   - Open `src/components/contact-form.tsx`
   - Update the following constants with your actual values:
     ```typescript
     const EMAILJS_SERVICE_ID = 'service_gmail'; // Replace with your Service ID
     const EMAILJS_TEMPLATE_ID = 'template_contact'; // Replace with your Template ID
     const EMAILJS_PUBLIC_KEY = 'your-public-key'; // Replace with your Public Key
     ```

6. Test the contact form:
   - Fill out the form and submit it
   - Check your email to see if you received the test message
   - If you encounter any issues, check the browser console for errors

## Security Note

The EmailJS Public Key is exposed in the client-side code. This is normal and necessary for EmailJS to function, but it means:

1. Anyone can view your public key by inspecting the code
2. There's a monthly limit on the number of emails (200/month on the free plan)
3. You should monitor your EmailJS account to ensure it's not being abused

To mitigate potential abuse, EmailJS has its own rate limiting and security measures in place.

## Troubleshooting

If emails are not being received:

1. Check if the form shows a success message (this means the request to EmailJS was successful)
2. Check your spam/junk folder
3. Verify the EmailJS service is properly connected to your email account
4. Check the browser console for any error messages
5. Verify the template variables match what the code is sending
