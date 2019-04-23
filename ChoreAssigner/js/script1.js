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
}//<----------------- END Show and Hide Nav Bar ------------------



//////////////////////////////////////////////
/*    START THE CREATE NEW GROUP PROCESS
      this starts the whole chain of functions
      that handle the creation of a new chore group
*/
//////////////////////////////////////////////
function startCreateChoreGroup() {
  

  //alert( Math.floor(Math.random() * (5 - 1)));


  // vars
  var nameOfGroup;
  var numberOfActors;
  var actorsArray = [];
  var choreArray = [];
  var Actor = {
    name: "",
    chores: 0,
    rating: 1
  };
  var ChoreWithInfo = {
    name: "",
    date: "",
    completed: false,
    assigned: 'none',
    exempt: 'none'
  };

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

  }//<----------------- END groupName ------------------



  //////////////////////////////////////////////
  /*    ADD ACTORS 
        this takes the number the user gives us
        and creates input boxes so they can name 
        each actor.
        When user hits submit each actor is made 
        into Actor object 
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
      for(let p = 0; p < groupNameLocations.length; p++) {
        groupNameLocations[p].innerHTML = nameOfGroup;
      }

      //area we are dynamically adding name spots
      var nameContainer = document.getElementById("nameSectionForm");
      //create new fragment
      var nameFragment = document.createDocumentFragment();

      for (let i = 1; i <= numberOfActors; i++) {
        //create name input for each actor 
        var nameInfo = "<div class='virtualActor'>" + i + ". <input id='actorNaming" + i + "' type='text' class='' placeholder='Enter Name' required><br></div>";
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
        for(let x = 1; x <= numberOfActors; x++) {
          let person = Object.create(Actor);
          person.name = document.getElementById("actorNaming" + x).value;
          actorsArray[x - 1] = person;
           
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
  }//<------------------- END Add Actors  ---------------------



  //////////////////////////////////////////////// 
  /*      `CHORE SELECTION`
          User selects chores from list
          or writes custom chore
          WORK ON THESE
          - custom add isnt working
          - way for user to click chore to add to list
          - way for user to remove chore from list
  */
  ////////////////////////////////////////////////   
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
    document.getElementById("choreSelectionList").addEventListener("click",addSelectedChore,false);
    //remove chore from list
    document.getElementById("userSelectedChores").addEventListener("click",removeChore,false);

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
      preChoreListContainer.size += 1;
    }

    function removeChore(evt) {
      let choreList = document.getElementById("userSelectedChores");
      let choreToRemove = choreList.selectedIndex; 
      choreList.options[choreToRemove].remove();
      evt.preventDefault();
      preChoreListContainer.size -= 1;
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
    // set min day to current day
    let now = new Date()
    let month = now.getMonth() + 1;
    if(month < 10){
      month = '0' + month;
    }
    var todaysDate = now.getFullYear() + '-' + month + '-' + now.getDate();
    /*
      We need to glue the pieces of the form together in the loop below.
      Numbering of the form parts seems random but in the loop they occupy 
      the appropriately numbered position to complete the form
    */
    //1. CHORE
    var form2 = "<form id='choreForm";
    //3. INDEX 
    var form4 = "' name='' class=''>Due Date <input type='date' id='choreDate";
    //5. INDEX
    var form6 = "' name='' min='";
    //7. TODAYS DATE
    var form8 = "' class='selectedChoreDate' required> Assign <select id='choreAssign";
    //9. INDEX
    var form10 = "'>";
    //11. OPTIONS 
    var form12 = "</select> Exempt <select id='choreExempt";
    //13. INDEX
    var form14 = "'>";
    //15. OPTIONS
    
    //this puts all the actors into the forms 
    var formpart2 = ["<option value='random'>Randomly</option>"];
    var formpart4 = ["<option value='null'>none</option>"];
    for(var y = 0; y < actorsArray.length; y++){
      let option = "<option value='actor" + y + "'>" + actorsArray[y].name + "</option>";
      formpart2 += option; 
      formpart4 += option;
    }

    var formpart5 = "</select></form></div>";
    
    var choreOptionsFormsContainer = document.getElementById("choreOptionsForms");
    var choreOptionsFormsFragment = document.createDocumentFragment();

    // create forms
    for(var x = 0; x < choreArray.length; x++){
      let chore = "<div>" + choreArray[x];
      let formpart1 = chore + form2 + x + form4 + x + form6 + todaysDate + form8 + x + form10;
      let formpart3 = form12 + x + form14;
      var completeform = formpart1 + formpart2 + formpart3 + formpart4 + formpart5;
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

    document.getElementById("choreOptionsSubmit").addEventListener("click",checkForms,false);

    function checkForms(evt) {
      //validate forms
      var allGood = true;
      for(let x = 0; x < choreArray.length; x++){
        let choreAssignee = document.getElementById("choreAssign" + x);
        let choreExemptee = document.getElementById("choreExempt" + x);
        let dueDate = document.getElementById("choreDate" + x);
        if(dueDate.value == ""){
            allGood = false;
            if(!dueDate.classList.contains("highlightRed")){
              dueDate.classList.toggle("highlightRed");
            }
        }else{
          if(dueDate.classList.contains("highlightRed")){
            dueDate.classList.toggle("highlightRed");
          }
        }
        if(choreExemptee.value != "null"){
          if(choreAssignee.value === choreExemptee.value){
            allGood = false;
            if(!choreAssignee.classList.contains("highlightRed")){
              choreAssignee.classList.toggle("highlightRed");
            }
            if(!choreExemptee.classList.contains("highlightRed")){
              choreExemptee.classList.toggle("highlightRed");
            }
          }else{
            if(choreAssignee.classList.contains("highlightRed")){
              choreAssignee.classList.toggle("highlightRed");
            }
            if(choreExemptee.classList.contains("highlightRed")){
              choreExemptee.classList.toggle("highlightRed");
            }
          }
        }
      }// end for
      if(allGood){
        document.getElementById("choreOptionsSection").classList.toggle("hide");
        //evt.preventDefault();
        assignChores();
      }
    }//end checkForms
  }//<------------------- END Chore Options  ---------------------


  ////////////////////////////////////////////////
  /*      ASSIGN CHORES
        Randomly assign chores that were not 
        already assigned to actors by the user.
        Chores with excemptions must be dealt with
  */
  ////////////////////////////////////////////////

  function assignChores() {

    makeChores();
    displayChoreAssignments();  

    function makeChores() {
      for(var i = 0; i < choreArray.length; i++){
        // create choreWithInfo objects
        var chore = Object.create(ChoreWithInfo);
        chore.name = choreArray[i];
        chore.date = document.getElementById("choreDate" + i).value;
        chore.assigned = document.getElementById("choreAssign" + i).value;
        chore.exempt = document.getElementById("choreExempt" + i).value;
        if(chore.assigned != "random"){
          let index = chore.assigned.substr(5);
          chore.assigned = actorsArray[index];
          chore.assigned.chores += 1;
          actorsArray[index].chores += 1;

        }else{
          //if an actor is exempt from this chore
          if(chore.exempt != "null"){
            // get index and send to randomlyAssignChore
            let exemptIndex = chore.exempt.substr(5);
            let index = randomlyAssignChore(exemptIndex);
            console.log("random Index = " + index + " exemption index = " + exemptIndex);
            chore.assigned = actorsArray[index];
            chore.assigned.chores += 1;
            actorsArray[index].chores += 1;
          }else{
            // no one is exempt send to randomlyAssignChore
            let index = randomlyAssignChore(666);
            console.log("random index = " + index);
            chore.assigned = actorsArray[index];
            chore.assigned.chores += 1; 
            actorsArray[index].chores += 1;                  
          }
        }
        choreArray[i] = chore;
      } 
    }// end make chores


    function randomlyAssignChore(exemption) {
      var randomNum;
      if(exemption != 666){ 
        do{
          randomNum = Math.floor(Math.random() * (numberOfActors));
        }while(randomNum == exemption);
        return randomNum;
      }else{
        randomNum = Math.floor(Math.random() * (numberOfActors));
        return randomNum;
      }
    }
    /*mega random number generator from
    P. L'Ecuyer: A table of Linear Congruential Generators of different sizes and good lattice structure, April 30 1997.*/
    function mulberry32(a) {
      return function() {
        var t = a += 0x6D2B79F5;
        t = Math.imul(t ^ t >>> 15, t | 1);
        t ^= t + Math.imul(t ^ t >>> 7, t | 61);
        return ((t ^ t >>> 14) >>> 0) / 4294967296;
      }
    }
    ////////////////////////////////////////////////////////////



 
    
  }//<------------------- END Assign Chores ---------------------


  ////////////////////////////////////////////////
  /*      DISPLAY CHORE ASSIGNMENTS
        Populates page with list of every actor
        and what chores they have
          - due date for every chore
        We need to work on how to incorporate
        the rating and how to mark as complete.
  */
  ////////////////////////////////////////////////
  function displayChoreAssignments() {

    var assignedChoreListContainer = document.getElementById("assignedChoresList");
    var assignedChoreListFragment = document.createDocumentFragment();


    var html1 = "<div class='actorContainer'><div class='nameRating'><div class='nameItem'>";
            //Actor Name
    var html3 ="</div><div class='ratingItem'>Rating = ";
            //Rating
    var html5 = "</div></div><div class='choreDueCompleted'><div class='choreItem'>";
            //Chore
    var html7 = "</div><div class='dueItem'>";
            //Due Date
    var html9 = "</div><div class='completedItem'>";
            //Completed
    var html11= "</div>";
    var htmlPart3= "</div></div><br>";


    for(var x = 0; x < actorsArray.length; x++){
      var actor = actorsArray[x];
      var actorName = actor.name;
      var actorRating = actor.rating;
      var htmlPart1 = html1 + actorName + html3 + actorRating;
      var htmlPart2 = "";
      for(var i = 0; i < choreArray.length; i++){
        if(choreArray[i].assigned.name == actorName){
          htmlPart2 += html5 + choreArray[i].name + html7 + choreArray[i].date + html9 + "Incomplete" + html11;
        }
      }
      let fullActorContainer = htmlPart1 + htmlPart2 + htmlPart3;
      let div = document.createElement('div');
      div.innerHTML = fullActorContainer;
      while(div.firstChild) {
        assignedChoreListFragment.appendChild(div.firstChild);
      }
      // take the document fragment we made and glue it onto the DOM \m/
      assignedChoreListContainer.appendChild(assignedChoreListFragment);
    }
  }//<------------------- END Display Chore Assignments ---------------------
}//<**************----- END Create Chore Group  ------****************





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
