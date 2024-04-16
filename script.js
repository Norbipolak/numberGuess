const playBtn = document.querySelector("#play");
const guessInput = document.querySelector("#guess");
const levelSelect = document.querySelector("#level");
const guessForm = document.querySelector("#guess-form");
const levelDescDiv = document.querySelector("#level-desc");
let level = 0;
let guessNumber = 0;
let max = 0;

/*
Így néz kis most a html szerkezet 
    <div class="container">
        <div class="input-form">
            <h3>Szint</h3>
            <select id="level">
                <option value="0">Válassz szintet</option>
                <option value="1">1-es szint</option>
                <option value="2">2-es szint</option>
                <option value="3">3-as szint</option>
            </select>
        </div>
        <div class="input-form display-none" id="guess-form"> 
            <h3>Írd be a tippedet!</h3>
            <input type="number" id="guess">

            <button id="button">Tippelés!</button>

Azért van két div-ben az input mező és a select-ek, amugy, mikettő div-nek megadtuk ugyanazt a class-t input-form, de viszont a második div-nek 
amiben van az input mező meg a gomb, hogy lehessen játszani, azért van külön div-ben aminek van egy id-ja is, hogy ide a js-be le lehessen 
menteni ez majd kapni fog egy display: none-t és csak akkor szeretnénk, hogy megjelenjen, hogyha már kiválasztottuk a szintet a select-vel

Ez így nem is lesz jó, hanem adunk neki egy display-none nevű class-t 
display-none {
    display: none;
}

És azért kell, hogy legyen egy id-ja, hogy le tudjuk menteni ide és azért kell, hogy egy class-ban adjuk meg neki ezt a display none-t 
mert ha azt szeretnénk, hogy vegye le, vagy adja hozzá, akkor azt úgy tudjuk megcsinálni, hogy 
guessForm.classList.add("display-none");
guessForm.classList.remove("display-none");

tehát, azért kell az id, hogy hozzá tudjunk itt férni az elemhez!!!! és azért kell a class-t, mert ugye a classList-vel csak class-okat 
tudunk hozzárendelni illetve levenni az add-val és a remove-val 


*/
levelSelect.addEventListener("change", function() {
    level = parseInt(this.value);

    if(level !== 0) {
        max = 10 ** level;
        guessForm.classList.remove("display-none");
        guessNumber = Math.floor(Math.random * max) + 1;
        console.log(guessNumber);

        levelDescDiv.innerHTML = `<h4>a számok 1-től ${max}-ig lehetnek</h4>`;
    } else {
        guessForm.classList.add("display-none");
    }
});

