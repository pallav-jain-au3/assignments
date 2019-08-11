getTweets();

function getTweets() {
    $.ajax({
        dataType: 'json',
        url: "/getTweets",
        success: function (data) {
            displayTweets(data);
            addEventListenerOnEdit();
            addEventListenerOnDelete();
        }
    });
}

function displayTweets(tweets) {
    tweets.forEach(tweet => {
        $('ul').append(`<li  id = "${tweet.name}" class="shadow-lg rounded">
            <h4>${tweet.name}</h4> 
            <p>${tweet.tweet}</p>
            <div class="edit-form">
            <form>
             <input type="text" name = "tweet", placeholder="Enter tweet">
             <span><button type="button" class="save"><i class="fas fa-check-circle"></i></button></span>
            </form>   
        </div>
            <button type="button" class ="edit"><i class="fas fa-edit"></i></button>
            <button type="button" class ="delete"><i class="fas fa-trash-alt"></i></button>
             </li>`)
    });
}

$('.submitTweet').click(function () {

    let tweet = {
        name: $('.userName').val(),
        tweet: $('.userTweet').val()
    }
    addTweetsToDatabase(tweet);
});

function addTweetsToDatabase(tweet) {
    $.ajax({
        url: "/add-tweet",
        type: "POST",
        contentType: 'application/json',
        data: JSON.stringify(tweet),
        dataType: 'json',
        success: function () {
            alert('Added Successully')
        }
    })

}

function addEventListenerOnEdit() {
    $('.edit').click(function (e) {

        let userName = $(this).parent().attr('id');
        let presentTweet = $('#' + userName).children('p').text();
        hidePTag(userName);
        displayEdittedOption(userName, presentTweet);


        $('#' + userName + ' ' + '.save').click(function () {
            let editted = $('#' + userName + ' .edit-form input').val();
            let tweet = {
                name: userName,
                tweet: editted
            }
            updateTweetInDatabase(userName, tweet);
            hideEdittedOption(userName);
            $('#' + userName).children('p').text(editted);
            displayPTag(userName);
        })
    });

}

function updateTweetInDatabase(userName, tweet) {
    $.ajax({
        url: "/add-tweet/" + userName,
        type: "PUT",
        contentType: 'application/json',
        data: JSON.stringify(tweet),
        dataType: 'json',
        success: function () {
            alert('Updated Sucessfully')
        }
    })
}

function addEventListenerOnDelete() {
    $('.delete').click(function (e) {

        let userName = $(this).parent().attr('id');

        $.ajax({
            url: "/delete-tweet/" + userName,
            type: "DELETE",
            dataType: 'json',
            success: function () {

                $('#' + userName).remove();
            }
        })
    });

}

function hidePTag(userName) {
    $('#' + userName + ' ' + ' p').css('display', 'none');
}

function displayEdittedOption(userName, presentTweet) {

    $('#' + userName + ' ' + ' .edit-form').css('display', 'block');
    $('#' + userName + ' ' + ' .edit-form input').val(presentTweet);
}

function displayPTag(userName) {
    $('#' + userName + ' ' + ' p').css('display', 'block');
}

function hideEdittedOption(userName) {

    $('#' + userName + ' ' + ' .edit-form').css('display', 'none');
}