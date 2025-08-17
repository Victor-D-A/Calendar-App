function Year() {
    var current = new Date().getFullYear(); // grabs the current year
    var final = current + 100; // Adds 100 years to the current year as options. Ex: last year in drop down will be 2125
    var options = "";

    for (var year = current; year <= final; year++) { // loop to create all the years after the current year in a drop down menu
        options += "<option>"+ year +"</option>";
    }

    document.getElementById("year").innerHTML = options;
}

Year();

let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

// grab current date automatically and display it for practice in an mm/dd/yyy format and set to side of 'myDiv'
var currentDate = new Date(); // this sets date as following: Sun Apr 13 2025 15:13:19 GMT-0500 (GMT-05:00)

// Make a function declaration to change the current displayed date to the selected month and year that the user chooses from the dropdown menu with it always setting to day 1
function formatDate() { // 'date' is just a placeholder containing nothing until you pass it something when you call the function(currently took out of parameter)
    var mm = String(currentDate.getMonth() + 1).padStart(2, '0'); // what is the meaning of + 1 for the month
    var dd = String(currentDate.getDate()).padStart(2, '0'); // padstart means it starts in 2nd position, not index so first position is 1, '0' means everything prior is a 0
    var yyyy = currentDate.getFullYear();
    
    var format = 'Today: ' + mm + '/' + dd + '/' + yyyy;

    currentDate.setDate(1); // changes the date to the first of the month upon changing the month or year(in case of leap year to non leap year)
    document.getElementById('today').textContent = format; // what does this do exactly(grabs id from html file for label and places the format into that label)

    displayCalendar(); // function call
}

// Upon selecting a month from the dropdown, the following function after 'change' runs immediately.(it is it's own function)
// ex: you select june, then this function() immediately runs
document.getElementById('months').addEventListener('change', function() { // 'function()' is an anonymous function instead of a 'named function'.
    var monthSelected = parseInt(this.value); // 'this.value' MEANS THE CURRENTLY SELECTED VALUE IN THAT DROPDOWN; 'this' = dropdown element
    currentDate.setMonth(monthSelected);
    formatDate();
});

// Upon selecting a new year, it runs this anonymous function to format the date for the new year selected.
document.getElementById('year').addEventListener('change', function() {
    var yearSelected = parseInt(this.value);
    currentDate.setFullYear(yearSelected);
    formatDate();
})

formatDate(); // function call()

