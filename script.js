// Function to make the API call to send OTP
function sendOTP() {
  const mobileNumber = document.getElementById("mobileNumber").value;
fetch("https://fmserver.escorts.co.in/authenticate/generateOtp", {
method: "POST",
body:JSON.stringify({
    number: mobileNumber
}),
headers: {
    "Content-type": "application/json; charset=UTF-8"
}
})
.then(response => response.json())
.then(json => {console.log(json);
  const status = document.getElementById("status");
  status.textContent = json.success?"OTP has been sent":"Mobile number is not valid";});
}

let token;
function validateOTP() {
  const mobileNumber = document.getElementById("mobileNumber").value;
  const otp = document.getElementById("otp").value;

  // Make sure to replace 'YOUR_VALIDATE_OTP_API_ENDPOINT' with the actual API endpoint URL for OTP validation
  const validateOTPApiEndpoint = "https://fmserver.escorts.co.in/authenticate/verifyotp";
  const requestPayload = {
    otp: otp,
    number: mobileNumber,
    token:"asbdjhasbdja",  // we can add anything in the token
    android_id:"dasdadasd" // we can add anything in the android_id
  };

  fetch(validateOTPApiEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestPayload),
  })
    .then((response) => response.json())
    .then((data) => {
      const status = document.getElementById("status");
      status.textContent = !data.success?"OTP not Validated":"OTP validated";
      console.log("Response:", data);
      token=data.token;
    })
    .catch((error) => {
      console.log("Error:", error);
    });
}
function deleteData() {
  console.log(token);
  const mobileNumber = document.getElementById("mobileNumber").value;

  const deleteDataApiEndpoint = "https://fmserver.escorts.co.in/authenticate";
  const requestPayload = {
    token:token,
  };

  fetch(deleteDataApiEndpoint, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },

  })
    .then((response) => response.json())
    .then((data) => {
      const status = document.getElementById("status");
      status.textContent = data.message;
      console.log("Response:", data);
    })
    .catch((error) => {
      console.log("Error:", error);
    });
}

const sendOTPBtn = document.getElementById("sendOTPBtn");
sendOTPBtn.addEventListener("click", sendOTP);

// Add event listener to the validate OTP button
const validateOTPBtn = document.getElementById("validateOTPBtn");
validateOTPBtn.addEventListener("click", validateOTP);

// Add event listener to the delete data button
const deleteDataBtn = document.getElementById("deleteDataBtn");
deleteDataBtn.addEventListener("click", deleteData);
