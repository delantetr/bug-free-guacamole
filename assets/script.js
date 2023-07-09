// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(document).ready(function () {
  displayCurrentDay();
  saveButtonListener();
  applyTimeBlockClasses();
  loadSavedEvents();
});

// TODO: Add code to display the current date in the header of the page.
function displayCurrentDay() {
    // Calls the current date and sets it to variable 'today'
  var today = dayjs();
    // Displays the current day in the header.
  $('#currentDay').text(today.format('dddd, MMM D h:mm A'));
}


  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?

  
  function saveButtonListener() {
    $('.saveBtn').on('click', saveEvent);
  }

  function saveEvent() {
    var timeblock = $(this).closest('.time-block');
    var hourId = timeblock.attr('id');
    var eventInput = timeblock.find('.description');
    var eventText = eventInput.val();
    localStorage.setItem(hourId, eventText);

    // Display save confirmation message
  var saveConfirmation = $('<span>').addClass('save-confirmation').text('Appointment saved to local storage!');
  $('#saveConfirmation').empty().append(saveConfirmation);
  setTimeout(function() {
    saveConfirmation.fadeOut(500, function() {
      $(this).remove();
    });
  }, 2000);
  } 


  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //

  function applyTimeBlockClasses() {
    var currentHour = dayjs().hour();
  
    $('.time-block').each(function() {
      var timeblock = $(this);
      var hourId = parseInt(timeblock.attr('id').split('-')[1]);
  
      if (hourId < currentHour) {
        timeblock.addClass('past').removeClass('present future');
      } else if (hourId === currentHour) {
        timeblock.addClass('present').removeClass('past future');
      } else {
        timeblock.addClass('future').removeClass('past present');
      }
    });
  }
  

  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?

  function loadSavedEvents() {
    $('.time-block').each(function() {
      var timeblock = $(this);
      var hourId = timeblock.attr('id');
      var eventInput = timeblock.find('.description');
      var savedEvent = localStorage.getItem(hourId);
  
      if (savedEvent) {
        eventInput.val(savedEvent);
      }
    });
  }