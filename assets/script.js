var saveBut;
var textareaRevamp;
var textareaRevamp2;
var textareaID;
var taskTextDigit;
var i = 0;
var a = 0;
var dateFormat = moment().format("MMM/DD/YYYY dddd");
var datetime = 0;
var checkTime = moment().format("H");
var checkLocStorage = {};
var currentTime = function () {
    //declaring moment() outside update function causes a variable scope issue
    datetime.html(moment().format("hh:mm:ss A"));
};
function timeBlockColoring(digit) {
    //past timeblock
    if (checkTime > digit) {
        $("#taskTD_id" + digit).add("#taskText" + digit).attr("style", "background:red; opacity:80%;color:black");
    };
    //present timeblock
    if (checkTime == digit) {
        $("#taskTD_id" + digit).add("#taskText" + digit).attr("style", "background:white; opacity:90%;color:black");
    };
    //future timeblock
    if (checkTime < digit) {
        $("#taskTD_id" + digit).add("#taskText" + digit).attr("style", "background:grey; opacity:100%;color:black");
    };
}
datetime = $('#headerTime')
currentTime();
setInterval(currentTime, 1000);
//time stamp
$("#headerDate").html(dateFormat + "<br>");
$("nav").attr("style", "font-weight:bold");

//adding to checkLocStorage object
for (a = 8; a < 18; a++) {
    checkLocStorage[a] = localStorage.getItem("taskText" + a + "key");
};
//adding timeblocks to table and using this for loop to set color to timeblocks comparing the hour of the day 
for (i = 8; i < 18; i++) {
    $("table").append("<tr><td id='timeCol'>" + i + ":00</td><td class='taskCol' id='taskTD_id" + i + "'><textarea class='taskText' id='taskText" + i + "' placeholder='Place Tasks Here'></textarea></td><td class='saveCol'><button class='saveBtn'>Save</button></td><td class='clearTask'><button class='clearBtn'>Clear</button></td></tr>");
    if (checkLocStorage[i] !== null && checkLocStorage[i] !== undefined && checkLocStorage[i] !== "") {

        $("#taskTD_id" + i).html(checkLocStorage[i]);
    };
    timeBlockColoring(i);
};

//after clicking save button, function replaces textarea with saved localStorage text
$(".saveBtn").click(function () {
    saveBut = $(this).closest("tr").find(".taskText").val().trim();
    textareaRevamp = $(this).closest("tr").find(".taskCol");
    textareaID = $(this).closest("tr").find(".taskText").attr("id");
    //this statement along with the .trim() stops blank answers from being saved
    if (saveBut === "") {
        return;
    };
    localStorage.setItem(textareaID + "key", saveBut);
    textareaRevamp.text(localStorage.getItem(textareaID + "key"));
});

$(".clearBtn").click(function () {
    textareaRevamp2 = $(this).closest("tr").find(".taskCol");
    textareaID2 = textareaRevamp2.attr("id");
    taskTextDigit = textareaID2.match(/(\d+)/);
    localStorage.setItem("taskText" + taskTextDigit[0] + "key", "");
    textareaRevamp2.html("<textarea class='taskText' id='taskText" + taskTextDigit[0] + "' placeholder='Place Tasks Here'></textarea>");
    timeBlockColoring(taskTextDigit[0]);
});


    //after scheduler works, change away from military time
    //use an input box to specify caption above table. save this data to local storage, then use js to place it in the table using prepend (all the rows)
    //         $("#userName").click(function(){
    // var Name = $("input").val();
    // //make if statement clearing the input and button on refresh if there is already a name for the scheduler in local storage
    //         $("table").prepend();