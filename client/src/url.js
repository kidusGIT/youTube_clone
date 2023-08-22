
export const mainUrl = {
    url: "http://127.0.0.1:8000/api/",
    imagesUrl:"http://127.0.0.1:8000"
}

export function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

export const formatTime = time => {
    let seconds = Math.floor(time % 60),
    minutes = Math.floor(time / 60) %60,
    hours = Math.floor(time / 3600);

    const leadingZeroFormater = new Intl.NumberFormat(undefined, {
        minimumIntegerDigits: 2,
    })

    if(hours === 0){
      return `${minutes}:${leadingZeroFormater.format(seconds)}`;
    }
    return `${hours}:${leadingZeroFormater.format(minutes)}:${leadingZeroFormater.format(seconds)}`;

  }