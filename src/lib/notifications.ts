export async function notifyAll(
  inquiryType: 'contact' | 'quote' | 'sample',
  data: {
    clientName: string;
    contactMethod: string;
    productCategory: string;
    quantity: number;
    technicalSpecs?: string;
    estimatedAmount?: number;
  }
): Promise<void> {
  const SERVERCHAN_SENDKEY = process.env.SERVERCHAN_SENDKEY;
  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  const NOTIFICATION_EMAIL = process.env.NOTIFICATION_EMAIL || 'Sales@zxpapers.com';

  console.log(`Triggering notifyAll for ${inquiryType} from ${data.clientName}...`);

  const mdContent = `
### 📥 新收到 B2B 询盘提醒 (${inquiryType.toUpperCase()})
- **客户名称**: ${data.clientName}
- **联系方式**: ${data.contactMethod}
- **产品分类**: ${data.productCategory}
- **预估数量**: ${data.quantity}
${data.estimatedAmount ? `- **系统估算金额**: \$${data.estimatedAmount.toFixed(2)}\n` : ''}- **技术/设计要求**: ${data.technicalSpecs || '无特殊要求'}
- **时间**: ${new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' })}
  `.trim();

  // 1. Server酱 (微信通知)
  if (SERVERCHAN_SENDKEY) {
    try {
      const title = `新询盘: ${data.clientName} [${inquiryType}]`;
      const url = `https://sctapi.ftqq.com/${SERVERCHAN_SENDKEY}.send`;
      
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          title,
          desp: mdContent,
        }),
      });
      if (res.ok) {
        console.log('ServerChan push: Success');
      } else {
        console.error('ServerChan push: Failed with status', res.status);
      }
    } catch (err) {
      console.error('ServerChan push error:', err);
    }
  } else {
    console.log('ServerChan SendKey is not configured, skipping WeChat notification.');
  }

  // 2. Resend (邮件通知)
  if (RESEND_API_KEY) {
    try {
      const htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
          <h2 style="color: #008188; border-bottom: 2px solid #008188; padding-bottom: 10px;">New B2B Lead Received (${inquiryType.toUpperCase()})</h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; width: 150px;">Client Name:</td>
              <td style="padding: 8px 0;">${data.clientName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Contact Method:</td>
              <td style="padding: 8px 0;">${data.contactMethod}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Product Category:</td>
              <td style="padding: 8px 0;">${data.productCategory}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Est. Quantity:</td>
              <td style="padding: 8px 0;">${data.quantity.toLocaleString()} pcs</td>
            </tr>
            ${data.estimatedAmount ? `
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #28a745;">Est. Value:</td>
              <td style="padding: 8px 0; color: #28a745; font-weight: bold;">$${data.estimatedAmount.toFixed(2)}</td>
            </tr>` : ''}
            <tr>
              <td style="padding: 8px 0; font-weight: bold; vertical-align: top;">Requirements:</td>
              <td style="padding: 8px 0; white-space: pre-wrap;">${data.technicalSpecs || 'N/A'}</td>
            </tr>
          </table>
          <p style="margin-top: 25px; font-size: 12px; color: #999; border-top: 1px solid #eee; padding-top: 10px;">
            This lead was captured automatically on ${new Date().toUTCString()}.
          </p>
        </div>
      `;

      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: 'Zhixin Lead <onboarding@resend.dev>',
          to: NOTIFICATION_EMAIL,
          subject: `New Lead: ${data.clientName} (${inquiryType.toUpperCase()})`,
          html: htmlContent,
        }),
      });

      if (res.ok) {
        console.log('Resend email push: Success');
      } else {
        const errJson = await res.json();
        console.error('Resend email push: Failed', errJson);
      }
    } catch (err) {
      console.error('Resend email push error:', err);
    }
  } else {
    console.log('Resend API key is not configured, skipping email notification.');
  }
}
