document.addEventListener('DOMContentLoaded', () => { // Führt den Code aus, sobald das Dokument vollständig geladen ist
    const form = document.querySelector('form'); // Wählt das Formular-Element im Dokument aus
    const resetButton = document.getElementById('reset'); // Wählt das Element mit der ID 'reset' aus (Reset-Button)
    const regenerateButton = document.getElementById('regenerate'); // Wählt das Element mit der ID 'regenerate' aus (Regenerate-Button)
    const tableContainer = document.getElementById('table-container'); // Wählt das Element mit der ID 'table-container' aus (Container für die Tabelle)

    form.addEventListener('submit', async (event) => { // Fügt dem Formular einen Event-Listener für das 'submit'-Event hinzu
        event.preventDefault(); // Verhindert das Standardverhalten des Formulars beim Absenden (Seitenneuladen)

        const formData = new FormData(form); // Erstellt ein FormData-Objekt aus dem Formular
        const response = await fetch('generate_table.php', { // Sendet eine POST-Anfrage an 'generate_table.php' mit den Formulardaten
            method: 'POST',
            body: formData
        });

        const result = await response.json(); // Konvertiert die Antwort in ein JavaScript-Objekt
        tableContainer.innerHTML = result.table; // Setzt den Inhalt des Tabellencontainers auf die generierte Tabelle
        initTableInteraction(); // Initialisiert die Interaktion mit der Tabelle
    });

    resetButton.addEventListener('click', () => { // Fügt dem Reset-Button einen Event-Listener für das 'click'-Event hinzu
        const cells = tableContainer.querySelectorAll('td'); // Wählt alle Zellen ('td') im Tabellencontainer aus
        cells.forEach(cell => cell.classList.remove('selected')); // Entfernt die Klasse 'selected' von allen Zellen
    });

    regenerateButton.addEventListener('click', () => { // Fügt dem Regenerate-Button einen Event-Listener für das 'click'-Event hinzu
        form.dispatchEvent(new Event('submit')); // Löst das 'submit'-Event für das Formular aus
    });

    function initTableInteraction() { // Definiert eine Funktion, die die Interaktion mit der Tabelle initialisiert
        let isMouseDown = false; // Setzt einen Schalter für das 'mousedown'-Event

        const cells = tableContainer.querySelectorAll('td'); // Wählt alle Zellen ('td') im Tabellencontainer aus
        cells.forEach(cell => { // Geht jede Zelle durch
            cell.addEventListener('mousedown', (event) => { // Fügt jeder Zelle einen Event-Listener für das 'mousedown'-Event hinzu
                isMouseDown = true; // Setzt den Schalter auf true, wenn die Maustaste gedrückt wird
                toggleSelected(event.target); // Wechselt den Status der Klasse 'selected' für das angeklickte Element
            });

            cell.addEventListener('mouseover', (event) => { // Fügt jeder Zelle einen Event-Listener für das 'mouseover'-Event hinzu
                if (isMouseDown) { // Überprüft, ob die Maustaste gedrückt ist
                    toggleSelected(event.target); // Wenn ja, wechselt den Status der Klasse 'selected' für das Element, über das die Maus fährt
                }
            });

            cell.addEventListener('mouseup', () => { // Fügt jeder Zelle einen Event-Listener für das 'mouseup'-Event hinzu
                isMouseDown = false; // Setzt den Schalter auf false, wenn die Maustaste losgelassen wird
            });
        });

        document.addEventListener('mouseup', () => { // Fügt dem gesamten Dokument einen Event-Listener für das 'mouseup'-Event hinzu
            isMouseDown = false; // Setzt den Schalter auf false, wenn die Maustaste losgelassen wird, unabhängig davon, wo dies geschieht
        });
    }

    function toggleSelected(element) { // Definiert eine Funktion, die den Status der Klasse 'selected' für ein gegebenes Element wechselt
        element.classList.toggle('selected'); // Wechselt den Status der Klasse 'selected' für das gegebene Element
    }
});
