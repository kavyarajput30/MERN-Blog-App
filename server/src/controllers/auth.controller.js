import User from "../models/User.model.js";
import wrapAsync from "../utils/WrapAsync.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
import APIResponce from "../utils/APIResponce.js";
import crypto from "crypto";
import nodemailer from "nodemailer";

// ── helpers ────────────────────────────────────────────────────────────────

function createTransporter() {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, // Gmail App Password (not your real password)
    },
  });
}

// ── signup ─────────────────────────────────────────────────────────────────

const signup = wrapAsync(async (req, res, next) => {
  const { email, username, password } = req.body;
  if (
    !email ||
    !username ||
    !password ||
    username === " " ||
    email === " " ||
    password === " "
  ) {
    return next(errorHandler(400, "All fields are required"));
  }
  const existedUser = await User.findOne({ email });
  if (existedUser) return next(errorHandler(400, "User already exists"));

  const hashedpass = bcryptjs.hashSync(password, 10);
  const user = await User.create({ email, username, password: hashedpass });
  if (!user) return next(errorHandler(500, "Error while creating user"));

  return res
    .status(200)
    .json(new APIResponce(200, "User created successfully", user, true));
});

// ── signin ─────────────────────────────────────────────────────────────────

const signin = wrapAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password || email === " " || password === " ") {
    return next(errorHandler(400, "All fields are required"));
  }
  const user = await User.findOne({ email });
  if (!user) return next(errorHandler(404, "User not found"));

  const matchPass = bcryptjs.compareSync(password, user.password);
  if (!matchPass) return next(errorHandler(400, "Invalid credentials"));

  const accessToken = jwt.sign(
    { id: user._id, username: user.username, isAdmin: user.isAdmin },
    process.env.JWT_SECRET,
  );
  const options = { httpOnly: true, secure: true };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .json(new APIResponce(200, "User Logged In successfully", user, true));
});

// ── googleSignIn ───────────────────────────────────────────────────────────

const googleSignIn = wrapAsync(async (req, res, next) => {
  const { name, email, photourl } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    const accessToken = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
    );
    const options = { httpOnly: true, secure: true };
    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .json(new APIResponce(200, "User Exists", user, true));
  }

  const generatedPassword = "123456789" + name;
  const hashedpass = bcryptjs.hashSync(generatedPassword, 10);
  const newUser = await User.create({
    username:
      name.toLowerCase().split(" ").join("") +
      Math.random().toString(9).slice(-4),
    email,
    password: hashedpass,
    photourl,
  });

  if (!newUser) return next(errorHandler(500, "Error while creating user"));

  const accessToken = jwt.sign(
    { id: newUser._id, username: newUser.username, isAdmin: newUser.isAdmin },
    process.env.JWT_SECRET,
  );
  const options = { httpOnly: true, secure: true };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .json(new APIResponce(200, "User created successfully", newUser, true));
});

// ── signout ────────────────────────────────────────────────────────────────

const signout = wrapAsync(async (req, res, next) => {
  const { accessToken } = req.cookies;
  if (!accessToken)
    return next(errorHandler(401, "User is already signed out"));

  const options = { httpOnly: true, secure: true };
  return res
    .status(200)
    .clearCookie("accessToken", options)
    .json(new APIResponce(200, "User logout Sucessfully", null, true));
});

// ── forgotPassword ─────────────────────────────────────────────────────────
// POST /api/v1/auth/forgot-password
// Body: { email }

const forgotPassword = wrapAsync(async (req, res, next) => {
  const { email } = req.body;
  if (!email) return next(errorHandler(400, "Email is required"));

  const user = await User.findOne({ email });
  // Always respond the same way to avoid leaking whether an email exists
  if (!user) {
    return res
      .status(200)
      .json(
        new APIResponce(
          200,
          "If that email exists, a reset link has been sent.",
          null,
          true,
        ),
      );
  }

  // Generate a secure random token
  const rawToken = crypto.randomBytes(32).toString("hex");
  const hashedToken = crypto
    .createHash("sha256")
    .update(rawToken)
    .digest("hex");

  // Store hashed token + 1-hour expiry
  user.resetPasswordToken = hashedToken;
  user.resetPasswordExpiry = Date.now() + 60 * 60 * 1000; // 1 hour
  await user.save();

  // Build reset URL — use CLIENT_URL env var or fall back to localhost
  const clientUrl = process.env.CLIENT_URL || "http://localhost:5173";
  const resetUrl = `${clientUrl}/reset-password/${rawToken}`;

  // Send email
  try {
    const transporter = createTransporter();
    await transporter.sendMail({
      from: `"Kavya's Blog" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: "Reset your password — Kavya's Blog",
      html: `
        <div style="font-family: 'DM Sans', Arial, sans-serif; max-width: 520px; margin: 0 auto; padding: 2rem; background: #f9f6f0; border-radius: 12px;">
          <h2 style="font-family: Georgia, serif; font-size: 1.6rem; color: #1a1a2e; margin-bottom: 0.5rem;">Reset your password</h2>
          <p style="color: #6b7280; font-size: 0.95rem; line-height: 1.7; margin-bottom: 1.5rem;">
            Hi <strong>${user.username}</strong>, we received a request to reset your password.
            Click the button below to choose a new one. The link expires in <strong>1 hour</strong>.
          </p>
          <a href="${resetUrl}"
             style="display: inline-block; padding: 13px 28px; background: #0d9488; color: white;
                    text-decoration: none; border-radius: 999px; font-size: 0.9rem; font-weight: 500;">
            Reset Password →
          </a>
          <p style="color: #9ca3af; font-size: 0.8rem; margin-top: 2rem; line-height: 1.6;">
            If you didn't request this, you can safely ignore this email.<br/>
            This link will expire at ${new Date(user.resetPasswordExpiry).toUTCString()}.
          </p>
          <hr style="border: none; border-top: 1px solid #e5e0d8; margin: 1.5rem 0;" />
          <p style="color: #9ca3af; font-size: 0.75rem;">
            Kavya's Blog · <a href="${clientUrl}" style="color: #0d9488;">${clientUrl}</a>
          </p>
        </div>
      `,
    });
  } catch (err) {
    // Roll back the token if email fails
    user.resetPasswordToken = null;
    user.resetPasswordExpiry = null;
    await user.save();
    return next(
      errorHandler(500, "Could not send reset email. Please try again later."),
    );
  }

  return res
    .status(200)
    .json(
      new APIResponce(200, "Reset link sent — check your inbox.", null, true),
    );
});

// ── resetPassword ──────────────────────────────────────────────────────────
// POST /api/v1/auth/reset-password/:token
// Body: { password }

const resetPassword = wrapAsync(async (req, res, next) => {
  const { token } = req.params;
  const { password } = req.body;

  if (!token) return next(errorHandler(400, "Reset token is required"));
  if (!password || password.length < 6) {
    return next(errorHandler(400, "Password must be at least 6 characters"));
  }

  // Hash the incoming raw token to match what's stored
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpiry: { $gt: Date.now() }, // not expired
  });

  if (!user) {
    return next(errorHandler(400, "Reset link is invalid or has expired."));
  }

  // Update password and clear the token
  user.password = bcryptjs.hashSync(password, 10);
  user.resetPasswordToken = null;
  user.resetPasswordExpiry = null;
  await user.save();

  return res
    .status(200)
    .json(
      new APIResponce(
        200,
        "Password reset successfully. You can now sign in.",
        null,
        true,
      ),
    );
});

export { signup, signin, googleSignIn, signout, forgotPassword, resetPassword };
