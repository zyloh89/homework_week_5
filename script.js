$(document).ready(function() {
    
    // test flag
    var test = false;

    // get times from moment
    var now = moment().format("dddd, MMMM Do");

    // commented out for test in non-standard hours
    let nowHour24 = moment().format('H');
    let nowHour12 = moment().format('h');

    // set times for testing after hours
    if (test) {
        nowHour24 = 13;
        nowHour12 = 1;
    }

    let $currentDay = $('#navbar-subtitle');
    $currentDay.text(now);

    // using font awesome icon https://fontawesome.com/license
    // change description here - none
    var saveIcon = "./images/save-regular.svg"; 

    // Get stored todos from localStorage
    // Parsing the JSON string to an object
    let storedPlans = JSON.parse(localStorage.getItem("storedPlans"));

    if (test) { console.log(storedPlans); }

    // If plans were retrieved from localStorage, update the plan array to it
    if (storedPlans !== null) {
        planTextArr = storedPlans;
    } else {
    // this should only occur on first time the app is loaded in the browser
    // helpfully remind user that lunch is important
    planTextArr = new Array(9);
    planTextArr[4] = "Picnic lunch outside";
    }

    if (test) { console.log("full array of plned text",planTextArr); }

    // set variac x e referencing planner element
    let $schedulerDiv = $('#schedulerContainer');
    
    // clear existing elements
    $schedulerDiv.empty();

    if (test) { console.log("current time",nowHour12); }


    // build calendar by business hours rows
        for (let hour = 9; hour <= 17; hour++) {
    
            // index for array use offset from hour
        let index = hour - 9;

    // Add row components
        let $rowDiv = $('<div>');
        $rowDiv.addClass('row');
        $rowDiv.attr('hour-index',hour);

    // Start building Time box portion of row
    let $colTimeDiv = $('<div>');
    $colTimeDiv.addClass('col-md-3');
  
    // create timeBox element (contains time)
    var $timeBoxSpn = $('<span>');
    // can use this to get value
    $timeBoxSpn.attr('class','timeBox');

    // format hours for display
    let displayHour = 0;
    let ampm = "";
    if (hour > 12) { 
      displayHour = hour - 12;
      ampm = "pm";
    } else {
      displayHour = hour;
      ampm = "am";
    }

    // populate timeBox with time
    $timeBoxSpn.text(`${displayHour} ${ampm}`);

    // insert into col inset into timebox
    $rowDiv.append($colTimeDiv);
    $colTimeDiv.append($timeBoxSpn);
    // STOP building Time box portion of row

    // START building input portion of row
    // build row components
    let $dailyPlanSpn = $('<input>');

    $dailyPlanSpn.attr('id',`input-${index}`);
    $dailyPlanSpn.attr('hour-index',index);
    $dailyPlanSpn.attr('type','text');
    $dailyPlanSpn.attr('class','dailyPlan');

    // access index from data array for hour 
    $dailyPlanSpn.val( planTextArr[index] );

    // create main col
    let $colMainDiv = $('<div>');
    $colMainDiv.addClass('col-md-8');

    // add main col to row
    $rowDiv.append($colMainDiv);
    $colMainDiv.append($dailyPlanSpn);
    // STOP building Time box portion of row

    // START building save portion of row
    let $colSaveDiv = $('<div>');
    $colSaveDiv.addClass('colSaveDiv');

    let $saveBtn = $('<i>');
    $saveBtn.attr('id',`saveid-${index}`);
    $saveBtn.attr('save-id',index);
    $saveBtn.attr('class',"far fa-save saveIcon");
    
    // add column and save button to row
    $rowDiv.append($colSaveDiv);
    $colSaveDiv.append($saveBtn);
    

    // set row color based on time
    updateRowColor($rowDiv, hour);
    
    // add row to planner container
    $schedulerDiv.append($rowDiv);
  };

  // function to update row color
  function updateRowColor ($hourRow,hour) { 

    if (test) { console.log("rowColor ",nowHour24, hour); }

    if ( hour < nowHour24) {
      // $hourRow.css('')
      if (test) { console.log("lessThan"); }
      $hourRow.css(".past")
    } else if ( hour > nowHour24) {
      if (test) { console.log("greaterthan"); }
      $hourRow.css(".future")
    } else {
      if (test) { console.log("eqaul"); }
      $hourRow.css(".present")
    }
  };

  // saves to local storage
  // conclick function to listen for user clicks on plan area
  $(document).on('click','i', function(event) {
    event.preventDefault();  

    if (test) { console.log('click pta before '+ planTextArr); }

    let $index = $(this).attr('save-id');

    let inputId = '#input-'+$index;
    let $value = $(inputId).val();

    planTextArr[$index] = $value;


    if (test) { console.log('value ', $value); }
    if (test) { console.log('index ', $index); }
    if (test) { console.log('click pta after '+ planTextArr); }
  
  });

        
});