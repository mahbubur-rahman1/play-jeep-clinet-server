const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

app.use(cors());
app.use(express.json());





const uri = "mongodb+srv://toysData:Fqx6jZucIrMry3fL@cluster0.alw7nxz.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    const productsCollection = client.db('toysData').collection('products')
    const toysCollection = client.db('toysData').collection('toys')

app.get('/products', async(req, res)=>{
    const result = await productsCollection.find().toArray()
    res.send(result)
})

app.get('/products/:id', async(req, res)=>{
    const id = req.params.id
    const query = {_id: new ObjectId(id)}
    const result = await productsCollection.findOne(query)
    res.send(result)
})

app.post('/toys', async(req, res)=>{
    const body = req.body
    const result = await toysCollection.insertOne(body)
    res.send(result)
})

app.get('/toys', async(req, res)=>{
    const result = await toysCollection.find().toArray()
    res.send(result)
})

app.delete('/toys/:id', async(req, res)=> {
    const id = req.params.id
    const query = {_id: new ObjectId(id)}
    const result = await toysCollection.deleteOne(query)
    res.send(result)
})









    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);














app.get('/', (req, res) =>{
    res.send('SIMPLE CRUD IS RUNNING')
})


app.listen(port, () =>{
    console.log(`SIMPLE CRUD IS RUNNNING ON PORT ${port}`)
})