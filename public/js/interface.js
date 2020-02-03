// get buttons
const drink_buttons = document.querySelectorAll('.drink_button');
const coin_return = document.getElementById('coin_return');
const coin_slot = document.getElementById('coin_slot');

// add event listeners
drink_buttons.forEach(button => {
    button.addEventListener('click', (e)=>{
        e.preventDefault;
        console.log(button.id);
    });
});

coin_return.addEventListener('click', (e) => {
    console.log(coin_return.id);
});

coin_slot.addEventListener('click', (e) => {
    console.log(coin_slot.id);
});