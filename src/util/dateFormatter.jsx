
function dateFormatter (date) {

    return new Date(date).toLocaleDateString('en-Us' , {

        month: "long",
        day: "numeric",
        year: "numeric"
    })
}

export default dateFormatter