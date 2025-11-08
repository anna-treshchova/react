import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';
import { promises as fs } from 'fs';
import jwt from 'jsonwebtoken';

/*——————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
  ❗️Паролі ніколи не зберігають у відкритому вигляді, навіть у локальних файлах (users.json чи базі) ❗️

   bcryptjs — це бібліотека для хешування паролів. Тобто перетворення звичайного пароля на БЕЗПЕЧНИЙ КРИПТОГРАФІЧНИЙ
   ВІДБИТОК

   З її допомогою ми можемо зашифрувати (захешувати) будь-який пароль перед тим, як зберігати його у базі
——————————————————————————————————————————————————————————————————————————————————————————————————————————————————————*/

import { signAccessToken } from '#utils/jwt.js';
import { readJSON } from '#utils/db.js';

import { paths } from '#config/paths.js';

const router = express.Router();

router.post('/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const db = await readJSON(paths.USERS_PATH);

        const exists = db.users.find(u => u.email === email);
        if (exists) return res.status(400).json({ message: 'Email already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = {
            id: uuidv4(),
            name,
            email,
            password: hashedPassword,
            wishlist: [],
        }

        db.users.push(newUser);
        await fs.writeFile(paths.USERS_PATH, JSON.stringify(db, null, 2));

        const token = signAccessToken({ id: newUser.id })

        res.status(201).json({
            id: newUser.id,
            name: newUser.name,
            token
        });
    } catch (err) {
        console.error('Signup error:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
})

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const users = await readJSON(paths.USERS_PATH, 'users');

        const user = users.find(u => u.email === email);
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' }); // 401 Unauthorized
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = signAccessToken({ id: user.id })

        res.status(200).json({
            id: user.id,
            name: user.name,
            token
        });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
})

router.get('/me', async (req, res) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'No token provided' });
        }
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // jwt.verify - перевіряє токен справжність і термін дії, повертає payload якщо токен правильний

        const users = await readJSON(paths.USERS_PATH, 'users');

        const user = users.find(u => u.id === decoded.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({
            id: user.id,
            name: user.name,
            email: user.email,
        })
    } catch (err) {
        console.error('Error verifying token:', err.message);

        if (err.message === 'TokenExpiredError') {
           return res.status(401).json({ message: 'Token expired' });
        }

        res.status(500).json({ message: 'Invalid token' });
    }
})

export default router;

/*——————————————————————————————————————————————————————————————————————————————————————————————————————————————————————

 JWT (JSON Web Token) — це підписаний токен (підписується секретним ключем, який знає тільки сервер), який:

     ◦ зберігає у собі дані (наприклад userId, email)

     ◦ має час дії (expiresIn)

     ◦ підписується секретним ключем, тому підробити його неможливо


 JWT складається з трьох частин, розділених крапками:  header.payload.signature

 НАПРИКЛАД:
             eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
             .
             eyJpZCI6IjEyMyIsImVtYWlsIjoiYW5uYUBnbWFpbC5jb20ifQ
             .
             fB6CkLkF-6u2w7xC7yZ5zy2k1ZgIu4oQ4Km4s_7JZyI



  1. header — вказує, який алгоритм підпису використовується:

          {
            "alg": "HS256",
            "typ": "JWT"
          }

  2. payload — містить дані користувача (але безпечні — не паролі!):

          {
            "id": "123",
            "email": "anna@gmail.com",
            "iat": 1730733600,          —> issued at (виданий о) — час, коли токен був створений
            "exp": 1731338400           —> expires at (закінчується о) — час, коли токен перестає бути дійсним
          }
                                        Ці значення — timestamps — час у секундах від 1 січня 1970 року (Unix time)

  3. signature — це підпис



                                                                                                                      */


