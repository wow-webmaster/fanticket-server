const emailOtpVerificationTemplate = (otp) => {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <style>
              .email_container {
              display: block;
              width: 75%;
              padding: 25px;
              border: 1px solid #ccc;
              }
              p {
              color: rgb(105, 105, 105);
              position: relative;
              width: 100%;
              }
              a {
              font-size: 16px;
              font-weight: 600;
              color: orange;
              text-decoration: none;
              }
              a:hover {
              color: #000;
              text-decoration: underline;
              }
          </style>
      </head>
          <body>
              <div class="email_container">
                  <h2>Verify your email address</h2>
                  <p>Thanks for starting the new Fanticket account creation process. We want to make sure it's really you. Please enter the following verification code when prompted. If you don’t want to create an account, you can ignore this message.</p>
                  <center>
                    <h4><b>Verification Code</b></h4>
                    <h2>${otp}</h2>
                  </center>
                  <hr />
                  <p>
                  Fanticket Web Services will never email you and ask you to disclose or verify your password, credit card, or banking account number.
                  </p>
              </div>
          </body>
      </html>
      `;
  };
  module.exports = {
    emailOtpVerificationTemplate,
  };