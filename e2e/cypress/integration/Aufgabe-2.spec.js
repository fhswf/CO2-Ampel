/// <reference types="cypress" />

context("Aufgabe 2: Wir lassen die Ampel die richtige Farbe anzeigen.", () => {
  describe("Wenn der CO2-Wert über 1500 liegt, soll die Ampel rot zeigen", () => {
    before(() => {
      cy.visit("http://localhost:3000/");
    });

    it("Die Ampel zeit rot bei einem CO2-Wert von 3209.", () => {
      cy.intercept("http://localhost:3000/api/data?limit=10&host=Raum1", [
        {
          co2: 3209,
          humidity: 71,
          temp: 19,
          timestamp: "2021-05-05T13:28:26.733689Z",
        },
      ]);
      cy.get("#host_name").type("Raum1");
      cy.get("#host_name").should("have.value", "Raum1");
      cy.get("#submit").click();
      cy.get("#red_light").should("have.class", "enabled");
    });
  });

  describe("Wenn der CO2-Wert über 1500 liegt, soll die Ampel rot zeigen", () => {
    before(() => {
      cy.visit("http://localhost:3000/");
    });

    it("Die Ampel zeit gelb bei einem CO2-Wert von 1603.", () => {
      cy.intercept("http://localhost:3000/api/data?limit=10&host=Raum1", [
        {
          co2: 1603,
          humidity: 71,
          temp: 19,
          timestamp: "2021-05-05T13:28:26.733689Z",
        },
      ]);
      cy.get("#host_name").type("Raum1");
      cy.get("#host_name").should("have.value", "Raum1");
      cy.get("#submit").click();
      cy.get("#yellow_light").should("have.class", "enabled");
    });
  });

  describe("Wenn der CO2-Wert unter 1500 liegt, soll die Ampel grün zeigen", () => {
    before(() => {
      cy.visit("http://localhost:3000/");
    });

    it("Die Ampel zeit grün bei einem CO2-Wert von 405.", () => {
      cy.intercept("http://localhost:3000/api/data?limit=10&host=Raum1", [
        {
          co2: 405,
          humidity: 71,
          temp: 19,
          timestamp: "2021-05-05T13:28:26.733689Z",
        },
      ]);
      cy.get("#host_name").type("Raum1");
      cy.get("#host_name").should("have.value", "Raum1");
      cy.get("#submit").click();
      cy.get("#green_light").should("have.class", "enabled");
    });
  });
});
