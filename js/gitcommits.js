$(window).unload(function() {
	if(store.session.has('unusualcommitusername')){
		store.session.remove('unusualcommitusername');
	}
	if(store.session.has('unusualcommitreponame')) {
		store.session.remove('unusualcommitreponame');
	}
	if(store.session.has('unusualcommitdata')) {
		store.session.remove('unusualcommitdata');
	}
	if(store.session.has('unusualcommitpid')) {
		store.session.remove('unusualcommitpid');
	}
});

window.onload = function() {

  function getScrollTop() {
    if (typeof window.pageYOffset !== 'undefined' ) {
      // Most browsers
      return window.pageYOffset;
    }

    var d = document.documentElement;
    if (d.clientHeight) {
      // IE in standards mode
      return d.scrollTop;
    }

    // IE in quirks mode
    return document.body.scrollTop;
  }

  window.onscroll = function() {
    var box = document.getElementById('movablebtn'),
        scroll = getScrollTop();

	var maxalw = $( document ).height() - $("#survey_container").height() -300;
    if (scroll <= 10 || scroll >= maxalw) {
      box.style.top = "0px";
    }
    else {
      box.style.top = (scroll) + "px";
    }
  };

};

$(function(){

	
	var serverurl = 'feature5.andrew.cmu.edu';
     
    var participantid =  store.session.get('unusualcommitpid') 		
	var username = store.session.get('unusualcommitusername');
	var reponame = store.session.get('unusualcommitreponame');
	var commitiddata =   store.session.get('unusualcommitdata');
		
	if(commitiddata == null || username == null || reponame == null) {
		window.location.href = "index.html";
	}
	
	//This function is here because inside it is not behaving properly.
	$('.myfileschanged').on('click', function(){
		var id = '.myjscollapse';
		if($(".details-collapse ol").hasClass(id)) {
			$(".details-collapse ol").hide();
			$(".details-collapse ol").removeClass(id);
		}else {	
			$(".details-collapse ol").show();
			$(".details-collapse ol").addClass(id);

		}	
	});
	
	var reason = new Object();
    	/*reason['totalloc'] = '/X or more <strong>lines of code</strong> are <font color=red>/Y</font> <strong>changed</strong>. (only in <strong>/HH%</strong> of all commits)';
    	reason['totallocauth'] = "/X or more <strong>lines of code</strong> are <font color=red>/Y</font> <strong>changed</strong> by <font color=blue>/A</font>. (only in <strong>/HH%</strong> of commits by /A)";
    	reason['locadded'] = '/X or more <strong>lines of code</strong>  are <font color=red>/Y</font> <strong>added</strong>. (only in <strong>/HH%</strong> of all commits)';
    	reason['locaddedauth'] = "/X or more <strong>lines of code</strong> are <font color=red>/Y</font> <strong>added</strong> by <font color=blue>/A</font>. (only in <strong>/HH%</strong> of all commits by /A)";
    	reason['locremoved'] = '/X or more <strong>lines of code</strong> are <font color=red>/Y</font> <strong>removed</strong>. (only in <strong>/HH%</strong> of all commits)';
    	reason['locremovedauth'] = '/X or more <strong>lines of code</strong> are <font color=red>/Y</font> <strong>removed</strong> by <font color=blue>/A</font>. (only in <strong>/HH%</strong> of commits by /A)';
    	reason['totalfilechanged'] = '/X or more <strong>files</strong> are <font color=red>/Y</font> <strong>changed</strong>. (only in <strong>/HH%</strong> of all commits)';
    	reason['totalfilechangedauth'] = '/X or more <strong>files</strong> are <font color=red>/Y</font> <strong>changed</strong> by <font color=blue>/A</font>. (only in <strong>/HH%</strong> of commits by /A)';
    	reason['totalfileaddedauth'] = '/X or more <strong>files</strong> are <font color=red>/Y</font> <strong>added</strong> by <font color=blue>/A</font>. (only in <strong>/HH%</strong> of commits by /A)';
    	reason['totalfileremovedauth'] = '/X or more <strong>files</strong> are <font color=red>/Y</font> <strong>removed</strong> by <font color=blue>/A</font>. (only in <strong>/HH%</strong> of commits by /A)';
		reason['commitmsg'] = 'Commit message with /X <strong>words</strong> is much longer than a typical <strong>commit message</strong>. (only <strong>/HH%</strong> of commit messages are longer)';
    	reason['commitmsgauth'] = 'Commit message with /X <strong>words</strong> is much longer than a typical <strong>commit message</strong> by <font color=blue>/A</font>. (only <strong>/HH%</strong> of commit messages by /A are longer)';
    	reason['timeofcommitauth'] = '<font color=blue>/A</font> <font color=red>/Y</font> commits around <strong>/X</strong>. (only in <strong>/HH%</strong> of commits by /A)';
    	reason['filpercentchan'] = '<font color=green>/X</font> files are <font color=red>/Y</font> changed. (only <strong>/HH%</strong> of all files changed)';
    	reason['filpercentchanauth'] = '<font color=green>/X</font> files are <font color=red>/Y</font> changed by <font color=blue>/A</font>. (only <strong>/HH%</strong> of all files changed by /A)';
    	reason['filpercommit'] = '<font color=green>/X</font> files <font color=red>/Y</font> <strong>occur</strong> in a commit. (only in <strong>/HH%</strong> of all commits)';
    	reason['filpercommitauth'] = '<font color=green>/X</font> files <font color=red>/Y</font> <strong>occur</strong> in a commit by <font color=blue>/A</font>. (only in <strong>/HH%</strong> of commits by /A)';
    	reason['combfrequency'] = '<font color=green>/X</font> files are <font color=red>/Y</font> changed <strong>together</strong>. (only in <strong>/HH%</strong> of all commits)';
    	reason['combfrequencyauth'] = '<font color=green>/X</font> files are <font color=red>/Y</font> changed <strong>together</strong> by <font color=blue>/A</font>. (only in <strong>/HH%</strong> of commits by /A)';
		reason['combprobability'] = '<font color=green>/X</font> files are <font color=red>/Y</font> changed in this <strong>ratio</strong>. (only in <strong>/HH%</strong> of all commits)';
    	reason['combprobabilityauth'] = '<font color=green>/X</font> files are <font color=red>/Y</font> changed in this <strong>ratio</strong> by <font color=blue>/A</font>. (only in <strong>/HH%</strong> of commits by /A)';*/
    	
    	reason['totalloc'] = '<strong>Many lines of code</strong> were <strong>changed</strong> -- <font color=red>much more than common</font> in this repository. (/X lines of code changed; only <strong>/HH%</strong> of all commits are larger)';
		reason['totallocauth'] ='<strong>Many lines of code</strong> were <strong>changed</strong> -- <font color=red>much more than common</font> for changes by <font color=blue>/A</font>. (/X lines of code changed; only <strong>/HH%</strong> of all commits by /A are larger)';
		reason['locadded'] = '<strong>Many lines of code</strong> were <strong>added</strong> -- <font color=red>much more than common</font> in this repository. (/X lines of code added; only <strong>/HH%</strong> of all commits are larger)';
		reason['locaddedauth'] = '<strong>Many lines of code</strong> were <strong>added</strong> -- <font color=red>much more than common</font> for changes by <font color=blue>/A</font>. (/X lines of code added; only <strong>/HH%</strong> of all commits by /A are larger)';
		reason['locremoved'] = '<strong>Many lines of code</strong> were <strong>removed</strong> -- <font color=red>much more than common</font> in this repository. (/X lines of code removed; only <strong>/HH%</strong> of all commits are larger)';
		reason['locremovedauth'] = '<strong>Many lines of code</strong> were <strong>removed</strong> -- <font color=red>much more than common</font> for changes by <font color=blue>/A</font>. (/X lines of code removed; only <strong>/HH%</strong> of all commits by /A are larger)';   	
		reason['totalfilechanged'] = '<strong>Many files</strong> were <strong>changed</strong> -- <font color=red>many more than common</font> in this repository. (/X files changed; only <strong>/HH%</strong> of all commits are larger)';
		reason['totalfilechangedauth'] = '<strong>Many files</strong> were <strong>changed</strong> -- <font color=red>many more than common</font> for changes by <font color=blue>/A</font>. (/X files changed; only <strong>/HH%</strong> of all commits by /A are larger)';
		reason['totalfileaddedauth'] = '<strong>Many files</strong> were <strong>added</strong> -- <font color=red>many more than common</font> for changes by <font color=blue>/A</font>. (/X files added; only <strong>/HH%</strong> of all commits by /A are larger)';
		reason['totalfileremovedauth'] = '<strong>Many files</strong> were <strong>removed</strong> -- <font color=red>many more than common</font> for changes by <font color=blue>/A</font>. (/X files removed; only <strong>/HH%</strong> of all commits by /A are larger)';		
		reason['commitmsg'] = 'The <strong>commit message</strong> is <font color=red>unusually long</font>. (/X <strong>words</strong>, only <strong>/HH%</strong> of all commit messages are longer)';
		reason['commitmsgauth'] = 'The <strong>commit message</strong> is <font color=red>unusually long</font>. (/X <strong>words</strong>, only <strong>/HH%</strong> of all commit messages by <font color=blue>/A</font> are longer)';    	
		reason['timeofcommitauth'] = 'Changes were commited at <strong>/X</strong> -- <font color=blue>/A</font> <font color=red> rarely </font> commits around that time. (fewer than <strong>/HH%</strong> of all commits by /A are around that time)';    	
		reason['filpercentchan'] = '<font color=green><strong>/X</strong></font> files were changed -- such files are <font color=red>rarely</font> changed in this repository. (fewer than <strong>/HH%</strong> of all file types changed)';
		reason['filpercentchanauth'] ='<font color=green><strong>/X</strong></font> files were changed -- such files are <font color=red>rarely</font> changed by <font color=blue>/A</font>. (fewer than <strong>/HH%</strong> of all file types changed by /A)';
		reason['filpercommit'] = '<font color=green><strong>/X</strong></font> files were changed -- such files <font color=red>rarely</font> occur in a commit in this repository. (in fewer than <strong>/HH%</strong> of all commits)';
		reason['filpercommitauth'] = '<font color=green><strong>/X</strong></font> files were changed -- such files <font color=red>rarely</font> occur in a commit by <font color=blue>/A</font>. (in fewer than <strong>/HH%</strong> of all commits by /A)';   	
		reason['combfrequency'] = '<font color=green><strong>/X</strong></font> files were changed in the same commit -- this combination of files is <font color=red>rarely</font> <strong>changed together</strong>. (in fewer than <strong>/HH%</strong> of all commits)';
		reason['combfrequencyauth'] = '<font color=green><strong>/X</strong></font> files were changed in the same commit -- this combination of files is <font color=red>rarely</font> <strong>changed together</strong> by <font color=blue>/A</font>. (in fewer than <strong>/HH%</strong> of all commits by /A)';		
		reason['combprobability'] = '<font color=green><strong>/X</strong></font> files are <font color=red>rarely</font> changed in this <strong>ratio</strong>. (only in <strong>/HH%</strong> of all commits)';
		reason['combprobabilityauth'] = '<font color=green><strong>/X</strong></font> files are <font color=red>rarely</font> changed in this <strong>ratio</strong> by <font color=blue>/A</font>. (only in <strong>/HH%</strong> of commits by /A)';

	var reasonnor = new Object();

		reasonnor['totalloc'] = 'The number of changed lines of code is in the normal range for commits in this repository. (/X lines)'; 	
		reasonnor['totallocauth'] = 'The number of changed lines of code is in the normal range for commits by <font color=blue>/A</font> in this repository. (/X lines)'; 	
		reasonnor['locadded'] = 'The number of added lines of code is in the normal range for commits in this repository. (/X lines)'; 	
		reasonnor['locaddedauth'] = 'The number of added lines of code is in the normal range for commits by <font color=blue>/A</font> in this repository. (/X lines)'; 	
		reasonnor['locremoved'] = 'The number of removed lines of code is in the normal range for commits in this repository. (/X lines)'; 	
		reasonnor['locremovedauth'] = 'The number of removed lines of code is in the normal range for commits by <font color=blue>/A</font> in this repository. (/X lines)'; 
		reasonnor['totalfilechanged'] = 'The number of files changed is in the normal range for commits in this repository. (/X files)'; 	
		reasonnor['totalfilechangedauth'] = 'The number of files changed is in the normal range for commits by <font color=blue>/A</font> in this repository. (/X files)'; 		
		reasonnor['totalfileaddedauth'] = 'The number of files added is in the normal range for commits by <font color=blue>/A</font> in this repository. (/X files)'; 		
		reasonnor['totalfileremovedauth'] = 'The number of files removed is in the normal range for commits by <font color=blue>/A</font> in this repository. (/X files)'; 		
		reasonnor['locremoved'] = 'The number of removed lines of code is in the normal range for commits in this repository. (/X lines)'; 	
		reasonnor['locremovedauth'] = 'The number of removed lines of code is in the normal range for commits by <font color=blue>/A</font> in this repository. (/X lines)'; 
		reasonnor['commitmsg'] = 'The length of commit message is in the normal range for commits in this repository. (/X words)'; 	
		reasonnor['commitmsgauth'] = 'The length of commit message is in the normal range for commits by <font color=blue>/A</font> in this repository. (/X words)'; 	
		//reasonnor['timeofcommitauth'] = 'The length of commit message is in the normal range for commits in this repository. (/X words)'; 
		reasonnor['filpercentchan'] = '<font color=green><strong>/X</strong></font> files were changed -- such changes are very common in this repository.';
		reasonnor['filpercentchanauth'] ='<font color=green><strong>/X</strong></font> files were changed -- such changes are very common by <font color=blue>/A</font> in this repository.';
		reasonnor['filpercommit'] = '<font color=green><strong>/X</strong></font> files were changed -- such files very commonly occurs in a commit in this repository.';
		reasonnor['filpercommitauth'] ='<font color=green><strong>/X</strong></font> files were changed -- such files very commonly occurs in a commit by <font color=blue>/A</font> in this repository.';
		reasonnor['combfrequency'] = '<font color=green><strong>/X</strong></font> files were changed in the same commit -- this combination of files is very commonly changed together.';
		reasonnor['combfrequencyauth'] = '<font color=green><strong>/X</strong></font> files were changed in the same commit -- this combination of files is very commonly changed together by <font color=blue>/A</font>.';
		//reason['combprobability'] = '<font color=green>/X</font> files are rarely changed in this <strong>ratio</strong>. (only in <strong>/HH%</strong> of all commits)';
		//reason['combprobabilityauth'] = '<font color=green>/X</font> files are rarely changed in this <strong>ratio</strong> by <font color=blue>/A</font>. (only in <strong>/HH%</strong> of commits by /A)';*/

    	
     var unusualnessdecision = new Object();
    unusualnessdecision['normal'] = '<font color="green">Normal</font>';
	unusualnessdecision['unusual'] = '<font color="#FF6600">Unusual</font>';
    unusualnessdecision['veryunusual'] = '<font color="darkred">Very Unsual</font>';
	
	formwizardfun();
	
	var question = new Object();
	//question[1] = ['I would want this commit to be brought to my attention.', 'I would <font color="red">not</font> want this commit to be brought to my attention.'];
	//question[2] = ['I would care about this commit.','I would <font color="red">not</font> care about this commit.'];
	question[1] = ['This commit is important.'];
	//question[4] = ['This commit will likely lead to issues in future. (Make changes harder, bugs, vulnerabilities)','This commit will <font color="red">not</font> likely lead to issues in future. (Does <font color="red">not</font> make changes harder, bugs, vulnerabilities)'];
	question[2] = ['This seems to be an unusual commit.'];
	
	var questionpost = new Object();
	questionpost[1] = ['I would want this commit to be brought to my attention.'];
		questionpost[2] = ['This seems to be an unusual commit.'];




	function showcommitdata(commitindex){
		var commitindexx = commitindex;
		if(commitindex >= 5) {
			commitindex = commitindex - 5;
		}
		
		var requri = 'https://api.github.com/repos/';
		requri = requri + username + "/" + reponame + "/commits/" + commitiddata[commitindex].commitid +"?client_id=1c54432c86cdc98a9db8&client_secret=d95c77fc4fc509b9e0f50d905654c2866525ef9f";
	
		$(".myloader").css("display","block");
		$(".nowshowcommitdata").css("display","none");
		$(".nowshowsurveydata").css("display","none");
		
    	requestJSON(requri, function(json) {
      		if(json.message == "Not Found") {
				alert("Something went Wrong");
      	}
      	else {
      		var stats = json.stats;
      		var files   = json.files;
      		var commit = json.commit;
      		var parents = json.parents;
      		var author = json.author;
      		if(author == null) {
      			author = json.commit.author;
      			author.login = json.commit.author.name;
      			author.avatar_url = "https://2.gravatar.com/avatar/299d2dffa2b23dc5771658a4f9739476?d=https%3A%2F%2Fassets-cdn.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png";
      			author.html_url = 'javascript:;';
      			author.id = -5;
      		}
      
      		$(".content.js-transitionable").html("");
      		$(".diff-view").html("");
      	    
			if($(".details-collapse ol").hasClass('.myjscollapse')) {
					$(".details-collapse ol").removeClass('.myjscollapse');
			}

      		$(".myfileschanged").html(files.length + ' changed files');
			$(".myadditions").html(stats.additions + ' additions');
			$(".mydeletions").html(stats.deletions + ' deletions');
			commit.message = commit.message.replace("&","&amp;");
     		commit.message = commit.message.replace("<","&lt;");
     		commit.message = commit.message.replace(">","&gt;");
			var fg = commit.message.split("\n");
			if(fg.length > 1) {
				$(".commit-title").html(commit.message.split("\n")[0]);
				$(".mycommit-desc").html(commit.message.substring(commit.message.split("\n")[0].length+2,commit.message.length));
			}else {
				$(".commit-title").html(commit.message);
			}
			$(".mycommit").html('commit <span class="sha js-selectable-text">'+json.sha+'</span>');
        	$(".myparent").html(parents.length + ' parent ');
        
        	$.each(parents, function(index) {
        		$(".myparent").append('<a href="' + parents[index].html_url + '" class="sha" target="_blank" data-hotkey="p">' + parents[index].sha.substring(0,7) +'</a>');
        	});
        
        	$(".authorship").html('<img alt="@' + author.login  + '" class="avatar" data-user="' + author.id +'" height="24" src="' + author.avatar_url + '&amp;s=48" width="24" /> <span class="author-name"><a href="' +author.html_url + '" rel="author" target="_blank">' + author.login + '</a></span> &nbsp;authored on <time datetime="'+commit.author.date +'" is="relative-time">'+commit.author.date.split("T")[0]+'</time>');
        
        	$.each(files, function(index) {
        		var outhtml = '<li>';
    			outhtml = outhtml + '<span class="diffstat right">';
    			outhtml = outhtml + '<span class="text-diff-added">';
    			outhtml = outhtml + '+' + files[index].additions +  '</span><span class="text-diff-deleted">';
    			outhtml = outhtml + '&nbsp;−' + files[index].deletions +  '</span>&nbsp;';
    			outhtml = outhtml + '<a href="#diff-' +  files[index].sha;
    			outhtml = outhtml + '" class="tooltipped tooltipped-s" aria-label="' + files[index].changes + ' &nbsp;lines changed">';
    			outhtml = outhtml + '<span class = "octicon octicon-info" style = "color:black;"></span></a></span>';
    			outhtml = outhtml + '<span class="octicon octicon-diff-' + files[index].status + '" title="' + files[index].status + '"></span>';
    			outhtml = outhtml + '<a href="#diff-' + files[index].sha + '">' + files[index].filename + '</a>';
    			outhtml = outhtml + '</li>';
    		$(".content.js-transitionable").append(outhtml);
    		
    		
     		outhtml =  '<a name="diff-' + files[index].sha + '"></a>';
     		outhtml =  outhtml + '<div id="diff-' + index + '" class="file js-details-container">';
     		outhtml =  outhtml + '<div class="file-header" data-path="' + files[index].filename + '">';
     		outhtml =  outhtml + '<div class="file-actions">'; 
     		outhtml =  outhtml + '<a href="' + files[index].blob_url +'" target="_blank" class="btn btn-sm tooltipped tooltipped-n" rel="nofollow" aria-label="View the whole file at this commit">View</a>&nbsp;';
     		outhtml =  outhtml + '<button class="btn btn-sm tooltipped tooltipped-n btnexpansion" rel="nofollow" aria-label="Collapse" id="' +files[index].sha +'"><i class="fa fa-angle-up" style="color:black; font-weight:bold;"></i></button>';
     		outhtml =  outhtml + '</div><div class="file-info">';
     		outhtml =  outhtml + '<span class="diffstat tooltipped tooltipped-e" aria-label="' + files[index].additions + ' additions &amp;' + files[index].deletions + ' deletions">' + files[index].changes + '&nbsp;<span class="diffstat-bar"></span></span>';
     		outhtml =  outhtml + '<span class="js-selectable-text" title="' + files[index].filename +'">' + files[index].filename + '</span></div></div>';
     		outhtml =  outhtml + '<div class="data highlight blob-wrapper"><table class="diff-table  tab-size-8" id ="tab' + files[index].sha + '">';
     		
     		if(files[index].patch != undefined) {
    		var ks = files[index].patch.split("\n");
     		$.each(ks, function(k){
     		    ks[k] = ks[k].replace("&","&amp;");
     			ks[k] = ks[k].replace("<","&lt;");
     			ks[k] = ks[k].replace(">","&gt;");
     			
            	if(ks[k].substring(0,2) === '@@') {
              		outhtml = outhtml + '<tr><td class="blob-code blob-code-inner blob-code-hunk">' + ks[k] + '</td></tr>';
              	}else if(ks[k].substring(0,1) === '+'){
            	  	outhtml = outhtml + '<tr><td class="blob-code blob-code-addition"><span class="blob-code-inner">'+ ks[k] +'</span></td></tr>';
              	}else if(ks[k].substring(0,1) === '-'){
              		outhtml = outhtml + '<tr><td class="blob-code blob-code-deletion"><span class="blob-code-inner">'+ ks[k] +'</span></td></tr>';
              	}else {
              		outhtml = outhtml + '<tr><td class="blob-code blob-code-content"><span class="blob-code-inner">'+ ks[k] +'</span></td></tr>';
              	}
     		});   
     		}
     		outhtml = outhtml + '</table></div></div>';
    		$(".diff-view").append(outhtml);

		});
		
		
		$('#moreinformation').show();

		if(commitindexx < 5) {
				$("#survey_container1").hide();
				
				$('#moreinformation').attr("aria-label","Hide the commit details");
				$('#moreinformation').html('Hide Details &nbsp;<i class="fa fa-angle-up" style="color:black; font-weight:bold;">');
				if($('#moreinformation').hasClass("moreinfo")) {
					$('#moreinformation').removeClass("moreinfo");
									$(".hideinfo").show();
				}
				//$('#moreinformation').hide();

		}
		
		/*if(commitindexx == 4){
			$('.continue').show();
			$('.forward').hide();
			$('.postsurvinst').hide();
		}else {
			$('.continue').hide();
		}*/
			
		if(commitindexx >= 5){
				$("#survey_container1").show();

				$('#moreinformation').attr("aria-label","Show the commit details");
				$('#moreinformation').html('Show Details &nbsp;<i class="fa fa-angle-down" style="color:black; font-weight:bold;">');
				if($('#moreinformation').hasClass("moreinfo")) {
				}else {
										$('#moreinformation').addClass("moreinfo");
														$(".hideinfo").hide();

				}
				$('.skipsurvey').attr("href","#survey_container1");
				$('.hereisreason').html(getreason(commitiddata[commitindex].reasonlist, author.login, commitiddata[commitindex].Decisionval));
				
		}
	
	
		for(j = 97; j<=98; j++) { 
 				var nameofrad = 'que' + (commitindexx+1) + '-' + String.fromCharCode(j);
 				var ty = Math.floor(Math.random()*(question[j-96].length));
 				if(commitindexx <= 4) {
 				var appending = (j-96) +'.&nbsp; ' + question[j-96][ty];
 				}else {
 				 				var appending = (j-96) +'.&nbsp; ' + questionpost[j-96][ty];

 				}
 				$('.'+nameofrad).html(appending);
 				//alert($('.'+nameofrad).html());
 				//alert($('input[name="'+nameofrad+'"]:checked', 'form#wrapped').val());
 		}
		
		$(".details-collapse ol").hide();
				$(".details-collapse ol").hide();

		$(".details-collapse ol").hide();

		$(".details-collapse.table-of-contents.js-details-container").css("display","block");
		$(".diff-view").css("display","block");
		$('.btnexpansion').on('click', function(){
			var id = '#tab' + $(this).attr("id");
			if($(id).hasClass("collapse")) {
				$(this).attr("aria-label","Collapse");
				$(this).html('<i class="fa fa-angle-up" style="color:black; font-weight:bold;">');
				$(id).removeClass("collapse");
			}else {
				//var id = '#tab' + $(this).attr("id");
				$(this).attr("aria-label","Expand");
				$(this).html('<i class="fa fa-angle-down" style="color:black; font-weight:bold;">');
				$(id).addClass("collapse");
			}	
		});
		
		
		/*$('.continue').on('click', function(){
			//$('.mainsurlastque').hide();
			$('.postsurvinst').show();
			$('.continue').hide();
			$('.forward').show();
			$(".nowshowcommitdata").css("display","none");


		});*/
		
		$(".myloader").css("display","none");
		$(".nowshowcommitdata").css("display","block");
		$(".nowshowsurveydata").css("display","block");
		
		if(commitindexx == 5) {
			$(".nowshowcommitdata").hide();
			$(".nowshowsurveydata").hide();
		}
		
		/*function goToByScroll(){
	        id = "mycommittop";
	        $('html,body').scrollTop($("#"+id).offset().top);
    	}

    	$(".forward").on('click',function(e) { 
          	e.preventDefault(); 
        	goToByScroll();           
    	});*/
	
     	}
     });
     }
    
    			
		$('#moreinformation').on('click', function(e){
			          	e.preventDefault(); 

			if($('#moreinformation').hasClass("moreinfo")) {
				$('#moreinformation').attr("aria-label","Hide the commit details");
				$('#moreinformation').html('Hide Details &nbsp;<i class="fa fa-angle-up" style="color:black; font-weight:bold;">');
				$(this).removeClass("moreinfo");
				$(".hideinfo").show();
			}else {
				//var id = '#tab' + $(this).attr("id");
				$('#moreinformation').attr("aria-label","Show the commit details");
				$('#moreinformation').html('Show Details &nbsp;<i class="fa fa-angle-down" style="color:black; font-weight:bold;">');
				$(this).addClass("moreinfo");
				$(".hideinfo").hide();

			}	
		});
		
		$('.continue').on('click', function(){
			$(".nowshowcommitdata").show();
			$(".nowshowsurveydata").show();
		});
	
	function requestJSON(url, callback) {
    $.ajax({
      url: url,
      complete: function(xhr) {
        callback.call(null, xhr.responseJSON);
      }
    });
    }
    
    
          function unusualnessdecisionval(decisionval){
    	var decvalff = parseFloat(decisionval);
    	if (decvalff < 0.9){
            return unusualnessdecision['normal'] ;
        }else if(decvalff >= 0.90 && decvalff < 0.95) {
         	return unusualnessdecision['unusual'];
        }else if(decvalff >= 0.95) {
         	return unusualnessdecision['veryunusual'];
        }
  };
    
    function getreason(datareason ,authorname, decisionval) {
    	
    	var thereasonis = "";
    	var cnt = 0;
		$.each(datareason, function(i){
			if(cnt > 4) {
				return false;
			}
			//if(datareason[i].name == 'totalloc') {
				var temp;
				
				var H;
				var flag = 1;
				var theval = parseFloat(datareason[i].valorg);
				var thevalrnd = parseFloat(datareason[i].valorg).toPrecision(1);
				if(theval == 0.0) {
					H = 'never';
					 temp = reason[datareason[i].name];
				}else if(theval > 0.0 && theval <= 1.0) {
					H = 'almost never';
					 temp = reason[datareason[i].name];
				}else if(theval > 1.0 && theval <= 3.0) {
					H = 'very rarely';
					temp = reason[datareason[i].name];
				}else if(theval > 3.0 && theval <= 7.0) {
					H = 'rarely';
					temp = reason[datareason[i].name];
				}else if(theval > 7.0 && theval < 10.0) {
					H = 'less commonly';
					temp = reasonnor[datareason[i].name];
				}else {
					flag = 0;
					temp = reasonnor[datareason[i].name];
					H = 'very commonly';
				}
				
				if(datareason[i].name == 'timeofcommitauth') {
					if(datareason[i].value > 12) {
						temp = temp.replace('/X', datareason[i].value-12 + 'pm UTC');
					}else if(datareason[i].value < 12) {
						temp = temp.replace('/X', datareason[i].value + 'am UTC');
					}else {
						temp = temp.replace('/X', datareason[i].value + 'pm UTC');
					}
				}else {
					temp = temp.replace('/X', datareason[i].value);
				}
				
				if(flag == 1) {
					temp = '&bull;&nbsp;' + temp;
					temp = temp.replace('/Y',H);
					temp = temp.replace('/A', authorname);
					temp = temp.replace('/A', authorname);
					temp = temp.replace('/HH',thevalrnd);
					if(cnt != 4) {
						thereasonis= thereasonis + temp + "\n";
					}else {
						thereasonis= thereasonis + temp;
					}
					cnt++;

				}
				
				if(flag == 0) {
					if(datareason[i].name != 'timeofcommitauth' && datareason[i].name != 'combprobabilityauth' && datareason[i].name != 'combprobability' ) {
					temp = '&bull;&nbsp;' + temp;
					temp = temp.replace('/Y',H);
					temp = temp.replace('/A', authorname);
					temp = temp.replace('/A', authorname);
					/*var reg = /(\(.*?\))/gi;
					temp = temp.replace(reg,"");
					temp = temp.replace("or more","or less");
					temp = temp.substring(0, temp.length-2);
					temp = temp + " in this repository.";*/
					if(cnt != 4) {
						thereasonis= thereasonis + temp + "\n";
					}else {
						thereasonis= thereasonis + temp;
					}					cnt++;
					
					}

				}
				
			//}
		});
		/*if(thereasonis != "") {
			var decvalff = parseFloat(decisionval);
    	if (decvalff < 0.9){
            	thereasonis = "\n<strong>Reason: </strong><i>Not enough high-valued outliers, lead to rate this commit as <strong>normal</strong>.</i>\n\n"+thereasonis; 
        }else if(decvalff >= 0.90 && decvalff < 0.95) {
            	thereasonis = "\n<strong>Reason: </strong><i>Many high-valued outliers, lead to rate this commit as <strong>unusual</strong>.</i>\n\n"+thereasonis; 
        }else if(decvalff >= 0.95) {
            	thereasonis = "\n<strong>Reason: </strong><i>Many high-valued outliers, lead to rate this commit as <strong>very unusual</strong>.</i>\n\n"+thereasonis; 
        }
        
		}*/
		return thereasonis;
    	
    }
    
    
    function formwizardfun() {
				showcommitdata(0);
				//  Basic wizard with validation
				//$('form#wrapped').attr('action', '$("#progressbar").hide()');
				/*$( "form#wrapped" ).submit(function( event ) {
 					 event.preventDefault();
 					 for(i = 1; i <= 10; i++){
						 for(j = 97; j<=101; j++) { 
 					 		var nameofrad = 'que' + i + '-' + String.fromCharCode(j);
 					 			alert($('.'+nameofrad).html());
 					 			alert($('input[name="'+nameofrad+'"]:checked', 'form#wrapped').val());
 					 	 }
 					 }
				});*/
				
				$("#survey_container").wizard({
					stepsWrapper: "#wrapped",
					submit: ".submit",
					beforeSelect: function( event, state ) {
						if (!state.isMovingForward)
  						 return true;
						var inputs = $(this).wizard('state').step.find(':input');
						return !inputs.length || !!inputs.valid();
					}
			

				}).validate({
					errorPlacement: function(error, element) { 
						if ( element.is(':radio') || element.is(':checkbox') ) {
							error.insertBefore( element.next() );

						} else { 
							error.insertAfter( element );
						}
					}
				});
				

				//  progress bar
				$("#progressbar").progressbar();

				$("#survey_container").wizard({
					afterSelect: function( event, state ) {

						$("#progressbar").progressbar("value", state.percentComplete);
						$("#location").text("(" + state.stepsComplete + "/" + state.stepsPossible + ")");
						if(state.stepsComplete != state.stepsPossible && state.stepsComplete != 10) {
							
							if(state.stepsComplete == 5) {
								$('#myModal1').modal('toggle');
								$('#myModal1').modal('show');
							}
							$('html,body').scrollTop(0);
							showcommitdata(state.stepsComplete);
							submitsurveydata(state.stepsComplete);
						}else if (state.stepsComplete == 10){
							$('html,body').scrollTop(0);
							$(".nowshowcommitdata").css("display","none");
							$("#survey_container1").hide();
							submitsurveydata(state.stepsComplete);
						} else{
							$("#survey_container1").hide();
							$(".nowshowcommitdata").css("display","none");
							$("#top-wizardform").text("Thanks!");
							$("#bottom-wizard").hide();
							submitsurveydata(state.stepsComplete);
						}
						
						
					}
				});
    }
    
    function submitsurveydata(i) {
    			var outdata = "";
    			outdata = outdata + username +"/"+ reponame+"\t";

				if(i <= 10) {
					if(i <= 5) {
    					outdata = outdata + commitiddata[i-1].commitid + " \t" ;
    					outdata = outdata + (Math.round(commitiddata[i-1].Decisionval * 10000) / 10000) + " \t";
    				}else {
    					outdata = outdata + commitiddata[i-1-5].commitid + " \t" ;
    					outdata = outdata + (Math.round(commitiddata[i-1-5].Decisionval * 10000) / 10000) + " \t";
    				}
    			
    				for(j = 97; j<=98; j++) { 
 					 	var nameofrad = 'que' + i + '-' + String.fromCharCode(j);
 						var que = $('.'+nameofrad).html();
 						que = que.replace("&nbsp;","");
 						que = que.replace('<font color="red">',"");
 						que = que.replace('</font>',"");
 						outdata = outdata + que + " \t";
 			 			var ans = $('input[name="'+nameofrad+'"]:checked', 'form#wrapped').val();
 			 			if(ans != undefined) {
 			 				outdata = outdata + ans + " \t";
 			 			}else {
 			 				outdata = outdata + "-" + " \t";
 			 			}
 			 	 	} 
 			 	
 			 	 	if($('#que'+i+'comment').val() == "") {
 			 	 		 outdata = outdata + "Comment\t" + "-" + " \t";
 			 	 	}else {
 			 	 		outdata = outdata + "Comment\t" + $('#que'+i+'comment').val().split('\n').join(' ') + " \t";
 			 	 	}
 			 	 	
 			 	 } else if(i == 11) {
 			 	 	for(j = 97; j<=104; j++) { 
 					 	var nameofrad = 'que' + i + '-' + String.fromCharCode(j);
 						var que = $('.'+nameofrad).html();
 						que = que.replace("&nbsp;","");
 						que = que.replace('<font color="red">',"");
 						que = que.replace('</font>',"");
 						outdata = outdata + que + " \t";
 			 			var ans = $('input[name="'+nameofrad+'"]:checked', 'form#wrapped').val();
 			 			if(ans != undefined) {
 			 				outdata = outdata + ans + " \t";
 			 			}else {
 			 				outdata = outdata + "-" + " \t";
 			 			}
 			 	 	} 
 			 	 	if($('#que'+i+'comment').val() == "") {
 			 	 		 outdata = outdata + "Comment\t" + "-" + " \t";
 			 	 	}else {
 			 	 		outdata = outdata + "Comment\t" + $('#que'+i+'comment').val().split('\n').join(' ') + " \t";
 			 	 	}
 			 	 }
 			 	 
 			 	 	if(i > 5 && i<=10) {
 			 	 		var temp = $('.hereisreason').html();
 			 	 		temp = temp.split('<font color="red">').join("");
 			 	 		temp = temp.split('<font color="blue">').join("");
 			 	 		temp = temp.split('<font color="green">').join("");
 			 	 		temp = temp.split("</font>").join("");
 			 	 		temp = temp.split("</strong>").join("");
 			 	 		temp = temp.split("<strong>").join("");
 			 	 		temp = temp.split("•&nbsp;").join("• ");
 			 	 		temp = temp.split("\n").join("|||");
 			 	 		temp = temp.trim();
 			 	 		//console.log(temp);
 			 	 		outdata = outdata + temp +"\t";
 			 	 	}
 			 	 
 			 	 	 outdata = outdata + Date.now() +"\n"; 			 	 
 			 	 
 			 	 var surveyclass = new Object();
 			 	 surveyclass.participantid = participantid;
 			 	 surveyclass.data = outdata;
 			 	 
 			 	    $.ajax({
        url: 'https://'+serverurl+':8443/UnusualGitCommit/mainsurvey',
        type: 'POST',
        dataType: 'json',
		crossDomain: true,
        data: JSON.stringify(surveyclass),
        contentType: 'application/json',
        mimeType: 'application/json',
 
        success: function (data) {

        },
        
        error:function(status,er) {
            //alert("error:  status: "+status+" er:"+er);
        }
    });
    
 		 
    }
  
});