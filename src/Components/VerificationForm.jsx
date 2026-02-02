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

  // ✅ Redirect when both verified
  useEffect(() => {
    if (user?.isEmailVerified && user?.isMobileVerified) {
      navigate("/", { replace: true });
    }
  }, [user, navigate]);

  // ⏱️ Email timer
  useEffect(() => {
    if (emailTimer <= 0) return;
    const interval = setInterval(() => {
      setEmailTimer((t) => t - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [emailTimer]);

  // ⏱️ Mobile timer
  useEffect(() => {
    if (mobileTimer <= 0) return;
    const interval = setInterval(() => {
      setMobileTimer((t) => t - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [mobileTimer]);

  // ---------- SEND / RESEND OTP ----------
  const handleEmailOTP = async () => {
    await requestOTP({
      email: user?.email,
      purpose: "signup",
    });
    setSentEmailOTP(true);
    setEmailTimer(30);
  };

  const handleMobileOTP = async () => {
    await requestOTP({
      mobile: user?.mobile,
      purpose: "signup",
    });
    setSentMobileOTP(true);
    setMobileTimer(30);
  };

  // ---------- VERIFY OTP ----------
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
    <div className="max-w-md mx-auto space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Verification</h2>
        <p className="text-sm text-gray-600">
          Please verify your Email and Mobile Number
        </p>
      </div>

      {/* ================= EMAIL ================= */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Email</label>

        <div className="flex items-center gap-2">
          <input
            type="email"
            value={user?.email || ""}
            disabled
            className="h-10 flex-1 rounded-md border px-2 text-sm bg-gray-100"
          />

          {user?.isEmailVerified ? (
            <span className="text-green-600 font-bold">✔</span>
          ) : (
            <button
              onClick={handleEmailOTP}
              className="px-3 py-1 text-sm border rounded"
            >
              Send OTP
            </button>
          )}
        </div>

        {!user?.isEmailVerified && sentEmailOTP && (
          <div className="space-y-2">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Enter Email OTP"
                value={emailOTP}
                onChange={(e) => setEmailOTP(e.target.value)}
                className="h-10 flex-1 rounded-md border px-2 text-sm"
              />
              <button
                onClick={verifyEmailOTP}
                className="px-3 py-1 text-sm border rounded"
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
        <label className="text-sm font-medium">Mobile Number</label>

        <div className="flex items-center gap-2">
          <input
            type="tel"
            value={user?.mobile || ""}
            disabled
            className="h-10 flex-1 rounded-md border px-2 text-sm bg-gray-100"
          />

          {user?.isMobileVerified ? (
            <span className="text-green-600 font-bold">✔</span>
          ) : (
            <button
              onClick={handleMobileOTP}
              className="px-3 py-1 text-sm border rounded"
            >
              Send OTP
            </button>
          )}
        </div>

        {!user?.isMobileVerified && sentMobileOTP && (
          <div className="space-y-2">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Enter Mobile OTP"
                value={mobileOTP}
                onChange={(e) => setMobileOTP(e.target.value)}
                className="h-10 flex-1 rounded-md border px-2 text-sm"
              />
              <button
                onClick={verifyMobileOTP}
                className="px-3 py-1 text-sm border rounded"
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
  );
};

export default VerificationForm;














// import React, { useEffect, useState } from "react";
// import { useAuth } from "../hooks/useAuth";
// import { requestOTP, verifyOTP } from "../services/auth.service";
// import { useNavigate } from "react-router-dom";

// const VerificationForm = () => {
//   const { user, refreshUser } = useAuth();
//   const navigate = useNavigate();

//   const [sentEmailOTP, setSentEmailOTP] = useState(false);
//   const [sentMobileOTP, setSentMobileOTP] = useState(false);

//   const [emailOTP, setEmailOTP] = useState("");
//   const [mobileOTP, setMobileOTP] = useState("");

//   // 🔁 redirect when both verified
//   useEffect(() => {
//     if (user?.isEmailVerified && user?.isMobileVerified) {
//       navigate("/", { replace: true });
//     }
//   }, [user, navigate]);

//   // ---------- SEND OTP ----------
//   const handleEmailOTP = async () => {
//     await requestOTP({
//       email: user?.email,
//       purpose: "signup",
//     });
//     setSentEmailOTP(true);
//   };

//   const handleMobileOTP = async () => {
//     await requestOTP({
//       mobile: user?.mobile,
//       purpose: "signup",
//     });
//     setSentMobileOTP(true);
//   };

//   // ---------- VERIFY OTP ----------
//   const verifyEmailOTP = async () => {
//     await verifyOTP({
//       email: user?.email,
//       otp: emailOTP,
//       purpose: "signup",
//     });

//     setSentEmailOTP(false);
//     setEmailOTP("");

//     await refreshUser(); // ✅ source of truth
//   };

//   const verifyMobileOTP = async () => {
//     await verifyOTP({
//       mobile: user?.mobile,
//       otp: mobileOTP,
//       purpose: "signup",
//     });

//     setSentMobileOTP(false);
//     setMobileOTP("");

//     await refreshUser(); // ✅ source of truth
//   };

//   return (
//     <div className="max-w-md mx-auto space-y-6">
//       <div>
//         <h2 className="text-xl font-semibold">Verification</h2>
//         <p className="text-sm text-gray-600">
//           Please verify your Email and Mobile Number
//         </p>
//       </div>

//       {/* ================= EMAIL ================= */}
//       <div className="space-y-2">
//         <label className="text-sm font-medium">Email</label>

//         <div className="flex items-center gap-2">
//           <input
//             type="email"
//             value={user?.email || ""}
//             disabled
//             className="h-10 flex-1 rounded-md border px-2 text-sm bg-gray-100"
//           />

//           {user?.isEmailVerified ? (
//             <span className="text-green-600 font-bold">✔</span>
//           ) : (
//             <button
//               onClick={handleEmailOTP}
//               className="px-3 py-1 text-sm border rounded"
//             >
//               Send OTP
//             </button>
//           )}
//         </div>

//         {!user?.isEmailVerified && sentEmailOTP && (
//           <div className="flex gap-2">
//             <input
//               type="text"
//               placeholder="Enter Email OTP"
//               value={emailOTP}
//               onChange={(e) => setEmailOTP(e.target.value)}
//               className="h-10 flex-1 rounded-md border px-2 text-sm"
//             />
//             <button
//               onClick={verifyEmailOTP}
//               className="px-3 py-1 text-sm border rounded"
//             >
//               Verify
//             </button>
//           </div>
//         )}
//       </div>

//       {/* ================= MOBILE ================= */}
//       <div className="space-y-2">
//         <label className="text-sm font-medium">Mobile Number</label>

//         <div className="flex items-center gap-2">
//           <input
//             type="tel"
//             value={user?.mobile || ""}
//             disabled
//             className="h-10 flex-1 rounded-md border px-2 text-sm bg-gray-100"
//           />

//           {user?.isMobileVerified ? (
//             <span className="text-green-600 font-bold">✔</span>
//           ) : (
//             <button
//               onClick={handleMobileOTP}
//               className="px-3 py-1 text-sm border rounded"
//             >
//               Send OTP
//             </button>
//           )}
//         </div>

//         {!user?.isMobileVerified && sentMobileOTP && (
//           <div className="flex gap-2">
//             <input
//               type="text"
//               placeholder="Enter Mobile OTP"
//               value={mobileOTP}
//               onChange={(e) => setMobileOTP(e.target.value)}
//               className="h-10 flex-1 rounded-md border px-2 text-sm"
//             />
//             <button
//               onClick={verifyMobileOTP}
//               className="px-3 py-1 text-sm border rounded"
//             >
//               Verify
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default VerificationForm;
