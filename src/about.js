document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

const sct = document.querySelector("section")
const info = document.getElementById("about")

const data = `
  <p>Nama : Riky Ripaldo</p>
  <p>Umur : 20 Th</p>
  <p>Alamat : 千葉県南房総市白浜町乙浜</p>
  <p>Pekerjaan : Magang/Mahasiswa</p>
`
const data2 = `
  <h2 id="data">About Me</h2>
  <p>Hi, I'm Riky, I'm a newbie in mobile development.</p>
  <p>If you want to know more about me, please visit my Facebook profile via this <a href="https://www.facebook.com/rikyxdz" target="_blank">link</a></p>
  <a href="#portfolio" id="ok" class="btn">Continue</a>
`
let game = false
info.addEventListener("click", () => {
    if (game) {
        info.innerHTML = data
        game = false
    } else {
        info.innerHTML = data2
        game = true
    }
    info.classList.toggle("grid-mode")
})

document.getElementById("tombol").addEventListener("click", () => sct.classList.toggle("dark-mode"));