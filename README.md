# AI-Powered UV Index Alert and Recommendation System

## Overview

This project is a web-based application that provides real-time UV index monitoring and AI-driven recommendations to support health, agriculture, and environmental safety. The system integrates React for the frontend, Node.js (Express) for the backend, and external services (OpenUV, Twilio, Gemini) to deliver alerts and actionable insights based on user location.

## Features

* Location-based UV monitoring using latitude and longitude.
* Real-time UV index retrieval via OpenUV API.
* Automated SMS alerts via Twilio when UV levels exceed safe thresholds.
* AI-generated recommendations through Gemini for:

  * Health — safe sun exposure guidance and precautions.
  * Agriculture — crop-specific insights for UV-related risks.
  * Environment — sustainability recommendations.

## Technology Stack

* Frontend: React
* Backend: Node.js (Express)
* External Services: OpenUV, Twilio, Google Gemini

## Installation and Setup

Copy the commands below into your terminal and follow the steps. All commands and `.env` variables are provided in one block to avoid breaking.

```bash
# 1. Clone repository and install dependencies
git clone https://github.com/your-repo.git
cd your-repo
npm install

# 2. Create .env in the project root with the variables below.
#    (Replace placeholder values with your actual keys.)
# .env content:
# OPENUV_API_KEY=your_openuv_api_key
# TWILIO_ACCOUNT_SID=your_twilio_account_sid
# TWILIO_AUTH_TOKEN=your_twilio_auth_token
# TWILIO_PHONE_NUMBER=your_twilio_phone_number
# GEMINI_API_KEY=your_gemini_api_key

# Example: create and open .env (Linux/macOS)
cat > .env <<EOL
OPENUV_API_KEY=your_openuv_api_key
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=your_twilio_phone_number
GEMINI_API_KEY=your_gemini_api_key
EOL

# 3. Run the application (adjust if you use separate scripts for frontend/backend)
npm run dev
```

## Usage

1. Open the React frontend in a browser.
2. Enter location details (latitude/longitude or allow location access) and a phone number.
3. Backend fetches current UV index from OpenUV and evaluates safety thresholds.
4. If UV exceeds threshold, Twilio sends an SMS alert to the provided number.
5. Gemini generates and returns tailored recommendations for health, crops, and environment.

## Project Structure (example)

```
/your-repo
  /frontend         # React app
  /backend          # Node + Express API
  README.md
  .env
```

## Future Enhancements

* Wearable device integration for live exposure tracking.
* Add air quality and weather-layered insights.
* Multi-language support for SMS and recommendations.

---


