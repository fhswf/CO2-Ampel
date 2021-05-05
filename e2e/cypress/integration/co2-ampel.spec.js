/// <reference types="cypress" />

context('Die CO2 Ampel', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/')
    })
  
    it('sollte sichtbar sein', () => {
        cy.get("#ampel").should("exist").should("be.visible");
    });

    it("sollte eine bestimmte Größe haben", () => {

    });

    it("sollte drei Ampelfarben haben", () => {

    })

    it("sollte initial die Farbe grün zeigen", () => {
      cy.get("#green_light").should("have.class", "enabled");
      // farbprüfung

    });

    it.only("sollte nach Eingabe des Geräts Daten zeigen.", () => {
      cy.get("#host_name").type("unit1");
      cy.get("#submit").click();
    })

    /**
     * < 800 grün
     * 800 - 1400 gelb
     * > 1500 rot
     */
  })