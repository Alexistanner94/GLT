$(document).ready(function() {
  /* ----------------------------------------------
    Beginning of leaderboard page code */

  var participantList = $(".leaderboard-container tbody");
  var leaderboardContainer = $(".leaderboard-container");

  getParticipants();

  // Function for creating a new list row for participants
  function createPartRow(data) {
    console.log(data);
    var newTr = $("<tr>");
    // newTr.data("product", data);
    newTr.append("<td class='ranking'>" + data.partRanking + "</td>");
    newTr.append("<td>" + data.partName + "</td>");

    var dataPartEarnings = data.partEarnings;
    dataPartEarnings = data.partEarnings.toLocaleString("us-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0
    });
    newTr.append("<td class='partEarnings'>" + dataPartEarnings + "</td>");

    return newTr;
  }

  // Function for retrieving participants and getting them ready to be rendered to the page
  function getParticipants() {
    var rowsToAdd = [];
    $.get("/api/earnings", function(data) {
      for (var i = 0; i < data.length; i++) {
        rowsToAdd.push(createPartRow(data[i]));
      }
      renderPartList(rowsToAdd);
    });
    console.log(rowsToAdd);
  }

  // function for rendering the list of participants to the page
  function renderPartList(rows) {
    participantList
      .children()
      .not(":last")
      .remove();
    leaderboardContainer.children(".alert").remove();
    if (rows.length) {
      console.log(rows);
      participantList.prepend(rows);
      $("tr:first-child td:first-child.ranking").append(
        '<img class="golden-ball" src="./images/golden-ball.jpeg"/>'
      );
      $("tr:nth-child(2) td:first-child.ranking").append(
        '<img class="silver-medal" src="./images/silver-medal.png"/>'
      );
      $("tr:nth-child(3) td:first-child.ranking").append(
        '<img class="bronze-medal" src="./images/bronze-medal.png"/>'
      );
    } else {
      console.log("no records to show");
    }
  }

  /* End of leaderboard page code
    ---------------------------------------------- */

  /* ----------------------------------------------
    Beginning of participant add/delete page code */

  var participantList2 = $(".partAdmin-container tbody");
  var partAdminContainer = $(".partAdmin-container");
  var nameInput = $("#new-participant-name");

  $(document).on("click", ".delete-participant", handleDeleteParticipantPress);
  $(document).on(
    "submit",
    "#add-participant-form",
    handleParticipantFormSubmit
  );

  getParticipants2();

  // A function to handle what happens when the form is submitted to create a new Participant

  function handleParticipantFormSubmit(event) {
    event.preventDefault();
    // Don't do anything if the name field hasn't been filled out
    if (
      !nameInput
        .val()
        .trim()
        .trim()
    ) {
      return;
    }
    // Calling the upsertParticipant function and passing in the value of the name input
    upsertParticipant({
      name: nameInput.val().trim()
    });
    console.log(name);
  }

  // A function for creating a participant. Calls getParticipants2 upon completion
  function upsertParticipant(participantData) {
    $.post("/api/participants", participantData).then(getParticipants2);
  }

  // Function for creating a new list row for participants
  function createPartRow2(data) {
    console.log(data);
    var newTr = $("<tr>");
    newTr.data("participant", data);
    newTr.append("<td class='align-middle'>" + data.participantID + "</td>");
    newTr.append("<td class='align-middle'>" + data.name + "</td>");
    newTr.append(
      "<td class> <button class='delete-participant btn btn-danger' >Delete</button></td>"
    );

    return newTr;
  }

  // Function for retrieving participants and getting them ready to be rendered to the page
  function getParticipants2() {
    var rowsToAdd2 = [];
    $.get("/api/participants", function(data) {
      for (var i = 0; i < data.length; i++) {
        rowsToAdd2.push(createPartRow2(data[i]));
      }
      renderPartList2(rowsToAdd2);
    });
    console.log(rowsToAdd2);
  }

  // function for rendering the list of participants to the page
  function renderPartList2(rows) {
    participantList2
      .children()
      .not(":last")
      .remove();
    partAdminContainer.children(".alert").remove();
    if (rows.length) {
      console.log(rows);
      participantList2.prepend(rows);
    } else {
      console.log("no records to show");
    }
  }

  function handleDeleteParticipantPress() {
    let listItemData = $(this)
      .parent("td")
      .parent("tr")
      .data("participant");
    console.log(listItemData);
    let id = listItemData.participantID;
    console.log("id of deleted player: " + id);
    $.ajax({
      method: "DELETE",
      url: "/api/participants/" + id
    }).then(getParticipants2);
  }

  /* End of participant add/delete page code
    ---------------------------------------------- */
});
