# bet365-scraping
Bet365.it - Javascript Scraping 

Il codice JavaScript fornisce una serie di funzioni asincrone che lavorano con un sito web per estrarre e inviare dati. 

clickElementsInRange(): 
Questa funzione simula un click su tutti gli elementi della pagina che corrispondono al selettore CSS specificato. Gli elementi selezionati sembrano essere dei gruppi di mercato in una pagina di scommesse (forse divs che rappresentano partite o eventi).

extractValuesWithTeam(): 

- Crea un array vuoto collectedData per raccogliere i dati estratti.
- Utilizza due cicli for annidati per iterare attraverso una serie di selettori CSS. Questi selettori sono costruiti dinamicamente in base agli indici dei cicli.
- Per ogni combinazione di indici, la funzione cerca vari elementi nella pagina: orario di chiusura della scommessa, nomi delle squadre e le quote per 1, X e 2 (probabilmente le opzioni di scommessa per la vittoria della squadra 1, pareggio e vittoria della squadra 2).

Se tutti gli elementi sono presenti e l'elemento bookCloses ha una specifica classe, i dati di questi elementi vengono estratti e aggiunti all'array collectedData.
Alla fine, la funzione restituisce l'array collectedData.

sendDataToServer(data): 
Questa funzione prende un array di dati come parametro e invia questi dati a un server all'URL "http://127.0.0.1:5001/bet" utilizzando una richiesta POST. La risposta del server viene quindi restituita.

main():
- Crea un array vuoto allData.
- Estrae i dati dalla pagina utilizzando la funzione extractValuesWithTeam() e aggiunge questi dati a allData.
- Estrae nuovamente i dati (dopo aver simulato i click) e li aggiunge nuovamente a allData.
- Infine, invia l'array allData al server utilizzando la funzione sendDataToServer e stampa la risposta del server nella console.
  
![Screenshot 2023-08-22 230933](https://github.com/69ares/bet365-scraping/assets/35406032/e1dc5594-318a-485f-b115-1d3090cd999e)

In sintesi, questo codice JavaScript estrae le informazioni sulle scommesse da una pagina web, simula dei click su determinati elementi per potenzialmente rivelare ulteriori dati, estrae nuovamente i dati e invia tutto al server.
