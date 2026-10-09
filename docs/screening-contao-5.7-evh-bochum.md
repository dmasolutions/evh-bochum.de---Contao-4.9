# Ergebnisse des Screenings der Website evh-bochum.de

**Ziel:** Migration von Contao 4.9.26 auf Contao 5.7 LTS  
**Vorgabe:** Bestehendes Design, Inhalte, URLs und Funktionen erhalten  
**Stand:** 9. Oktober 2026  
**Version:** 1.0 – statisches Screening

## 1. Zusammenfassung

Die Website verwendet **Contao 4.9.26** mit zahlreichen Erweiterungen und individuell angepassten Templates. Der technische Stand ist deutlich veraltet. Eine Aktualisierung auf Contao 5.7 ist nicht allein durch die Änderung der Versionsanforderungen in Composer möglich.

Die Migration ist grundsätzlich realistisch. Die vorhandenen Inhalte müssen jedoch nicht neu angelegt und das Frontend muss nicht vollständig neu entwickelt werden.

Die wichtigsten Aufgaben sind:

1. Nicht benötigte Alt-Erweiterungen aus dem zukünftigen System entfernen.
2. Verfügbare Contao-5-kompatible Nachfolger verwenden.
3. EFG-Formularfunktionen, Personenverzeichnis und Coverpicture gezielt migrieren.
4. Bestehende Templates an entfernte Contao-APIs und veränderte Asset-Strukturen anpassen.
5. Datenbank und Konfiguration über den vorgesehenen Zwischenstand Contao 4.13 migrieren.
6. Darstellung und Funktionen anschließend auf einer getrennten Testinstallation prüfen.

**Empfehlung:** Eine kontrollierte Migration mit Übernahme der Bestandsdaten und des bestehenden Frontends. Ein vollständiger funktionaler Neuaufbau ist auf Grundlage der vorliegenden Befunde nicht gerechtfertigt.

Eine wesentliche offene Frage betrifft Quellcode für konfigurierte Personen- und iCal-Funktionen, der in der vorliegenden Kopie nicht eindeutig auffindbar bzw. über das Lockfile zuordenbar ist.

## 2. Grundlage und Grenzen der Untersuchung

Untersucht wurden:

- Aktuelle Live-Dateien einschließlich Composer-Dateien, Templates, Konfiguration und Frontend-Dateien.
- Der aktuelle Datenbankexport `db-backup-cto49.sql.gz`.
- Paketinformationen zu installierten Erweiterungen und möglichen Nachfolgern.
- Ausgewählte Erweiterungsquellen in den installierten Versionen.
- Die offiziellen Contao-Migrationshinweise.
- Das öffentlich ausgelieferte HTML der Startseite.

Der Datenbankexport wurde direkt gelesen, **nicht importiert**. Seine Gzip-Integrität wurde erfolgreich geprüft.

### Einordnung der Ergebnisse

- **Bestätigt:** Versionsanforderungen, vorhandene Datensätze, konkrete Codefundstellen.
- **Statisch nachgewiesene Referenz:** Ein Modul oder Formular ist beispielsweise in einem Inhaltselement oder Layout eingebunden.
- **Noch zu prüfen:** Tatsächliche Erreichbarkeit, vollständiges Laufzeitverhalten und redaktionelle Nutzung.

Eine Datenbankreferenz beweist nicht automatisch, dass die Funktion derzeit auf einer veröffentlichten Seite erreichbar ist.

Die Untersuchung ersetzt keine spätere Funktions- und Darstellungsprüfung. Eine erfolgreiche Auflösung der gesamten zukünftigen Composer-Abhängigkeiten wurde ebenfalls noch nicht durchgeführt.

## 3. Technischer und fachlicher Bestand

