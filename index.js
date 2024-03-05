const express = require('express');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');

const serviceAccount = require('./serviceAccountKey.json'); // Path ke file kunci layanan

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = express();

// Middleware untuk membaca body permintaan sebagai JSON
app.use(bodyParser.json());

app.post('/api/notification/sendToAll', async (req, res) => {
    try {
        // Mendapatkan data notifikasi dari body permintaan
        const { title, body } = req.body;

        // Memastikan ada judul dan badan pesan
        if (!title || !body) {
            return res.status(400).send('Judul dan badan pesan harus disertakan');
        }

        const message = {
            notification: {
                title: title,
                body: body
            },
            token: 'fGPFY-raRuyPIDDlkmHzTM:APA91bFmVxfZykWx8Hdb6r9WzYF5NlYkBfTZcBfeCv2u9hrU5ebAIqouqtho-kpnBGvVIRMvDMk-ER9OyFw8_3ulY5Zvda7CkxZ-qPrJ00IhcA4km9VgmTQjZAfviJ7lpkW4dyYur2HN' // Mengirim notifikasi ke semua perangkat yang berlangganan topik 'all'
        };

        // Mengirim notifikasi menggunakan Firebase Admin SDK
        await admin.messaging().send(message);

        res.status(200).send('SUCCESS');
    } catch (err) {
        console.error(err);
        res.status(400).send('SOMETHING WENT WRONG');
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Server started'));





// const express = require('express');
// const bodyParser = require('body-parser');

// const app = express();
// const router = express.Router();

// // Middleware untuk membaca body permintaan sebagai JSON
// app.use(bodyParser.json());

// router.post('/sendToAll', async (req, res) => {
//     let fetch;
//     try {
//         fetch = (await import('node-fetch')).default;
        
//         // Mendapatkan data notifikasi dari body permintaan
//         const { title, body } = req.body;

//         // Memastikan ada judul dan badan pesan
//         if (!title || !body) {
//             return res.status(400).send('Judul dan badan pesan harus disertakan');
//         }
//         const notification = {
//             'title': title,
//             'body': body
//         };
//         //Your Token
//         const fcm_token = ['fGPFY-raRuyPIDDlkmHzTM:APA91bFmVxfZykWx8Hdb6r9WzYF5NlYkBfTZcBfeCv2u9hrU5ebAIqouqtho-kpnBGvVIRMvDMk-ER9OyFw8_3ulY5Zvda7CkxZ-qPrJ00IhcA4km9VgmTQjZAfviJ7lpkW4dyYur2HN',];
//         const notification_body = {
//             'notification': notification,
//             'registration_ids': fcm_token
//         };
//         const response = await fetch('https://fcm.googleapis.com/fcm/send', {
//             method: 'POST',
//             headers: {
//                 'Authorization': 'key=AAAANrVKZXU:APA91bGvzCbp016a23ABsOmrK4OAJ3kLI7X5TU2bpME1yvkPnpSEhTfdH7MI7hWE2oYJjyirQSHZ5A86asx1MxkecapBgirreQqxantWXq_jsnt1HXQifJXNjxICxyGZRu7DdV631MhL', // YOUR JEY SERVER FIREBASE
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(notification_body)
//         });

//         if (response.ok) {
//             res.status(200).send('SUCCESS');
//         } else {
//             res.status(400).send('SOMETHING WENT WRONG');
//         }
//     } catch (err) {
//         res.status(400).send('SOMETHING WENT WRONG');
//         console.error(err);
//     }
// });

// // Menggunakan router
// app.use('/api/notification', router);
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log('Server started'));




// const express = require('express');
// const bodyParser = require('body-parser');
// const fetch = require('node-fetch');

// const app = express();

// // Middleware untuk membaca body permintaan sebagai JSON
// app.use(bodyParser.json());

// // Penanganan rute POST langsung di aplikasi Express
// app.post('/api/notification/sendToAll', async (req, res) => {
//     try {
//         // Mendapatkan data notifikasi dari body permintaan
//         const { title, body } = req.body;

//         // Memastikan ada judul dan badan pesan
//         if (!title || !body) {
//             return res.status(400).send('Judul dan badan pesan harus disertakan');
//         }

//         // Token Firebase Cloud Messaging (FCM)
//         const fcm_tokens = ['fGPFY-raRuyPIDDlkmHzTM:APA91bFmVxfZykWx8Hdb6r9WzYF5NlYkBfTZcBfeCv2u9hrU5ebAIqouqtho-kpnBGvVIRMvDMk-ER9OyFw8_3ulY5Zvda7CkxZ-qPrJ00IhcA4km9VgmTQjZAfviJ7lpkW4dyYur2HN'];

//         // Persiapan payload notifikasi
//         const notification = {
//             title: title,
//             body: body
//         };

//         // Persiapan body permintaan untuk FCM
//         const notification_body = {
//             notification: notification,
//             registration_ids: fcm_tokens
//         };

//         // Kirim permintaan ke FCM
//         const response = await fetch('https://fcm.googleapis.com/fcm/send', {
//             method: 'POST',
//             headers: {
//                 'Authorization': 'key=AAAANrVKZXU:APA91bGvzCbp016a23ABsOmrK4OAJ3kLI7X5TU2bpME1yvkPnpSEhTfdH7MI7hWE2oYJjyirQSHZ5A86asx1MxkecapBgirreQqxantWXq_jsnt1HXQifJXNjxICxyGZRu7DdV631MhL', // Ganti dengan kunci server Firebase Anda
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(notification_body)
//         });

//         // Periksa respon dari FCM
//         if (response.ok) {
//             res.status(200).send('SUCCESS');
//         } else {
//             res.status(400).send('SOMETHING WENT WRONG');
//         }
//     } catch (err) {
//         res.status(400).send('SOMETHING WENT WRONG');
//         console.error(err);
//     }
// });

// // Mendengarkan permintaan pada port tertentu
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server started on port ${PORT}`));





