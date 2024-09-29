let express = require('express');
let app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb://localhost:27017";
const uri = "mongodb+srv://samadhijayas:QmaiV8Tgytnwo2LG@cluster0.cxdr5ag.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
let port = process.env.port || 3000;
let collection;

app.use(express.static(__dirname + '/public'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});


async function runDBConnection() {
    try {
        await client.connect();
        collection = client.db().collection('Cuisines');
        console.log(collection);
        console.log("Connected to DB");
    } catch (ex) {
        console.error(ex);
    }
}

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/indexMongo.html');
});

app.get('/api/cuisines', (req, res) => {
    getAllCuisines((err, result) => {
        if (!err) {
            res.json({ statusCode: 200, data: result, message: 'get all cuisines successful' });
        }
    });
});

app.post('/api/cuisine', (req, res) => {
    let cuisine = req.body;
    postCuisine(cuisine, (err, result) => {
        if (!err) {
            res.json({ statusCode: 201, data: result, message: 'success' });
        }
    });
});

function postCuisine(cuisine, callback) {
    collection.insertOne(cuisine, callback);
}

function getAllCuisines(callback) {
    collection.find({}).toArray(callback);
}

app.listen(port, () => {
    console.log('express server started');
    console.log('Server is running on port ' + port);
    runDBConnection();
});