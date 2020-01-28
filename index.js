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
    coin_bank:0,
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
let coin_bank = vending_machine.coin_bank;
let session = vending_machine.session;

// RUN GET METHOD AT ROOT DIRECTORY
app.get('/', (req, res) => {
    res.set({
        "Content-Type":"application/json",
        "X-Message":`insert quarters`,
        "X-Coins":coins
    });
    res.status(200).send('Tasty beverages for $0.50...feels like 1988 again');
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
    res.set({
        "Content-Type":"application/json",
        "X-Message":`quarters inserted`,
        "X-Coins":coins
    });
    res.sendStatus(204);
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
        res.set({
            "Content-Type":"application/json",
            "X-Message":`return quarters`,
            "X-Coins":user_coins
        });
        res.sendStatus(204);
    } else {

        // if someone selects coin return before putting any coins in
        res.set({
            "Content-Type":"application/json",
            "X-Message":`No quarters to return`
        });
        res.sendStatus(204);
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
    let found_drink = inventory.find(item => {
        return item.id === req.params.id;
      });
      let body = {quantity:found_drink.quantity}
      res.status(200).send(body);
});

    // GET A DRINK, RETURN COINS
app.put('/inventory/:id', (req, res) => {
    let found_drink = inventory.find(item => {
        return item.id === req.params.id;
      });
    // someone selects a product without inserting coins
    if(!session) {
        res.set({
            "Content-Type":"application/json",
            "X-Message":`insert 2 quarters and make a selection`
        });
        res.sendStatus(400);
    }
    // someone selects a product with insufficient funds
    else if (coins < 2) {
        res.set({
            "Content-Type":"application/json",
            "X-Message":`insert another quarter`,
            "X-Coins":coins
        });
        res.sendStatus(403);
    } 
    // someone selects a product that is out of stock 
    else if (coins >= 2 && found_drink.quantity === 0) {
        res.set({
            "Content-Type":"application/json",
            "X-Message":`please make another selection ${found_drink.name} is out of stock`,
            "X-Coins":coins
        });
        res.sendStatus(404);
    }
    // successful transaction
    else  {
        let updated_quantity = found_drink.quantity - 1;
        let updated = {
            id: found_drink.id,
            name: found_drink.name,
            quantity: updated_quantity
        };

        let targetIndex = inventory.indexOf(found_drink);
        inventory.splice(targetIndex, 1, updated);

        // return coins
        coin_bank += 2;
        coins -= 2;
        user_coins = coins;
        coins = 0;
        let body = {quantity:1};
        res.set({
            "Content-Type":"application/json",
            "X-Message":`enjoy your ${found_drink.name} `,
            "X-Inventory-Remaining":updated_quantity,
            "X-Coins":user_coins
        });
        res.status(200).send(body);
    }
});

const server = http.createServer(app);
server.listen(3000);
console.log('Server listening on port 3000');