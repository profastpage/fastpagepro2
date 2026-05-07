# Integración real: Google Meet + Calendar + Base de datos (Sheets)

Esta web ya envía leads al endpoint `VITE_LEADS_WEBHOOK_URL` si está configurado.

## 1) Crear backend gratis con Google Apps Script

1. Entra con `profastpage@gmail.com` a [Google Apps Script](https://script.google.com/).
2. Crea un proyecto nuevo y pega este código:

```javascript
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents || "{}");

    const ssId = "REEMPLAZA_CON_TU_SHEET_ID";
    const sheet = SpreadsheetApp.openById(ssId).getSheetByName("Leads") || SpreadsheetApp.openById(ssId).insertSheet("Leads");

    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["timestamp", "type", "name", "email", "phone", "preferredDate", "preferredTime", "source", "language"]);
    }

    sheet.appendRow([
      new Date(),
      data.type || "",
      data.name || "",
      data.email || "",
      data.phone || "",
      data.preferredDate || "",
      data.preferredTime || "",
      data.source || "",
      data.language || ""
    ]);

    // Crear evento en Calendar de profastpage@gmail.com
    if (data.preferredDate && data.preferredTime) {
      const start = new Date(`${data.preferredDate}T${data.preferredTime}:00`);
      const end = new Date(start.getTime() + 30 * 60 * 1000);
      const title = data.type === "meet" ? "Fast Page Pro - Google Meet" : "Fast Page Pro - Llamada";
      const desc = [
        `Lead desde web`,
        `Nombre: ${data.name || ""}`,
        `Email: ${data.email || ""}`,
        `Teléfono: ${data.phone || ""}`,
        `Idioma: ${data.language || ""}`
      ].join("\n");

      const event = CalendarApp.getDefaultCalendar().createEvent(title, start, end, {
        description: desc,
        guests: "profastpage@gmail.com",
        sendInvites: true
      });

      if (data.type === "meet") {
        event.setLocation("Google Meet");
      }
    }

    MailApp.sendEmail({
      to: "profastpage@gmail.com",
      subject: `Nuevo lead web: ${data.type || "contacto"}`,
      body: JSON.stringify(data, null, 2)
    });

    return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: String(err) })).setMimeType(ContentService.MimeType.JSON);
  }
}
```

3. `Deploy > New deployment > Web app`.
4. Ejecutar como: `profastpage@gmail.com`.
5. Acceso: `Anyone`.
6. Copia la URL del Web App.

## 2) Configurar frontend

1. Copia `.env.example` a `.env`.
2. Coloca la URL del paso anterior en:

```env
VITE_LEADS_WEBHOOK_URL=...
```

3. Ejecuta:

```bash
npm run build
npm run deploy
```

Con eso, cada solicitud desde el widget:
- se guarda en Google Sheets (base de datos),
- crea evento de Calendar,
- y notifica por email a `profastpage@gmail.com`.
