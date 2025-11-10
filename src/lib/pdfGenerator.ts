import nodemailer from 'nodemailer';
import { IOrder } from '@/models/Order';
import { IProduct } from '@/models/Product';

interface PopulatedOrder extends Omit<IOrder, 'productId'> {
  productId: IProduct;
}

export async function generateDeliveredOrdersPDF(orders: PopulatedOrder[]): Promise<Buffer> {
  // Only run on server side
  if (typeof window !== 'undefined') {
    throw new Error('PDF generation must run on server side only');
  }
  
  // Dynamically import puppeteer only on server side
  const puppeteer = await import('puppeteer');
  const browser = await puppeteer.default.launch({ 
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();

  // Calculate total revenue
  const totalRevenue = orders.reduce((sum, order) => sum + order.grandTotal, 0);

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: Arial, sans-serif; font-size: 14px; line-height: 1.4; color: #333; }
        .header { text-align: center; padding: 20px 0; border-bottom: 2px solid #ddd; margin-bottom: 20px; }
        .header h1 { color: #2c3e50; font-size: 24px; margin-bottom: 10px; }
        .header p { color: #7f8c8d; font-size: 16px; }
        .summary { background: #f8f9fa; padding: 15px; border-radius: 5px; margin-bottom: 20px; }
        .summary-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; text-align: center; }
        .summary-item h3 { color: #27ae60; font-size: 18px; margin-bottom: 5px; }
        .summary-item p { color: #7f8c8d; font-size: 12px; }
        .orders-section h2 { color: #2c3e50; margin-bottom: 15px; border-bottom: 1px solid #ddd; padding-bottom: 5px; }
        .order-item { border: 1px solid #ddd; border-radius: 5px; margin-bottom: 15px; overflow: hidden; }
        .order-header { background: #34495e; color: white; padding: 10px 15px; display: grid; grid-template-columns: 1fr auto auto; align-items: center; }
        .order-header h3 { font-size: 16px; }
        .order-date { font-size: 12px; }
        .order-status { background: #27ae60; color: white; padding: 3px 8px; border-radius: 3px; font-size: 11px; }
        .order-body { padding: 15px; }
        .order-info { display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 20px; }
        .product-info h4 { color: #2c3e50; margin-bottom: 5px; }
        .product-info p { margin: 2px 0; color: #7f8c8d; font-size: 12px; }
        .customer-info h4 { color: #2c3e50; margin-bottom: 5px; }
        .customer-info p { margin: 2px 0; color: #7f8c8d; font-size: 12px; }
        .order-summary h4 { color: #2c3e50; margin-bottom: 5px; }
        .order-summary p { margin: 2px 0; color: #7f8c8d; font-size: 12px; }
        .total-amount { font-size: 16px; font-weight: bold; color: #27ae60; }
        .footer { margin-top: 30px; padding-top: 20px; border-top: 2px solid #ddd; text-align: center; }
        .footer p { color: #7f8c8d; font-size: 12px; }
        @media print { body { font-size: 12px; } }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>Aceon Interior - Delivered Orders Report</h1>
        <p>Generated on ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</p>
      </div>

      <div class="summary">
        <div class="summary-grid">
          <div class="summary-item">
            <h3>${orders.length}</h3>
            <p>Total Delivered Orders</p>
          </div>
          <div class="summary-item">
            <h3>₹${totalRevenue.toLocaleString('en-IN')}</h3>
            <p>Total Revenue</p>
          </div>
          <div class="summary-item">
            <h3>₹${orders.length > 0 ? (totalRevenue / orders.length).toFixed(0) : '0'}</h3>
            <p>Average Order Value</p>
          </div>
        </div>
      </div>

      <div class="orders-section">
        <h2>Delivered Orders Details</h2>
        
        ${orders.map((order, index) => `
          <div class="order-item">
            <div class="order-header">
              <h3>Order #${index + 1}</h3>
              <span class="order-date">Delivered: ${order.deliveredAt ? new Date(order.deliveredAt).toLocaleDateString('en-IN') : 'N/A'}</span>
              <span class="order-status">${order.status.toUpperCase()}</span>
            </div>
            <div class="order-body">
              <div class="order-info">
                <div class="product-info">
                  <h4>Product Details</h4>
                  <p><strong>Name:</strong> ${order.productId.name}</p>
                  <p><strong>Category:</strong> ${order.productId.category}</p>
                  <p><strong>Quantity:</strong> ${order.quantity}</p>
                  <p><strong>Unit Price:</strong> ₹${order.productId.pricing?.current_price?.toLocaleString('en-IN')}</p>
                  ${order.variant ? `<p><strong>Variant:</strong> ${typeof order.variant === 'object' ? JSON.stringify(order.variant) : order.variant}</p>` : ''}
                </div>
                <div class="customer-info">
                  <h4>Shipping Address</h4>
                  <p><strong>${order.address.fullName}</strong></p>
                  <p>${order.address.street}</p>
                  <p>${order.address.city}, ${order.address.postalCode}</p>
                  <p>${order.address.country}</p>
                  <p><strong>Phone:</strong> ${order.address.phone}</p>
                </div>
                <div class="order-summary">
                  <h4>Order Summary</h4>
                  <p><strong>Payment Method:</strong> ${order.paymentMethod}</p>
                  <p><strong>Order Date:</strong> ${new Date(order.createdAt).toLocaleDateString('en-IN')}</p>
                  ${order.shippedAt ? `<p><strong>Shipped:</strong> ${new Date(order.shippedAt).toLocaleDateString('en-IN')}</p>` : ''}
                  <p class="total-amount"><strong>Total: ₹${order.grandTotal.toLocaleString('en-IN')}</strong></p>
                </div>
              </div>
            </div>
          </div>
        `).join('')}
      </div>

      <div class="footer">
        <p>This is an automated report generated by Aceon Interior Admin System</p>
        <p>For any queries, please contact: saisrisatvic@gmail.com</p>
      </div>
    </body>
    </html>
  `;

  await page.setContent(html);
  
  // Generate PDF
  const pdf = await page.pdf({
    format: 'A4',
    printBackground: true,
    margin: {
      top: '20px',
      right: '20px',
      bottom: '20px',
      left: '20px'
    }
  });

  await browser.close();
  return Buffer.from(pdf);
}

export async function sendDeliveredOrdersEmail(adminEmail: string, pdfBuffer: Buffer, orderCount: number) {
  // Only run on server side
  if (typeof window !== 'undefined') {
    throw new Error('Email sending must run on server side only');
  }
  
  console.log(`📧 Attempting to send email to: ${adminEmail}`);
  console.log(`🔧 SMTP Config - User: ${process.env.SMTP_USER}`);
  console.log(`🔧 SMTP Password configured: ${process.env.SMTP_PASSWORD ? 'Yes' : 'No'}`);
  
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.SMTP_USER,
    to: adminEmail,
    subject: `Aceon Interior - Delivered Orders Report (${orderCount} orders)`,
    text: `Dear Admin,

A new order has been marked as delivered. Please find attached the complete report of all delivered orders.

Report Summary:
- Total Delivered Orders: ${orderCount}
- Report Generated: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}

Best regards,
Aceon Interior Admin System`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #f8f9fa; padding: 20px; border-radius: 5px;">
          <h2 style="color: #2c3e50; margin-bottom: 15px;">Delivered Orders Report</h2>
          <p>Dear Admin,</p>
          <p>A new order has been marked as delivered. Please find attached the complete report of all delivered orders.</p>
          
          <div style="background: white; padding: 15px; border-radius: 5px; margin: 15px 0;">
            <h3 style="color: #27ae60; margin-bottom: 10px;">Report Summary</h3>
            <ul style="list-style: none; padding: 0;">
              <li style="margin: 5px 0;"><strong>Total Delivered Orders:</strong> ${orderCount}</li>
              <li style="margin: 5px 0;"><strong>Report Generated:</strong> ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</li>
            </ul>
          </div>
          
          <p>Please review the attached PDF for complete order details.</p>
          <p style="margin-top: 20px;">Best regards,<br>Aceon Interior Admin System</p>
        </div>
      </div>
    `,
    attachments: [
      {
        filename: `delivered-orders-report-${new Date().toISOString().split('T')[0]}.pdf`,
        content: pdfBuffer,
        contentType: 'application/pdf'
      }
    ]
  };

  await transporter.sendMail(mailOptions);
}