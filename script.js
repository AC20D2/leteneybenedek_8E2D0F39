let users = [
    {
        email: "admin@ganziskola.hu",
        jelszo: "admin",
        szerepkor: "admin",
    },
    {
        email: "tomika.kovacs@ganziskola.hu",
        jelszo: "tompaa",
        szerepkor: "tanuló",
    }
];
let bejelentkezettFelhasznalo = null;
let szamlalas = 0
for (let i = 0; i < users.length; i++) {
        szamlalas++
    }

function belepes() {
    let bEmail = document.getElementById("email").value;
    let bJelszo = document.getElementById("jelszo").value;
    let felhasznalo = users.find(user => user.email === bEmail);


    if (felhasznalo) {
        if (felhasznalo.jelszo === bJelszo) {
            bejelentkezettFelhasznalo = felhasznalo;
            let nev = bEmail.split("@")[0]
                .split(".")
                .map(part => part.replace(/[0-9]/g, ''))
                .map(part => part.charAt(0).toUpperCase() + part.slice(1))
                .join(" ");

            document.getElementById("form").innerHTML = `<h2>Üdvözlünk <span style="font-weight: bold;">${nev}</span> a profilodban</h2>`;
            document.getElementById("form").innerHTML += `<h4>Szerepkör: <span id="szkor" style="font-weight: bold;">${felhasznalo.szerepkor.toUpperCase()}</span></h4>`
            document.getElementById("form").innerHTML += `<p>Jelszó: <input type='password' id='megtekint-jelszo' value='${felhasznalo.jelszo}' readonly> <button onclick='toggleJelszoLathatosag()'>Jelszó megtekintése</button></p>`;
            

            if (felhasznalo.szerepkor === "admin") {
                document.getElementById("titkos").innerHTML =
                    `<button class='fel' onclick='felhasznalok()'>Felhasználók kezelése</button>
                    <div id='admin-panel'></div>
                    <p id="szamolas">Összes felhasználó: ${szamlalas} db</p>
                    <br><button class='fel' onclick='modositSajatJelszo()'>Jelszó módosítása</button>
                    <br><button class='visz' onclick='belepesOldal()'>Kijelentkezés</button>`;
            } else {
                document.getElementById("titkos").innerHTML =
                    `<button class='fel' onclick='modositSajatJelszo()'>Jelszó módosítása</button>
                    <br><button class='visz' onclick='belepesOldal()'>Kijelentkezés</button>`;
            }
        } else {
            showPopup("Téves felhasználónév vagy jelszó!", "red");
        }
    } else {
        showPopup("Téves felhasználónév vagy jelszó!", "red");
    }
}
function toggleJelszoLathatosag() {
    let jelszoMezo = document.getElementById("megtekint-jelszo");
    jelszoMezo.type = jelszoMezo.type === "password" ? "text" : "password";
}
function modositSajatJelszo() {
    let container = document.getElementById("titkos");
    container.innerHTML += `
        <div>
            <p class="reg">Új jelszó: <input type="password" id="uj-jelszo"></p>
            <button onclick="mentSajatJelszo()">Mentés</button>
        </div>
    `;
}
function mentSajatJelszo() {
    let ujJelszo = document.getElementById("uj-jelszo").value;
    if (ujJelszo.length < 6) {
        showPopup("A jelszónak legalább 6 karakter hosszúnak kell lennie!", "red");
        return;
    }
    if (ujJelszo === bejelentkezettFelhasznalo.jelszo) {
        showPopup("Az új jelszó nem lehet ugyanaz, mint a régi!", "red");
        return;
    }
    bejelentkezettFelhasznalo.jelszo = ujJelszo;
    users = users.map(user => user.email === bejelentkezettFelhasznalo.email ? bejelentkezettFelhasznalo : user);
    showPopup("Jelszó sikeresen módosítva!", "green");
    belepesOldal()
}
function register() {
    let rEmail = document.getElementById("ujEmail").value;
    let rJelszo = document.getElementById("ujJelszo").value;
    if (!rEmail.endsWith("@ganziskola.hu")) {
        showPopup("Csak @ganziskola.hu végződésű email cím engedélyezett!", "red");
        return;
    }

    if (rJelszo.length < 6) {
        showPopup("A jelszónak legalább 6 karakter hosszúnak kell lennie!", "red");
        return;
    }
    if (users.some(user => user.email === rEmail)) {
        showPopup("Ez az email cím már regisztrálva van!", "red");
        return;
    }
    if (rEmail.endsWith("@ganziskola.hu") && rJelszo.length >= 6 && !(users.some(user => user.email === rEmail))) {

        document.getElementById("lent").innerHTML = `
            <form>    
                <label for="megerosit">Jelszó megerősítése:</label><br>
                <input type="password" id="megerosit">
            </form>
            <br>
            <button onclick="megerosites('${rJelszo}', '${rEmail}')" id="belepes">Regisztráció</button><br><br><br>
            <p class="reg">Van már fiókod?</p><button class="regi" onclick="belepesOldal()">Bejelentkezés</button>`
    }

}
function adminRegister() {
    let adEmail = document.getElementById("adEmail").value;
    let adJelszo = document.getElementById("adJelszo").value;
    let adSzerepkor = document.getElementById("adSzerepkor").value;
    if (!adEmail.endsWith("@ganziskola.hu")) {
        showPopup("Csak @ganziskola.hu végződésű email cím engedélyezett!", "red");
        return;
    }

    if (adJelszo.length < 6) {
        showPopup("A jelszónak legalább 6 karakter hosszúnak kell lennie!", "red");
        return;
    }
    if (users.some(user => user.email === adEmail)) {
        showPopup("Ez az email cím már regisztrálva van!", "red");
        return;
    }
    if (adEmail.endsWith("@ganziskola.hu") && adJelszo.length >= 6 && !(users.some(user => user.email === adEmail))) {
        users.push({ email: adEmail, jelszo: adJelszo, szerepkor: adSzerepkor });
        showPopup("Sikeres fiók hozzáadás!", "green");
        szamlalas++
        document.getElementById("szamolas").innerHTML=`Összes felhasználó: ${szamlalas} db`
        felhasznalok()
        return;
    }
    
}
function megerosites(rJelszo, rEmail) {
    let megerosit = document.getElementById("megerosit").value;
    if (megerosit !== rJelszo) {
        showPopup("A jelszavak nem egyeznek!", "red");
        return;
    }
    users.push({ email: rEmail, jelszo: rJelszo, szerepkor: "tanuló" });
    showPopup("Sikeres regisztráció!", "green");
    szamlalas++
    belepesOldal();
}
function felhasznalok() {
    let list = document.getElementById("admin-panel");
    list.innerHTML = "";

    let dropdown = `<select id='user-select' onchange='mutatFelhasznalo()'>
                        <option value=''>Válassz egy felhasználót</option>`;

    users.forEach((user, index) => {
        dropdown += `<option value='${index}'>${user.email}</option>`;
    });
    dropdown += "<option value='hozzad'>Felhasználó hozzáadása</option></select>";

    list.innerHTML = dropdown + "<div id='user-details'></div>";
    list.style.display = "block";
}
function mutatFelhasznalo() {
    let index = document.getElementById("user-select").value;
    let details = document.getElementById("user-details");

    if (index === "") {
        details.innerHTML = "";
        return;
    }

    if (index === "hozzad") {
        details.innerHTML = `
            <div>
                <p>Email: <input type="text" id="adEmail"></p>
                <p>Jelszó: <input type="text" id="adJelszo"></p>
                <p>Szerepkör: 
                    <select id="adSzerepkor">
                        <option value="admin">Admin</option>
                        <option value="oktató">Oktató</option>
                        <option value="tanuló" selected>Tanuló</option>
                    </select>
                </p>
                <button onclick="adminRegister()">Mentés</button>
            </div>
            <hr>`;
        return;
    }

    let user = users[index];

    if (!user) {
        showPopup("Hiba történt! A kiválasztott felhasználó nem található.", "red");
        return;
    }

    let adminCount = users.filter(u => u.szerepkor === "admin").length;
    let utolso = (user.szerepkor === "admin" && adminCount === 1);

    details.innerHTML = `
        <div>
            <p>Email: <input type="text" value="${user.email}" id="email-${index}"></p>
            <p>Jelszó: <input type="text" value="${user.jelszo}" id="jelszo-${index}"></p>
            <p>Szerepkör: 
                <select id="szerepkor-${index}" ${utolso ? "disabled" : ""}>
                    <option value="admin" ${user.szerepkor === "admin" ? "selected" : ""}>Admin</option>
                    <option value="oktató" ${user.szerepkor === "oktató" ? "selected" : ""}>Oktató</option>
                    <option value="tanuló" ${user.szerepkor === "tanuló" ? "selected" : ""}>Tanuló</option>
                </select>
            </p>
            <button onclick="modositFelhasznalo(${index})">Mentés</button>
        </div>
        <hr>
    `;
}
function modositFelhasznalo(index) {
    let ujEmail = document.getElementById(`email-${index}`).value;
    let ujJelszo = document.getElementById(`jelszo-${index}`).value;
    let ujSzerepkor = document.getElementById(`szerepkor-${index}`).value;

    let user = users[index];
    let adminCount = users.filter(u => u.szerepkor === "admin").length;
    let utolso = (user.szerepkor === "admin" && adminCount === 1);
    
    if (utolso &&ujSzerepkor !== "admin"){
        showPopup("Az egyetlen admin felhasználó szerepköre nem módosítható!", "red")
        return;
    }

    users[index] = {
        email: ujEmail,
        jelszo: ujJelszo,
        szerepkor: ujSzerepkor
    };

    if (bejelentkezettFelhasznalo.email === user.email) {
        bejelentkezettFelhasznalo = user;
    }

    let ujAdminCount = users.filter(u => u.szerepkor === "admin").length;
    console.log(ujAdminCount)
    if (ujAdminCount === 0) {
        users[index].szerepkor = "admin";
        showPopup("Legalább egy admin felhasználónak maradnia kell!", "red");
    } else {
        showPopup("Felhasználó módosítva!", "green");
    }
    document.getElementById("szkor").innerText = bejelentkezettFelhasznalo.szerepkor.toUpperCase();

    if (bejelentkezettFelhasznalo.szerepkor === "admin") {
        felhasznalok()
    } else {
        document.getElementById("titkos").innerHTML = `
            <button class='fel' onclick='modositSajatJelszo()'>Jelszó módosítása</button>
            <br><button class='visz' onclick='belepesOldal()'>Kijelentkezés</button>`;
    }
    console.log(users)
}
function registerOldal() {
    document.getElementById("container").innerHTML = `
    <div id="regiszt">
        <div id="form">
            <form>
                <h1>Regisztráció</h1>
                <br>
                <div>
                    <label for="ujEmail">Email cím:</label><br>
                    <input type="text" id="ujEmail"><br><br>
                </div>
            </form>
            <div id="lent">
                <form>  
                    <label for="ujJelszo">Jelszó:</label><br>
                    <input type="password" id="ujJelszo">
                </form>
                <br>
                <button onclick="register()" id="belepes">Regisztráció</button><br><br><br>
                <p class="reg">Van már fiókod?</p><button class="regi" onclick="belepesOldal()">Bejelentkezés</button>
            </div>
        </div>
        <div id="titkos"></div>
    </div>`;
}
function belepesOldal() {
    document.getElementById("container").innerHTML = `
    <div id="belep">
        <div id="form">
            <form>
                <h1>Bejelentkezés</h1>
                <br>
                <div>
                    <label for="email">Email cím:</label><br>
                    <input type="text" id="email"><br><br>
                </div>
            </form>
            <div>
                <form>  
                    <label for="jelszo">Jelszó:</label><br>
                    <input type="password" id="jelszo">
                </form>
                <br>
                <button onclick="belepes()" id="belepes">Bejelentkezés</button><br><br><br>
                <p class="reg">Nincs még fiókod?</p><button class="regi" onclick="registerOldal()">Regisztráció</button>
            </div>
        </div>
        <div id="titkos"></div>
    </div>`;
}
function showPopup(message, color) {
    let popup = document.createElement("div");
    popup.innerText = message;
    popup.style.position = "fixed";
    popup.style.top = "20px";
    popup.style.left = "50%";
    popup.style.transform = "translateX(-50%)";
    popup.style.backgroundColor = color;
    popup.style.color = "white";
    popup.style.padding = "10px 20px";
    popup.style.borderRadius = "5px";
    popup.style.boxShadow = "0px 4px 6px rgba(0, 0, 0, 0.1)";
    popup.style.opacity = "1";
    popup.style.transition = "opacity 1s ease-out";
    document.body.appendChild(popup);

    setTimeout(() => {
        popup.style.opacity = "0";
        setTimeout(() => popup.remove(), 1000);
    }, 3000);
}