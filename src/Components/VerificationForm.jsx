import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { requestOTP, verifyOTP } from "../services/auth.service";
import { useNavigate } from "react-router-dom";

const VerificationForm = () => {
  const { user, refreshUser } = useAuth();
  const navigate = useNavigate();

  const [sentEmailOTP, setSentEmailOTP] = useState(false);
  const [sentMobileOTP, setSentMobileOTP] = useState(false);

  const [emailOTP, setEmailOTP] = useState("");
  const [mobileOTP, setMobileOTP] = useState("");

  const [emailTimer, setEmailTimer] = useState(0);
  const [mobileTimer, setMobileTimer] = useState(0);

  // Redirect when both verified
  useEffect(() => {
    if (user?.isEmailVerified && user?.isMobileVerified) {
      navigate("/", { replace: true });
    }
  }, [user, navigate]);

  // Email timer
  useEffect(() => {
    if (emailTimer <= 0) return;
    const i = setInterval(() => setEmailTimer((t) => t - 1), 1000);
    return () => clearInterval(i);
  }, [emailTimer]);

  // Mobile timer
  useEffect(() => {
    if (mobileTimer <= 0) return;
    const i = setInterval(() => setMobileTimer((t) => t - 1), 1000);
    return () => clearInterval(i);
  }, [mobileTimer]);

  // Send / Resend OTP
  const handleEmailOTP = async () => {
    await requestOTP({ email: user?.email, purpose: "signup" });
    setSentEmailOTP(true);
    setEmailTimer(30);
  };

  const handleMobileOTP = async () => {
    await requestOTP({ mobile: user?.mobile, purpose: "signup" });
    setSentMobileOTP(true);
    setMobileTimer(30);
  };

  // Verify OTP
  const verifyEmailOTP = async () => {
    await verifyOTP({
      email: user?.email,
      otp: emailOTP,
      purpose: "signup",
    });
    setEmailOTP("");
    setSentEmailOTP(false);
    setEmailTimer(0);
    await refreshUser();
  };

  const verifyMobileOTP = async () => {
    await verifyOTP({
      mobile: user?.mobile,
      otp: mobileOTP,
      purpose: "signup",
    });
    setMobileOTP("");
    setSentMobileOTP(false);
    setMobileTimer(0);
    await refreshUser();
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side – image */}
      <div className="hidden md:block w-2/5 bg-gray-100">
        <img
          src="/src/assets/Doodle2.jpg"
          alt="Verification"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right side – form */}
      <div className="w-full md:w-3/5 flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-md px-4 py-8 space-y-6">
          {/* Header */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Verify Your Account
            </h2>
            <p className="text-sm text-gray-600">
              Please verify your email and mobile number
            </p>
          </div>

          {/* ================= EMAIL ================= */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Email Address
            </label>

            <div className="flex items-center gap-2">
              <input
                type="email"
                value={user?.email || ""}
                disabled
                className="h-10 flex-1 rounded-md border border-gray-300 px-2 text-sm bg-gray-100"
              />

              {user?.isEmailVerified ? (
                <span className="text-green-600 font-bold text-lg">✔</span>
              ) : !sentEmailOTP ? (
                <button
                  onClick={handleEmailOTP}
                  className="h-10 px-3 text-sm border rounded-md hover:bg-gray-100"
                >
                  Send OTP
                </button>
              ) : null}
            </div>

            {!user?.isEmailVerified && sentEmailOTP && (
              <div className="space-y-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter Email OTP"
                    value={emailOTP}
                    onChange={(e) => setEmailOTP(e.target.value)}
                    className="h-10 flex-1 rounded-md border border-gray-300 px-2 text-sm"
                  />
                  <button
                    onClick={verifyEmailOTP}
                    className="h-10 px-3 text-sm bg-black text-white rounded-md hover:bg-black/90"
                  >
                    Verify
                  </button>
                </div>

                <button
                  onClick={handleEmailOTP}
                  disabled={emailTimer > 0}
                  className="text-sm text-blue-600 disabled:text-gray-400"
                >
                  {emailTimer > 0
                    ? `Resend OTP in ${emailTimer}s`
                    : "Resend OTP"}
                </button>
              </div>
            )}
          </div>

          {/* ================= MOBILE ================= */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Mobile Number
            </label>

            <div className="flex items-center gap-2">
              <input
                type="tel"
                value={user?.mobile || ""}
                disabled
                className="h-10 flex-1 rounded-md border border-gray-300 px-2 text-sm bg-gray-100"
              />

              {user?.isMobileVerified ? (
                <span className="text-green-600 font-bold text-lg">✔</span>
              ) : !sentMobileOTP ? (
                <button
                  onClick={handleMobileOTP}
                  className="h-10 px-3 text-sm border rounded-md hover:bg-gray-100"
                >
                  Send OTP
                </button>
              ) : null}
            </div>

            {!user?.isMobileVerified && sentMobileOTP && (
              <div className="space-y-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter Mobile OTP"
                    value={mobileOTP}
                    onChange={(e) => setMobileOTP(e.target.value)}
                    className="h-10 flex-1 rounded-md border border-gray-300 px-2 text-sm"
                  />
                  <button
                    onClick={verifyMobileOTP}
                    className="h-10 px-3 text-sm bg-black text-white rounded-md hover:bg-black/90"
                  >
                    Verify
                  </button>
                </div>

                <button
                  onClick={handleMobileOTP}
                  disabled={mobileTimer > 0}
                  className="text-sm text-blue-600 disabled:text-gray-400"
                >
                  {mobileTimer > 0
                    ? `Resend OTP in ${mobileTimer}s`
                    : "Resend OTP"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerificationForm;
