var radios = document.querySelectorAll('input[type=radio][name="veranlagung"]');

radios.forEach(radio => radio.addEventListener('change', () => {
    radio.id == "b" ? document.getElementById("group-zvE-PersonB").style.display = "block" : clear();
}));

function clear() {
    document.getElementById("group-zvE-PersonB").style.display = "none";
    document.getElementById("group-zvE-PersonB").value = "";
}

function calc(year, zvEPersonA, zvEPersonB) {
    (zvEPersonA < 0 || zvEPersonB < 0) ? document.getElementById('result').innerHTML = "Berechnung ist nur mit Positiven Zahlen möglich" :
        document.getElementById('result').innerHTML = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(getCalcValues(year, (Number(zvEPersonA) + Number(zvEPersonB))));
}

function getCalcValues(year, einkommen) {
    let preResult;

    switch (Number(year)) {

        case 2022:
            einkommen >= getEinkommensgrenzen2022()[0] ? preResult = eStZone4und5(einkommen, 0.45, 17602.28) :
                einkommen >= getEinkommensgrenzen2022()[1] ? preResult = eStZone4und5(einkommen, 0.42, 9267.53) :
                    einkommen >= getEinkommensgrenzen2022()[2] ? preResult = eStZone3(einkommen, 14926, 206.43, 2397, 938.24) :
                        einkommen >= getEinkommensgrenzen2022()[3] ? preResult = eStZone2(einkommen, 9984, 1008.70, 1400) : preResult = 0;
            break;

        case 2021:
            einkommen >= getEinkommensgrenzen2021()[0] ? preResult = eStZone4und5(einkommen, 0.45, 17374.99) :
                einkommen >= getEinkommensgrenzen2021()[1] ? preResult = eStZone4und5(einkommen, 0.42, 9136.63) :
                    einkommen >= getEinkommensgrenzen2021()[2] ? preResult = eStZone3(einkommen, 14753, 208.85, 2397, 950.96) :
                        einkommen >= getEinkommensgrenzen2021()[3] ? preResult = eStZone2(einkommen, 9744, 995.21, 1400) : preResult = 0;
            break;

        case 2020:
            einkommen >= getEinkommensgrenzen2020()[0] ? preResult = eStZone4und5(einkommen, 0.45, 17078.74) :
                einkommen >= getEinkommensgrenzen2020()[1] ? preResult = eStZone4und5(einkommen, 0.42, 8963.74) :
                    einkommen >= getEinkommensgrenzen2020()[2] ? preResult = eStZone3(einkommen, 14532, 212.02, 2397, 972.79) :
                        einkommen >= getEinkommensgrenzen2020()[3] ? preResult = eStZone2(einkommen, 9408, 972.87, 1400) : preResult = 0;
            break;

        case 2019:
            einkommen >= getEinkommensgrenzen2019()[0] ? preResult = eStZone4und5(einkommen, 0.45, 16740.68) :
                einkommen >= getEinkommensgrenzen2019()[1] ? preResult = eStZone4und5(einkommen, 0.42, 8780.90) :
                    einkommen >= getEinkommensgrenzen2019()[2] ? preResult = eStZone3(einkommen, 14254, 216.16, 2397, 965.58) :
                        einkommen >= getEinkommensgrenzen2019()[3] ? preResult = eStZone2(einkommen, 9168, 980.14, 1400) : preResult = 0;
            break;
    }

    return radios.item(1).checked == true ? Math.floor(preResult * 2) : Math.floor(preResult);
}

function getEinkommensgrenzen2022() {
    return [277826, 58597, 14927, 9985];
}

function getEinkommensgrenzen2021() {
    return [274613, 57919, 14754, 9745];
}

function getEinkommensgrenzen2020() {
    return [270501, 57052, 14533, 9409];
}

function getEinkommensgrenzen2019() {
    return [265327, 55961, 14255, 9169];
}

function eStZone2(zvE, eckwert, progressionsfaktor, eingangssteuersatz) {
    let y = (zvE - eckwert) / 10000;
    return (progressionsfaktor * y + eingangssteuersatz) * y;
}

function eStZone3(zvE, eckwert, progressionsfaktor, eingangssteuersatz, zusStBetrag) {
    let z = (zvE - eckwert) / 10000;
    return ((progressionsfaktor * z + eingangssteuersatz) * z + zusStBetrag)
}

function eStZone4und5(zvE, progressionsfaktor, faktorX) {
    return (progressionsfaktor * zvE) - faktorX;
}
