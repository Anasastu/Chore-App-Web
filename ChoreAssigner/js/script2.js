/* 
  CHORE APP : WEB BASED VERSION
  CS177 SPRING 2019
  Spencer Hemstreet
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
  // vars
  var nameOfGroup;
  var numberOfActors;
  var actorsArray = [];
  var choreArray = [];
  function Actor() {
    this.name = "";
    this.chores = 0;
    this.rating= 1;
    this.email= "";
  }
  function ChoreWithInfo(){
    this.name= "";
    this.date= "";
    this.completed= false;
    this.assigned= 'none';
    this.exempt= 'none';
    this.manuallyAssigned= false;
  }

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
    if(nameOfGroup !== "") {
      //hide groupName div 
      document.getElementById("selectGroupName").classList.add("hide");
      //unhide the numOfActorsSelection div
      document.getElementById("numOfActorsSelection").classList.remove("hide");
      //this prevents the submit button from reloading the page
      evt.preventDefault();
      //go to actors section

      //location of where groupname should be inserted
      var groupNameLocations = document.getElementsByClassName("groupNameGoesHere");
      //insert group name
      for(let p = 0; p < groupNameLocations.length; p++) {
        groupNameLocations[p].innerHTML = nameOfGroup;
      }

      initActors();
    }else {
      if(evt){
        evt.preventDefault();
      }
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
    document.getElementById("numOfActorsSelectionForm").addEventListener("reset",backToRenameGroup,false);
    document.getElementById("numOfActorsSelectionForm").addEventListener("submit",addActors,false);
  }

  function backToRenameGroup(evt){
    document.getElementById("selectGroupName").classList.toggle("hide");
    document.getElementById("numOfActorsSelection").classList.toggle("hide");
    //evt.preventDefault();
    initGroupName();
  }

  function backToinitActors(evt){
    document.getElementById("nameSection").classList.add("hide");
    document.getElementById("numOfActorsSelection").classList.remove("hide");
    let deleteNameSection = document.getElementById("nameSectionForm").querySelectorAll('.namingOfActors');
    for(let i = 0; i < deleteNameSection.length; i++){
      deleteNameSection[i].remove();
    }
    //evt.preventDefault();
    document.getElementById("numOfActors").value = 'null';
    initActors();
  }

  function addActors(evt) {
    numberOfActors = document.getElementById("numOfActors").value;
    //evt.preventDefault();
    if(numberOfActors !== 'null') {
      ///////CSS
      // Reveal Name Section
      document.getElementById("nameSection").classList.remove("hide");
      // Hide Number Selector 
      document.getElementById("numOfActorsSelection").classList.add("hide");

      ///////EVENT LISTENERS
      // Go to Chore Selection when done
      document.getElementById("nameSectionForm").addEventListener("submit",actorsIntoArray,false);
      // go back if user hits back 
      document.getElementById("nameSectionForm").addEventListener("reset",backToinitActors,false);

      ////////CREATE DOCUMENT FRAGMENT
      //area we are dynamically adding name spots
      var nameContainer = document.getElementById("nameSectionForm");
      var buttons = document.getElementById("nameSectionFormButtons");
      //create new fragment
      var nameFragment = document.createDocumentFragment();
      for (let i = 1; i <= numberOfActors; i++) {
        /*
        EDITTING CSS 
        - please leave any ids alone, they are required for the script to work
        - Leave Ids alone, do not delete any classes, you can add class just use SINGLE quotes
        */
        //create name input for each actor 
        var nameInfo = "<div class='namingOfActors'>" + i + ". <input id='actorNaming" + i + "' type='text' class='' placeholder='Enter Name' pattern='[A-Za-z0-9\s]{2,18}' required><br></div>";
        //create a new div element
        var div = document.createElement('div');
        //put the nameInfo html into the div we just created
        div.innerHTML = nameInfo;
        while(div.firstChild) {
          nameFragment.appendChild(div.firstChild);
        }
      }//end for
      // take the document fragment and put in doc before buttons
      nameContainer.insertBefore(nameFragment, buttons);
    
      if(evt){
        evt.preventDefault();
      }
    }else {
      //this prevents the submit button from reloading the page
      evt.preventDefault();
      initActors();
    }
  }//<------------------- END Add Actors  ---------------------

  function actorsIntoArray(evt) {
    actorsArray = [];
    var x = 1;
    for(x = 1; x <= numberOfActors; x++) {
      let person = new Actor();
      person.name = document.getElementById("actorNaming" + x).value;
      person.chores = 0;
      actorsArray[x - 1] = person;
    }
    if(evt){
      document.getElementById("nameSection").classList.add("hide");
      choreSelection();
      evt.preventDefault();
    }
  }//end actorsIntoArray

  //////////////////////////////////////////////// 
  /*      `CHORE SELECTION`
          User selects chores from list
          or writes custom chore
  */
  ////////////////////////////////////////////////   
  function choreSelection() {
    /////////CSS 
    // Reveal Chore List Selector 
    document.getElementById("choreSelection").classList.remove("hide");
    // Inserts Title into HTML
    document.getElementById("choreSelectionTitle").innerHTML = nameOfGroup + " Chore Selection";

    choreSelectionEvents();
  }

  function choreSelectionEvents(){
    ////////EVENT LISTENERS
    // adds custom chore
    document.getElementById("customChoreSelectionForm").addEventListener("submit",addCustomChore,false);
    // add chore from list
    document.getElementById("choreSelectionList").addEventListener("click",addSelectedChore,false);
    //remove chore from list
    document.getElementById("userSelectedChores").addEventListener("click",removeChore,false);
    // user hits continue button
    document.getElementById("preChoreListForm").addEventListener("submit",choresIntoArray,false);
    // user wants to go back to naming
    document.getElementById("preChoreListForm").addEventListener("reset",backToAddActors,false);
  }
    
  function addCustomChore(evt) {
    var customChore = document.getElementById("customChore").value;
    if(customChore != "") {
      addChoreToList(customChore); 
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
    addChoreToList(chore);
    evt.preventDefault();
  }

  function addChoreToList(chore) {
    let addToList = "<option value='" + chore + "' class=''>" + chore + "</option>";
    var preChoreListContainer = document.getElementById("userSelectedChores");
    preChoreListContainer.appendChild(createFragment(addToList));
    preChoreListContainer.size += 1;
  }

  function removeChore(evt) {
    let choreList = document.getElementById("userSelectedChores");
    let choreToRemove = choreList.selectedIndex; 
    choreList.options[choreToRemove].remove();
    evt.preventDefault();
    var preChoreListContainer = document.getElementById("userSelectedChores");
    preChoreListContainer.size -= 1;
  }

  function choresIntoArray(evt) {
    let choreList = document.getElementById("userSelectedChores");
    //console.log(choreList.length);
    let chore = "";
    var x = 0;
    for(x = 0; x < choreList.length; x++){
      chore = choreList.options[x].text;
      choreArray[x] = chore;
    }
    if(evt){
      evt.preventDefault();
      document.getElementById("choreSelection").classList.add("hide");
      choreOptions();
    }
  }

  function backToAddActors(evt){
    //hide chore Selection
    document.getElementById("choreSelection").classList.add("hide");
    // delete old name container
    let deleteNameSection = document.getElementById("nameSectionForm").querySelectorAll('.namingOfActors');
    for(let i = 0; i < deleteNameSection.length; i++){
      deleteNameSection[i].remove();
    }
    choreArray = [];
    addActors();
  }

  //<------------------- END Chore Selection  ---------------------


  ////////////////////////////////////////////////
  /*      CHORE OPTIONS
      user can select due dates, excemptions, and assignments for chores
  */
  ////////////////////////////////////////////////  
  function choreOptions() {
    // Reveal Chore Options Section 
    document.getElementById("choreOptionsSection").classList.remove("hide");
    createChoreForms();
    choreOptionEvents();
    
  }

  function choreOptionEvents(){
    // EVENT LISTENERs
    document.getElementById("choreOptionsSubmit").addEventListener("click",checkForms,false);
    document.getElementById("choreOptionsBack").addEventListener("click",backToChoreSelection,false);
  }

  function createChoreForms(){
     // DOCUMENT FRAGMENT NEEDS CONTAINER
    var choreOptionsFormsContainer = document.getElementById("choreOptionsForms");
    
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
    /*
      EDITTING CSS
      - please leave any ids alone, they are required for the script to work
      - classes can freely be added, DO NOT DELETE 'choreform' class
    */
    //1. CHORE
    var form2 = "<form id='choreForm";
    //3. INDEX 
    var form4 = "' name='' class='choreOption'>Due Date <input type='date' id='choreDate";
    //5. INDEX
    var form6 = "' name='' min='";
    //7. TODAYS DATE
    var form8 = "' class='selectChoreDate' required> Assign <select id='choreAssign";
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
    var y = 0;
    for(y = 0; y < actorsArray.length; y++){
      let option = "<option value='actor" + y + "'>" + actorsArray[y].name + "</option>";
      formpart2 += option; 
      formpart4 += option;
    }
    var formpart5 = "</select></form></div>";

    // create forms
    var x = 0;
    for(x = 0; x < choreArray.length; x++){
      let chore = "<div class='choreOption'>" + choreArray[x];
      let formpart1 = chore + form2 + x + form4 + x + form6 + todaysDate + form8 + x + form10;
      let formpart3 = form12 + x + form14;
      var completeform = formpart1 + formpart2 + formpart3 + formpart4 + formpart5;
      choreOptionsFormsContainer.appendChild(createFragment(completeform));
    } 
  }

  function checkForms(evt) {
    //validate forms
    var allGood = true;
    for(let x = 0; x < choreArray.length; x++){
      let choreAssignee = document.getElementById("choreAssign" + x);
      let choreExemptee = document.getElementById("choreExempt" + x);
      let dueDate = document.getElementById("choreDate" + x);
      if(dueDate.value === ""){
          allGood = false;
          if(!dueDate.classList.contains("highlightRed")){
            dueDate.classList.toggle("highlightRed");
          }
      }else{
        if(dueDate.classList.contains("highlightRed")){
          dueDate.classList.toggle("highlightRed");
        }
      }
      if(choreExemptee.value !== "null"){
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
      document.getElementById("choreOptionsSection").classList.add("hide");
      //evt.preventDefault();
      assignChores();
    }
  }//end checkForms

  function backToChoreSelection(evt){
    var deleteChoreOptions = document.getElementById("choreOptionsForms").querySelectorAll('.choreOption');
    for(let i = 0; i < deleteChoreOptions.length; i++){
      deleteChoreOptions[i].remove();
    }
    document.getElementById("choreOptionsSection").classList.add("hide");
    choreArray = [];
    choreSelection();
  }
  //<------------------- END Chore Options  ---------------------

  ////////////////////////////////////////////////
  /*      ASSIGN CHORES
        Randomly assign chores that were not 
        already assigned to actors by the user.
        Chores with excemptions must be dealt with
  */
  ////////////////////////////////////////////////
  function assignChores() {

    makeChores();
    distributionCheck();
    displayChoreAssignments(); 
    assignChoresEvents(); 
  }

  function makeChores() {
    var i = 0;
    for(i = 0; i < choreArray.length; i++){
      // create choreWithInfo objects
      var chore = new ChoreWithInfo();
      chore.name = choreArray[i];
      chore.date = document.getElementById("choreDate" + i).value;
      chore.assigned = document.getElementById("choreAssign" + i).value;
      chore.exempt = document.getElementById("choreExempt" + i).value;
      // actors manully assigned
      if(chore.assigned !== "random"){
        // get index of assigned actor 
        let index = chore.assigned.substr(5);
        chore.assigned = actorsArray[index].name;
        chore.manuallyAssigned = true;
        actorsArray[index].chores += 1;
        //console.log("assignment -- " + actorsArray[index].name + " " + actorsArray[index].chores);
      }else{
        // chore assigned randomly and has exemption 
        if(chore.exempt !== "null"){
          // get index of exemption and send to randomlyAssignChore
          let exemptIndex = chore.exempt.substr(5);
          let index2 = randomlyAssignChore(exemptIndex);
          chore.assigned = actorsArray[index2].name;
          chore.exempt = actorsArray[exemptIndex].name;
          actorsArray[index2].chores += 1;
          //console.log("assignment -- " + actorsArray[index2].name + " " + actorsArray[index2].chores);
        }else{
          // chore assigned randomly w/ no exemptions
          let index3 = randomlyAssignChore(666); //666 lets randAssignChore know there are no exemptions
          chore.assigned = actorsArray[index3].name;
          actorsArray[index3].chores += 1;  
          //console.log("assignment -- " + actorsArray[index3].name + " " + actorsArray[index3].chores);                
        }
      }
      choreArray[i] = chore;
    } 
  }// end make chores

  function randomlyAssignChore(exemption) {
    var randomNum;
    if(exemption !== 666){
      do{
        randomNum = Math.floor(Math.random() * (numberOfActors));
      }while(randomNum === exemption);
      return randomNum;
    }else{
      randomNum = Math.floor(Math.random() * (numberOfActors));
      return randomNum;
    }
  }


  function distributionCheck(){
    var max = 0;
    var maxIndex = 0;
    var min = choreArray.length;
    var minIndex = 0;
    var idealNumChore = choreArray.length / numberOfActors;
    var i = 0;
    var noChores = true;
    while(i < actorsArray.length || noChores){
      if(noChores && i >= actorsArray.length){
        i=0;
      }
      //console.log(actorsArray[i].name)
      for(var x = actorsArray.length - 1; x >= 0; x--){
        if(actorsArray[i].chores > actorsArray[x].chores){
          if(max <= actorsArray[i].chores){
            max = actorsArray[i].chores;
            maxIndex = i;
            //console.log("1new max = " + actorsArray[i].chores + " " + actorsArray[i].name);
          }
          if(actorsArray[x].chores < min){
            min = actorsArray[x].chores;
            minIndex = x;
            if(min == 0){
              noChores = true;
            }
            else{
              noChores = false;
            }
            //console.log("1new min = " + actorsArray[x].chores + " " + actorsArray[x].name);
          }
        }else{
          if(actorsArray[x].chores > max){
            max = actorsArray[x].chores;
            maxIndex = x;
            //console.log("2new max = " + actorsArray[x].chores + " " + actorsArray[x].name);
          }
          if(actorsArray[i].chores < min){
            min = actorsArray[i].chores;
            minIndex = i;
            if(min == 0){
              noChores = true;
            }
            else{
              noChores = false;
            }
            //console.log("2new min = " + actorsArray[i].chores + " " + actorsArray[i].name);
          }
        }
        if(min < max){
          for(let y = 0; y < choreArray.length; y++){
            if((actorsArray[maxIndex].name === choreArray[y].assigned) &&
               (choreArray[y].manuallyAssigned === false) &&
               (choreArray[y].exempt !== actorsArray[minIndex].name))
            {
              choreArray[y].assigned = actorsArray[minIndex].name;
              actorsArray[minIndex].chores += 1;
              actorsArray[maxIndex].chores -= 1;
              min += 1;
              max -= 1;
              if(min == 0){
                noChores = true;
              }
              else{
                noChores = false;
              }
              //console.log("Switching " + maxIndex + "with " + minIndex);
              break;
            }
          }
        }
      }
      if(noChores){
        for(let a = 0; a< choreArray.length; a++){
          if(actorsArray[minIndex].name == choreArray[a].exempt){
            noChores = false;
          }
          if(actorsArray[maxIndex].name == choreArray[a].assigned && choreArray[a].manuallyAssigned == true){
            noChores = false;
          }
        }
      }
      i++;
    }
  }// end distributionCheck

  //<------------------- END Assign Chores ---------------------


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
    // reveal assign chores section
    document.getElementById("assignedChoresSection").classList.remove("hide");
    //////////DOCUMENT FRAGMENT NEEDS CONTAINER
    var assignedChoreListContainer = document.getElementById("assignedChoresListForm");
    /*
      EDITTING CSS - please carefully go in and add classes with SINGLE quotes 
                   - do not remove 'actorContainer' class
    */
    var html1 = "<div class='actorContainer'><div class='nameRating'><div class='nameItem'>";
            //Actor Name
    var html3 ="</div>";
            //Rating
    var html5 = "</div><div class='choreDueCompleted'><div class='choreItem'>";
            //Chore
    var html7 = "</div><div class='dueItem'> Due On ";
            //Due Date
    var html9 = "</div>";
            //email
    var htmlPart3= "</div><br></div></div>";
    var x = 0;
    for(x = 0; x < actorsArray.length; x++){
      var actor = actorsArray[x];
      var actorName = actor.name;
      var htmlPart1 = html1 + actorName + html3;
      var htmlPart2 = "";
      var i = 0;
      for(i = 0; i < choreArray.length; i++){
        if(choreArray[i].assigned == actorName){
          htmlPart2 += html5 + choreArray[i].name + html7 + choreArray[i].date + html9;
        }
      }
      let fullActorContainer = htmlPart1 + htmlPart2 + htmlPart3;
      // take the document fragment we made and glue it onto the DOM \m/
      assignedChoreListContainer.appendChild(createFragment(fullActorContainer));
    }
  }//<------------------- END Display Chore Assignments ---------------------

  function assignChoresEvents(){
    document.getElementById("assignedChoresListBack").addEventListener('click',backToChoreOptions,false);
    //document.getElementById("emailForAssignedChoresListForm").addEventListener('submit',processEmailContent,false);
    document.getElementById("emailForAssignedChoresListForm").addEventListener('submit',processEmailContent,false);
    // some other code that will go to processChoreAssignments
  }

  function backToChoreOptions(evt) {
    var deleteAssignedChoreList = document.getElementById("assignedChoresListForm").querySelectorAll(".actorContainer");
    for(let i = 0; i < deleteAssignedChoreList.length; i++){
      deleteAssignedChoreList[i].remove();
    }
    actorsIntoArray();
    document.getElementById("assignedChoresSection").classList.add("hide");
    document.getElementById("choreOptionsSection").classList.remove("hide");
    choresIntoArray();
    choreOptionEvents();
  }

    ////////////////////////////////////////////////
  /*      Process Chore Assignments
          some process for sending forms to email or to backend
  */
  ////////////////////////////////////////////////
  function processChoreAssignmentsPython(){
    //evt.preventDefault();
    var choresToSend = { list: ""};
    for(var i = 0; i < choreArray.length; i++){
      choresToSend.list += "Chore" + i+1;
      choresToSend.list += choreArray[i].assigned ;
      choresToSend.list += choreArray[i].name;
      choresToSend.list += choreArray[i].date + " ";
    }
    var sendJson = JSON.stringify(choresToSend);
    console.log(sendJson);
  }

    ////////////////////////////////////////////////
  /*      Process Email content
          replace spaces and chars so we can prepopulate email
  */
  ////////////////////////////////////////////////
  function processEmailContent(evt){
    evt.preventDefault();
    var email = document.getElementById("emailInputForAssignedChoresListForm").value;
    var contentNodes = document.getElementById("assignedChoresListForm").querySelectorAll(".actorContainer");
    var content = "";
    var mailTo = "";
    for(let i = 0; i < contentNodes.length; i++){
      content += contentNodes[i].innerText;
    }
    //console.log(content);

    email = email.replace(/[\/\@\+]+/g,function(str){
      str = str.replace(/\//g,"%2F");
      str = str.replace(/\@/g,"%40");
      str = str.replace(/\+/g,"%2B");
      return str;
    });
    //console.log(email);

    content = content.replace(/[\n\r\s\/]+/g, function(str){
      str = str.replace(/\n/g,"%0A");
      str = str.replace(/\s/g,"%20");
      str = str.replace(/\r/g,"%0A");
      str = str.replace(/\//g,"%2F");
      return str;
    });
    //console.log(content);

    mailTo = 'mailto:' + email + '?subject=Chore%20Assignments&body=' + content + '%0A';
    //console.log(mailTo);
    document.getElementById("assignedChoresListForm").action = mailTo;
    processChoreAssignmentsPython();
    emailChoreAssignmentForm();
  }

}//<**************----- END Create Chore Group  ------****************

////////////////////////////////////////////////
/*      Email Chore Assignment Form
        fill in mailto action with given email
*/
////////////////////////////////////////////////
function emailChoreAssignmentForm(){
 
  //var sendToEmail = document.getElementById("emailInputForAssignedChoresListForm").value;
  //document.getElementById("assignedChoresListForm").action = "mailto:" + sendToEmail;
  document.getElementById("assignedChoresListForm").submit();
  
}





//<-------------------- END Process Chore Assignments--------------


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
  if (typeof window.onload !== 'function') {
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