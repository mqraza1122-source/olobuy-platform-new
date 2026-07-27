export async function sendAdminNotification(dealCode: string, actionType: string, amount: number) {
  try {
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'OloBuy Escrow <onboarding@resend.dev>',
        to: ['Support@olobuy.pk'], // یہاں اپنی ایڈمن جی میل لکھیں
        subject: `🚨 OloBuy Alert: Deal #${dealCode} - ${actionType}`,
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; background: #f8fafc; border-radius: 10px;">
            <h2 style="color: #1a237e;">OloBuy Escrow Activity Alert</h2>
            <p><strong>Deal Code:</strong> #${dealCode}</p>
            <p><strong>Action / Status:</strong> <span style="color: #ff9800; font-weight: bold;">${actionType}</span></p>
            <p><strong>Amount:</strong> Rs ${amount.toLocaleString()}</p>
            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
            <p style="font-size: 12px; color: #64748b;">This is an automated notification from OloBuy Financial Engine.</p>
          </div>
        `,
      }),
    });
  } catch (error) {
    console.error('Email sending failed:', error);
  }
}
