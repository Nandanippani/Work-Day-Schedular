var officeHours = [9, 10, 11, 12, 13, 14, 15, 16, 17];

$(document).ready(function () {
    // format current day using momentjs
    $('#currentDay').text(moment().format('dddd MMMM Do'));

    // loop through each office hours
    officeHours.forEach(hour => {
        createTimeBlock(hour);
    });
});

function getClassName(hour) {
    // create present, past and future timeblocks with different colors
    var currentHour = moment().hour();
    if (hour === currentHour) {
        return 'present';
    }
    if (hour < currentHour) {
        return 'past';
    }
    if (hour > currentHour) {
        return 'future';
    }
}

function getHour(hour) {
    // format hour with AM/PM
    return moment().hour(hour).format('h A');
}

function createTimeBlock(hour) {
    // create timeblock with row and time-block class
    var timeBlock = $('<div/>');
    timeBlock.addClass('row');
    timeBlock.addClass('time-block');


    timeBlock.addClass(getClassName(hour));

    // create hour element
    $('<div/>').addClass('hour').addClass('col-1').text(getHour(hour)).appendTo(timeBlock);

    // create textarea element
    var textArea = $('<textarea/>').attr('id', `hour-${hour}`);
    textArea.appendTo('<div/>').addClass('col-10').appendTo(timeBlock);
    textArea.val(localStorage.getItem(hour));

    // create save button with icon
    var saveBtn = $('<button/>').addClass('saveBtn').addClass('col-1');
    // attach click event
    saveBtn.click(function () {
        onSubmit(hour, `hour-${hour}`);
    });
    // create icon element
    var icon = $('<i/>').addClass('fas').addClass('fa-save');
    saveBtn.append(icon);
    timeBlock.append(saveBtn);

    // append timeBlock to container
    $('.container').append(timeBlock);
}

function onSubmit(hour, textareaId) {
    var desc = $('#' + textareaId).val();   // read text from textarea
    localStorage.setItem(hour, desc);       // save text in localstorage with hour as key
}