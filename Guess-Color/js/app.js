const showColor = document.querySelector("#showBtn");
const select = document.querySelector("#colorValue");
const btnStart = document.querySelector("#start");
const btnReset = document.querySelector("#restart");
const feedBack = document.querySelector("#feedback");
const title = document.querySelector("#title");
const explanation = document.querySelector("#explanation");


const randomColorHex = () => {
    const numHex = ["a", "b", "c", "d", "e", "f", 0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const index1 = Math.floor(Math.random() * 6);
    const index2 = Math.floor(Math.random() * 6);
    const index3 = Math.floor(Math.random() * 6);
    const i1 = Math.floor(Math.random() * 10);
    const i2 = Math.floor(Math.random() * 10);
    const i3 = Math.floor(Math.random() * 10);



    const hex = `#${numHex[index1]}${numHex[i1]}${numHex[index2]}${numHex[i3]}${numHex[i2]}${numHex[index3]}`;

    return hex;

}

const randomColorRgb = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);


    return `rgb(${r}, ${g}, ${b})`;
}

const colorGame = () => {
    const selValue = select.value;
    explanation.innerHTML = "";
    showColor.innerHTML = "";
    if (selValue === "none") {
        explanation.innerHTML = "You must select the correct value for the color!!";

        setTimeout(() => {
            location.reload(true);

        }, 2000);

    } else if (selValue === "rgb") {
        colorBTnRgb();

    } else if (selValue === "hex") {
        colorBtnHex();



    }
}
const crearBtn = () => {
    for (let i = 0; i <= 5; i++) {
        const elem = document.createElement("button");
        elem.id = `${i}`;
        showColor.appendChild(elem);
    }
}
const colorBTnRgb = () => {
    crearBtn();

    const buttons = document.querySelectorAll("#showBtn button");
    const colors = [];

    for (let i = 0; i < 6; i++) {
        colors.push(randomColorRgb());
    }

    // Asignar colores a los botones
    buttons.forEach((btn, index) => {
        btn.style.backgroundColor = colors[index];

    });

    const correctIndex = Math.floor(Math.random() * 6);
    title.innerHTML = `${colors[correctIndex]}`;
    console.log(correctIndex);

    buttons.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            let boton = e.target.closest("button");
            let id = Number(boton.id)


            if (id === correctIndex) {
                console.log("correcto");
                feedBack.classList.remove("error");
                feedBack.classList.add("success");
                feedBack.textContent = "Felicidades Correcto";
                setTimeout(() => {
                    title.innerHTML = "";
                    showColor.innerHTML = "";
                    feedBack.innerHTML = "";
                    showColor.textContent = "Do you want to play again? Please press the button to Restart";
                    feedBack.className = "";
                    select.value = "none";
                }, 1000);



            } else {
                console.log("incorrecto");
                feedBack.classList.remove("success");
                feedBack.classList.add("error");
                feedBack.textContent = "Color incorrecto";
                btn.classList.add("dis-b");
            }
        });

    });


}

const colorBtnHex = () => {
    crearBtn();

    const buttons = document.querySelectorAll("#showBtn button");
    const colors = [];

    for (let i = 0; i < 6; i++) {
        colors.push(randomColorHex());
    }

    // Asignar colores a los botones
    buttons.forEach((btn, index) => {
        btn.style.backgroundColor = colors[index];

    });

    const correctIndex = Math.floor(Math.random() * 6);
    title.innerHTML = `${colors[correctIndex]}`;
    console.log(correctIndex);

    buttons.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            let boton = e.target.closest("button");
            let id = Number(boton.id)


            if (id === correctIndex) {
                console.log("correcto");
                feedBack.classList.remove("error");
                feedBack.classList.add("success");
                feedBack.textContent = "Felicidades Correcto";
                setTimeout(() => {
                    title.innerHTML = "";
                    showColor.innerHTML = "";
                    feedBack.innerHTML = "";
                    showColor.textContent = "Do you want to play again? Please press the button to Restart";
                    feedBack.className = "";
                    select.value = "none";
                }, 1000);



            } else {
                console.log("incorrecto");
                feedBack.classList.remove("success");
                feedBack.classList.add("error");
                feedBack.textContent = "Color incorrecto";
                btn.classList.add("dis-b");
            }
        });

    });


}



btnStart.addEventListener("click", colorGame);
btnReset.addEventListener("click", () => {
    location.reload(true);
});


