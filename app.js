// when to turn on
const delaySeconds = 10;

// interval for picking new image
const intervalSeconds = 5;

// images names array
const imagesNames = ['compass.jpeg', 'lamp.jpeg', 'phone.jpeg', 'river.jpeg',
                        'rock.jpeg', 'stones.jpeg', 'strangeBreakfast.jpeg'];

// Screen saver main function
const checkActivity = () => {
    let seconds = 0;
    let image;

    setInterval(() => {
        seconds++;

        // check inactive time for turning on or changing image
        if (seconds >= delaySeconds || ((seconds >= intervalSeconds) && image)) {

            if (image) {
                fadeOut(image);
            }

            image = randomRenderImage();

            seconds = 0;
        }

    }, 1000);

    // events which turn off screen saver
    const activityEvents = ['mousedown', 'mousemove', 'keydown', 'scroll', 'touchstart'];

    // setup event listener for turning off events
    activityEvents.forEach((event) => {
        document.addEventListener(event, () => {
            // if screen saver was turned off:
            // reset timer
            seconds = 0;

            // deleting image from function data
            image = undefined;

            // fast deleting from UI (without fade)
            clearImage();
        });
    });
};

//create and position randomly image
const randomRenderImage = () => {
    //creating image element
    const img = document.createElement('img');
    //get path
    img.src = generateSource();

    img.onload = function () {

        if (this.width > document.body.offsetWidth || this.height > document.body.offsetHeight) {
            // if image too big - try another
            this.src = generateSource();

        } else {
            // if image is normal size - randomly positioning it
            this.style.left = Math.round(Math.random() * (document.body.offsetWidth - this.width)).toString() + 'px';
            this.style.top = Math.round(Math.random() * (document.body.offsetHeight - this.height)).toString() + 'px';
        }
    };

    //rendering on UI
    document.body.appendChild(img);
    fadeIn(img);

    return img;
};

//get path for random image
const generateSource = () => {
    const numberImage = Math.floor(Math.random() * (imagesNames.length));
    return `images/${imagesNames[numberImage]}`;
};

//immediately delete image
const clearImage = () => {
    if (document.querySelector('img')) {
        document.body.removeChild(document.querySelector('img'));
    }
}

//fade out UI animation
const fadeOut = (img) => {

    let opacity = 1;  // initial opacity

    const timer = setInterval(function () {

        if (opacity <= 0.1) {
            clearInterval(timer);
            // deleting image from body
            clearImage();
        }

        img.style.opacity = opacity;
        img.style.filter = 'alpha(opacity=' + opacity * 100 + ")";
        opacity -= opacity * 0.05;

    }, 15);
}

//fade in UI animation
const fadeIn = (img) => {

    let opacity = 0.05;  // initial opacity

    const timer = setInterval(function () {

        if (opacity >= 1) {
            clearInterval(timer);
        }

        img.style.opacity = opacity;
        img.style.filter = 'alpha(opacity=' + opacity * 100 + ")";
        opacity += opacity * 0.05;

    }, 15);
}

// start app
checkActivity();


