# CREAZIONE DI UN CALENDARIO CON FESTIVITA' 

*Nome della repository* : ajax-ex-calendar

### DESCRIZIONE :

Creare un calendario dinamico con le festività. Partiamo dal gennaio 2018 dando la possibilità di cambiare mese, gestendo il caso in cui l’API non possa ritornare festività.
Il calendario partirà da gennaio 2018 e si concluderà a dicembre 2018 (unici dati disponibili sull’API).

Ogni volta che cambio mese dovrò:
Controllare se il mese è valido (per ovviare al problema che l’API non carichi holiday non del 2018)
Controllare quanti giorni ha il mese scelto formando così una lista
Chiedere all’api quali sono le festività per il mese scelto
Evidenziare le festività nella lista

BONUS OPZIONALE:
Trasformare la lista precedente in un vero e proprio calendario, generando una griglia che segua l’andamento dei giorni di un mese a scelta, evidenziando le festività.`
Creare dei bottoni che permettano di spostarsi di mese in mese, rigenerando ogni volta la griglia e le festività associate
