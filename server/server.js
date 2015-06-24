//
// *** server
//

Meteor.startup(function() {
  // SMTP
  process.env.MAIL_URL = process.env.MAIL_URL || 'smtp://postmaster%40sandbox03d39c263d7846e7acc8dfddf22c3f73.mailgun.org:33c5a97568bb71ba9076c649988da7c3@smtp.mailgun.org:587';
});
