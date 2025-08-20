import transporter from "../config/nodemailer.js";


const sendMail = async ({ employeeName, amount, description, date }) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.HR_EMAIL,
    subject: `New Allowance Request from ${employeeName}`,
    html: `
      <div style="font-family: Arial, sans-serif; background-color: #f4f6f8; padding: 20px;">
        <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 10px; padding: 30px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          <h2 style="color: #1a73e8; text-align: center;">New Allowance Request</h2>
          <p><strong>Employee:</strong> ${employeeName}</p>
          <p><strong>Amount:</strong> $${amount}</p>
          <p><strong>Description:</strong> ${description}</p>
          <p><strong>Date:</strong> ${new Date(date).toLocaleDateString()}</p>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
          <p style="text-align: center; color: #555;">This is an automated notification from the Travel Allowance System.</p>
        </div>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

export default sendMail;
