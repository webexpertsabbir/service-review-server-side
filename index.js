const express = require('express');
const cors = require('cors');
const app = express();

const port = process.env.PORT || 5000;

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

require('dotenv').config();

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@sabbir.0dgpj5g.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
    const serviceCollection = client.db('photography').collection('services')
        app.get('/services', async(req, res) =>{
            const query = {}
            const cursor = serviceCollection.find(query);
            const services = await cursor.toArray();
            res.send(services);
        });

        app.get('/services/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const user = await serviceCollection.findOne(query);
            res.send(user)
        });
    }

    finally{
        
    }
    
}

run().catch(err => console.error(err));

app.get('/', (req, res) => {
    res.send('Photography server in running');
});

app.listen(port, () =>{
    console.log(`Photography server running on ${port}`)
})