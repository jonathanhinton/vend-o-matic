const http = require('http');
const express = require('express');

const app = express();
app.use(express.json());
//Set up data for Inventory
let inventory = [
    {
        id:"coke",
        name:"Coca-Cola",
        quantity:5
    },
    {
        id:"diet_coke",
        name:"Diet Coca-Cola",
        quantity:5
    },
    {
        id:"sprite",
        name:"Sprite",
        quantity:5
    }
];

//Set up data for Vending Machine
let vending_machine = {
    coin_slot_height:"24.28mm",
    coin_slot_width:"1.77mm",
    session:false,
    coin_cache:0,
    inventory: inventory
};

// GET AT ROOT
app.get('/', (req, res) => {
    console.log(vending_machine);
    res.writeHead(200, {
        "Content-Type":"application/json",
        "X-Coins":`${vending_machine.coin_cache}/2`
    });
    res.end();
});

    // INSERT COINS
    app.put('/', (req, res) => {
    res.sendStatus(204);
});

    // RETURN COINS
    app.delete('/', (req, res) => {
    res.sendStatus(204);
});

    // GET INVENTORY AS ARRAY
    app.get('/inventory', (req, res) => {
    res.sendStatus(200);
});

    // GET INVENTORY FOR THIS ITEM
    app.get('/inventory/:id', (req, res) => {
    res.sendStatus(200);
});

    // GET A DRINK, RETURN COINS
    app.put('/inventory/:id', (req, res) => {
    res.sendStatus(204);
});

const server = http.createServer(app);
server.listen(3000);
console.log('Server listening on port 3000');