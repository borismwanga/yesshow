const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASSWORD,
  },
});

exports.sendBookingNotification = async (user, restaurant) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_ADDRESS,
      to: user.email,
      subject: 'Booking Confirmation',
      text: `Dear ${user.name},\n\nThank you for booking a table at ${restaurant.name}. Your booking has been confirmed.\n\nWe look forward to seeing you soon!\n\nBest regards,\nThe ${restaurant.name} team`,
    };

    await transporter.sendMail(mailOptions);
  } catch (err) {
    console.error(err);
  }
};
