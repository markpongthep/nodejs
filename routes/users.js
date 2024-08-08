var express = require('express');
var router = express.Router();
const userSchema = require('../models/user')
const bcrypt = require('bcrypt')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register', async (req, res) => {
  const { name, password } = req.body;

  try {
    const newUser = new userSchema({ name, password: await bcrypt.hash(password, 10) });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully!' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/login', async (req, res) => {
  const { name, password } = req.body;

  try {
    const user = await userSchema.findOne({ name });
    if (!user) {
      return res.status(400).json({ error: 'ไม่พบชื่อผู้ใช้นี้' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: 'รหัสผ่านไม่ถูกต้อง' });
    }
    if (!user.approve) {
      return res.status(403).json({ error: 'User not approved' });
    }
    res.status(200).json({ message: 'User login successfully!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/approve/:id', async (req, res) => {
  try {
    const user = await userSchema.findByIdAndUpdate(
      req.params.id,
      { approve: true },
      { new: true } // ส่งกลับเอกสารที่ถูกอัพเดทใหม่
    );

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'User approved successfully!', user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



module.exports = router;
