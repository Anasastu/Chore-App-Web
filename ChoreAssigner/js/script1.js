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
function startCreateNewChoreGroup() {
  initGroupName();
}
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
  
  var nameOfGroup = document.getElementById("groupName").value;

  if(nameOfGroup != "") {
    //hide groupName form 
    document.getElementById("selectGroupName").classList.add("hide");

    //reveal the numOfActorsSelection form 
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
  var numberOfActors = document.getElementById("numOfActors").value;

  if(numberOfActors != 'null') {

    // Reveal Name Section
    document.getElementById("nameSection").classList.toggle("hide");

    //get group name 
    var nameOfGroup = document.getElementById("groupName").value;
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
    }
    // take the document fragment we made and glue it onto the DOM \m/
    nameContainer.appendChild(nameFragment);

    // give user a submit button
    nameContainer.appendChild(createFragment("<input type='submit' value='Continue'>"));

    // Hide Number Selector 
    document.getElementById("numOfActorsSelection").classList.toggle("hide");

    //this prevents the submit button from reloading the page
    evt.preventDefault();

    // Go to Chore Selection when done
    document.getElementById("nameSectionForm").addEventListener("submit",choreSelection,false);
    
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
function choreSelection(evt) {

  //get group name 
  var nameOfGroup = document.getElementById("groupName").value;


  // Hide Name Section
  document.getElementById("nameSection").classList.toggle("hide");
  // Reveal Chore List Selector 
  document.getElementById("choreSelection").classList.toggle("hide");

  
  document.getElementById("choreSelectionTitle").innerHTML = nameOfGroup + " Chore Selection";


  //preliminary chore list area
  var preChoreListContainer = document.getElementById("preChoreList");
  //create new fragment
  var preChoreListFragment = document.createDocumentFragment();

  // add chore to the preliminary list when user adds custom chore
  document.getElementById("customChoreSelectionForm").addEventListener("submit",addCustomChore,false);

  function addCustomChore(evt) {
    var customChore = document.getElementById("customChore").value;
    if(customChore != "") {
      var addToList = "<a href='makethisitemgoaway'>--</a>" + customChore;
      var li = document.createElement('li');
      li.innerHTML = addToList;
      while(li.firstChild) {
        preChoreListFragment.appendChild(li.firstChild);
      }
      // take the document fragment we made and glue it onto the DOM \m/
      preChoreListContainer.appendChild(preChoreListFragment);
    }
    // this prevents the submit button from reloading the page
    evt.preventDefault();
  }

  
    



  //this prevents the submit button from reloading the page
  evt.preventDefault();
}
//<------------------- END Chore Selection  ---------------------



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
}
//<----------------END create doc fragment --------------------




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
addLoadEvent(startCreateNewChoreGroup);
//addLoadEvent(initActors);
//addLoadEvent();
//addLoadEvent();

//<----------------- END Add Load Event ------------------
