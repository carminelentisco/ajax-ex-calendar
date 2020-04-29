
$(document).ready(function () {

    var baseDate= moment('2018-01-01');                 // DATA INIZIALE
    var dateClone = moment(baseDate);                   // CLONE DATA INIZIALE
    var btnIndietro = $('.btn-indietro');               // PULSANTE INDIETRO
    var btnAvanti = $('.btn-avanti');                   // PULSANTE AVANTI
    var source = $('#day-template').html();             // INIT HANDLEBARS
    var template = Handlebars.compile(source);
    
    printMonth(template, baseDate);
    printHoliday(baseDate);

    btnAvanti.on('click', function() {
        var testdate = dateClone;

        if ( testdate.month() < 11 ) {
            dateClone.add(1, 'M');
            printMonth(template,dateClone);
            printHoliday(dateClone);
        } 
    });

    btnIndietro.on('click', function() {
        var testdate = dateClone;
        
        if ( testdate.month() > 0 ) {
            dateClone.subtract(1, 'M');
            printMonth(template,dateClone);
            printHoliday(dateClone);
        }        
    });
    

}); // <-- End doc ready


/************************************* FUNCTIONS *************************************/

// Stampa a schermo i giorni del mese
function printMonth(template, date ) {
    $('.month-list').html(' ');                                                 // PULIZIA DEL MARCKUP PRECEDENTE
    $('h1').html( date.format('MMMM YYYY') );                                   // CREAZIONE HEADER 
    $('.month').attr('data-this-date',  date.format('YYYY-MM-DD'));             // IMPOSTA IL DATA ATTRIBUTE DELLA DATA VISUALIZZATA

    var daysInMonth = date.daysInMonth();

    for (var i = 0; i < daysInMonth; i++) {
        var thisDate = moment({
            year: date.year(),
            month: date.month(),
            day: i + 1
        });
        var context = {                                                         // OGGETTO PER IL TEPLATE
            class: 'day',
            day: thisDate.format('DD MMMM'),
            completeDate: thisDate.format('YYYY-MM-DD')
        };   
        var html = template(context);                                           
        $('.month-list').append(html);
    }
        
}

// Ottieni e stampa festività
function printHoliday(date) {

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