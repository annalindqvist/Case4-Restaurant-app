# Restaurant-app // Case 4 

Första kursen på den andra terminen där vi jobbar med API:er och fetch för första gången.

Det finns en meny men tiden fanns inte att utveckla alla sidor. Sökknappen i menyn tar dig till sök-sidan och du kan där få fram restauranger. Du kan ändra longiture och latitude för att se avstånd från restaurangen till "din plats". 

Tanken var att ha en startsida med vissa utvalda restauranger. Samt "favoritsida" där man kan spara sina "favoriter" genom att klicka i hjärtat. Och även en "profil-sida" för din egna profil. 

## Grundläggande krav
- I applikation ska en besökare kunna navigera efter närliggande resturanger. I API:et finns olika endpoints som gör det möjligt att söka, utifrån latidud och logitud, eller exempelvis adress, stat.
- Ett resultat ska presenteras och kunna filtreras efter någon valbar egenskap
- Appen ska utgå från mobile first. Dvs när ni utvecklar så antag viewport likt en iPhone 10
- Utvecklingen av applikationen ska finnas dokumenterad på GitHub. 
- Du ska ha gjort minst 10 commits under projektet.

## Utmaningar

(Förutom att applikationen uppfyller de grundläggande kraven ovan)

Här finns följande utmaningar. Se om du kan anta en eller flera!

- Skapa en hjälpklass för en metod som fetch()
- Sidan ska även ha anpassad vy för skärm
- Skapa en extra vy
- Spara ngn form av data i Local Storage
- Beräkna avstånd mellan två punkter baserade på latitud | longitud (se länk under resurser)
- En användare ska kunna klicka på en karta för att ange en utgångspunkt för närliggande restauranger
- Integrera en klickbar karta som ex mapbox https://www.mapbox.com. I dokumentationen över API:et kommer du kunna se hur kartan kan integreras på webbsidan.


###### Applikationen får inte använda externa ramverk, utan det är "vanilla" JavaScript och CSS som gäller. Dela upp struktur, innehåll, design och logik. Använd externa filer för CSS och JavaScript.