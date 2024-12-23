function hitungKaloriIteratif(bb, tb, usia, gender) {
    const komponen = [10 * bb, 6.25 * tb, -5 * usia];
    let bmr = 0;

    // Iterasi untuk menghitung komponen-komponen BMR
    for (let i = 0; i < komponen.length; i++) {
        bmr += komponen[i];
    }

    // Tambahkan nilai tetap berdasarkan gender
    bmr += (gender === "laki-laki") ? 5 : -161;

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

// Contoh data sampel
const dataSampel = [
    { bb: 70, tb: 175, usia: 25, gender: "laki-laki" },
    { bb: 55, tb: 160, usia: 30, gender: "perempuan" },
    { bb: 80, tb: 180, usia: 35, gender: "laki-laki" },
    { bb: 65, tb: 170, usia: 40, gender: "perempuan" },
    { bb: 90, tb: 185, usia: 28, gender: "laki-laki" },
    { bb: 50, tb: 155, usia: 22, gender: "perempuan" },
    { bb: 75, tb: 172, usia: 33, gender: "laki-laki" },
    { bb: 60, tb: 165, usia: 29, gender: "perempuan" },
    { bb: 85, tb: 178, usia: 45, gender: "laki-laki" },
    { bb: 95, tb: 190, usia: 38, gender: "laki-laki" },
];

// Tampilkan data sampel di tabel
const tableBody = document.getElementById("sample-table").querySelector("tbody");
dataSampel.forEach((data, index) => {
    const hasilIteratif = hitungKaloriIteratif(data.bb, data.tb, data.usia, data.gender);
    const hasilRekursif = hitungKaloriRekursif(data.bb, data.tb, data.usia, data.gender);
    const proteinHarian = hitungProteinHarian(data.bb);

    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${index + 1}</td>
        <td>${data.bb}</td>
        <td>${data.tb}</td>
        <td>${data.usia}</td>
        <td>${data.gender}</td>
        <td>${hasilIteratif.toFixed(2)}</td>
        <td>${hasilRekursif.toFixed(2)}</td>
        <td>${proteinHarian.toFixed(2)}</td>
    `;
    tableBody.appendChild(row);
});
