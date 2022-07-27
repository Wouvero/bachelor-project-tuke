export default function dateTimeFormatter(data) {
    const arrayOfData = data.split("T");

    let date = arrayOfData[0]
        .split("-")
        .reverse()
        .map(function (item) {
            return parseInt(item, 10);
        });
    let time = arrayOfData[1].split(".")[0].split(":");

    return `${data[0]}.${date[1]}.${date[2]} ${time[0]}:${time[1]}`;
}