/*
levelSelect.addEventListener("click", function() {
    level = parseInt(this.value);

    if(level !== 0) {
        guessForm.classList.remove("display-none");
    } else {
        guessForm.classList.add("display-none");
    }
});

Eddig itt vagyunk, hogy a select-re csináltunk egy eventListener-t, hogyha kiválasztunk valamilyen értéket csak akkor jelenjen meg ahova 
be tudjuk írni a számainkat 

csináltunk felülre egy level nevű változót felülre -> let level = 0;
és itt meg beállítottuk ennek a level-nek az értékét arra, hogy this.value, tehát a select-re csináltuk és annak van 4 value-ja 
0, hogy válasszuk ki a szintet meg 1,2,3 a szintek, amikor tényleg játszunk 

ha ez a level !== 0-val, akkor az azt jelenti, hogy kiválasztottunk egy level-t, amivel játszunk és 
akkor a guessForm.classList.remove("display-none") else, ha viszont nem választottunk ki egy szintet, akkor szeretnénk, hogy ez ne 
látszodjon ezért ott meg a guessForm.classList.add("display-none");

Tehát ha kiválasztunk egy szintet 1-3-ig akkor látni fogjuk az input mezőt, de ha utána megint rákattintunk a 0-ra, akkor az else ágban 
lévő miatt megint eltünik!!!!

Itt fontos:
- kell egy level változó, ami kint van globálisan és aminek az értékét be fogjuk állítani a this.value-ra 
- this.value, mert az addEventListener a select-re vonatkozik és ennek a value-jaira ugy tudunk hívatkozni, hogy this
mert mindig amire készül a dolog pl. eventListener arra úgy kell hívatkozni, hogy this!!!!
- fontos, hogy miért van egy display-none class és miért kell egy id is!!!!
***********************************************************************************************
    if(level !== 0) {
        guessForm.classList.remove("display-none");

        guessNumber = Math.floor(Math.random * 10 ** level) + 1;

Létrehoztunk egy guessNumber változót is let guessNumber = 0;
és azt szeretnénk, hogy úgy generáljon egy véletlenszerű számot, attól függően, hogy hányadik level-en vagyunk 
ezért kell, hogy level ** 10
mert ha az első level-en vagyunk akkor ez 10 ** 1 -> tíz az elsőn lesz, ami generál nekünk 10-ig egy véletlen számot 
ha a második level-en vagyunk akkor ez 10 ** 2 -> tíz a másodikon, ami generál egy véletlen számot 100-ig 
ha a harmadik level-en vagyunk akkor ez 10 ** 3 -> tíz a harmadikon, ami generál nekünk egy véletlen számot 1000-ig  

guessNumber = Math.floor(Math.random * 10 ** level); 
Így generálunk számokat nullától kilencig, de viszont nekünk az kell, hogy generáljunk számokat 1-től 10-ig, ezért + 1!!!
guessNumber = Math.floor(Math.random * 10 ** level) + 1;
****************************************************************************************************
Ha ez így meg van, akkor tudunk játszani és ehhez csinálunk a playBtn-re egy eventListener-t 
fontos, hogy az eventListener a select mezőkre egy change kell, hogy legyen a btn-re pedig egy click!!! 
*/
playBtn.addEventListener("click", function() {
    const guess = parseInt(guessInput.value);
    console.log(guess);

    if(isNaN(guess)) {
        alert("Nem megfelően töltötted ki!");
        return;
    }

    if(guess > max) {
        alert(`Nem megfelelő számot adtál meg. (${1} - ${max})`);
        return;
    }

    if(guess < guessNumber) {
        alert("Az általad írt szám kisebb, mint a véletlen szám");
    } else if(guess > guessNumber) {
        alert("Az általad írt szám nagyobb, mint a véletlen szám");
    } else {
        alert("Nyertél egy Iphone-t");
    }
});

