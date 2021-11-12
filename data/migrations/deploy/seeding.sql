-- Deploy ldo:seeding to pg
BEGIN;
INSERT INTO
  public."user"(role, lastname, firstname, mail)
VALUES
  ('admin', 'doe', 'Benoît', 'benoit.doe@gmail.com');
INSERT INTO
  public.password(hash, user_id)
VALUES
  (
    '$2b$10$jxvbaYnHr6qd9nsKS6XAXOSCatNt8jDDDNLMVhDfbZIoKpILHa/ku',
    1
  );
INSERT INTO
  public.job(title, region, city, type, description)
VALUES
  (
    'Conducteur routier chauffeur SPL H/F',
    'Occitanie',
    'Toulouse',
    'CDI',
    'La société Transports Tomate spécialisée dans le transport frigorifique sur des lignes régionales, recherche des conducteurs SPL H/F expérimentés au départ de Toulouse (31).

    Le profil recherché :

    - Titulaire du permis EC avec FIMO (ou FCO) à jour

    - carte conducteur à jour

    - Transport régional

    Type d"emploi : Temps plein, CDI

    Salaire : à partir de 10,49€ par heure

    Horaires :

    Heures Supplémentaires
    Rémunération supplémentaire :

    Heures supplémentaires majorées
    Expérience:

    Conduite De Super Poids Lourds: 1 an (Optionnel)
    Permis/certificat:

    FIMO (Exigé)
    FCO (Optionnel)
    Permis EC (Exigé)'
  ),
  (
    'Conducteur routier SPL H/F',
    'PACA',
    'Châteaurenard',
    'CDI',
    'cherche conducteur routier SPL container maritime en CDI avec expérience (H/F)

Du lundi au vendredi

Vous êtes titulaire du permis EC avec FIMO/FCO, carte conducteur à jour.

Vous avez de l"expérience en tant que chauffeur routier.

Missions :

- Effectuer les transports chez nos clients en toute sécurité avec courtoisie et dans le respect de la réglementation et des procédures de l"entreprise,

- Vérifier l"état de bon fonctionnement du véhicule,

- Entretenir d"excellentes relations avec les clients et l"ensemble du personnel.

Type d"emploi : CDI, contrat à 186 heures mensuelles

Salaire : 10,40€ /heure soit 2 300,00€ à 2 800,00€ /mois

1 à 3 découchés par semaine

Panier repas : 19,10€

Type d"emploi : Temps plein, Contrat pro

Salaire : 2 300,00€ à 2 800,00€ par mois

Horaires :

Du Lundi au Vendredi
Capacité à faire le trajet ou à déménager:

13160 Châteaurenard: Faire le trajet sans problème ou prévoir un déménagement avant de prendre son poste (Optionnel)
Expérience:

Conduite De Super Poids Lourds: 1 an (Optionnel)
Permis/certificat:

FIMO (Exigé)
FCO (Exigé)'
  ),
  (
    'Chauffeur SPL',
    'Puy-de-Dôme',
    'Gerzat',
    'CDI',
    'Cherchons un conducteur'
  ),
  (
    'Chauffeur routier Grand Déplacement PL/SPL',
    'Val-De-Loire',
    'Chartres',
    'CDI',
    'Conducteur Benne TP sur ensemble semi-benne ou porteur. Matériel récent (janv et mars 2018)
      Base vie Chilly Mazarin, chantier du grand Paris.
      Grand déplacement en découche la semaine.
      Rémunération selon profil et expérience à partir de 2 500€net/mois
      Permis C et/ou EC + FIMO/FCO à jour
      Vous êtes motivé et sérieux
      Envoyez votre CV + lettre de motivation par mail'
  ),
  (
    'Chauffeur de salle',
    'Bretagne',
    'Vannes',
    'CDI',
    'Cherchons un conducteur'
  ),
  (
    'Chauffeur Porte-caisse',
    'Occitanie',
    'Toulouse',
    'CDD',
    'Cherchons une conductrice pas trop cher'
  );
INSERT INTO
  public.user_job(user_id, job_id)
VALUES
  (1, 1),
  (1, 2);
COMMIT;