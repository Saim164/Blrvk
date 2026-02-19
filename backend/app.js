require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Resend } = require('resend');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const frontendPath = path.join(__dirname , "frontend");
app.use(express.static(frontendPath));

const resend = new Resend(process.env.RESEND_API_KEY);

app.get("/" , (req , res)=>{
    res.sendFile(path.join(frontendPath, "html/index.html"));
})

app.get("/demo" , (req , res)=>{
    res.sendFile(path.join(frontendPath, "html/demo.html"));
})

app.get("/getintouch" , (req , res)=>{
    res.sendFile(path.join(frontendPath, "html/form.html"));
})

app.get("/consult" , (req , res)=>{
    res.sendFile(path.join(frontendPath, "html/consult.html"));
})

app.get("/termsandconditions" , (req , res)=>{
    res.sendFile(path.join(frontendPath, "html/terms.html"));
})

app.get("/contacts" , (req , res)=>{
    res.sendFile(path.join(frontendPath, "html/contact.html"));
})

app.get("/success" , (req,res)=>{
    res.sendFile(path.join(frontendPath, "html/success.html"));
})

app.get("/error" , (req,res)=>{
    res.sendFile(path.join(frontendPath, "html/error.html"));
})

app.post('/send-form', async (req, res) => {
    const { name, email, business, region, des } = req.body;

    try {
        // Email to website owner
        await resend.emails.send({
            from: 'no-reply@mail.blrvk.com', // your verified domain
            to: 'swork2368@gmail.com',       // the user who submitted the form
            subject: `New Contact Form Submission from ${name}`,
            html: `
                <h3>New Form Submission</h3>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Business:</strong> ${business}</p>
                <p><strong>Region:</strong> ${region}</p>
                <p><strong>Message:</strong> ${des}</p>
            `,
        });

        // Confirmation email to user
        await resend.emails.send({
            from: 'no-reply@mail.blrvk.com',   // your verified domain
            to: email,                         // the user who submitted the form
            subject: 'Thank you! We received your message',
            html: `
                <h2>Thank you for contacting us!</h2>
                <p>Hi ${name},</p>
                <p>We have successfully received your message and our team will review it shortly.</p>
                <p>If necessary, we will reach out to you at <strong>${email}</strong>.</p>
                <p>Thank you for taking the time to get in touch!</p>
                <p>- The BLRVK team</p>
                <br>
                <p style="font-size: 0.9em; color: #777;">This is an automated message
                from mail.blrvk.com. Please do not reply to this email.</p>
                `
        });

            res.redirect('/success');
    } catch (err) {
        console.error(err);
        res.redirect('/error');
    }
});

app.post('/newsletter', async (req, res) => {
    const { email } = req.body;

    try {
        // Email to website owner
        await resend.emails.send({             // verified domain
            from: 'no-reply@mail.blrvk.com',   // the user who submitted the form
            to: 'swork2368@gmail.com',
            subject: `New Newsletter Signup: ${email}`,
            html: `<p>New subscriber email: ${email}</p>`,
        });

        // Optional: confirmation email to user
        await resend.emails.send({
            from: 'no-reply@mail.blrvk.com',  // verified domain
            to: email,                        // subscriber's email
            subject: 'Thank you for subscribing!',
            html: `
                <h2>Welcome!</h2>
                <p>Hi there,</p>
                <p>Thank you for subscribing to our newsletter. You'll now receive updates, news, and insights directly to your inbox.</p>
                <p>We're excited to have you on board!</p>
                <p>- The BLRVK team</p>
                <br>
                <p style="font-size: 0.9em; color: #777;">
                This is an automated message from <strong>mail.blrvk.com</strong>. 
                Please do not reply to this email.
                </p>
                `
});

            res.redirect('/success');
    } catch (err) {
        console.error(err);
        res.redirect('/error');
    }
});

app.listen(port, '0.0.0.0' , () => {
    console.log(`Backend is running on port ${port}`);
});