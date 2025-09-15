
# AI-Powered UV Index Alert and Recommendation System

## Overview

This project is a web-based application that provides **real-time UV index monitoring** and **AI-driven recommendations** to support health, agriculture, and environmental safety. The system integrates React for the frontend, Node.js (Express) for the backend, and external services (OpenUV, Twilio, Gemini) to deliver alerts and actionable insights based on user location.

## Features

* **Location-Based UV Monitoring:** Uses latitude and longitude to determine the UV index for a specific location.
* **Real-time UV Index Retrieval:** Fetches live UV data via the OpenUV API.
* **Automated SMS Alerts:** Sends SMS notifications via Twilio when UV levels exceed a safe threshold.
* **AI-Generated Recommendations:** Leverages Gemini to provide tailored advice for:
    * **Health:** Safe sun exposure and precautions.
    * **Agriculture:** Crop-specific insights for UV-related risks.
    * **Environment:** Sustainability recommendations.

## Technology Stack

* **Frontend:** React
* **Backend:** Node.js (Express)
* **External Services:** OpenUV, Twilio, Google Gemini

---

## Installation and Setup

Copy the commands below into your terminal and follow the steps.

### 1. Clone the repository and install dependencies

```bash
git clone [https://github.com/nivyaalikanti/Sun-Safe.git](https://github.com/nivyaalikanti/Sun-Safe.git)
cd your-repo
npm install
````

### 2\. Configure Environment Variables

Create a `.env` file in the project's root directory and add the following variables. Replace the placeholder values with your actual API keys and credentials.

```env
OPENUV_API_KEY=your_openuv_api_key
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=your_twilio_phone_number
GEMINI_API_KEY=your_gemini_api_key
```

### 3\. Run the application

```bash
npm run dev
```

The application will be accessible at `http://localhost:5173`.

-----

## Usage

1.  Open the application in your web browser.
2.  Enter your location details (latitude and longitude) and a phone number.
3.  The backend will fetch the current UV index.
4.  If the UV index exceeds the safe threshold, an SMS alert will be sent.
5.  Gemini will generate and display tailored recommendations.

-----

## Project Structure

```
/your-repo
├── /frontend/        # React application source
├── /backend/         # Node.js (Express) API
├── .env              # Environment variables (secret)
├── package.json      # Project dependencies and scripts
└── README.md
```

-----

## Future Enhancements

  * Wearable device integration for live exposure tracking.
  * Inclusion of air quality and weather-layered insights.
  * Multi-language support for SMS and recommendations.

<!-- end list -->

```
```
