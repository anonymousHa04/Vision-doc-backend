const app = require('./app');
const { info } = require('./utilities/utilityFunctions');

const PORT = process.env.PORT;

app.listen(PORT, () => {
    info(`Server is running on port ${PORT}`);
});