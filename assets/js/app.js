$(document).ready(function () {

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyCPP6ukkpD1nub9fEJrAbxuw6dbeubWVdU",
        authDomain: "trainscheduler-a9524.firebaseapp.com",
        databaseURL: "https://trainscheduler-a9524.firebaseio.com",
        projectId: "trainscheduler-a9524",
        storageBucket: "trainscheduler-a9524.appspot.com",
        messagingSenderId: "546971721631"
    };
    firebase.initializeApp(config);

    var database = firebase.database();

    $("#addRow").on("click", function () {
        var form = document.getElementById("trainForm")
        //event.preventDefault();
        var train = $('#trainName').val().trim();
        var destination = $('#destination').val().trim();
        var trainTime = $("#trainTime").val().trim();
        var trainFrequency = $("#frequency").val().trim();
        console.log(train, destination, trainTime, trainFrequency);
        if (form.checkValidity()) {
            database.ref().push({
                TrainName: train,
                destination: destination,
                trainTime: trainTime,
                trainFrequency: trainFrequency

            });
        }
    });
    database.ref().on("child_added", function (childSnapshot) {
        var trainFrequency = childSnapshot.val().trainFrequency
        var firstTrainTime = moment(childSnapshot.val().trainTime, "HH:mm").subtract(1, "years");
        var diffTime = moment().diff(moment(firstTrainTime), "minutes");
        var tRemainder = diffTime % trainFrequency;
        var MinutesTillTrain = trainFrequency - tRemainder;
        var nextTrain = moment().add(MinutesTillTrain, "minutes");

        var row = $("<tr>");
        var trainName = $("<td>").text(childSnapshot.val().TrainName);
        var destination = $("<td>").text(childSnapshot.val().destination);
        var trainFrequency = $("<td>").text(childSnapshot.val().trainFrequency);
        var nextArrival = $("<td>").text(moment(nextTrain).format("LT"));
        var minutesLeft = $("<td>").text(MinutesTillTrain);
        row.append(trainName).append(destination).append(trainFrequency).append(nextArrival).append(minutesLeft);

        $("#tabla").append(row);

    }, function (errorObject) {
        console.log("Errors handled: " + errorObject.code);
    });
});