| Bereich | Befund |
|---|---|
| Contao | **4.9.26**, durch das Lockfile bestätigt |
| Zielversion | **5.7 LTS**; zum Prüfzeitpunkt Paketversion 5.7.14 verfügbar |
| Datenbankserver | Laut Export **MariaDB 10.4.17** |
| Tabellen | 92 |
| Speicher-Engines | 25 InnoDB, 67 MyISAM |
| Seiten | 802, davon 5 Website-Startpunkte |
| Artikel | 1.074 |
| Inhaltselemente | 6.953 |
| Frontend-Module | 95 |
| Seitenlayouts | 9 |
| Formulare / Formularfelder | 15 / 118 |
| Mitglieder / Mitgliedergruppen | 726 / 23 |
| Backend-Benutzer | 43 |
| Nachrichten | 1.456 |
| Kalender / Veranstaltungen | 3 / 2.649 |
| FAQ-Einträge | 116 |
| Newsletter / Verteiler | 299 / 19 |

Die Zahlen umfassen sämtliche entsprechenden Datensätze, nicht nur veröffentlichte oder aktuell verwendete Einträge.

### Umfangreiche Standard-Inhalte

Unter anderem vorhanden sind:

- 3.371 Textelemente.
- 1.080 einzelne Downloads.
- 966 einzelne Akkordeons.
- Je 184 Akkordeon-Start- und Stop-Elemente.
- 182 Bilder.
- 80 YouTube-Elemente.
- 39 Galerien.

Der Bestand spricht gegen eine manuelle Neuerstellung der Inhalte. **IDs, Beziehungen, Dateiverweise und bestehende URL-Strukturen sollten erhalten werden.**

## 4. Welche Erweiterungen können nicht unverändert übernommen werden?

Die installierten Versionen vieler Erweiterungen schließen Contao 5 ausdrücklich aus. Das ist eine harte Abhängigkeitsschranke, nicht lediglich eine mögliche Darstellungsabweichung.

Die folgenden Empfehlungen berücksichtigen sowohl Paketanforderungen als auch die erkennbaren Datenbankverwendungen.

### 4.1 Verwendete bzw. besonders relevante Funktionen

| Erweiterung / Funktion | Aktueller Stand | Empfehlung für Contao 5.7 |
|---|---|---|
| Contao-Core und Standard-Bundles | 4.9.26 | Über aktuellen 4.13-Stand auf 5.7 aktualisieren; Migrationen und Templateänderungen berücksichtigen. |
| RockSolid Slider | 2.1.8 | Aktualisieren. Version 2.2.11 erlaubt Contao 5.3+. Eigene Slider-Templates und Darstellung prüfen. |
| RockSolid AntiSpam | 2.0.0 | Aktualisieren. Version 2.1.3 erlaubt Contao 5. Formularverhalten prüfen. |
| ChangeLanguage | 3.3.1 | Aktualisieren. Version 3.9.1 erlaubt Contao 5.3+. Sprachbeziehungen und Sprachwechsel erhalten. |
| Calendar Extended | `kmielke`, 1.0.19 | Wechsel auf den Nachfolger `cgoit/calendar-extended-bundle`, derzeit 2.9.1. Daten und Wiederholungslogik prüfen. |
| Coverpicture | 1.3.0 | Portieren oder gezielt ersetzen. Auch die geprüfte neuere Version 1.3.2 erlaubt nur Contao 4. |
| Avatar | `terminal42`, 1.3.4 | Nachfolger `philvdb/avatar-bundle` 2.1.2 prüfen. Bestehende Bilder, Insert-Tags und Ausgabe erhalten. |
| EFG | 1.0.36 | Funktionsbezogen ersetzen oder begrenzt portieren. Auch Version 1.0.41 ist auf Contao 4 beschränkt. |
| Personenlisten / Personenprofile | `memberlist`, `memberpage` | Ursprüngliche Implementierung identifizieren. Danach gezielter Ersatz oder Portierung einschließlich eigener Felder und Templates. |
| iCal-Inhaltselement | Zwei konfigurierte Elemente | Implementierung identifizieren und migrieren. `icalcreator` ist nur eine Bibliothek, kein Ersatz für das Contao-Inhaltselement. |
| Dompdf / PDF-Ausgabe | 1.2.2 | Nutzung klären und gegebenenfalls aktualisieren bzw. integrieren. Nicht ohne Prüfung entfernen. |
| BackupDB | 1.5.3 | Aktualisieren oder durch das Hosting-Backup ersetzen. Version 2.1.2 erlaubt Contao 5.7. |

