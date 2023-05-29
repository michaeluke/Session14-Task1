/* STUDENTS IGNORE THIS FUNCTION
 * All this does is create an initial
 * attendance record if one is not found
 * within localStorage.
 */
const model = {


    title : "Student Name",

    Days: 12,

    num_missed_days : 0,

    title_counter: "Days Missed-col",

    students: [


        {
            name: "Slappy the Frog",
            
        },
        {
            name: "Lilly the Lizard",

           
        },
        {
            name: "Paulrus the Walrus",
            
            
        },
        {
            name: "Gregory the Goat",
           
          
        },
        {
            name: "Adam the Anaconda",
          
            
        },
    ],
    
        random_generator : function () {
        if (!localStorage.attendance) {
            console.log('Creating attendance records...');
            function getRandom() {
               
                return (Math.random() >= 0.5);
            }

            var names = [];
            for (var i = 0; i < model.students.length; i++) {
                names.push(model.students[i].name);
              
            }
            
            var attendance = {}; // empty object called attendance
            names.forEach(function (name) {
                attendance[name] = []; // each student has an array of checkboxes

                for (var i = 0; i <= 11; i++) {
                    // fill the checkboxes with either true or false
                    attendance[name].push(getRandom());
                   
                }
            });

            localStorage.attendance = JSON.stringify(attendance);
            // console.log(attendance)
        }
    },
};



const controller = {

//init

init : function(){

model.random_generator();

var names = [];
for(var i = 0 ; i<model.students.length;i++){

    names.push(model.students[i].name)

}

students_view.init(names);


},



    // Count a student's missed days
    countMissing: function() {
        $allMissed = $('tbody .missed-col'),
        $allCheckboxes = $('tbody input');
        $allMissed.each(function() {
            var studentRow = $(this).parent('tr'),
                dayChecks = $(studentRow).children('td').children('input')
                
    
            dayChecks.each(function() {
                if (!$(this).prop('checked')) {
                    model.num_missed_days++;
                }
            });
    
            $(this).text(model.num_missed_days);
            model.num_missed_days = 0;
        });
        },


    click_handler: function(){

        var studentRows = $('tbody .student'),
        newAttendance = {};

        studentRows.each(function() {
            var name = $(this).children('.name-col').text(),
                $allCheckboxes = $(this).children('td').children('input');

            newAttendance[name] = [];

            $allCheckboxes.each(function() {
                newAttendance[name].push($(this).prop('checked'));
            });
        });

        controller.countMissing();
        localStorage.attendance = JSON.stringify(newAttendance);
    },




}







var students_view = {

    init : function(names){

    var students = $(".student")
    var columns = $(".name-col");
    var header = $("#first_header");
    
    this.render(names,columns,students,header);

    var attendance = JSON.parse(localStorage.attendance),
    $allCheckboxes = $('tbody input');

    // Check boxes, based on attendace records
    $.each(attendance, function(name, days) {
    var studentRow = $('tbody .name-col:contains("' + name + '")').parent('tr'),
        dayChecks = $(studentRow).children('.attend-col').children('input');

    dayChecks.each(function(i) {
        $(this).prop('checked', days[i]);
    });
    });

    // When a checkbox is clicked, update localStorage
    $allCheckboxes.on('click', function() {


        debugger
        controller.click_handler();
        debugger
    });

    controller.countMissing();


    },



    render : function(names,columns,students,header){
        var maincol = $("#maincol")
        maincol.text(model.title);
        
        for(var i =0 ;i< columns.length;i++){

            columns.eq(i).text(names[i]);
            
            
          
        }


           for(var i=0 ; i<students.length;i++){

            for (var j = 0 ; j< model.Days;j++){
                var checkbox = `<td class='attend-col'><input type='checkbox'/></td>`
                
                $(students).eq(i).append(checkbox);
               
                }

                var missed_days = `<td class="missed-col"></td>`;
                $(students).eq(i).append(missed_days);
                debugger
           }


        for (var i = 0 ;i<model.Days;i++){

            var day = `<th> ${i+1} </th>`
            header.append(day);
        }

        var missed_days = `<th class="missed-col"> ${model.title_counter}</th>`
        header.append(missed_days)
          
        

            
       
        


        
          

      



        
    

    }

}















/* STUDENT APPLICATION */
$(function() {

    
   // localStorage.clear()
    //call on controller .init that calls model.random_generator();
    controller.init();


    //localStorage.clear();

}());
