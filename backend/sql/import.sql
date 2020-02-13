--
-- Base de données: p51
--


--
-- Structure de la table clients
--
CREATE TABLE conferences
(
    conference_id INT
    UNSIGNED NOT NULL AUTO_INCREMENT,
conference_titre            VARCHAR
    (255) NOT NULL,
conference_resume        VARCHAR
    (255) NOT NULL,
conference_categorie        VARCHAR
    (255) NOT NULL,
conference_date DATE         NOT NULL,
conference_heure_debut      VARCHAR
    (255) NOT NULL,
conference_heure_fin      VARCHAR
    (255) NOT NULL,
conference_sale      VARCHAR
    (255) NOT NULL,
conference_presentateur     VARCHAR
    (255) NOT NULL,
conference_Institution_du_presentateur   VARCHAR
    (255) NOT NULL,
PRIMARY KEY
    (conference_id)
) ENGINE=InnoDB DEFAULT CHARACTER
    SET utf8;

    INSERT INTO conferences
        (conference_titre, conference_categorie, conference_date, conference_resume,conference_heure_debut,conference_heure_fin,conference_sale,conference_presentateur,conference_Institution_du_presentateur )
    VALUES
        ("Aubin", "Alain", "1981-01-01", "resume 514 111-1234", "12:23", "15:44", "16", "ahmed", "asbein"),
        ("Brel", "Bruno", "1982-02-02", "resume 514 222-1234", "12:23", "15:44", "16", "ahmed", "asbein"),
        ("Chabot", "Clara", "1983-03-03", "resume 514 333-1234", "12:23", "15:44", "16", "ahmed", "asbein"),
        ("Dubois", "Didier", "1984-04-04", "resume 514 444-1234", "12:23", "15:44", "16", "ahmed", "asbein"),
        ("Escot", "Ernest", "1985-05-05", "resume 514 555-1234", "12:23", "15:44", "16", "ahmed", "asbein"),
        ("Fortin", "France", "1986-06-06", "resume 514 666-1234", "12:23", "15:44", "16", "ahmed", "asbein"),
        ("Gravel", "Gérard", "1987-07-07", "resume 514 777-1234", "12:23", "15:44", "16", "ahmed", "asbein"),
        ("Hébert", "Hugo", "1988-08-08", "resume 514 888-1234", "12:23", "15:44", "16", "ahmed", "asbein"),
        ("Imbert", "Iris", "1989-09-09", "resume 514 999-1234", "12:23", "15:44", "16", "ahmed", "asbein");