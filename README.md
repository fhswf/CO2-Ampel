# CO2 Ampel

Umsetzung einer einfachen Webanwendung für eine CO2 Ampel mit NodeJS und InfluxDB. In der Anwendung können Zeiträume definiert und abgefragt werden. Wird kein Zeitraum definiert, werden die letzten 24 Stunden abgefragt. Mit dem Limit kann die Anzahl der Werte auf die letzten N Werte begrenzt werden (1 bis 2000). Werden nur zwei Datumsangaben angegeben, werden die Werte vom Startdatum ab 24 Uhr bis zum Enddatum bis 24 Uhr abgefragt. 

Die Ampel interpretiert die Werte auf folgende Weise:

- Grün: Durchschnitt CO2 ppm bis 1000
- Gelb: Durchschnitt CO2 ppm bis 2000
- Rot: Durchschnitt CO2 ppm ab 2000

## Vorausetzungen

- InfluxDB 2.0
- NodeJS

## Installation

1. Installation der InfluxDB (in der Entwicklung wurde die Version 2.0.4 verwendet).
2. Installation von NodeJS (in der Entwicklung wurde die Version 15.14.0 verwendet).
3. Installation zusätzlicher Pakete für die CO2 Ampel durch Ausführen von "npm install" im CO2-Ampel Unterverzeichnis.
4. Einstellungen für InfluxDB in der config.js im CO2-Ampel Unterverzeichnis vornehmen.
    - URL eintragen
    - Zugriffstoken eintragen
    - Namen der Organisation eintragen
    - Bucket eintragen
5. Starten der Anwendung mit dem Befehl "node bin\www" im CO2-Ampel Unterverzeichnis.

## Ablegen von Daten

Daten können in InfluxDB sehr einfach abgelegt werden und die Datenbank liefert viele Tutorials für unterschiedliche Sprachen. Im Unterverzeichnis "CO2DataWriter" wird ein beispielhaftes Skript mit Zufallszahlen für Python mitgeliefert. Nutzen Sie die Feldnamen "co2", temp" und "humidity" für die Daten zur CO2-Konzentration, Temperatur und Feuchtigkeit. Für die Angabe der Geräte nutzen Sie bitte das Tag "host". Alle Daten können als Gleitkommazahlen oder Integer angegeben werden.