**Wichtig:** Dass ein Nachfolger Contao 5.7 laut Paketanforderungen erlaubt, bedeutet noch nicht, dass Daten, Einstellungen und individuelle Templates unverändert übernommen werden können.

### 4.2 Kandidaten für eine Bereinigung

| Erweiterung | Statischer Befund | Empfehlung |
|---|---|---|
| MetaModels einschließlich Hilfspaketen | Keine Datensätze in den MetaModels-Tabellen; keine MetaModels-Inhaltselemente oder -Module gefunden. | Entfernung nach Bestätigung fehlender Sondernutzung prüfen. Keine pauschale MetaModels-Portierung einplanen. |
| DMS | Keine Datensätze in den DMS-Tabellen; kein entsprechender Frontend-Modultyp gefunden. | Entfernung prüfen. Vorhandene Dokumentdateien dabei nicht löschen. |
| Tabcontrol | Keine entsprechenden Inhaltselemente gefunden. | Entfernung prüfen. Standardwerte in fremden Datensätzen sind kein Nutzungsnachweis. |
| DownloadMail | Leere eigene Datentabellen; keine aktivierten Formularflags gefunden. | Entfernung nach Prüfung möglicher Sonderabläufe erwägen. |
| Widget Tree Picker | Als aufgegeben markiert; geprüfte Version auf Contao 3/4 beschränkt. | Entfernen oder durch aktuelle Picker ersetzen, falls eigene Backend-Felder darauf angewiesen sind. |
| XLS Export | Geprüfte veröffentlichte Version nur für Contao 4. | Benötigte Backend-Exporte klären; bei Bedarf gezielt ersetzen. |
| JustTextWidgets | Abhängigkeit von MetaModels; aktuelle Version 2.1.0 erlaubt Contao 5. | Nur behalten, falls nach Bereinigung tatsächlich benötigt. |
| Leads / Notification Center | Indirekt durch Calendar Extended installiert; eigene Datentabellen leer. | Nicht allein wegen der bisherigen Installation übernehmen. Als mögliche EFG-Nachfolger gesondert bewerten. |
| Alter Composer-Installer | Für Legacy-Pakete verwendet. | Notwendigkeit anhand der zukünftigen Paketliste entscheiden. Nicht allein wegen seines Namens als inkompatibel bewerten. |

**Entfernen einer Erweiterung bedeutet nicht, ihre Tabellen oder Dateien sofort zu löschen.** Historische Daten und direkt verlinkte Dokumente müssen gesichert und bei Bedarf weiterhin zugänglich bleiben.

## 5. Kritische Funktionsbereiche

### 5.1 Personenverzeichnis und Avatare

Die Datenbank enthält:

- Acht Personenlisten-Module, davon sieben mit erkannten Inhalt-/Layout-/Template-Referenzen.
- Zwei referenzierte `memberpage`-Module.
- 404 Mitglieder mit befülltem Avatar-Feld.
- Zusätzliche Felder beispielsweise für Titel, Abteilung, Raum, Gebäude und Sprechzeiten.

Die eigenen Templates erzeugen individuelle Personenkarten und Detailverweise mit `?show=…`.

**Notwendige Arbeiten:**

- Herkunft und Anpassungen der bisherigen Module feststellen.
- Eigene Mitgliederfelder und deren Backend-Bearbeitung übernehmen.
- Gruppenauswahl, Sortierung, Suche und Detailaufrufe erhalten.
- Sichtbarkeit und Datenschutzvorgaben unverändert berücksichtigen.
- Avatar-Dateien, Bildausschnitte und Platzhalter erhalten.
- Bestehendes HTML und CSS nachbilden, statt ein neues Personenlayout einzuführen.

`oveleon/contao-member-extension-bundle` ist ein Contao-5-kompatibler Ersatzkandidat für Listen und Detailseiten. Er ist jedoch **kein belegter automatischer Ersatz** für die vorhandenen Module.

