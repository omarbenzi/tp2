<?php

/**
 * Classe RequetesPDO, accès PDO aux tables MySQL
 *
 */

class RequetesPDO
{

    /**
     * Récupération des lignes d'une table 
     *
     * @return array
     */
    public function getTable($table)
    {
        $sPDO = SingletonPDO::getInstance();
        $cleNom =  substr($table, 0, -1) . "_id";
        $oPDOStatement = $sPDO->prepare("SELECT * FROM $table ORDER BY $cleNom DESC");
        $oPDOStatement->execute();
        return $oPDOStatement->fetchAll(PDO::FETCH_ASSOC);
    }


    /**
     * Récupération d'une ligne dans une table avec sa clé primaire
     *
     * @return array
     */
    public function getItem($table, $cle)
    {
        $sPDO = SingletonPDO::getInstance();
        $cleNom = substr($table, 0, -1) . "_id";
        $req = "SELECT * FROM $table WHERE $cleNom=:$cleNom";
        $oPDOStatement = $sPDO->prepare($req);
        $oPDOStatement->bindValue(":$cleNom", $cle);
        $oPDOStatement->execute();
        return $oPDOStatement->fetch(PDO::FETCH_ASSOC);
    }

    /**
     * Ajout d'un item dans une table
     *
     * @return boolean false if no row added in the main table, true otherwise
     */
    public function postItem($table, $champs)
    {
        $sPDO = SingletonPDO::getInstance();
        $req = "INSERT INTO $table SET ";
        foreach ($champs as $nom => $valeur) {
            $req .= $nom . "=:" . $nom . ", ";
        }
        $req = substr($req, 0, -2);
        $oPDOStatement = $sPDO->prepare($req);
        foreach ($champs as $nom => $valeur) {
            $oPDOStatement->bindValue(":" . $nom, $valeur);
        }
        $oPDOStatement->execute();
        if ($oPDOStatement->rowCount() == 0) {
            return false;
        } else {
            return true;
        }
    }


    /**
     * Modification d'un item dans une table
     *
     * @return boolean false if no row modified in the main table, true otherwise
     */
    public function putItem($table, $champs)
    {

        $sPDO = SingletonPDO::getInstance();
        $cleNom = substr($table, 0, -1) . "_id";
        $req = "UPDATE $table SET ";
        foreach ($champs as $nom => $valeur) {
            $req .= $nom . "=:" . $nom . ", ";
        }
        $req  = substr($req, 0, -2);
        $req .= " WHERE $cleNom=:$cleNom";
        $oPDOStatement = $sPDO->prepare($req);
        foreach ($champs as $nom => $valeur) {
            $oPDOStatement->bindValue(":" . $nom, $valeur);
        }
        $oPDOStatement->bindValue(":" . $cleNom, $champs[$cleNom]);
        $oPDOStatement->execute();
        if ($oPDOStatement->rowCount() == 0) {
            return false;
        } else {
            return true;
        }
    }


    /**
     * Suppression d'un item dans une table
     *
     * @return boolean false if no row deleted in the main table, true otherwise
     */
    public function deleteItem($table, $cle)
    {
        $sPDO = SingletonPDO::getInstance();
        $cleNom = substr($table, 0, -1) . "_id";
        $oPDOStatement = $sPDO->prepare("DELETE FROM $table WHERE $cleNom=:$cleNom");
        $oPDOStatement->bindValue(":" . $cleNom, $cle);
        $oPDOStatement->execute();
        if ($oPDOStatement->rowCount() == 0) {
            return false;
        } else {
            return true;
        }
    }
}
