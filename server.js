const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors'); // Import the cors package

const app = express();

app.use(cors()); // Use cors middleware
app.use(bodyParser.json());
const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'ophelia.mitchell@ethereal.email',
        pass: '7ZdwmrB8S33TrFScQw'
    }
});

app.post('/api/send-email', async (req, res) => {
    const { name, email, message ,contactNumber,societyName , societAddress, noOfMembers ,inquiryType} = req.body;

    const mailOptions = {
        from: 'ophelia.mitchell@ethereal.email', // Use your Ethereal Email address here
        to: 'anishgehlot11@gmail.com', // Use your actual recipient email address
        subject: 'New Contact Form Submission',
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message} \nContactNumber: ${contactNumber} 
        \nSociet yName: ${societAddress}
        \nSociety Address: ${societAddress}
        \nsNo.of Members: ${noOfMembers}
        Role: ${inquiryType}` ,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.messageId);
        console.log('Preview URL:', nodemailer.getTestMessageUrl(info)); // This will provide you with a URL to view the sent email on Ethereal Email
        res.status(200).send('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Error sending email');
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});