Da dieses Paket ebenfalls Avatar-Funktionen mitbringt, ist eine abgestimmte Lösung auszuwählen. Mehrere Avatar-Erweiterungen sollten nicht ungeprüft parallel installiert werden.

### 5.2 EFG-Formulare und vorhandene Formulardaten

Von 15 Formularen besitzen zwölf erkannte Inhalt- oder Modulreferenzen.

Konkrete EFG-Verwendungen:

- Ein referenziertes Formular, ID 16, verwendet einen EFG-Seitenwechsel mit Zurück-Schaltfläche und Speicherung der Eingaben in der Session.
- Drei referenzierte Formulare verwenden Bestätigungsmails.
- Formular 13 verwendet `{{form::…}}`-Platzhalter im Bestätigungstext.
- Vorhanden sind 1.455 gespeicherte Formulardatensätze und 4.368 Detaildatensätze.

Die aktuellen Formularflags zeigen keine aktivierte EFG-Speicherung. Die vorhandenen historischen Daten müssen dennoch berücksichtigt werden.

**Mögliche Ersatzbausteine:**

- `terminal42/contao-mp_forms` für mehrseitige Formulare.
- `terminal42/notification_center` für Bestätigungsmails.
- `terminal42/contao-leads`, falls Speicherung und Verwaltung von Eingaben weiterhin benötigt werden.

**Notwendige Arbeiten:**

- Formularabläufe und Validierung erhalten.
- Bestehende Mailtexte, Empfängerregeln und Platzhalter übertragen.
- Vor-/Zurück-Navigation und Zwischenspeicherung prüfen.
- Zugänglichkeit bzw. Export der historischen Formulardaten festlegen.
- Mailversand ausschließlich mit Testempfängern prüfen.

Die Installation der Ersatzpakete allein migriert weder die EFG-Einstellungen noch das vorhandene Archiv.

### 5.3 Coverpicture

Es bestehen **137 Coverpicture-Datensätze** und ein referenziertes Modul.

Die geprüfte Implementierung verwendet unter anderem:

- Den entfernten `ClassLoader`.
- `TL_MODE`.
- `TL_ROOT`.
- Alte Methoden der Bildverarbeitung.

**Zu erhalten sind insbesondere:**

- Zuordnung der Bilder zu Seiten.
- Vererbung über die Seitenhierarchie.
- Standardbild und unterbrochene Vererbung.
- Ausgabe im vorhandenen Seitentemplate.

Da weder Hintergrundbildmodus noch Größenänderung in den geprüften Datensätzen aktiviert sind, kann die Umsetzung auf den tatsächlich verwendeten Funktionsumfang begrenzt werden.

### 5.4 Kalender und iCal

Calendar Extended überschreibt auch die Standardmodule `calendar`, `eventlist` und `eventreader`. Die Erweiterung ist deshalb nicht automatisch verzichtbar, nur weil keine speziell benannten Erweiterungsmodule vorhanden sind.

Im Datenbestand existieren unter anderem:

- Ein Ereignis mit aktivierter erweiterter Wiederholung.
- Zwei Ereignisse mit aktivierten Ausnahmen.
- Weitere Wiederholungs- und Wochenend-Einstellungen.

Der Nachfolger `cgoit/calendar-extended-bundle` unterstützt Contao 5 und dokumentiert eine Migration von Version 1.

Er unterstützt allerdings keine Veranstaltungsanmeldungen mehr. Im vorliegenden Dump sind weder entsprechende Anmeldedatensätze noch aktivierte Veranstaltungsanmeldungen erkennbar.

**Notwendige Arbeiten:**

- Wiederholungen und Ausnahmen übernehmen.
- Historische und zukünftige Ereignisse vergleichen.
- Bestehende Event-Templates und Verlinkungen prüfen.
- Die beiden iCal-Elemente einschließlich Downloadverhalten erhalten.
- Nach Herstellerhinweis zunächst migrieren, ohne alte Felder zu löschen.

## 6. Code-Check: konkrete Fundstellen

### A. Entfernte Konstante in Seitentemplates

