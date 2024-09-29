const addCards = (items) => {
    items.forEach(item => {
        let itemToAppend = '<div class="col s6 center-align">' +
            '<div class="card">' +
            '<div class="card-image waves-effect waves-block waves-light"><img class="activator" src="' + item.path + '">' +
            '<span class="card-title ">' + item.title + '</div>' +
            '<div class="card-content"><p class="card-title grey-text text-darken-4">' + item.title2 + '</p></div>' +
            '<div class="card-reveal">' +
            '<span class="card-title grey-text text-darken-4">' + item.subTitle + '<i class="material-icons right">close</i></span>' +
            '<p class="card-text grey-text text-darken-4">' + item.description + '</p>' +
            '</div></div></div>';
        $("#card-section").append(itemToAppend)
    });
}

const formSubmitted = () => {
    let formData = {};
    formData.title = $('#title').val();
    formData.title2 = $('#title2').val();
    formData.subTitle = $('#subTitle').val();
    formData.path = $('#path').val();
    formData.description = $('#description').val();

    console.log(formData);
    postCuisine(formData);
}

function postCuisine(cuisine) {
    $.ajax({
        url: '/api/cuisine',
        type: 'POST',
        data: cuisine,
        success: (result) => {
            if (result.statusCode === 201) {
                alert('Cuisine added successfully');
            }
        }
    });
}

function getAllCuisines() {
    $.get('/api/cuisines', (response) => {
        // response's data is in array format, so we can use it
        if (response.statusCode === 200) {
            addCards(response.data);
        }
    });
}

$(document).ready(function () {
    $('.materialboxed').materialbox();
    $('#formSubmit').click(() => {
        formSubmitted();
    });
    $('.modal').modal();
    getAllCuisines();
});