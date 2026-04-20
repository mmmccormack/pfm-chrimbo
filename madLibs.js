import { dbRef, get } from "./firebase.js";

    let currentMadLib = 0;

    const userMadLibs = [];

    const displayMadLib = madLibNumber => {
        document.querySelector('.madLibAuthor').innerText = userMadLibs[madLibNumber].userName;
        document.querySelector('.madLibReading').innerText = `
        I couldn't believe the size of the ${userMadLibs[madLibNumber].madLibs[0]} after it was ${userMadLibs[madLibNumber].madLibs[1]}. It seemed to have a ${userMadLibs[madLibNumber].madLibs[2]} look on its face, but if it was a ${userMadLibs[madLibNumber].madLibs[3]}, surely I would have heard that coming ${userMadLibs[madLibNumber].madLibs[4]} down the hall!
        `;
        document.querySelector('.madLibAuthor').classList.toggle('questionStart');
        document.querySelector('.madLibReading').classList.toggle('questionStart');
    }

    const nextMadLib = madLibNumber => {
        document.querySelector('.madLibAuthor').classList.toggle('questionStart');
        document.querySelector('.madLibReading').classList.toggle('questionStart');
        setTimeout(() => {
            displayMadLib(madLibNumber);
        }, 1500)
    }

    document.querySelector('.nextMadLib').addEventListener('click', () => {
        currentMadLib++;
        nextMadLib(currentMadLib);
    })

    get(dbRef).then((snapshot) => {
        if(snapshot.exists()){
            const fullDB = snapshot.val();
            for (let entry in fullDB) {
                const individualMadLib = {};
                individualMadLib.userName = fullDB[entry]['userName'];
                individualMadLib.madLibs = fullDB[entry]['madLibs'];
                userMadLibs.push(individualMadLib)
            }
        } else {
            console.log("No data available")
        }
    }).then(() => {
        displayMadLib(currentMadLib);
        document.querySelector('.nextMadLib').classList.toggle('questionStart');
    })