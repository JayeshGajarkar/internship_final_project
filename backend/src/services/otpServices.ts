const nodemailer = require('nodemailer');
let otp = {};

export class OTPService {
    static async sendOtp(email:string,str:string):Promise<void>{

        const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();

        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'projectmanagementtool101@gmail.com',
                pass: 'gldj gynq tbup usdd'
            }
        });

        let mailOptions = {
            from: 'projectmanagementtool101@gmail.com',
            to: email,
            subject: 'Your OTP for Project Management Tool',
            html: `<p>Dear User,</p>
                   <p>Your One-Time Password (OTP) for accessing the Project Management Tool is:</p>
                   <h2>${generatedOtp}</h2>
                   <p>Please use this OTP to ${str}. This OTP is valid for 1 minute.</p>
                   <p>Thank you,</p>
                   <p>Project Management Tool Team</p>`
        };

        try {
            let info = await transporter.sendMail(mailOptions);
            console.log('Email sent: ' + info.response);
            otp[email] = generatedOtp;

            setTimeout(() => {
                delete otp[email];
            }, 60 * 1000);
     
        } catch (error) {
            throw error;
        }
    }

    static verifyOtp(email:string, userOtp:string):boolean {
        if (otp[email] && otp[email] === userOtp) {
            delete otp[email];
            return true;
        } else {
            return false;
        }
    }
}

