//mencari BMR menggunakan Rumus Mifflin St.Jeor//
function hitungKaloriIteratif(bb, tb, usia, gender) {
    let bmr = 0;
    if (gender === "laki-laki") {
        bmr = 10 * bb + 6.25 * tb - 5 * usia + 5;
    } else {
        bmr = 10 * bb + 6.25 * tb - 5 * usia - 161;
    }
    return bmr;
}

function hitungKaloriRekursif(bb, tb, usia, gender, step = 0) {
    if (step === 3) return 0;
    let bmrComponent = 0;
    if (step === 0) bmrComponent = 10 * bb;
    else if (step === 1) bmrComponent = 6.25 * tb;
    else if (step === 2) bmrComponent = -5 * usia + (gender === "laki-laki" ? 5 : -161);
    return bmrComponent + hitungKaloriRekursif(bb, tb, usia, gender, step + 1);
}

function hitungProteinHarian(bb) {
    return 0.8 * bb; // Rekomendasi protein harian(Bagi orang normal/sehat): 0.8 gram per kg berat badan
}

function hitungKaloriProtein() {
    const bb = parseFloat(document.getElementById("berat").value);
    const tb = parseFloat(document.getElementById("tinggi").value);
    const usia = parseInt(document.getElementById("usia").value);
    const gender = document.getElementById("gender").value;

    if (isNaN(bb) || isNaN(tb) || isNaN(usia)) {
        alert("Harap isi semua input dengan benar!");
        return;
    }

    const hasilIteratif = hitungKaloriIteratif(bb, tb, usia, gender);
    const hasilRekursif = hitungKaloriRekursif(bb, tb, usia, gender);
    const proteinHarian = hitungProteinHarian(bb);

    document.getElementById("hasil-iteratif").innerText = `Hasil Kalori Iteratif: ${hasilIteratif.toFixed(2)} kkal`;
    document.getElementById("hasil-rekursif").innerText = `Hasil Kalori Rekursif: ${hasilRekursif.toFixed(2)} kkal`;
    document.getElementById("hasil-protein").innerText = `Kebutuhan Protein Harian: ${proteinHarian.toFixed(2)} gram`;
}