/*
Ebben a függvényben össze kell hasonlítani az értékét amit generáltunk a guessNumber-vel és az értéket amit megadott a felhsaználó 
de honnan tudjuk, hogy mi az az érték, amit megadott a felhasználó 
-> 
ezért csinálunk egy változót, amiben lementjük a guessInput-nak az értékét és majd ezt fogjuk összehasonlítani a guessNumber-vel!! 
const guess = parseInt(guessInput.value);
de viszont, hogyha a felhasználó kiválasztja az eggyes szintet és nem ír be semmit akkor is lefut ez a dolog és a guess-nek az lesz értéke, hogy
NaN
console.log(guess); -> NaN, hogyha nem írtunk be semmit és úgy nyomunk rá a gombra!! 
-> 
Meg lehet csinálni, hogy parseInt-jük az üres stringet, ha nem írt be semmit 
<h3>Írd be a tippedet!</h3>
<input type="text" id="guess">
Ennek az input-nak az a type-ja, hogy text és nem number és ha ez parseInt-eljük, akkor az lesz, hogy NaN, ha üresen küldi be vagy ha beír 
bármit, mondjuk azt hogy kecske 
És ha a semmi meg, hogy kecske az lesz, hogy NaN, akkor azt kell itt ellenőrizni, hogy ez a dolog isNaN és ha ez true, tehát nem számot írt
be akkor return-ölünk 
if(isNaN(guess)) {
    alert("Nem megfelelően töltöted ki az input mezőt");
    return;
}
Ez az isNaN, mondja meg, hogy egy szám-e, ennek a visszatérési értéke egy boolean
**************************************************
következő részben pedig megcsináljuk, hogy összehasonlítjuk a két számot és ha kisebb lesz a guessNumber-nél a guess 
akkor egy alert-vel kiírjuk, hogy az általad kiírt szám kisebb.. fordítva meg, hogy nagyobb, ha meg egyenlő, akkor nyertél
if(guess < guessNumber) {
    alert("Az általad írt szám kisebb, mint a véletlen szám");
} else if(guess > guessNumber) {
    alert("Az általad írt szám nagyobb, mint a véletlen szám");
} else {
    alert("Nyertél egy Iphone-t");
}
*************************************************************************************************
Jelezni szeretnénk a felhasználó felé, hogy mettől meddig kell számokat beírni az adott szinten 
<div id="level-desc"></div>

ezt a level-desc lemntjük 
const levelDescDiv = document.querySelector("#level-desc");
és ezt megjelenítjük akkor amikor kiválasztjuk, hogy mi legyen a level 
a levelDescDiv.innerText = `A számok 1-től ${10 ** level}-ig lehetnek`;

vagy ha azt akarjuk, hogy ez a szöveg h4-esként jelenjen meg, akkor viszont innerHTML kell!!!! 
levelDescDiv.innerHTML = `<h4>a számok 1-től ${10 ** level}-ig lehetnek</h4>`;

    if(level !== 0) {
        guessForm.classList.remove("display-none");
        guessNumber = Math.floor(Math.random * 10 ** level) + 1;
        
        levelDescDiv.innerHTML = `<h4>a számok 1-től ${10 ** level}-ig lehetnek</h4>`;

1. csinálunk egy div-et egy id-val 
2. lementjük querySelector-val 
3. elhelyezzük oda, ahol szeretnénk, hogy ki legyen írva
4. megadjuk a lementett elemnek az innerText vagy innerHTML-vel, ami ki legyen írva!!! 
***************************************************************************************************
Azt szeretnánk, hogyha a felhasználó nagyobb számot ír be, mint az a szám ami a maximum pl. level1-en nagyobb, mint 10
létrehozunk egy max változót, ami nulláról fog indulni let max = 0;

itt meghatározzuk a max értékét 
if(level !== 0) {
    max = 10 ** level;
}

és mindenhol, ahol ez van írva, hogy 10**level az max-val helyetesítjük 
pl.itt 
levelSelect.addEventListener("change", function() {
    level = parseInt(this.value);

    if(level !== 0) {
        max = 10 ** level;
        guessForm.classList.remove("display-none");
        guessNumber = Math.floor(Math.random * max) + 1;
        console.log(guessNumber);

        leveldDescDiv.innerHTML = `<h4>a számok 1-től ${max}-ig lehetnek</h4>`;
    } else {
        guessForm.classList.add("display-none");
    }
});

playBtn-be meg csinálunk egy olyat, hogyha a felhasználó nagyobb számoz adott meg mint a max, akkor return és kiíruk valamit neki alert-ben 
if(guess > max) {
    alert(`Nem megfelelő számot adtál meg. (${1} - ${max})`);
    return;
}
mindig a return van legalul
Egész leírása 
1. lementjük a dolgokat, amikre szükségünk lesz 
    - gomb
    - input mező 
    - select 
    - div, ahol kiírjuk, hogy meddig lehet tippelni 
    - guessForm, amiben van az input mező, mert azt csak akkor szeretnénk megjeleníteni, ha kiválasztottunk egy szintet
    változók 
    - level (a szinteknek)
    - guessNumber (szám generáláshoz)
    - max (legnagyobb értéknek pl. számgenerálásnál is felhasználható, hogy addig generálja a számokat, értékét elöbb meg kell határozni)

    select-mező eventListener
    -megadjuk a level-nek az értékét level = parseInt(this.value), fontos, mert ott a value egy string nem egy szám 
        value="1" ez egy string, ezért kell parseInt-elni 
    if(level !== 0)
        - megadjuk a max-nak az értékét 
        - legenerálunk egy véletlen számot 
        - kiírjuk, hogy mettől - meddig lehet játszani 
        - classList.remove("display-none"); -> láthatóvvá tesszük az input mezőt és a gombot 
    else 
        classList.add("display-none") -> újra eltüntetjük 

    gomb-ra az eventListener
    kivesszük az értéket az input mezőből, parseInt!!!, fontos, hogy az input type text legyen ->
    const guess = parseInt(guessInput.value);
        meghatározzuk, hogy mikor van return,
            ha amit beírt az nem egy szám -> isNaN a guess-nek az értéke if(isNaN(guess))
            majd egy másik if-vel, ha nagyobb a guess értéke mint a max

    Összehasonlitjuk a két számot (if, else if, else)   
*/
