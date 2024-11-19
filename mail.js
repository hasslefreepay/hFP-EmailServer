const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
const port = 3000;
app.use(cors({ origin: '*' }));
// Middleware para parsear el cuerpo de la solicitud
app.use(express.json());

app.use(morgan(':method :url :status :response-time ms - :res[content-length]'));

// Middleware para capturar errores
app.use((err, req, res, next) => {
    console.error('Error:', err.stack);
    res.status(500).json({ message: 'Ocurrió un error en el servidor', error: err.message });
});

// Crear un transporte de correo (con Gmail como ejemplo)
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'hasslefreepay@gmail.com',
        pass: 'gkyyqsxjzgapeqiv' // Considera usar un "App Password" para mayor seguridad
    }
});



// Ruta de la API para enviar un correo
app.post('/send-email', (req, res) => {
    const { to, numero } = req.body;

    let numerot=numero;

    let numeroStr = numerot.toString(); // Convertimos el número a cadena

// Dividimos el número en 6 partes
    let partes = [];
    for (let i = 0; i < 6; i++) {
        partes.push(numeroStr.slice(i, i + 1)); // Slice de 1 carácter por vez
    }

    let htmlContent = `
  <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; }
        .header { color: #2c3e50; font-size: 24px; text-align: center; display: flex; justify-content: center; align-items: center; }
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
        <img src="./src/icono.png" style="width: 100px">
      </div>
      <div class="content">
        <p>Estimado usuario, Gracias por usar nuestro servicio. Estamos emocionados de tenerte con nosotros.</p>
        
        <h2>este es tu codigo de verificacion</h2>
        <div class="row">
             <div class="numero">
        ${partes[0]}
            </div>
            <div class="numero">
        ${partes[1]}
            </div>
            <div class="numero">
        ${partes[2]}
            </div>
            <div class="numero">
        ${partes[3]}
            </div>
            <div class="numero">
        ${partes[4]}
            </div>
            <div class="numero">
        ${partes[5]}
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
        to: to,
        subject: "hola este es tu codigo de verificacion",
        text: "Codigo de verificacion",
        html:htmlContent,
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send('Error al enviar el correo: ' + error);
        }
            return res.status(200).json({
                message: `Correo enviado correctamente: ${info.response}`,
                numero: numerot});


    });

    console.log('Correo enviado a:', numero);
});


app.post('/send-emailT', (req, res) => {
    const { to, id, destino,cabtidad } = req.body;







    let htmlContent = `<html lang="es">
<head>
    <style>
        body {
            font-family: Arial, sans-serif;
            width: 100%;
            height: 100%;
            padding: 0;
        }
        .header { color: #2c3e50; font-size: 24px; text-align: center; display: flex; justify-content: center; align-items: center; }
        .content {
            width: 100%;

            flex-direction: column;
            margin: 20px;
            justify-content: center;
            align-items: center;

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

        .numero {
            font-size: 40px;
            font-weight: bold;
            color: #111723;
            margin: 20px;
            padding: 20px;
            border: 1px solid #111723;
            border-radius: 8px;
            width: 10%;
            max-width: 50px;
        }

    </style>
</head>
<body>
<div class="header">
    <h1>¡HassleFreePay!</h1>
    <img src="./src/icono.png" style="width: 80px">
</div>
<div class="content">

    <h3>¡Tu transferencia ha sido realizada con éxito!.</h3>

    <p>Nos complace informarte que tu solicitud de transferencia en HassleyFreePay ha sido procesada correctamente.</p>

    <h4>Referencia de Transferencia: ${id}</h4>

    <h4>Destinatario: ${destino}</h4>
    <h4>Cantidad Transferida: $${cabtidad}</h4>

    <p>Nos alegra saber que has podido hacer esta operación, y estamos seguros de que la persona a la que has transferido la cantidad estará igual de agradecida.</p>

    <p>Tu generosidad y confianza en nuestro servicio son lo que nos motiva a seguir brindándote lo mejor. Gracias por ser parte de la familia HassleyFreePay.

        Si tienes alguna duda o necesitas ayuda con futuras transferencias, no dudes en ponerte en contacto con nosotros. ¡Estamos aquí para ayudarte en cada paso!</p>
</div>
</body>
</html>
</html>
`;

    let mailOptions = {
        from: 'hasslefreepay@gmail.com',
        to: to,
        subject: "Transferencia Realizada",
        text: "Transferencia Realizada con exito",
        html:htmlContent,
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send('Error al enviar el correo: ' + error);
        }
        return res.status(200).json({
            message: `Correo enviado correctamente: ${info.response}`,});


    });

    console.log('Correo enviado a:', to);
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
