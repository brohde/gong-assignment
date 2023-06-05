<?php

$conn = new mysqli($DB_HOST, $DB_USER, $DB_PASSWORD, $DB_DB);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

function db_all_records() {
  global $conn;

  // Query the database table
  $sql = "SELECT id, first_name, last_name, email, country FROM MOCK_DATA ORDER BY country, last_name, first_name";
  $result = $conn->query($sql);

  $rows = array();
  while ($row = $result->fetch_assoc()) {
      $rows[] = $row;
  }

  // Convert the array to JSON and send the response
  header('Content-Type: application/json');
  echo json_encode($rows);
}

function db_filter_by_countries($countries = []) {
  global $conn, $DISPLAY_COUNTRIES;
 
  if (empty($countries)) {
    $countries = $DISPLAY_COUNTRIES;
  } 

  $list = $countries;
  
  $in    = str_repeat('?,', count($list) - 1) . '?'; // placeholders
  $sql   = "SELECT id, first_name, last_name, email, country FROM MOCK_DATA WHERE country IN ($in) ORDER BY country, last_name, first_name"; // sql
  $stmt  = $conn->prepare($sql); // prepare
  $types = str_repeat('s', count($list)); //types
  $stmt->bind_param($types, ...$list); // bind array at once
  $stmt->execute();
  $result = $stmt->get_result(); // get the mysqli result
  $rows = $result->fetch_all(MYSQLI_ASSOC); // fetch the data   

  header('Content-Type: application/json');
  echo json_encode($rows);
}

// Close the database connection
// $conn->close();
