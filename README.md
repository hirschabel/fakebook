<h1 align="center">Fakebook<br><span style="font-size: 80%"><i>Programrendszerek fejlesztése</i></span></h1>

### Verziók:
* Node: v20.13.1
* npm: 10.5.2
* Angular CLI: 17.3.1

### Indítás:
1. Szerver és kliens mappában `npm install` kiadása
2. Adatbázis
    * Indítás: Szerver mappában
      * Build: `sudo docker build -t my_mongo_image .`
      * Run: `sudo docker run -p 6000:27017 -it --name my_mongo_container -d my_mongo_image`
3. Szerver mappában
    * Fordítás: `node_modules/typescript/bin/tsc`
        * Utána teszt adatokért: build/test-data-generator/ -> `node generateTestData.js`
    * Indítás: `node build/index.js`
4. Alkalmazás elérhető a http://localhost:4200-on

### Funkciók
Megvalósítva:
* A felhasználók tudnak posztolni, azokat nézegetni
* Tudnak egymás posztjai alá kommentelni
* Elérik a barátlistájukat, hozzá tudnak adni barátokat
* Tudják szerkeszteni a profiljukat, egyénileg testreszabni
* Admin felhasználó tud posztokat törölni
* Admin felhasználó tud kommenteket törölni

Még nem implementált:
* Fájlok feltöltése
* Élő üzenetküldés
* Csoportok
* Reakciók
