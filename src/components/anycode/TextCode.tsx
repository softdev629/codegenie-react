import { useState } from "react";
import CodeEditor from "@uiw/react-textarea-code-editor";

const TextCode = () => {
  const [code, setCode] = useState(`<?php
  session_start();
  if(isset($_POST['submit'])){ //don't show the error if Submit button not clicked.
  $username = filter_input(INPUT_POST,'username', FILTER_SANITIZE_SPECIAL_CHARS);
  $password = $_POST['password'];
  if ($username == 'john' && $password == 'password') {
  $_SESSION['username'] = $username;
  header('Location: /php_course/extras/dashboard.php');
  } else {
  echo 'Incorrect Login';
  }
}
  `);
  return (
    <CodeEditor
      value={code}
      language="js"
      placeholder="Please enter JS code."
      onChange={(evn) => setCode(evn.target.value)}
      padding={15}
      style={{
        fontSize: 16,
        backgroundColor: "inherit",
        fontFamily:
          "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
      }}
    />
  );
};

export default TextCode;
