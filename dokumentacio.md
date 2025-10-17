# Beléptető
Feladatomban egy regisztrációs, bejelentkezős menü lesz, ami hasonlíthat egy online KRÉTA felületre. 
## Működése
- Nem adatbázis alapú, szóval a regisztrációt a sütikben tárolja
- Az oldal frissítésekor 2 alapértelmezett fiók van

| Felhasználók | Email | Jelszó | 
| --- | --- | --- |
| Admin | admin@ganziskola.hu | admin |
| Tanuló | tomika.kovacs@ganziskola.hu | tompaa |

- Admin, Oktató, Tanuló típusú fiókok
- Html, CSS, JavaScript programozási nyelveket használok

| Jogok | Admin | Oktató | Tanuló | 
| --- | --- | --- | --- |
| Felhasználók kezelése | X |  |  |
| Jelszóváltás | X | X | X |

## Regisztráció
- @ganziskola.hu végződésű emailel lehet regisztrálni
- a jelszónak minimum 6 karakterből kell állnia
- jelszó megerősítő
- alapból Tanuló típusú a fiók
## Bejelentkezés
- ellenőrzi az email és a jelszót a sütikből, vagy a kódból
- sikeres bejelentkezés után átirányít a főoldalra
## Főoldal
- admin felhasználó tudja állítani a fiók típusokat, és jelszót is
- jelszót lehet változtatni, és megnézni is 
