// const generateOTP = require("./fotp");

function generateOTP() {
  // Declare a digits variable
  // which stores all digits
  var digits = "0123456789";
  let OTP = "";
  for (let i = 0; i < 6; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
}

test("/otpCheck", () => {
  expect(generateOTP().length).toBe(6);
});

