
<?php
$mailto = "stevelucascs@gmail.com";
$subject = "Contact Form";
$header = "From: ".$_POST['email'];
foreach ($_POST as $key => $value)
{
   if (!is_array($value))
   {
      $message .= "\n".$key." : ".$value;
   }
   else
   {
      foreach ($_POST[$key] as $itemvalue)
      {
         $message .= "\n".$key." : ".$itemvalue;
      }
   }
}
mail($mailto, $subject, stripslashes($message), $header);
//Below loads the thankyou.html page after the form is submitted.
        echo '<META HTTP-EQUIV="Refresh" Content="0; URL=thankyou.html">';
    }  else {
       return false;
    }
?>
