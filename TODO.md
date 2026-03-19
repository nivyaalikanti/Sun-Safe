# Email Notification Integration TODO

## [x] 1. Create backend/services/emailService.js
   - Nodemailer Gmail transporter with sendEmail(to, subject, html)
   - Error logging

## [x] 2. Edit backend/cron/uvMonitor.js
   - Import sendEmail
   - Add sendEmail call after sendSMS in alert block (if email exists)
   - HTML message matching SMS content
   - Try-catch around both sends with logging
   - Added success log

## [x] 5. Add Email Support End-to-End
   - ✅ `backend/models/User.js`: Added `email: String, required: false`
   - ✅ `backend/routes/userRoutes.js`: Accept/store email
   - ✅ `frontend/src/components/SubscribeForm.jsx`: Email input field, state, form submit, reset

## [ ] 3. User Actions
   - Add `EMAIL_USER=yourgmail@gmail.com` and `EMAIL_PASS=your-16-char-app-password` to `.env`
   - Generate Gmail App Password: [Google Account > Security > App passwords](https://myaccount.google.com/apppasswords)
   - Restart backend: `cd backend && npm start`
   - Restart frontend: `cd frontend && npm run dev`

## [ ] 4. Test Full Flow
   - Frontend: Subscribe with name + email (+phone optional), check form
   - Backend: Verify DB has email field populated
   - Trigger UV alert: High UV location or wait cron
   - Check console: "Alert sent to phone and email"
   - Verify: Gmail inbox/sent/spam, Twilio SMS

