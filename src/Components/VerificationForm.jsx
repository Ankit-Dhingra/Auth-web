import React from 'react'

const VerificationForm = () => {
  
  handle otpSubmit()

  return (
    <div>
      <h1>Verification Form</h1>
      <form action="submit">
        <div className="flex flex-col gap-1">
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="h-10 rounded-md border border-gray-300 px-2 text-sm
                           focus:outline-none focus:ring-2 focus:ring-black/80
                           focus:border-black"
              />
            </div>

            <input type="otp" />

            
      </form>

      <form>
        <div className="flex flex-col gap-1">
              <label
                htmlFor="mobile"
                className="text-sm font-medium text-gray-700"
              >
                Mobile Number
              </label>
              <input
                id="mobile"
                type="tel"
                name="mobile"
                placeholder="Enter your mobile number"
                value={formData.mobile}
                onChange={handleChange}
                className="h-10 rounded-md border border-gray-300 px-2 text-sm
                           focus:outline-none focus:ring-2 focus:ring-black/80
                           focus:border-black"
              />
              <input type="otp" />
            </div>
      </form>
    </div>
  )
}

export default VerificationForm