// display the calendar
function displayCalendar() {
    var year = currentDate.getFullYear();
    var month = currentDate.getMonth();

    var calendar = document.getElementById("calendar");
    calendar.innerHTML = ""; // clears the previous calendar created

    var startingDay = new Date(year, month, 1).getDay(); // sets 'Sunday' as the first day so we can place that on the left side of the calendar(starting weekday)
    var totalDaysInMonth = new Date(year, month + 1, 0).getDate(); // Last day of the current month

    let days = [
        "Sun",
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat",
    ];

    // header for each new div containing an actual day USING A DIFFERENT VERSION OF A FUNCTION (ex: mon, tues, wed)
    days.forEach(day => {
        var dayLabel = document.createElement("div"); // the div for each day, the whole box for each day, not just surrounding the small numbered day
        dayLabel.classList.add('calendar-day', 'label');
        dayLabel.textContent = day;
        calendar.appendChild(dayLabel);
    });

    // creates days of the week from the 1st of the month to the 30th/31st of the month(28th/29th)
    for (var i = 0; i < startingDay; i++) {
        // The following line creates a div
        var emptyContainer = document.createElement("div"); // 'div' IS A TAG NAME, ONLY VALID TAGS ALLOWED HERE SUCH AS 'span', 'button', etc
        emptyContainer.classList.add('calendar-day', 'empty'); // classList: adds a class to the variable without wiping out any existing classes
        calendar.appendChild(emptyContainer);
    }

    // For-loop to create a specific class depending on circumstance
    for (let day = 1; day <= totalDaysInMonth; day++) { // 'day' here is the 1st numbered day of the month(the header of the div)
        const dayContainer = document.createElement("div"); // 'dayContainer' is a div to display the numbered date for each day of the month
        dayContainer.classList.add("calendar-day"); // creates class for the new ACTUAL DAY container(not the number only)
        
        const currentDay = new Date(year, month, day).getDay(); // New variable created to keep track of when it is saturday and sunday throughout the month
        if (currentDay === 0 || currentDay === 6) { // 0 = Sunday, 6 = Saturday
            dayContainer.classList.add("weekend"); // if statement to add another class for adjusting the weekends
        }
        else {
            dayContainer.classList.add('weekday'); // created to adjust color and other things for weekdays specifically
        }
        
        // create an element to hold the numbered day and any texts to store it.
        const info = document.createElement('span');
        info.textContent = day; // sets info variable to whatever the day is(but uses the dayContainer, needs to use div surrounding dayContainer.)
        dayContainer.appendChild(info);
        // Above section not connected to below section in regards to adding text box for user to add info

        // div to store user's notes
        const userNotesContainer = document.createElement('div');
        userNotesContainer.classList.add('user-Notes'); // no '.' needed because you are adding a class, not looking for one. '.' looks for a class
        dayContainer.appendChild(userNotesContainer); // places userNotes text box within the date box div

        // The following sets of code allows for the user to be able to add text for any day user clicks within the calendar
        dayContainer.addEventListener("click", function () {
            if (dayContainer.querySelector('input')) return; // 'querySelector' allows for selecting first element within document that matches specified CSS selector

            // SEE IF THERE IS ALREADY A NOTE/REMINDER WITHIN THAT DAY UPON USER CLICKING THE DAY
            let userNotes = dayContainer.querySelector('.user-Notes');
            let exists = userNotes ? userNotes.textContent : ""; // if userNotes exists(is not null/undefined) then store texts in exists, otherwise store empty str

            const input = document.createElement('input');
            // get above lines of code explained
            input.type = "text";
            input.placeholder = "Enter text";
            this.onkeyup = "" // NEW LINE THAT I AM WORKING ON TO ALLOW THE ENTER BUTTON TO ACT AS A FORM OF THE SUBMIT BUTTON
            
            // new line for the following code
            input.value = exists; // what does this perform?

            const button = document.createElement('button');
            button.textContent = 'Submit';

            // PREFERRED APPROACH IS 'ADDEVENTLISTENER', 'event' will have a line through it because it is not a good option to use.
            // Need a 'onKeyUp' if statement or does it need to be in a function of its own?

            button.addEventListener('click', function (e) { // NEED 'event' DECLARED HERE TO AVOID STRIKETHROUGH WITHIN FUNCTION USING 'event'
                e.stopPropagation(); // prevents click from bubbling up to parent from child(from reaching document level listener) CAUSES BUG WITHOUT THIS LINE

                const notes = input.value.trim();
                if (notes !== "") {
                    userNotesContainer.textContent = notes;
                }
                cleanup();
            });

            // EventListener for clicking the enter button as a submission for what the user types for notes
            input.addEventListener('keyup', function(e) { 
                if (e.key === 'Enter') {
                    e.stopPropagation();
                    button.click();
                }
            });

            dayContainer.appendChild(input);
            dayContainer.appendChild(button);
            input.focus(); // Immediately allows you to type after clicking any day(needs to be after here after the input was added to the document two lines above)

            const outsideClickHandler = (e) => { // arrow functions do not create a new 'this' which allows you to use whatever the old 'this' was assigned to
                if (!dayContainer.contains(e.target)) { // e.target returns the element that triggered the event(checks whether user clicked outside of box)
                    cleanup();
                }
            };

            // function to remove both the input bar for user to type in and the button to submit when the user clicks outside or after clicking submit once
            function cleanup() {
                input.remove();
                button.remove();
                document.removeEventListener('click', outsideClickHandler);
            }

            setTimeout(() => {
                document.addEventListener('click', outsideClickHandler);
            }, 0);
        });

        calendar.appendChild(dayContainer);
    }

    // THE FOLLOWING CODE HAS TO BE BELOW THE ABOVE FOR LOOP, OTHERWISE THE PINK COLOR FOR THE WEEKEND DAYS WILL BE OTHER RANDOM WEEKDAYS
    // create a variable for the remaining days of the month that are empty and loop it until the end of the month
    var remainingDays = startingDay + totalDaysInMonth; // gives how many empty divs will be after last day
    var lastDivs = 7 - (remainingDays % 7); // remainingDays % 7 = how many days into the week you are; 7 - remainingDays % 7 = complete the last week
    if (lastDivs < 7) {
        for (var i = 0; i < lastDivs; i++) {
            var emptyContainer = document.createElement('div');
            emptyContainer.classList.add('calendar-day', 'empty');
            calendar.appendChild(emptyContainer);
        }
    }
}
