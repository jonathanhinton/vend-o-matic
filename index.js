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
        "X-Coins":`${vending_machine.coin_cache}/2 coins in machine`
    });
    res.end('Tasty beverages for $0.50...feels like 1983 again');
});

    // INSERT COINS
app.put('/', (req, res) => {
    
    // Begin new transaction/session
    if (!vending_machine.session) {
        vending_machine.session = true;
    }

    // Add coin to vending machine cache
    req.body = {coin:1};
    vending_machine.coin_cache += 1;
    res.writeHead(204, {
        "Content-Type":"application/json",
        "X-Coins":`${vending_machine.coin_cache} coin(s) accepted`
    });
    res.end();
});

    // RETURN COINS
app.delete('/', (req, res) => {
    // if session is true, there will be coins to return
    if (vending_machine.session) {
        // end session
        vending_machine.session = false;

        // return coins
        user_coins = vending_machine.coin_cache;
        vending_machine.coin_cache = 0;
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
    vending_machine.inventory.forEach(item => {
        remaining_inv.push(item.quantity);
    })
    res.status(200).send(remaining_inv);
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