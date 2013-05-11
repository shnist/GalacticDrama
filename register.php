<html>
	<head>
        <title>Jedi Drama</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" >
        <meta name="description" content="A brand new weekly class in Drama that will teach you the skills of a Jedi as well as the core skills of acting
        in the centre of Gloucester">
		<meta name="viewport" content="width=device-width">
        <!-- droid sans font -->
        <link href='http://fonts.googleapis.com/css?family=Droid+Sans' rel='stylesheet' type='text/css'>
		<link rel="stylesheet" href="css/handheld.css" media="handheld, only screen and (max-device width:480px)">
        <!--[if IE 8]><link rel="stylesheet" href="css/ie8.css" media="screen" ><![endif]-->
        <!--[if IE 7]><link rel="stylesheet" href="css/ie7.css" media="screen" ><![endif]-->
        <!--[if IE 6]><link rel="stylesheet" href="css/ie6.css" media="screen" ><![endif]-->            			
        <link rel="stylesheet" href="css/styles.css" media="screen">
		<meta name="robots" content="noindex">
	</head>
	<body>
        <div id="content">
            <h1>Jedi Drama</h1>		
				<?php
					if (isset($_POST["submit"]) === true || $_POST['submit-keyboard-fallback'] === 'submit') {
						// all values of the form stored in variables
						$givenName = $_POST['given-name'];
						$familyName = $_POST['family-name'];
						$childGivenName = $_POST['child-given-name'];
						$childFamilyName = $_POST['child-family-name'];
						$age = $_POST['child-age'];
						$email = $_POST['email'];
						$telNo = $_POST['telephone'];
						
						// helpmeobi1@live.com
						$toEmail = 'helpmeobi1@live.com, shnist@btinternet.com'; 
						$emailSubject = 'Galactic Drama Interest'; 
						$mailheader = "From: ".$email."\r\n"; 
						$mailheader .= "Reply-To: ".$email."\r\n"; 
						$mailheader .= "Content-type: text/html; charset=iso-8859-1\r\n";
						// creating the email message
						$body = "Parent's Name: ".$givenName." ".$familyName; 
						$body .= " Child's Name: ".$childGivenName." ".$childFamilyName; 
						$body .= " Child's Age: ".$age." ";
						$body .= " Email: ".$email." ";
						$body .= " Tel: ".$telNo." ";
						mail($toEmail, $emailSubject, $body, $mailheader) or die ("Failure");
						
						echo "<p id='strap-line'>Thanks for registering your interest. We'll get back to you shortly!
							<a href='index.html' class='back'>Back to Home Page</a></p>";
					}
				?>
		</div>
	</body>
</html>