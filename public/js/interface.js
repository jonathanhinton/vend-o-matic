// get buttons
const drink_buttons = document.querySelectorAll('.drink_button');
const coin_return = document.getElementById('coin_return');
const coin_slot = document.getElementById('coin_slot');
const slider = document.getElementById('slider');
const inventory = document.getElementById('inventory');

// add event listeners
drink_buttons.forEach(button => {
    button.addEventListener('click', (e)=>{
        e.preventDefault;
        console.log(button.id);
    });
});

coin_return.addEventListener('click', (e) => {
    console.log(coin_return.id);
    slider.classList.add('slideDown');
});
slider.addEventListener('animationend', () => {
    slider.classList.remove('slideDown');
})
coin_slot.addEventListener('click', (e) => {
    console.log(coin_slot.id);
});
inventory.addEventListener('click', ()=>{
    inventory.classList.add('spin');
});
inventory.addEventListener('animationend', () => {
    inventory.classList.remove('spin');
});
