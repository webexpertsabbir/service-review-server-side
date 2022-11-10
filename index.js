const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
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
        })
    }
    finally{
        
    }
    run().catch(err => console.error(err));
}

run();



app.get('/', (req, res) => {
    res.send('Photography car server in running');
});

app.listen(port, () =>{
    console.log(`Photography car server running on ${port}`)
})