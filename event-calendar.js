'use strict';

let nav = 0;
let click = null;
let events = localStorage.getItem('events') ?  JSON.parse(localStorage.getItem('events')) : [];
const calendar = document.querySelector('#calendar');
const prevButton = document.querySelector('#prev');
const nextButton = document.querySelector('#next');
const monthYearDisplay = document.querySelector('.monthYearDisplay');

const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function load() {
    let date = new Date();
    if(nav !== 0) {
        date.setMonth(new Date().getMonth() + nav);
        console.log(date);
    }
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    const firstDayOfMonth = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const dateToString = firstDayOfMonth.toLocaleDateString('en-us', {
        weekday: 'long',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    });

    monthYearDisplay.querySelector('.monthHeading').innerHTML = date.toLocaleDateString('en-us', {month: 'long'});
    monthYearDisplay.querySelector('.yearHeading').innerHTML = year;
       
    const paddingDays = weekdays.indexOf(dateToString.split(', ')[0])
    
    calendar.innerHTML = '';
    for(let i = 1; i <= paddingDays + daysInMonth; i++) {
        const daySquire = document.createElement('div');
        const dateSpan = document.createElement('span');
        daySquire.classList.add('day__box');
        dateSpan.classList.add('date');
        daySquire.appendChild(dateSpan);

        if(i > paddingDays) {
            daySquire.querySelector('.date').innerText = i - paddingDays;
        } else {
            daySquire.classList.add('padding');
        }
        calendar.appendChild(daySquire);
    }

}

function initButtons() {
    prevButton.addEventListener('click', function() {
        nav--;
        load();
        console.log(nav);
    });
    nextButton.addEventListener('click', function() {
        nav++;
        load();
        console.log(nav);
    });
}
initButtons();
load();



