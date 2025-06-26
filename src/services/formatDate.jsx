export function formattingDate(date) {

    const formattedDate = new Date(date).toLocaleDateString("en-Us" , {
        year: "numeric",
        month: "long",
        day: "numeric"
    })

    const hours = new Date(date).getHours();
    const minutes = new Date(date).getMinutes();
    const period = hours >= 12 ? "PM" : "AM";
    const formattedTime = `${hours % 12}:${minutes.toString().padStart(2,"0")} ${period}`   //padStart pad the beginning of the string with a string

    return `${formattedDate} | ${formattedTime}`
}