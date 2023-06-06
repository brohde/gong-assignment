<?php

$conn = new mysqli($DB_HOST, $DB_USER, $DB_PASSWORD, $DB_DB);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

function db_filter_by_countries($countries = []) {
  global $conn, $DISPLAY_COUNTRIES;
 
  // We must have at least one item in $countries
  if (empty($countries)) {
    $countries = $DISPLAY_COUNTRIES;
  } 

  $list = $countries;
  
  $in = str_repeat('?,', count($list) - 1) . '?'; // placeholders
  $sql = "SELECT id, first_name, last_name, email, country FROM MOCK_DATA WHERE country IN ($in) ORDER BY last_name, first_name"; // sql
  $stmt = $conn->prepare($sql); // prepare
  $types = str_repeat('s', count($list)); //types
  $stmt->bind_param($types, ...$list); // bind array at once
  $stmt->execute();
  $result = $stmt->get_result(); // get the mysqli result
  $rows = $result->fetch_all(MYSQLI_ASSOC); // fetch the data   

  header('Content-Type: application/json');
  echo json_encode(array(
    'display_countries' => $DISPLAY_COUNTRIES,
    'records' => $rows
  ));
}
