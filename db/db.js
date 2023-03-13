const mongoose = require('mongoose');
const uri = process.env.MONGODB_API_KEY;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Connected to DB'))
  .catch(console.error);
