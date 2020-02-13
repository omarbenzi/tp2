<?php

/**
 * Classe Contrôleur des Conferences
 *
 */

class Conferences
{

	public function getAll()
	{
		$oRequetesPDO = new RequetesPDO;
		echo json_encode($oRequetesPDO->getTable("conferences"));
	}

	/**
	 * Liste des Conferences
	 *
	 */
	public function getConference($Conference_id)
	{
		$oRequetesPDO = new RequetesPDO;
		echo json_encode($oRequetesPDO->getItem("conferences", $Conference_id));
	}

	/**
	 * Ajout d'une Conference
	 *
	 */
	public function postConference()
	{
		$oRequetesPDO = new RequetesPDO;

		// programmation pour JS
		// ---------------------
		$reponse["ret"] = $oRequetesPDO->postItem("conferences", $_POST);

		// programmation pour angular
		// --------------------------
		// $client = json_decode(file_get_contents("php://input"));
		// $reponse["ret"] = $oRequetesPDO->postItem("clients", $client);

		$reponse["Conferences"] = $oRequetesPDO->getTable("conferences");
		echo json_encode($reponse);
	}

	/**
	 * Modification d'une Conferences
	 *
	 */
	public function putConference($Conference_id)
	{
		$oRequetesPDO = new RequetesPDO;

		// programmation pour JS
		// ---------------------
		parse_str(file_get_contents("php://input"), $Conference);


		// programmation pour angular
		// --------------------------
		// $client = json_decode(file_get_contents("php://input"), true); // paramètre true pour convertir en tableau


		$reponse["ret"]     = $oRequetesPDO->putItem("conferences", $Conference);
		$reponse["conferences"] = $oRequetesPDO->getTable("conferences");
		echo json_encode($reponse);
	}

	/**
	 * Suppression d'une Conference
	 *
	 */
	public function deleteConference($Conference_id)
	{
		$oRequetesPDO = new RequetesPDO;
		$reponse["ret"]     = $oRequetesPDO->deleteItem("conferences", $Conference_id);
		$reponse["conferences"] = $oRequetesPDO->getTable("conferences");
		echo json_encode($reponse);
	}

	/**
	 * Récupération de la voiture d'un client
	 *
	 */
	public function getVoitureClient($client_id, $voiture_id)
	{
		echo "getVoitureClient " . $client_id . " " . $voiture_id;
	}
}
