/// <reference types="cypress" />

context(
  "Aufgabe 3: Wir lassen in der Tabelle CO2-Wert, Temperatur und Zeitpunkt der Messung anzeigen.",
  () => {
    before(() => {
      cy.visit("http://localhost:3000/");
    });

    describe("Die Anwendung zeigt die Daten.", () => {
      beforeEach(() => {
        cy.fixture("data.json").then((json) => {
          cy.intercept(
            "http://localhost:3000/api/data?limit=10&host=Raum1",
            json
          );
        });
      });

      it("Der Nutzer kann 'Raum1' in das Feld eingeben.", () => {
        cy.get("#host_name").type("Raum1");
      });

      it("Der Nutzer kann den Button zum Bestätigen klicken.", () => {
        cy.get("#submit").click();
      });

      it("Die Tabelle zeigt 10 Zeilen an Daten.", () => {
        cy.get("#dataTable").children("tr").should("have.length", 10);
      });

      it("Der CO2-Wert in der ersten Zeilen ist 3209.", () => {
        verifyTableCellContent(0, 1, "3209");
      });

      it("Die Temperatur in der dritten Zeile ist -25.", () => {
        verifyTableCellContent(2, 2, "-25");
      });

      it("Die Feuchtigkeit in der fünften Zeile ist 79.", () => {
        verifyTableCellContent(2, 2, "-25");
      });
    });
  }
);

function verifyTableCellContent(rowIndex, colIndex, value) {
  cy.get("#dataTable>tr")
    .eq(rowIndex)
    .children("td")
    .eq(colIndex)
    .should("contain", value);
}
