const http = require('http');
const express = require('express');

const app = express();
app.use(express.json());

//Set up data for Vending Machine
let vending_machine = {
    coin_slot_height:"24.28mm",
    coin_slot_width:"1.77mm",
    session:false,
    coin_cache:0,
    inventory: [
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
    ]
};

// condense variable names
let inventory = vending_machine.inventory;
let coins = vending_machine.coin_cache;
let session = vending_machine.session;

// GET AT ROOT
app.get('/', (req, res) => {
    console.log(vending_machine);
    res.writeHead(200, {
        "Content-Type":"application/json",
        "X-Coins":`${coins}/2 coins in machine`
    });
    res.end('Tasty beverages for $0.50...feels like 1983 again');
});

    // INSERT COINS
app.put('/', (req, res) => {
    
    // Begin new transaction/session
    if (!session) {
        session = true;
    }

    // Add coin to vending machine cache
    req.body = {coin:1};
    coins += 1;
    res.writeHead(204, {
        "Content-Type":"application/json",
        "X-Coins":`${coins} coin(s) accepted`
    });
    res.end();
});

    // RETURN COINS
app.delete('/', (req, res) => {
    // if session is true, there will be coins to return
    if (session) {
        // end session
        session = false;

        // return coins
        user_coins = coins;
        coins = 0;
        res.writeHead(204, {
            "Content-Type":"application/json",
            "X-Coins":`${user_coins} coin(s) returned`
        });
        res.end('insert coins');
    } else {

        // if someone pushes the button before putting any coins in
        res.writeHead(204, {
            "Content-Type":"application/json",
            "X-Coins":`No coins to return`
        });
        res.end('insert coins');
    }
});

    // GET INVENTORY AS ARRAY
app.get('/inventory', (req, res) => {
    let remaining_inv = [];
    inventory.forEach(item => {
        remaining_inv.push(item.quantity);
    });
    res.status(200).send(remaining_inv);
});

    // GET INVENTORY FOR THIS ITEM
app.get('/inventory/:id', (req, res) => {
    let found = inventory.find(function (item) {
        return item.id === req.params.id;
      });
      let body = {quantity:found.quantity}
      console.log(found.quantity);
      res.status(200).send(body);
});

    // GET A DRINK, RETURN COINS
app.put('/inventory/:id', (req, res) => {
    // someone selects a product without inserting coins

    // someone selects a product with insufficient funds

    // someone selects a product that is out of stock 

    res.sendStatus(204);
});

const server = http.createServer(app);
server.listen(3000);
console.log('Server listening on port 3000');