const dbPath = 'mongodb://localhost:27017/spb-medicine'
const { PORT = 3001 } = process.env;
const mongoose = require('mongoose');
async function connected(app) {
    try {
        mongoose.connect(dbPath, {
            useNewUrlParser: true,
        });
    } catch (err) {
        console.log(err);
    }
    app.listen(PORT, () => { });
}
module.exports = { connected }