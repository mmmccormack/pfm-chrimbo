import { dbRef, get } from "./firebase.js";

    const results = {
        1 : {
            'I`m dizzy thinking about it' : 0,
            'This is overwhelming' : 0,
            'overexcited' : 0,
            'I`m stressed' : 0,
        },
        2 : {
            'It`s too sunny' : 0,
            'I`ve literally melted' : 0,
            'I`m tired' : 0,
            'I`m feeling overworked' : 0,
        },
        3 : {
            'Huh, look at that!' : 0,
            'Huh? I`m baffled' : 0,
            'I don`t know' : 0,
            'The coffee is just starting to hit' : 0,
        },
        4 : {
            'Thank you so much' : 0,
            'Bless you' : 0,
            'Thoughts and prayers' : 0,
            'High five!' : 0,
        },
        5 : {
            'Cheers to you!' : 0,
            'This will be a formal event' : 0,
            'Ooh, so fancy' : 0,
            'Tuxedo cat confirms' : 0,
        },
        6 : {
            'Not it' : 0,
            'Just no' : 0,
            'It wasn`t me' : 0,
            'I don`t know' : 0,
        },
        7 : {
            'This is chaos' : 0,
            'I`m feeling rushed' : 0,
            'I don`t know what to do' : 0,
            'Sending potato energy' : 0,
        },
        8 : {
            'I love Keanu' : 0,
            'You`re the best' : 0,
            'Thank you so much' : 0,
            'Totally bodacious' : 0,
        },
        9 : {
            'They`re watching' : 0,
            'Someone/thing is a jerk' : 0,
            'This is not working' : 0,
            'I am mad at computer/technology' : 0,
        },
        10 : {
            'Looks good' : 0,
            'This is done' : 0,
            'Working on it' : 0,
            'I agree with this' : 0,
        },
        11 : {
            'I`m sad, okay?' : 0,
            'I don`t like what`s happening' : 0,
            'This is frustrating, but I`ve accepted it' : 0,
            'This is not okay' : 0,
        },
        12 : {
            'Yikes' : 0,
            'Confirmation, this has been reviewed' : 0,
            'Looking for tea' : 0,
            'I`m looking at this now' : 0,
        },
        13 : {
            'I like coffee' : 0,
            'I need coffee' : 0,
            'You need coffee' : 0,
            'Peak energy!' : 0,
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
                })
            }
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