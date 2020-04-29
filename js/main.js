/**
 * WELCOME TO MOMENT JS
 */
$(document).ready(function () {
    
    // Setup

    // Punto di partenza
    var baseMonth = moment('2018-01-01'); 

    // Init Hndlenars
    var source = $('#day-template').html();
    var template = Handlebars.compile(source);

    // print giorno
    printMonth(template, baseMonth);

    // ottieni festività mese corrente
    printHoliday(baseMonth);

    /**
     * 
     * Seconda parte
     *  
    */

    /******************************************************************* */

    // Clone della data originale
    var dateClone = moment(baseMonth);  // Copia della data
     

    // numero giorni nel mese
    
    
    // Collegamento ai bottoni
    var btnIndietro = $('.btn-indietro');
    var btnAvanti = $('.btn-avanti');
    
 
    btnAvanti.on('click', function() {
    
        // Manda avanti i mesi di 1
        var testdate = dateClone;

        console.log(testdate.month());
        
        if ( testdate.month() < 11 ) {
            dateClone.add(1, 'M');
            printMonth(template,dateClone);
            printHoliday(dateClone);
        }
                
    });

    btnIndietro.on('click', function() {
    
        // Manda avanti i mesi di 1
        dateClone.subtract(1, 'M');
        $('.month-list').html(' ');
        printMonth(template,dateClone);
        printHoliday(dateClone);

        if ( dateClone.month() === 0 ) {
            alert('Go forword!!');
        }
                
    });
    

}); // <-- End doc ready


/*************************************
    FUNCTIONS
 *************************************/

// Stampa a schermo i giorni del mese
function printMonth(template, date ) {
    $('.month-list').html(' ');
    
    
    //  setta header
    $('h1').html( date.format('MMMM YYYY') );

    // Imposta data attribute data visualizzata
    $('.month').attr('data-this-date',  date.format('YYYY-MM-DD'));
    
    var daysInMonth = date.daysInMonth();
    // genera giorni mese
    for (var i = 0; i < daysInMonth; i++) {
        // genera data con moment js
        var thisDate = moment({
            year: date.year(),
            month: date.month(),
            day: i + 1
        });

        // imposta dati template
        var context = {
            class: 'day',
            day: thisDate.format('DD MMMM'),
            completeDate: thisDate.format('YYYY-MM-DD')
        };

        //compilare e aggiungere template
        var html = template(context);
        $('.month-list').append(html);

    }
        

}

// Ottieni e stampa festività
function printHoliday(date) {
    // chiamo API
    $.ajax({
        url: 'https://flynn.boolean.careers/exercises/api/holidays' ,
        method: 'GET',
        data: {
            year: date.year(),
            month: date.month()
        },
        success: function(res) {
            var holidays = res.response;

            for (var i = 0; i < holidays.length; i++) {
                var thisHoliday = holidays[i];

                var listItem = $('li[data-complete-date="' + thisHoliday.date + '"]');

                if(listItem) {
                    listItem.addClass('holiday');
                    listItem.text( listItem.text() + ' - ' + thisHoliday.name );
                }
            }
        },
        error: function() {
            console.log('Errore chiamata festività'); 
        }
    });
}