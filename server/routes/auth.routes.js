const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { generateUserData } = require('../utils/helpers');
const tokenService = require('../services/token.service');
const router = express.Router({ mergeParams: true });

router.post('/signUp', async (req, res) => {
  try {
    const { email, password } = req.body;
    const exitingUser = await User.findOne({ email });
    if (exitingUser) {
      return res.status(400).json({
        error: {
          message: 'EMAIL_EXISTS',
          code: 400
        }
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = User.create({
      ...generateUserData(),
      ...req.body,
      password: hashedPassword
    });

    const tokens = tokenService.generate({ _id: newUser._id });
    await tokenService.save((await newUser._id, tokens.refreshToken));

    res.status(201).send({ ...tokens, userId: newUser._id });

  } catch (e) {
    res.status(500).json({
      message: 'На сервере произошла ошибка. Попробуйте позже.'
    });
  }
});

router.post('/signInWithPassword', async (req, res) => {

})

router.post('/token', async (req, res) => {

})

module.exports = router;
