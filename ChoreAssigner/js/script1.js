/* 
  CHORE APP : WEB BASED VERSION
  CS177 SPRING 2019
*/

//////////////////////////////////////////////
/*  SHOW AND HIDE NAV BAR
    This function hides the nav-bar section
    if the user scrolls down.
    The pixel size of the nav-bar area
    must match the sizes in the CSS file.
*/
//////////////////////////////////////////////
function showAndHideNavBar() {
  window.onscroll = navbarHide;
}

var prevScrollpos = window.pageYOffset;

function navbarHide() {
  var currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
      document.getElementById("nav-bar").style.top = "0";
    } else {
      document.getElementById("nav-bar").style.top = "-80px";
    }
    prevScrollpos = currentScrollPos;
}
//<----------------- END Show and Hide Nav Bar ------------------



//////////////////////////////////////////////
/*    START THE CREATE NEW GROUP PROCESS
      this starts the whole chain of functions
      that handle the creation of a new chore group
*/
//////////////////////////////////////////////
function startCreateChoreGroup() {
  
  // vars
  var nameOfGroup;
  var numberOfActors;
  var actorNamesArray = [];
  var choreArray = [];

  initGroupName();

  //*******************************************
  //////////////////////////////////////////////
  /*    GROUP NAME
        this handles the Group Name section
  */
  //////////////////////////////////////////////
  function initGroupName() {
    document.getElementById("selectGroupName").addEventListener("submit",groupName,false);
  }

  function groupName(evt) {
    
    nameOfGroup = document.getElementById("groupName").value;

    if(nameOfGroup != "") {
      //hide groupName div 
      document.getElementById("selectGroupName").classList.add("hide");

      //unhide the numOfActorsSelection div
      document.getElementById("numOfActorsSelection").classList.toggle("hide");

      //this prevents the submit button from reloading the page
      evt.preventDefault();

      //go to actors section
      initActors();
    }
    else {
      //this prevents the submit button from reloading the page
      evt.preventDefault();
      initGroupName();
    }

  }
  //<----------------- END groupName ------------------



  //////////////////////////////////////////////
  /*    ADD ACTORS 
        this takes the number the user gives us
        and creates input boxes so they can name 
        each actor.
        It uses the reusable function 
        createDocumentFragment(validHTMLstring) 
  */
  //////////////////////////////////////////////

  function initActors() {
    document.getElementById("numOfActorsSelectionForm").addEventListener("submit",addActors,false);
  }

  function addActors(evt) {
    numberOfActors = document.getElementById("numOfActors").value;

    if(numberOfActors != 'null') {

      // Reveal Name Section
      document.getElementById("nameSection").classList.toggle("hide");

      //location of where groupname should be inserted
      var groupNameLocations = document.getElementsByClassName("groupNameGoesHere");
      //insert group name
      for(var p = 0; p < groupNameLocations.length; p++) {
        groupNameLocations[p].innerHTML = nameOfGroup;
      }

      //area we are dynamically adding name spots
      var nameContainer = document.getElementById("nameSectionForm");
      //create new fragment
      var nameFragment = document.createDocumentFragment();

      for (var i = 1; i <= numberOfActors; i++) {
        //create name input for each actor 
        var nameInfo = "<div class='virtualActor'>" + i + ". <input id='actor" + i + "' type='text' class='' placeholder='Enter Name' required><br></div>";
        //create a new div element
        var div = document.createElement('div');
        //put the nameInfo html into the div we just created
        div.innerHTML = nameInfo;
        while(div.firstChild) {
          nameFragment.appendChild(div.firstChild);
        }
      }//end for
      // take the document fragment we made and glue it onto the DOM \m/
      nameContainer.appendChild(nameFragment);

      // give user a submit button
      nameContainer.appendChild(createFragment("<input type='submit' value='Continue'>"));

      // Hide Number Selector 
      document.getElementById("numOfActorsSelection").classList.toggle("hide");

      //this prevents the submit button from reloading the page
      evt.preventDefault();

      // Go to Chore Selection when done
      document.getElementById("nameSectionForm").addEventListener("submit",actorsIntoArray,false);
      
      function actorsIntoArray(evt) {
        for(var x = 1; x <= numberOfActors; x++) {
          actorNamesArray[x - 1] = document.getElementById("actor" + x).value;
        }
        //this prevents the submit button from reloading the page
        evt.preventDefault();
        choreSelection();
      }//end actorsIntoArray

    }
    else {
      //this prevents the submit button from reloading the page
      evt.preventDefault();
      initActors();
    }
  }
  //<------------------- END Add Actors  ---------------------



  //////////////////////////////////////////////// 
  /*      `CHORE SELECTION`
          User selects chores from list
          or writes custom chore
          WORK ON THESE
          - custom add isnt working
          - way for user to click chore to add to list
          - way for user to remove chore from list
  */
  ////////////////////////////////////////////////   <<<<<<<<<<<<<<<<<<<<<<<<<< WORK HERE <<<<<<<<
  function choreSelection() {

    // Hide Name Section
    document.getElementById("nameSection").classList.toggle("hide");
    // Reveal Chore List Selector 
    document.getElementById("choreSelection").classList.toggle("hide");

    // Inserts Title into HTML
    document.getElementById("choreSelectionTitle").innerHTML = nameOfGroup + " Chore Selection";


    //preliminary chore list area
    var preChoreListContainer = document.getElementById("userSelectedChores");
    //create new fragment
    var preChoreListFragment = document.createDocumentFragment();

    // adds custom chore
    document.getElementById("customChoreSelectionForm").addEventListener("submit",addCustomChore,false);
    // add chore from list
    document.getElementById("choreSelectionList").addEventListener("dblclick",addSelectedChore,false);
    //remove chore from list
    document.getElementById("userSelectedChores").addEventListener("dblclick",removeChore,false);

    function addCustomChore(evt) {
      var customChore = document.getElementById("customChore").value;
      if(customChore != "") {
        addChore(customChore); 
      }
      //make the custom chore box blank 
      document.getElementById("customChoreSelectionForm").reset();
      //this prevents the submit button from reloading the page
      evt.preventDefault();
    }//end add custom chore

    function addSelectedChore(evt) {
      let choreList = document.getElementById("choreSelectionList");
      let choreToAdd = choreList.selectedIndex;
      let chore = choreList.options[choreToAdd].text;
      addChore(chore);
      evt.preventDefault();
    }

    function addChore(chore) {
      let addToList = "<option value='" + chore + "'>" + chore + "</option>";
      let div = document.createElement('div');
      div.innerHTML = addToList;
      while(div.firstChild) {
        preChoreListFragment.appendChild(div.firstChild);
      }
      // take the document fragment we made and glue it onto the DOM \m/
      preChoreListContainer.appendChild(preChoreListFragment);
    }

    function removeChore(evt) {
      let choreList = document.getElementById("userSelectedChores");
      let choreToRemove = choreList.selectedIndex; 
      choreList.options[choreToRemove].remove();
      evt.preventDefault();
    }

    document.getElementById("preChoreListForm").addEventListener("submit",choresIntoArray,false);

    function choresIntoArray(evt) {
      let choreList = document.getElementById("userSelectedChores");
      let chore = "";
      for(var x = 0; x < choreList.length; x++){
        chore = choreList.options[x].text;
        choreArray[x] = chore;
      }
      evt.preventDefault();
      choreOptions();
    }

  }//<------------------- END Chore Selection  ---------------------
    
  ////////////////////////////////////////////////
  /*      CHORE OPTIONS
      user can select due dates, excemptions, and assignments for chores
  */
  ////////////////////////////////////////////////  
  function choreOptions() {
    let now = new Date()
    var todaysDate = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate();
    /*
      We need to glue the pieces of the form together in the loop below.
      Numbering of the form parts seems random but in the loop they occupy 
      the appropriately numbered position to complete the form
    */
    //1. CHORE
    var form2 = "<form id='choreForm";
    //3. INDEX 
    var form4 = "' name='' class=''>Due Date<input type='date' id='choreDate";
    //5. INDEX
    var form6 = "' name='' min='";
    //7. TODAYS DATE
    var form8 = "'>Assign<select id='choreAssign";
    //9. INDEX
    var form10 = "'>";
    //11. OPTIONS 
    var form12 = "</select>Exempt<select id='choreExempt";
    //13. INDEX
    var form14 = "'>";
    //15. OPTIONS
    
    //this puts all the actors into the forms 
    var formpart2n4 = ["<option value='null'>none</option>"];
    for(var y = 0; y < actorNamesArray.length; y++){
      let option = "<option value='actor" + y + "'>" + actorNamesArray[y] + "</option>";
      formpart2n4 += option; 
    }

    var formpart5 = "</select></form></div>";
    
    var choreOptionsFormsContainer = document.getElementById("choreOptionsForms");
    var choreOptionsFormsFragment = document.createDocumentFragment();

    // create forms
    for(var x = 0; x < choreArray.length; x++){
      let chore = "<div>" + choreArray[x];
      let formpart1 = chore + form2 + x + form4 + x + form6 + todaysDate + form8 + x + form10;
      let formpart3 = form12 + x + form14;
      var completeform = formpart1 + formpart2n4 + formpart3 + formpart2n4 + formpart5;
      let div = document.createElement('div');
      div.innerHTML = completeform;
      while(div.firstChild) {
        choreOptionsFormsFragment.appendChild(div.firstChild);
      }
      // take the document fragment we made and glue it onto the DOM \m/
      choreOptionsFormsContainer.appendChild(choreOptionsFormsFragment);
    } 
    // hide Chore selction 
    document.getElementById("choreSelection").classList.toggle("hide");

    // Reveal Chore Options Section 
    document.getElementById("choreOptionsSection").classList.toggle("hide");
  }

/*
get one chore and do this
/////////
chore
"<form id='choreForm"
index
"' name='' class=''>Due Date<input type='date' id='choreDate"
INDEX
"' name='' min='"
todays date
"'>Assign<select id='choreAssign"
INDEX
"'>"
/////////
THEN make options withh al actors
OPTIONS with every actor names--- must include null option
"</select>Exempt<select id='choreExemptINDEX'>"
OPTIONS with every actors name--- must include null option
"</select></form>"


*/



}//<------------------- END Create Chore Group  ---------------------


////////////////////////////////////////////////
/*      CREATEs A DOCUMENT FRAGMENT
        send it valid <html> and it wraps it 
        in a div for ya
*/
////////////////////////////////////////////////
function createFragment(validHtml) {
    var fragment = document.createDocumentFragment();
    var div = document.createElement('div');
    div.innerHTML = validHtml;
    while (div.firstChild) {
        fragment.appendChild(div.firstChild);
    }
    return fragment;
}//<----------------END create doc fragment --------------------




//////////////////////////////////////////////
/*  MULTI WINDOW.ONLOAD FUNCT STARTER
    any functions that need to 
    use window.onload are too be added here
    using the addLoadEvent() func
*/
//////////////////////////////////////////////

function addLoadEvent(func) {
  var oldonload = window.onload;
  if (typeof window.onload != 'function') {
    window.onload = func;
  } else {
    window.onload = function() {
      if (oldonload) {
        oldonload();
      }
      func();
    }
  }
}
addLoadEvent(startCreateChoreGroup);
//addLoadEvent(initActors);
//addLoadEvent();
//addLoadEvent();

//<----------------- END Add Load Event ------------------