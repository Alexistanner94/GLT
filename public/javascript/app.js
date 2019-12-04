$(document).ready(function() {

    // $(document).on("click", "#lbButton", lbSlideDown);

    // function lbSlideDown() {
    //     $(".table").slideDown("slow");
    //     console.log("slide down feature")
    // }

    // lbSlideDown();

    // $("#product-list").show(display);
    // $("#product-list").slideDown(4000);

    var participantList = $(".leaderboard-container tbody");
    var leaderboardContainer = $(".leaderboard-container");

    let data = [
        { partRanking: 1, partName: "Name1", partEarnings: 3000000 },
        { partRanking: 2, partName: "Name2", partEarnings: 2000000 },
        { partRanking: 3, partName: "Name3", partEarnings: 1000000 },
        { partRanking: 4, partName: "Name4", partEarnings: 900000 },
        { partRanking: 5, partName: "Name5", partEarnings: 800000 },
        { partRanking: 6, partName: "Name6", partEarnings: 700000 },
        { partRanking: 7, partName: "Name7", partEarnings: 600000 },
        { partRanking: 8, partName: "Name8", partEarnings: 500000 },
        { partRanking: 9, partName: "Name9", partEarnings: 400000 },
        { partRanking: 10, partName: "Name10", partEarnings: 300000 }
    ]

    getParticipants(data);

    // Function for creating a new list row for products
    function createProductRow(data) {

        console.log(data);
        var newTr = $("<tr>");
        // newTr.data("product", data);
        newTr.append("<td>" + data.partRanking + "</td>");
        newTr.append("<td>" + data.partName + "</td>");

        var dataPartEarnings = data.partEarnings;
        dataPartEarnings = data.partEarnings.toLocaleString('us-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 });
        newTr.append("<td class='partEarnings'>" + dataPartEarnings + "</td>");

        return newTr;
    }

    // Function for retrieving products and getting them ready to be rendered to the page
    function getParticipants(data) {
        // $.get("/api/earnings", function(data) {

        var rowsToAdd = [];
        for (var i = 0; i < data.length; i++) {
            rowsToAdd.push(createProductRow(data[i]));
        }
        renderProductList(rowsToAdd);
    };

    // function for rendering the list of products to the page
    function renderProductList(rows) {
        participantList.children().not(":last").remove();
        leaderboardContainer.children(".alert").remove();
        if (rows.length) {
            console.log(rows);
            participantList.prepend(rows);
        } else {
            renderEmpty();
        }
    }

});