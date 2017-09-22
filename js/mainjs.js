		$(document).ready(function(){

			$("#notif").hide();

			document.getElementById("wordBox").disabled=true;

			localStorage.removeItem("indek");
			localStorage.setItem("indek","0");

			localStorage.removeItem("poin");
			localStorage.setItem("poin","0");

			var soal = 1;

			$("#soal").html(soal);
			$("#poin").html("0");

			var indek = localStorage.getItem("indek");

			$.ajax({
			    type: 'GET',
			    url: 'modules/mod_words.php',
			    data: 'id='+indek,
			    dataType: 'json',
			    cache: false,
			    success: function(result) {
				var word = result[indek];

				words = word.split('').sort(function(){return 0.5-Math.random()}).join('');

				if(words == word){
					words = words.split('').sort(function(){return 0.5-Math.random()}).join('');
				}

				localStorage.removeItem("kata");
				localStorage.setItem("kata",word);

				$("#wordBox").html(words);
			    },
			});

			/*$("#words_answer").bind("change keyup",function(e){
				if (e.keyCode == 13){
					$("#words_submit").click();
				}
			});*/
			
			$("#words_submit").click(function(){

				var old_kata = localStorage.getItem("kata");
				var jawab = $("#words_answer").val();
				var old_indek = localStorage.getItem("indek");
				var new_indek = parseInt(old_indek) + 1;
				var old_poin = localStorage.getItem("poin");

				$("#notif").hide();

				if(jawab.toUpperCase() == old_kata.toUpperCase()){
					$("#notif").show();
					$("#notif").css("color","green");
					$("#notif").html("Jawaban anda benar. Poin bertambah 1 :)");

					//reset input text
					$("#words_answer").val('');

					var new_poin = parseInt(old_poin)+1;

					localStorage.removeItem("poin");
					localStorage.setItem("poin",new_poin);

				}else{
					$("#notif").show();
					$("#notif").css("color","red");
					$("#notif").html("Jawaban anda salah. Poin dikurangi 1 :(");

					//reset input text
					$("#words_answer").val('');

					var new_poin = parseInt(old_poin)-1;

					if(new_poin <= 0){
						new_poin = 0;
					}

					localStorage.removeItem("poin");
					localStorage.setItem("poin",new_poin);
				}

				localStorage.removeItem("indek");
				localStorage.setItem("indek", new_indek);

				var indek = localStorage.getItem("indek");
				var poin = localStorage.getItem("poin");

				$("#poin").html(poin);

				$.ajax({
				    type: 'GET',
				    url: 'modules/mod_words.php',
				    data: 'id='+indek,
				    dataType: 'json',
				    cache: false,
				    success: function(result) {
					var word = result[indek];
					var total_indek = result.length;
					var soal = parseInt(indek)+1;

					if(parseInt(indek) >= total_indek ){
						document.getElementById("words_submit").disabled = true;
						document.getElementById("words_answer").disabled = true;
						$("#wordBox").html("Terima kasih sudah mencoba :)");	
					}

					words = word.split('').sort(function(){return 0.5-Math.random()}).join('');

					if(words == word){
						words = words.split('').sort(function(){return 0.5-Math.random()}).join('');
					}

					localStorage.removeItem("kata");
					localStorage.setItem("kata",word);

					if(soal > total_indek){
						soal = parseInt(soal)-1;
					}

					$("#soal").html(soal);

					$("#wordBox").html(words);
				    },
				});
			});
		});
