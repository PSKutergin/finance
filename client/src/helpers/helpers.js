export const formatDateFromISO = (date = null) => {
    let dateObj

    if (date) dateObj = new Date(date);
    else dateObj = new Date();

    const day = dateObj.getDate();
    const month = dateObj.getMonth() + 1;
    const year = dateObj.getFullYear();
    return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
}

export const formatDate = (date) => {
    const dateObj = new Date(date);
    const day = dateObj.getDate();
    const month = dateObj.getMonth() + 1;
    const year = dateObj.getFullYear();
    return `${day < 10 ? '0' + day : day}.${month < 10 ? '0' + month : month}.${year}`
}