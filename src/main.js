let isProses = false;

document.getElementById("loading").classList.add("hidden");
document.getElementById("jawaban").classList.add("hidden");

async function BelajarWoy() {
    if (isProses) return;
    isProses = true;

    const huruf_1 = document.getElementById("aku").value.trim().toUpperCase();
    const huruf_2 = document.getElementById("sayang").value.trim().toUpperCase();
    const huruf_3 = document.getElementById("kamu").value.trim().toUpperCase();

    const loading = document.getElementById("loading");
    const jawaban = document.getElementById("jawaban");

    loading.classList.remove("hidden");
    jawaban.classList.remove("hidden");
    console.log(`Input huruf: ${huruf_1}, ${huruf_2}, ${huruf_3}`);

    if (!huruf_1 || !huruf_2 || !huruf_3) {
        jawaban.innerText = "Semua input harus diisi.";
        loading.classList.add("hidden");
        isProses = false;
        return;
    }

    const semuaHuruf = new Set([...huruf_1, ...huruf_2, ...huruf_3]);
    console.log(`Semua huruf: ${semuaHuruf}`);
    if (semuaHuruf.size > 10) {
        jawaban.innerText = "Terlalu banyak huruf unik (maksimal 10 huruf).";
        loading.classList.add("hidden");
        isProses = false;
        return;
    }

    const angka = "0123456789".split("");
    const service = new Worker("/src/service.js");

    service.postMessage({ huruf_1, huruf_2, huruf_3, semuaHuruf, angka });

    service.onmessage = function (event) {
        const solusi = event.data;
        if (solusi.length > 0) {
            const ditemukan = solusi[0];
            const num1 = huruf_1.split('').map(letter => ditemukan[letter] !== undefined ? ditemukan[letter] : '0').join('');
            const num2 = huruf_2.split('').map(letter => ditemukan[letter] !== undefined ? ditemukan[letter] : '0').join('');
            const num3 = huruf_3.split('').map(letter => ditemukan[letter] !== undefined ? ditemukan[letter] : '0').join('');

            const htmlJawab = `
              <div class="jawab">${num1}</div>
              <div class="jawab">${num2}</div>
              <div class="lines">
                <div class="garis"></div>
                <button class="hasil" onclick="selesai()">+</div>
              </div>
              <div class="jawab">${num3}</div>
            `;

            jawaban.innerHTML = htmlJawab;
        } else {
            console.log("Solusi : ", solusi);
            jawaban.innerHTML = `<p class="nothing">Tidak ada jawaban yang dapat dibuat.</p>`;
        }
        loading.classList.add("hidden");
        isProses = false;
    };

    service.onerror = function (error) {
        console.error("Service error => " + error);
        jawaban.innerHTML = '<p class="nothing">Terjadi kesalahan saat memproses data.</p>';
        loading.classList.add("hidden");
        isProses = false;
    };
}

function selesai() {
    const jawaban = document.getElementById("jawaban");
    jawaban.innerHTML = "";
}