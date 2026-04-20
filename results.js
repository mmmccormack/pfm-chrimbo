import { dbRef, get } from "./firebase.js";

    const results = {
        1 : {
            'dizzy' : 0,
            'overwhelmed' : 0,
            'stressed' : 0,
            'overexcited' : 0,
        },
        2 : {
            'sunny' : 0,
            'melted' : 0,
            'tired' : 0,
            'overworked' : 0,
        },
        3 : {
            'look at that!' : 0,
            'huh?' : 0,
            'I don`t know' : 0,
            'I just woke up' : 0,
        },
        4 : {
            'thanks' : 0,
            'bless you' : 0,
            'prayer' : 0,
            'high five' : 0,
        },
        5 : {
            'here`s to you!' : 0,
            'formal event' : 0,
            'ooh, so fancy' : 0,
            'tuxedo cat' : 0,
        },
        6 : {
            'I didn`t do it' : 0,
            'no' : 0,
            'it wasn`t me' : 0,
            'I don`t know' : 0,
        },
        7 : {
            'today is crazy' : 0,
            'I`m feeling rushed' : 0,
            'overwhelmed' : 0,
            'I love potatoes' : 0,
        },
        8 : {
            'I love Keanu' : 0,
            'you`re the best' : 0,
            'thank you so much' : 0,
            'totally bodacious' : 0,
        },
        9 : {
            'I hate technology' : 0,
            'someone is a jerk' : 0,
            'this isn`t working' : 0,
            'I`m mad at computer' : 0,
        },
        10 : {
            'looks good' : 0,
            'this is done' : 0,
            'working on it' : 0,
            'I agree with this' : 0,
        },
        11 : {
            'I`m sad' : 0,
            'I don`t like this' : 0,
            'frustrated' : 0,
            'this is NOT okay' : 0,
        },
        12 : {
            'I like coffee' : 0,
            'I need coffee' : 0,
            'I have coffee' : 0,
            'gone to get coffee' : 0,
        },
        13 : {
            'uh oh' : 0,
            'look at that!' : 0,
            'somebody did something' : 0,
            'I`m looking now' : 0,
            '' : 0,
        },
    }

    const emojis = [
        '',
        'https://a.slack-edge.com/production-standard-emoji-assets/15.0/apple-medium/1f635-200d-1f4ab@2x.png',
        'https://a.slack-edge.com/production-standard-emoji-assets/15.0/apple-medium/1fae0@2x.png',
        'https://emoji.slack-edge.com/T23RE8G4F/huh/9f8973e6d1a3f410.gif',
        'https://a.slack-edge.com/production-standard-emoji-assets/15.0/apple-medium/1f64f-1f3fc@2x.png',
        'https://emoji.slack-edge.com/T018726P2RY/fancy_cat/e95bdd0739e6dc0b.png',
        'https://emoji.slack-edge.com/T018726P2RY/nope/1f7bdf186ab63924.gif',
        'https://emoji.slack-edge.com/T018726P2RY/potato_spin/141f1ecb060dbe67.gif',
        'https://emoji.slack-edge.com/T018726P2RY/keanu-thanks/101cac237d80f62e.gif',
        'https://emoji.slack-edge.com/T018726P2RY/incel-clippy/32f1068f64224633.gif',
        'https://a.slack-edge.com/production-standard-emoji-assets/15.0/apple-medium/2705@2x.png',
        'https://emoji.slack-edge.com/T018726P2RY/ok_cry/b50a9471c9b010ec.png',
        'https://emoji.slack-edge.com/T018726P2RY/coffee_dance/c43c1c0d06cc7b75.gif',
        'https://a.slack-edge.com/production-standard-emoji-assets/15.0/apple-medium/1f440@2x.png',
    ];

    let currentQuestion = 0;
    let fullDB = {};

    get(dbRef).then((snapshot) => {
        if(snapshot.exists()){
            fullDB = snapshot.val();
            for (let entry in fullDB) {
                let userAnswers = [];
                const individual = fullDB[entry];
                for (let answer in individual) {
                    userAnswers.push(individual[answer]);
                }
                userAnswers.pop();
                userAnswers.pop();
                userAnswers.forEach((actualAnswer, index) => {
                    const answerKey = results[index + 1];
                    for (let possibleAnswer in answerKey) {
                        if (possibleAnswer == actualAnswer) {
                            let numberOfResponses = answerKey[actualAnswer]
                            numberOfResponses++;
                            answerKey[actualAnswer] = numberOfResponses;
                        }
                    }
                    console.log(results)
                })
            }
            console.log(fullDB)
        } else {
            console.log("No data available")
        }
    }).then(() => {
        nextQuestion(currentQuestion);
        // topAndBottomScorers(currentQuestion);
    })
        
    const displayResults = (responseNumbers, totalResponses) => {
        const options = document.querySelectorAll('.nes-progress');
        // get possible responses
        const possibleResponses = [];
        const currentResults = results[currentQuestion];
        for (let question in currentResults) possibleResponses.push(question);
        const colors = ['is-primary', 'is-success', 'is-warning', 'is-error'];
        options.forEach((option, index) => {
            option.classList.remove('is-primary', 'is-success', 'is-warning', 'is-error');
            const pickedColor = colors[Math.floor(Math.random() * colors.length)];
            option.classList.add(pickedColor)
            colors.splice(colors.indexOf(pickedColor), 1);
            option.style.margin = `10px auto`;
            const percentage = Math.round((responseNumbers[index] / totalResponses) * 100);
            option.value = `0`;
            // console.log(option)
            option.previousElementSibling.innerHTML = `${possibleResponses[index]} - 0%`;
            if (percentage != 0) {
                setTimeout(() => {
                    let counter = 0
                    setInterval(() => {
                        if (counter < percentage) {
                            counter++;
                            option.value = counter;
                            option.previousElementSibling.innerHTML = `${possibleResponses[index]} - ${counter}%`;
                        } else {
                            clearInterval();
                        }
                    }, 25)
                }, 1000)
            }
        })
        setTimeout(() => {
            document.querySelector('.prompt').classList.toggle('questionStart');
        }, 500)
        setTimeout(() => {
            document.querySelector('.screen').classList.toggle('questionStart');
        }, 500)
    }

    // const topAndBottomScorers = currentQuestion => {
    //     const totalAnswers = results[currentQuestion];
    //     for (let answer in totalAnswers) {
    //         if (totalAnswers[answer] == 0) delete totalAnswers[answer];
    //     }
    //     const answersSorted = Object.entries(totalAnswers).sort(([, valA], [, valB]) => valB - valA);
    //     console.log(answersSorted)
    //     for (let survey in fullDB) {
    //         if (fullDB[survey][currentQuestion] == answersSorted[0][0]){
    //             let currentScore = fullDB[survey]['score'];
    //             currentScore = currentScore + 500;
    //             fullDB[survey]['score'] = currentScore;
    //         } else if (fullDB[survey][currentQuestion] == answersSorted[answersSorted.length - 1][0]){
    //             let currentScore = fullDB[survey]['score'];
    //             currentScore = currentScore + 250;
    //             fullDB[survey]['score'] = currentScore;
    //         }
    //     }
    // }


    const calcResults = questionNumber => {
        let responseNumbers = [];
        for (let response in results[questionNumber]) responseNumbers.push(results[questionNumber][response]);
        const totalResponses = responseNumbers.reduce((acc, current) => acc + current);
        console.log({totalResponses})
        console.log({responseNumbers})
        displayResults(responseNumbers, totalResponses)
    }

    const displayEmoji = questionNumber => document.querySelector(`.emoji`).innerHTML = `<img src="${emojis[questionNumber]}" />`;

    const nextQuestion = () => {
        currentQuestion++;
        calcResults(currentQuestion);
        displayEmoji(currentQuestion);
    }
    
    const nextButton = document.querySelector('button');
    nextButton.addEventListener('click', () => {
        document.querySelector('.screen').classList.toggle('questionStart');
        document.querySelector('.prompt').classList.toggle('questionStart');
        setTimeout(() => {
            nextQuestion(currentQuestion);
        }, 1500)
    })