**Beispiel:** `templates/fe_default.html5:19`

```php
TL_ASSETS_URL
```

Die Konstante wurde in Contao 5 entfernt. Entsprechende Verwendungen befinden sich auch in weiteren Seitentemplates und JavaScript-Templates.

**Maßnahme:** Alte Asset-Verweise ersetzen. Nicht mehr benötigte HTML5-Shiv-Einbindungen entfernen.

Auch innerhalb eines HTML-Kommentars wird der enthaltene PHP-Code serverseitig ausgeführt.

### B. Festgeschriebene MediaElement-Version und alte Asset-Pfade

**Datei:** `templates/EFH-Bochum/j_mediaelement.html5:2–8`

Das Template bindet MediaElement 2.21.2 über alte Pfade ein und verwendet ebenfalls `TL_ASSETS_URL`.

**Maßnahme:** Medienausgabe mit der zukünftigen Contao-Version abstimmen. Bedienelemente und Darstellung bestehender Video-/Audioelemente vergleichen.

### C. Alter browserbasierter Cron-Aufruf

**Datei:** `templates/fe_default.html5:194–211`

Das Template enthält Aufrufe von:

```text
system/cron/cron.txt
system/cron/cron.php
```

**Maßnahme:** Alte Einbindung überprüfen und durch die zur Zielinstallation passende Cron-Ausführung ersetzen. Bestehende geplante Aufgaben müssen erhalten bleiben.

### D. Vollständiger Override des Backend-Haupttemplates

**Datei:** `templates/be_main.html5`

Das Template übernimmt die alte Backend-Struktur und zahlreiche festgeschriebene Asset-Pfade. Eine erkennbare individuelle Anpassung betrifft die Breite des TinyMCE-Editors bei Mitgliedern, Zeilen 45–49.

**Maßnahme:** Anpassungen gegenüber dem Contao-Standard isolieren. Wenn sich die benötigte Funktion durch eine kleine CSS-Ergänzung erhalten lässt, keinen vollständigen alten Backend-Override weiterführen.

### E. Alte Initialisierungsskripte in Composer

**Datei:** `composer.json:48–54`

```text
Contao\ManagerBundle\Composer\ScriptHandler::initializeApplication
```

Diese Initialisierung ist für Contao 5 anzupassen.

**Maßnahme:** Die vorgesehenen `contao-setup`-Skripte verwenden und die zukünftige Composer-Konfiguration vollständig bereinigen.

### F. Alte Avatar-Implementierung

Die installierte Avatar-Version verwendet `ClassLoader`, `TL_ROOT` und alte Bildverarbeitungsaufrufe. Eigene Personen-Templates verwenden Avatar-Insert-Tags, beispielsweise:

**Datei:** `templates/EFH-Bochum/mod_memberlist_simple_bodys.html5:72`

**Maßnahme:** Nachfolger oder begrenzte Portierung einsetzen und die tatsächlich verwendete Insert-Tag-Syntax sowie Bildausgabe prüfen.

### G. TLS-Zertifikatsprüfung deaktiviert

**Datei:** `config/config.yml:8`

```yaml
verify_peer: false
```

**Maßnahme:** Ursache feststellen und Zertifikatsprüfung nach Behebung eines gegebenenfalls vorhandenen Zertifikatsproblems wieder aktivieren.

Dies ist ein Sicherheitsbefund, nicht der Hauptaufwand der Migration.

### H. Veraltetes Logout-Modul

Ein referenziertes `logout`-Modul ist konfiguriert. Contao 5 verwendet stattdessen eine Logout-Seite.

**Maßnahme:** Abmeldung und Weiterleitung migrieren und zusammen mit Anmeldung, Passwortänderung und geschützten Bereichen prüfen.

### Ergebnis des Syntaxchecks

Die vorhandenen 274 Template-/Include-Dateien einschließlich Archivbeständen wurden mit dem bereits vorhandenen PHP 8.5 auf Syntaxfehler geprüft. Es wurden keine Syntaxfehler festgestellt.

