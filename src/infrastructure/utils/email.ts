import sgMail from '@sendgrid/mail'

export const emailValidationAccount =async (hash: string, email: string) => {
    
sgMail.setApiKey(process.env.SENDGRID_API_KEY || '')
const msg = {
  to: email, // Change to your recipient
  from: 'cfgarcesg@unipacifico.edu.co', // Change to your verified sender
  subject: 'Verify your account',
  text: 'You have created a new account in Shop XXX',
  html: `<div>
            <h3>Account verification</h3>
            <p>Click in the button below to verify your account</p>
            <a href="${process.env.HOST}/api/auth/verify/${hash}">Verify account</a>
        </div>`,
}
return await sgMail.send(msg)

}