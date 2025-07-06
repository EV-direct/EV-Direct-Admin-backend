// Middleware to validate api key
const validateApiKey = (req, res, next) => {
    const apiKey = req.headers['x-api-key'];
    if (apiKey === process.env.DEVELOPER_SECRET_KEY) {
        next();
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
};

module.exports = validateApiKey;

//  example frontend axios request
// axios.get('http://localhost:5000/users/all', {
//     headers: {
//         'x-api-key': 'your-api-key'
//     }
// }).then(response => {
//     console.log(response.data);
// }).catch(error => {
//     console.error(error);
// });