**Das ist kein Nachweis der Laufzeitkompatibilität.** Entfernte Konstanten, APIs und Erweiterungsabhängigkeiten bleiben davon unberührt. JavaScript-Aufrufe wie `.each()` sind außerdem nicht mit der entfernten PHP-Funktion `each()` gleichzusetzen.

## 7. Design und Frontend erhalten

Die bestehenden kompilierten CSS- und JavaScript-Dateien liegen vor. Die öffentlich ausgelieferte Startseite verwendet weiterhin die entsprechenden `/tl_files/frontend/…`-Pfade.

Ein Neuaufbau der alten Node-/Grunt-Umgebung ist für dieses Screening nicht erforderlich und sollte auch für die Migration nicht automatisch eingeplant werden.

**Erforderlich ist stattdessen:**

- Bestehende Dateien und öffentliche Pfade erhalten.
- HTML-Struktur und CSS-Klassen bei Erweiterungswechseln bewahren.
- Ladefolge und Kompatibilität der JavaScript-Bibliotheken prüfen.
- Desktop-, Mobil- und Druckdarstellung vergleichen.
- Navigation, Kontrast-/Schriftgrößenfunktionen, Akkordeons und Slider prüfen.

### Nicht alle HTML5-Templates müssen sofort nach Twig portiert werden

Contao 5 stellt für zahlreiche Inhaltselemente Twig-basierte Implementierungen bereit. Die bisherigen `.html5`-Overrides greifen dort nicht automatisch.

Die offiziellen Upgrade-Hinweise dokumentieren jedoch weiterhin verfügbare Legacy-Inhaltselemente bis Contao 6.

Für die Vorgabe „Design unverändert“ bestehen deshalb zwei Möglichkeiten:

1. Betroffene Templates nach Twig übertragen und ihre Ausgabe originalgetreu erhalten.
2. Für ausgewählte Elemente vorübergehend die Legacy-Implementierung verwenden.

Die zweite Möglichkeit kann Aufwand reduzieren, muss aber als technische Übergangslösung dokumentiert werden. Eine pauschale Portierung sämtlicher Archivtemplates wäre nicht sinnvoll.

## 8. Datenbank, Konfiguration und Infrastruktur

### Datenbank

Der Bestand enthält 67 MyISAM-Tabellen. Die zukünftige Struktur ist anhand der Contao- und Erweiterungsmigrationen zu prüfen und gegebenenfalls auf InnoDB umzustellen.

Nicht pauschal alle Tabellen konvertieren oder unbekannte Felder löschen. Zunächst sind Beziehungen, Datentypen, Indizes und die Verwendung durch alte Erweiterungen zu klären.

Der interne CSS-Editor enthält einen Stylesheet-Datensatz, aber keine Style-Datensätze. Ein großer CSS-Exportaufwand ist damit nicht belegt; die verbliebene Layoutzuordnung muss dennoch geprüft werden.

### Konfiguration

Zu bearbeiten sind insbesondere:

- `config/parameters.yml`.
- `system/config/localconfig.php`.
- Composer-Skripte und Paketanforderungen.
- Öffentlicher Verzeichnisname und Asset-Verknüpfungen.
- Mail-, Cron- und Sicherheitskonfiguration.

Die alte `system/config/`-Struktur kann nicht unverändert als Konfigurationsgrundlage für Contao 5 dienen.

### Öffentlicher Einstiegspunkt

Die bestehende Installation verwendet `web/`. Für die Zielinstallation kann auf `public/` umgestellt oder `web/` ausdrücklich konfiguriert werden.

Unabhängig davon müssen `/tl_files/…` und alle weiterhin benötigten Datei-URLs erreichbar bleiben. Dabei dürfen interne Dateien, Konfiguration und Datenbankexports nicht öffentlich freigegeben werden.

### Server

Contao 5.7 benötigt mindestens **PHP 8.3**. Eine gepflegte PHP-Version ist anhand der endgültigen Erweiterungsauswahl festzulegen.

MariaDB 10.4.17 ist ein veralteter Serverstand. Für den späteren Betrieb sollte eine gepflegte Datenbankversion vorgesehen und deren Verhalten mit den Migrationen geprüft werden.

