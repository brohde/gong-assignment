<?php
  header("Access-Control-Allow-Origin: http://localhost:3000");

  require_once 'config.php';
  require_once 'db.php';

  if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // TODO: Grab filter= GET parameter
    
    if (isset($_GET['country'])) {
      $requested_countries = explode(',', $_GET['country']);

      // Only allow countries from $DISPLAY_COUNTRIES
      $valid_countries = array_intersect($requested_countries, $DISPLAY_COUNTRIES);
      db_filter_by_countries($valid_countries);

    } else {
      db_filter_by_countries($DISPLAY_COUNTRIES);
    }
  }
