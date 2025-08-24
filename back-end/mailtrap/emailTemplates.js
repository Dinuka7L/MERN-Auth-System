export const VERIFICATION_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Verify Your Email</title>
</head>
<body style="margin: 0; padding: 0; background: linear-gradient(135deg, #0f2027, #203a43, #2c5364); font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #ffffff;">

  <div style="max-width: 600px; margin: 40px auto; padding: 30px; background: rgba(255, 255, 255, 0.05); border-radius: 16px; backdrop-filter: blur(12px); box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37); border: 1px solid rgba(255, 255, 255, 0.18);">
    
    <header style="text-align: center; padding-bottom: 20px; border-bottom: 1px solid rgba(255,255,255,0.1);">
      <h1 style="margin: 0; font-size: 28px; color: #00d4ff;">🔐 Verify Your Email</h1>
    </header>

    <main style="padding: 20px 0;">
      <p style="font-size: 16px;">Hi {username},</p>
      <p style="font-size: 15px;">Thanks for joining us! Please use the code below to activate your account:</p>

      <div style="text-align: center; margin: 30px 0;">
        <span style="font-size: 36px; font-weight: 600; letter-spacing: 8px; color: #00f0ff; text-shadow: 0 0 10px rgba(0,255,255,0.5);">
          {verificationCode}
        </span>
      </div>

      <p style="font-size: 15px;">This code expires in <strong>15 minutes</strong>.</p>
      <p style="font-size: 14px; color: #b2d8f9;">If you didn’t request this, you can safely ignore this email.</p>

      <p style="margin-top: 30px;">Best,<br><span style="color: #88e0ff;">The MERN Auth Team</span></p>
    </main>

    <footer style="text-align: center; font-size: 12px; color: #a0bcd3; margin-top: 30px; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 10px;">
      <p>This is an automated message — please don’t reply.</p>
    </footer>

  </div>

</body>
</html>
`;

export const PASSWORD_RESET_SUCCESS_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Password Reset Successful</title>
</head>
<body style="margin: 0; padding: 0; background: linear-gradient(135deg, #0f2027, #203a43, #2c5364); font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #ffffff;">

  <div style="max-width: 600px; margin: 40px auto; padding: 30px; background: rgba(255, 255, 255, 0.05); border-radius: 16px; backdrop-filter: blur(12px); box-shadow: 0 8px 32px rgba(31, 38, 135, 0.37); border: 1px solid rgba(255, 255, 255, 0.18);">

    <h1 style="text-align: center; color: #00ffbf;">✅ Password Reset Successful</h1>
    <p>Hi {username},</p>
    <p>Your password was successfully reset for the account {email}. If this wasn’t you, please contact our support immediately.</p>

    <p>For your safety, we recommend:</p>
    <ul>
      <li>Use a strong, unique password</li>
      <li>Enable two-factor authentication</li>
      <li>Don’t reuse passwords</li>
    </ul>

    <p style="margin-top: 30px;">Stay safe,<br><span style="color: #88e0ff;">The MERN Auth Team</span></p>

    <footer style="text-align: center; font-size: 12px; color: #a0bcd3; margin-top: 30px; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 10px;">
      <p>This is an automated message — please don’t reply.</p>
    </footer>

  </div>

</body>
</html>
`;

export const PASSWORD_RESET_REQUEST_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Reset Your Password</title>
</head>
<body style="margin: 0; padding: 0; background: linear-gradient(135deg, #0f2027, #203a43, #2c5364); font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #ffffff;">

  <div style="max-width: 600px; margin: 40px auto; padding: 30px; background: rgba(255, 255, 255, 0.05); border-radius: 16px; backdrop-filter: blur(12px); box-shadow: 0 8px 32px rgba(31, 38, 135, 0.37); border: 1px solid rgba(255, 255, 255, 0.18);">

    <h1 style="text-align: center; color: #00c3ff;">🔁 Reset Your Password</h1>
    <p>Hi {username},</p>
    <p>We received a request to reset your password. If you didn't make this request, you can ignore this message.</p>

    <p>To reset your password, click the link below:</p>
    <div style="text-align: center; margin: 30px 0;">
      <a href="{resetURL}" style="background-color: #00e5ff; color: black; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Reset Password</a>
    </div>
    <p>This link will expire in <strong>1 hour</strong> for security purposes.</p>

    <p style="margin-top: 30px;">Best regards,<br><span style="color: #88e0ff;">The MERN Auth Team</span></p>

    <footer style="text-align: center; font-size: 12px; color: #a0bcd3; margin-top: 30px; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 10px;">
      <p>This is an automated message — please don’t reply.</p>
    </footer>

  </div>

</body>
</html>
`;

export const WELCOME_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Welcome to MERN Auth</title>
</head>
<body style="margin: 0; padding: 0; background: linear-gradient(135deg, #0f2027, #203a43, #2c5364); font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #ffffff;">

  <div style="max-width: 600px; margin: 40px auto; padding: 30px; background: rgba(255, 255, 255, 0.05); border-radius: 16px; backdrop-filter: blur(12px); box-shadow: 0 8px 32px rgba(31, 38, 135, 0.37); border: 1px solid rgba(255, 255, 255, 0.18);">

    <h1 style="text-align: center; color: #00fffb;">👋 Welcome to MERN Auth</h1>
    <p>Hi {username},</p>
    <p>Welcome aboard! Your account under {email} has been successfully created and you're now part of the MERN Auth ecosystem.</p>

    <p>You can now log in securely, manage your account, and explore our features.</p>

    <p style="margin-top: 30px;">Let’s build something awesome together,<br><span style="color: #88e0ff;">The MERN Auth Team</span></p>

    <footer style="text-align: center; font-size: 12px; color: #a0bcd3; margin-top: 30px; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 10px;">
      <p>This is an automated message — please don’t reply.</p>
    </footer>

  </div>

</body>
</html>
`;
