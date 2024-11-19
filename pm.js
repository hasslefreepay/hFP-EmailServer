const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'hasslefreepay@gmail.com',
        pass: '' // Considera usar un "App Password" para mayor seguridad
    }
});
let htmlContent = `
  <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; }
        .header { color: #2c3e50; font-size: 24px; text-align: center; }
        .content { margin: 20px;
         text-align: center;
        }
        .button { 
          background-color: #3498db; 
          color: white; 
          padding: 10px 20px; 
          text-align: center; 
          text-decoration: none; 
          border-radius: 5px;
          display: inline-block;
        }
        .row { display: flex; justify-content: center; }
        .numero { 
          font-size: 40px; 
          font-weight: bold; 
          color: #111723; 
          margin: 20px; 
          padding: 20px; 
          border: 1px solid #111723; 
          border-radius: 8px; 
        }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        table, th, td { border: 1px solid #ddd; }
        th, td { padding: 10px; text-align: center; }
        img { width: 150px; height: auto; border-radius: 8px; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>¡Bienvenido a HassleFreePay!</h1>
      </div>
      <div class="content">
        <p>Estimado usuario,</p>
        <p>Gracias por usar nuestro servicio. Estamos emocionados de tenerte con nosotros.</p>
        
        <h2>este es tu codigo de verificacion</h2>
        <div class="row">
             <div class="numero">
        1
            </div>
            <div class="numero">
        2
            </div>
            <div class="numero">
        3
            </div>
            <div class="numero">
        4
            </div>
            <div class="numero">
        5
            </div>
            <div class="numero">
        6
            </div>
        </div>
        <p>Para comenzar a utilizar tu cuenta, usa este codigo</p>
        
        <p>Si tienes alguna pregunta, no dudes en contactarnos.</p>
      </div>
    </body>
  </html>
`;

let mailOptions = {
    from: 'hasslefreepay@gmail.com',
    to: 'andresvitola12@gmail.com',
    subject: "hola",
    text: "hola",
    html:htmlContent,
};

transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.log('Error al enviar el correo: ' + error);
    }else console.log('Correo enviado: ' + info.response);
});