**Für die Erstellung dieses Berichts ist keine lokale Serverinstallation erforderlich.**

## 9. Upgrade oder Neuaufbau?

| Vorgehen | Bewertung |
|---|---|
| Nur Composer-Versionsnummern ändern | Nicht ausreichend; mehrere bestätigte Inkompatibilitäten. |
| Sämtliche Erweiterungen portieren | Unnötiger Aufwand, da ungenutzte Pakete und geeignete Nachfolger vorhanden sind. |
| Website manuell neu erstellen | Hoher Aufwand und unnötiges Risiko für Inhalte, Beziehungen, URLs und Darstellung. |
| Kontrollierte Bestandsmigration | **Empfohlen.** Daten und Frontend erhalten, problematische Komponenten gezielt ersetzen. |
| Sauberes Projektgerüst mit Bestandsdaten | Geeignete technische Variante, sofern die notwendigen 4.13-Datenmigrationen zuvor durchgeführt werden. |

Ein neues Projektgerüst darf nicht mit einer fachlichen Neuerstellung der Website verwechselt werden. Es kann sinnvoll sein, die zukünftige Anwendung sauber aufzusetzen und trotzdem alle vorhandenen Inhalte und Gestaltungsmerkmale zu übernehmen.

## 10. Empfohlener Migrationsablauf

1. **Fehlende Quellen klären**  
   Personenlisten, Mitgliederfelder, `memberpage`, iCal und RMS eindeutig zuordnen.

2. **Bestand und Backups sichern**  
   Datenbank, Dateien, Konfiguration und Betriebsaufgaben sichern; Wiederherstellung vorbereiten.

3. **Getrennte Testinstallation vorbereiten**  
   Erst für die tatsächliche Umsetzung. Keine Änderungen an der laufenden Website.

4. **Contao 4.13 herstellen**  
   Erweiterungen passend auswählen und sämtliche erforderlichen Datenmigrationen durchführen.

5. **Problematische Funktionen ersetzen bzw. portieren**  
   Besonders Personenverzeichnis, EFG und Coverpicture. Kalender- und Avatar-Nachfolger integrieren.

6. **Auf Contao 5.7 aktualisieren**  
   Composer, Konfiguration, Einstiegspunkt und Templates anpassen; Migrationen ohne vorschnelle Löschungen durchführen.

7. **Darstellung und Funktionen abnehmen**  
   Mit konkreten Vergleichsseiten und dokumentierten Tests.

8. **Produktivwechsel durchführen**  
   Abschließende Datensynchronisierung, kontrollierte Umschaltung und geprüfter Rückfallweg.

## 11. Vorläufige Aufwandsschätzung

Die folgenden Werte sind **Planungskorridore, keine verbindliche Angebotsschätzung**. Besonders der fehlende Quellcode für Personenfunktionen beeinflusst die Unsicherheit.

| Arbeitspaket | Orientierung |
|---|---:|
| Test-/Betriebsumgebung, Backups und Wiederherstellung | 8–16 h |
| Core-, Konfigurations- und Datenbankmigration | 16–32 h |
| Paketbereinigung und Standard-Erweiterungsupdates | 8–16 h |
| Frontend-/Backend-Templates und Asset-Kompatibilität | 16–40 h |
| Coverpicture | 8–16 h |
| Personenverzeichnis, eigene Felder und Avatare | 24–64 h |
| EFG-Formulare, Mailabläufe und Archiv | 24–48 h |
| Kalender und iCal | 8–24 h |
| Gesamttests, Korrekturen und Produktivwechsel | 24–40 h |
| **Gesamt** | **136–296 h** |

Das entspricht ungefähr **17–37 Personentagen bei acht Stunden**. Kalenderlaufzeit und Wartezeiten für Freigaben sind darin nicht enthalten.

Nicht eingeschlossen sind ein Redesign, redaktionelle Überarbeitung, neue Funktionen sowie eine bislang nicht belegte umfangreiche Sonderentwicklung.

