const http = require('http');
const express = require('express');

const app = express();

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

app.get('/', (req, res) => {
    res.sendStatus(200);
});

const server = http.createServer(app);
server.listen(3000);
console.log('Server listening on port 3000');