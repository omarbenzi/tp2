let gestionConferences = function () {

	const BASE_URI = "https://e1995039.webdev.cmaisonneuve.qc.ca/tp2/backend/";

	let oGestionConferences = {

		/**
		 * Récupération de la liste des Conferences
		 * avec une requête ajax
		 */
		listerConferences() {
			$.get({ url: BASE_URI + "Conferences", cache: false }).
				done((ConferencesJson) => {
					let Conferences = JSON.parse(ConferencesJson);


					this.afficherConferences(Conferences);
				}).
				fail(this.afficherErreur);
		},


		/**
		 * Formulaire d'ajout d'un Conference
		 * avec une requête ajax
		 */
		ajouterConference() {

			// réinitialisation de la zone commune d'affichage dynamique
			// ---
			$("#wrapper").html("");

			// insertion du formulaire à partir d'un clone du template
			// ---
			let t = $("#t-ConferenceAjout").prop("content");
			let tClone = t.cloneNode(true);
			$("#wrapper").append(tClone);

			// création du listener associé au bouton de validation
			// ---
			$("#bValider").click(() => {

				// excécution de la requête ajax de modificaiton
				// si les contrôles de saisie sont validés
				// ---
				if (this.controlerSaisie()) {

					// sérialisation des données saisies 
					// ---
					let donnees = $("form").serialize();

					// exécution de la requête ajax POST (création d'un Conference)
					// ---
					$.ajax({ url: BASE_URI + "Conferences", data: donnees, type: "POST" }).
						done((reponseJson) => {
							let reponse = JSON.parse(reponseJson);

							// préparation d'un message de compte-rendu
							// et affichage de la page de liste
							// ---
							let ret = "Conference" + (!reponse['ret'] ? " non" : "") + " ajouté.";
							this.afficherConferences(reponse["Conferences"], ret);
						}).
						fail(this.afficherErreur);
				}
			});
		},


		/**
		 * Formulaire de modification d'un Conference
		 * avec une requête ajax
		 */
		modifierConference() {

			// requête ajax de récupération des données du Conference à modifier
			// pour les afficher dans le formulaire
			// ---
			let id = event.target.dataset.id;
			$.get({ url: BASE_URI + "Conferences/" + id, cache: false }).
				done((ConferenceJson) => {
					let c = JSON.parse(ConferenceJson);

					// réinitialisation de la zone commune d'affichage dynamique
					// ---
					$("#wrapper").html("");

					// insertion du formulaire avec intégration des données du Conference
					// à partir d'un clone du template
					// ---
					let t = $("#t-conferenceModification").prop("content");
					let tClone = t.cloneNode(true);
					let e = tClone.lastElementChild;
					$(e).html(eval("`" + $(e).html() + "`"));
					$("#wrapper").append(tClone);

					// création du listener associé au bouton de validation
					// ---
					$("#bValider").click(() => {

						// excécution de la requête ajax de modificaiton
						// si les contrôles de saisie sont validés
						// ---
						if (this.controlerSaisie()) {

							// sérialisation des données saisies
							// ---
							let donnees = $("form").serialize();

							//  exécution de la requête ajax PUT (mise à jour d'un Conference)
							// ---
							$.ajax({ url: BASE_URI + "Conferences/" + id, data: donnees, type: "PUT" }).
								done((reponseJson) => {
									let reponse = JSON.parse(reponseJson);

									// préparation d'un message de compte-rendu
									// et affichage de la page de liste
									// ---
									let ret = "Conference  numéro " + id + (!reponse['ret'] ? " non" : "") + " modifiée.";
									this.afficherConferences(reponse["conferences"], ret);
								}).
								fail(this.afficherErreur);
						}
					});
				}).
				fail(this.afficherErreur);
		},

		/**
		 * Suppression d'un Conference
		 * avec une requête ajax
		 */
		supprimerConference() {

			// excécution de la requête ajax de suppression
			// ---
			let id = event.target.dataset.id;
			$.ajax({ url: BASE_URI + "Conferences/" + id, type: "DELETE" }).
				done((reponseJson) => {
					let reponse = JSON.parse(reponseJson);
					let ret = "Conference numéro " + id + (!reponse['ret'] ? " non" : "") + " supprimée.";
					this.afficherConferences(reponse["conferences"], ret);
				}).
				fail(this.afficherErreur);
		},


		/**
		 * Affichage d'un message d'erreur suite à un problème technique
		 * en retour d'une requête ajax
		 */
		afficherErreur(erreur) {
			$("#wrapper").html("");
			$("#erreur").html(
				erreur.status + " " + erreur.statusText + "<br>" + erreur.responseText);
		},


		/**
		 * Affichage de la liste des Conferences
		 * en retour d'une requête ajax
		 */
		afficherConferences(Conferences, ret) {


			// réinitialisation de la zone d'affichage dynamique
			// ---
			$("#wrapper").html("");

			// insertion de l'en-tête fixe à partir d'un clone du template (t)
			// ---
			let t = $("#t-ConferencesListe").prop("content");
			let tClone = document.importNode(t, true);
			$("#wrapper").append(tClone);
			if (ret) $("#ret").html(ret);

			// insertion de chaque ligne Conference à partir d'un clone du sous-template (t2)
			// ---
			let t2 = $("#t-ConferencesListeItem").prop("content");
			$(Conferences).each((i, c) => {

				let t2Clone = t2.cloneNode(true).firstElementChild;
				$(t2Clone).html(eval("`" + $(t2Clone).html() + "`"));
				$("#wrapper").append(t2Clone);
			});

			// création des listeners associés aux spans des actions
			// ---
			$("#wrapper [data-action='ajouter']").click(this.ajouterConference.bind(this));
			$("#wrapper [data-action='modifier']").click(this.modifierConference.bind(this));
			$("#wrapper [data-action='supprimer']").click(this.supprimerConference.bind(this));
		},

		/**
		 * Contrôle de la saisie
		 */
		controlerSaisie() {
			let controles = {///\S+/
				conference_titre: { regexp: /^(([A-Za-z]{2,}[\-\']?)*([A-Za-z]{2,})?\s)*([A-Za-z]+[\-\']?)*([A-Za-z]{2,})/i, mesErr: "au moins 2 caractères." },
				conference_resume: { regexp: /^\S{2,}$/i, mesErr: "au moins 2 caractères." },
				conference_categorie: { regexp: /^\S{2,}$/i, mesErr: "au moins 2 caractères." },
				conference_presentateur: { regexp: /^\S{2,}$/i, mesErr: "au moins 2 caractères." },
				conference_Institution_du_presentateur: { regexp: /^\S{2,}$/i, mesErr: "au moins 2 caractères." },
				conference_sale: { regexp: /^\S{2,}$/i, mesErr: "au moins 2 caractères." },

				conference_date: { regexp: /^\d{4}-\d{2}-\d{2}$/, mesErr: "Date invalide." },
				conference_heure_debut: { regexp: /^\d{2}:\d{2}$/, mesErr: "Heure invalide." },
				conference_heure_fin: { regexp: /^\d{2}:\d{2}$/, mesErr: "Heure invalide." },

			};
			let valide = true;
			for (controle in controles) {
				let mesErr = "";
				let c = controles[controle];
				if (!c.regexp.test(frm[controle].value)) {
					valide = false;
					mesErr = c.mesErr;
				}
				$("#" + controle + "_err").html(mesErr);
			}
			return valide;
		},
		/**
  *construit le header du tableau à afficher
  * prend les cles de chaque object produit dans le tableau des prouits
  * @param products    le tableau des prouits
  * @returns tableHeader un tableau qui contient le header
  */
		getNeededtableHeader(products) {
			let tableHeader = [];
			products.forEach(produit => {
				Object.keys(produit).forEach(element => {
					if (!tableHeader.includes(element)) tableHeader.push(element); // si nous n'avons pas encore la cle
				});
			});
			return tableHeader;
		}
	}
	return oGestionConferences;
}();