const nodemailer = require('nodemailer');

const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'mail.saratarot.in',
    port: parseInt(process.env.SMTP_PORT || '465', 10),
    secure: process.env.SMTP_PORT === '465', // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER || 'support@saratarot.in',
      pass: process.env.SMTP_PASS
    }
  });
};

const sendOrderConfirmation = async (orderData) => {
  try {
    const transporter = createTransporter();

    // Parse items if they are passed as string
    let parsedItems = orderData.items;
    if (typeof parsedItems === 'string') {
      try {
        parsedItems = JSON.parse(parsedItems);
      } catch (e) {
        parsedItems = [];
      }
    }

    const itemsHtml = parsedItems.map(item => `
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #ddd;">${item.name} ${item.healingOption === 'With Healing' ? '(With Healing)' : ''}</td>
        <td style="padding: 10px; border-bottom: 1px solid #ddd; text-align: center;">${item.quantity || 1}</td>
        <td style="padding: 10px; border-bottom: 1px solid #ddd; text-align: right;">Rs. ${item.price}</td>
      </tr>
    `).join('');

    const customerInfo = orderData.customerInfo || {};
    const customerHtml = `
      <h3>Customer Details</h3>
      <p><strong>Name:</strong> ${customerInfo.name || 'N/A'}</p>
      <p><strong>Email:</strong> ${customerInfo.email || 'N/A'}</p>
      <p><strong>Phone:</strong> ${customerInfo.phone || 'N/A'}</p>
      <p><strong>Address:</strong> ${customerInfo.address || 'N/A'}</p>
      <p><strong>Pincode:</strong> ${customerInfo.pincode || 'N/A'}</p>
    `;

    const htmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
        <h2 style="color: #A13D8E; text-align: center;">Order Confirmation</h2>
        <p>Thank you for your order! Your payment was successful.</p>
        
        <p><strong>Order ID:</strong> ${orderData.id}</p>
        <p><strong>Total Amount:</strong> Rs. ${orderData.total}</p>
        <p><strong>Payment Method:</strong> ${orderData.paymentMethod}</p>

        <h3>Order Summary</h3>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <thead>
            <tr style="background-color: #f8f9fa;">
              <th style="padding: 10px; border-bottom: 2px solid #ddd; text-align: left;">Item</th>
              <th style="padding: 10px; border-bottom: 2px solid #ddd; text-align: center;">Qty</th>
              <th style="padding: 10px; border-bottom: 2px solid #ddd; text-align: right;">Price</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHtml}
          </tbody>
          <tfoot>
            <tr>
              <td colspan="2" style="padding: 10px; text-align: right; font-weight: bold;">Total:</td>
              <td style="padding: 10px; text-align: right; font-weight: bold;">Rs. ${orderData.total}</td>
            </tr>
          </tfoot>
        </table>

        ${customerHtml}

        <p style="margin-top: 30px; font-size: 0.9em; color: #666; text-align: center;">
          If you have any questions, please contact us at support@saratarot.in
        </p>
      </div>
    `;

    // Setup email options
    const mailOptions = {
      from: '"Saraa Tarot" <' + (process.env.SMTP_USER || 'support@saratarot.in') + '>',
      to: customerInfo.email || 'support@saratarot.in', // Send to customer
      cc: ['support@saratarot.in', 'tamiltarotmagic@gmail.com'], // CC admins
      subject: `Order Confirmation - Order #${orderData.id}`,
      html: htmlBody
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Order confirmation email sent successfully:', info.messageId);
    return true;
  } catch (error) {
    console.error('Error sending order confirmation email:', error);
    return false;
  }
};

module.exports = {
  sendOrderConfirmation
};
