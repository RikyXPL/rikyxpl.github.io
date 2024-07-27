self.onmessage = function (event) {
    const {huruf_1, huruf_2, huruf_3, semuaHuruf, angka} = event.data;

    const hurufs = [...semuaHuruf];
    const hasil = [];

    function isValid(maps) {
        const num1 = parseInt(huruf_1.split('').map(letter => maps[letter] !== undefined ? maps[letter] : '0').join(''), 10);
        const num2 = parseInt(huruf_2.split('').map(letter => maps[letter] !== undefined ? maps[letter] : '0').join(''), 10);
        const num3 = parseInt(huruf_3.split('').map(letter => maps[letter] !== undefined ? maps[letter] : '0').join(''), 10);
        return num1 + num2 === num3;
    }

    function mungkin(array, chars, current, result) {
        if (current.length === array.length) {
            result.push([...current]);
            return;
        }

        for (let i = 0; i < array.length; i++) {
            const karakter = array[i];
            if (chars.has(karakter)) continue;
            chars.add(karakter);
            current.push(karakter);
            mungkin(array, chars, current, result);
            chars.delete(karakter);
            current.pop();
        }
    }

    const allKemunkinan = [];
    mungkin(angka, new Set(), [], allKemunkinan);

    for (const kemungkinan of allKemunkinan) {
        const maps = {};
        hurufs.forEach((huruf, index) => maps[huruf] = parseInt(kemungkinan[index], 10));

        if (maps[huruf_1[0]] === 0 || maps[huruf_2[0]] === 0 || maps[huruf_3[0]] === 0) continue;

        if (isValid(maps)) {
            hasil.push(maps);
            break;
        }
    }

    self.postMessage(hasil);
}