PDF-Ausgabe und zusätzliche unbekannte Anpassungen können weiteren Aufwand verursachen.

## 12. Erforderliche Abnahmetests

- Repräsentative Seiten aller verwendeten Layouts.
- Desktop-, Mobil- und Druckdarstellung.
- Deutsche und englische Seiten sowie Sprachwechsel.
- Navigation, Suchfunktion und Quicklinks.
- Personenlisten, Detailseiten, eigene Felder und Avatare.
- Anmeldung, Abmeldung, Passwortfunktionen und geschützte Inhalte.
- Formulare einschließlich Zurück-Navigation, Validierung und Bestätigungsmails.
- Zugriff auf historische Formulardaten.
- Kalender, Wiederholungen, Ausnahmen und iCal-Downloads.
- Nachrichten, FAQ und Newsletter.
- Downloads, Bilder, Galerien, Akkordeons, Slider und Medien.
- BITE-Einbindung.
- Bestehende URLs, Weiterleitungen, Metadaten und Sitemap.
- Cron-Aufgaben, Backups und Wiederherstellung.

## 13. Offene Punkte vor einer verbindlichen Umsetzung

### Fehlender bzw. nicht eindeutig zugeordneter Quellcode

Referenzierte Funktionen wie `memberlist`, `memberpage` und `ical` sind nicht über die vorliegende Paketliste erklärbar. Zusätzlich ist in `system/config/localconfig.php:45` `rms_active` aktiviert.

Zu prüfen sind deshalb die tatsächlichen Live-Verzeichnisse und gegebenenfalls Symlink-Ziele für:

- Personenlisten und Mitgliedererweiterungen.
- iCal-/Kalender-Sonderfunktionen.
- RMS.
- Sonstige eigene Module oder Bundles.

Historische Einträge in `tl_repository_installs` sind dabei **kein zuverlässiger Nachweis aktuell installierter Software**.

### PDF-Funktion

Bei 101 Artikeln ist eine PDF-Option gespeichert; `useDompdf` ist aktiviert. Der aktuelle eigene `mod_article`-Override zeigt allerdings keine entsprechende PDF-Schaltfläche.

Es muss geklärt werden, ob PDF-Erzeugung weiterhin genutzt oder nur historisch konfiguriert ist.

### Redaktionelle Backend-Funktionen

Zu bestätigen sind insbesondere:

- Benötigte XLS-Exporte.
- Zugriff und Export der alten Formulardaten.
- Pflege der Personenfelder und Avatare.
- Verwendete Backup- und Wartungsabläufe.

## Fazit

**Die Website benötigt eine technische Modernisierung, aber nach derzeitiger Beweislage keinen vollständigen Neuaufbau.**

Der wirtschaftlich sinnvolle Weg ist:

> **Bestandsdaten und Gestaltung erhalten, ungenutzte Alt-Abhängigkeiten reduzieren, gepflegte Nachfolger einsetzen und nur die tatsächlich benötigten Sonderfunktionen portieren.**

Die größten Risiken liegen bei Personenfunktionen, EFG und fehlenden Sondermodulquellen. Diese müssen vor einer verbindlichen Festpreis- oder Terminplanung geklärt werden.

## Quellen

- [Contao-Releaseplan](https://contao.org/en/release-plan)
- [Offizielle Migrationsanleitung](https://docs.contao.org/manual/en/migration/)
- [Contao-Systemanforderungen](https://docs.contao.org/manual/en/installation/system-requirements/)
- [Contao-5-Upgrade-Hinweise](https://github.com/contao/contao/blob/5.7/UPGRADE.md)
- Paketanforderungen: Packagist-Metadaten der im Bericht genannten Pakete, geprüft am 9. Oktober 2026.
- [Calendar-Extended-Nachfolger und Migrationshinweise](https://github.com/cgoIT/calendar-extended-bundle)
- [Avatar-Nachfolger und Kompatibilitätshinweise](https://github.com/philvdb/contao-avatar)
- Lokale Belege: `composer.json`, `composer.lock`, `db-backup-cto49.sql.gz` sowie die angegebenen Codefundstellen.
