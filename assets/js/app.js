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

    $("#addRow").on("click", function (event) {
        event.preventDefault();
        //event.preventDefault();
        var train = $('#trainName').val().trim();
        var destination = $('#destination').val().trim();
        var trainTime = $('#trainTime').val().trim();
        var trainFrequency = $("#frequency").val().trim();



        if (train !== "" && destination !== "" && trainTime !== "" && trainFrequency !== "") {
            database.ref().push({
                TrainName: train,
                destination: destination,
                trainTIme: trainTime,
                trainFrequency: trainFrequency

            });
        }
        else {

            alert("Check that the information is correct!!");
        }
        $("#trainForm")[0].reset();
    });
    database.ref().on("child_added", function (childSnapshot) {

    })
});