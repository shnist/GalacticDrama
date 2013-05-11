<html>
	<head>
        <title>Jedi Parties</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" >
        <meta name="description" content="Jedi Parties. Now you can have a birthday that is out of this universe!">
		<meta name="viewport" content="width=device-width, initial-scale=1">
        <!-- droid sans font -->
        <link href='http://fonts.googleapis.com/css?family=Droid+Sans' rel='stylesheet' type='text/css'>
		<link rel="stylesheet" href="css/handheld.css" media="handheld, only screen and (max-device width:480px)">
        <!--[if IE 8]><link rel="stylesheet" href="css/ie8.css" media="screen" ><![endif]-->
        <!--[if IE 7]><link rel="stylesheet" href="css/ie7.css" media="screen" ><![endif]-->
        <link rel="stylesheet" href="css/styles.css" media="screen">
		<meta name="robots" content="noindex">
	</head>
	<body>
        <div id="content">
            <h1>Jedi Parties</h1>
				<?php
					if (isset($_POST["submit"]) === true || $_POST['submit-keyboard-fallback'] === 'submit') {
						// all values of the form stored in variables
						$givenName = $_POST['given-name'];
						$familyName = $_POST['family-name'];
						$email = $_POST['email'];
						$telNo = $_POST['telephone'];
						$details = $_POST['details'];

						// helpmeobi1@live.com
						$toEmail = 'shnist@btinternet.com';
						$emailSubject = 'Jedi Party Booking';
						$mailheader = "From: ".$email."\r\n";
						$mailheader .= "Reply-To: ".$email."\r\n";
						$mailheader .= "Content-type: text/html; charset=iso-8859-1\r\n";
						// creating the email message
						$body = "Name: ".$givenName." ".$familyName;
						$body .= " Email: ".$email." ";
						$body .= " Tel: ".$telNo." ";
						$body .= " Details: ".$details." ";

						mail($toEmail, $emailSubject, $body, $mailheader) or die ("Failure");

						echo "<p id='strap-line'>Thanks for your enquiry. We'll get back to you shortly!
							<a href='parties.html' class='back'>Back to Jedi Parties</a></p>";
					}
				?>
		</div>
		<script type="text/javascript">
			var _gaq = _gaq || [];
			_gaq.push(['_setAccount', 'UA-40853410-1']);
			_gaq.push(['_trackPageview']);

			(function() {
			var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
			ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
			var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
			})();
		</script>
	</body>
</html>