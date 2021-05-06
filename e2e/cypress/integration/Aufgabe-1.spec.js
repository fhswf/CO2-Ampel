/// <reference types="cypress" />

context("Aufgabe 1: Wir bauen eine Ampel in die App ein.", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  describe("Die CO-2 Ampel sollte sichtbar sein.", () => {
    it("Es exisitiert ein sichtbares Element mit der ID 'ampel'", () => {
      cy.get("#ampel").should("exist").should("be.visible");
    });
  });

  describe("Die CO-2 Ampel sollte die drei Ampelphasen zeigen.", () => {
    it("Es existiert ein sichtbares Element mit der ID 'red_light'", () => {
      cy.get("#red_light").should("exist").should("be.visible");
    });
    it("Es existiert ein sichtbares Element mit der ID 'yellow_light'", () => {
      cy.get("#yellow_light").should("exist").should("be.visible");
    });
    it("Es existiert ein sichtbares Element mit der ID 'green_light'", () => {
      cy.get("#green_light").should("exist").should("be.visible");
    });
  });

  describe("Die CO2-Ampel sollte die richtige Größe von 70px Breite und 180px Höhe haben.", () => {
    it("Das Element mit der ID 'ampel' hat eine Breite von 70px.", () => {
      cy.get("#ampel").invoke("outerWidth").should("eq", 70);
    });

    it("Das Element mit der ID 'ampel' hat eine Breite von 180px.", () => {
      cy.get("#ampel").invoke("outerHeight").should("eq", 180);
    });
  });

  describe("Die CO2-Ampel zeigt initial die Farbe grün.", () => {
    it("Das Element mit der ID 'green_light' hat die Klasse 'enabled'", () => {
      cy.get("#green_light").should("have.class", "enabled");
    });
  });
});
