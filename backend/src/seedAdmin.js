require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const connectDB = require('./db');

(async () => {
  try {
    await connectDB();

    const email = 'admin@gmail.com';
    const password = '123456';
    const username = 'Admin';

    let user = await User.findOne({ email });
    if (user) {
      if (user.role !== 'admin') {
        user.role = 'admin';
        await user.save();
        console.log('Mevcut kullanıcı admin yapıldı:', email);
      } else {
        console.log('Admin zaten mevcut:', email);
      }
    } else {
      user = new User({ username, email, password, role: 'admin' });
      await user.save();
      console.log('Admin oluşturuldu:', email);
    }
  } catch (e) {
    console.error('Seeder hata:', e);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
})();


