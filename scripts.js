import { dbRef, get, push, update } from "./firebase.js";

    const results = {
        1 : {
            'emoji' : `<img src="https://a.slack-edge.com/production-standard-emoji-assets/15.0/apple-medium/1f635-200d-1f4ab@2x.png">`,
            'options' : ['dizzy', 'overwhelmed', 'stressed', 'overexcited'],
        },
        2 : {
            'emoji' : `<img src="https://a.slack-edge.com/production-standard-emoji-assets/15.0/apple-medium/1fae0@2x.png">`,
            'options' : ['sunny', 'melted', 'tired', 'overworked'],
        },
        3 : {
            'emoji' : `<img src="https://emoji.slack-edge.com/T23RE8G4F/huh/9f8973e6d1a3f410.gif">`,
            'options' : ['look at that!', 'huh?', 'I don`t know', 'I just woke up'],
        },
        4 : {
            'emoji' : `<img src="https://a.slack-edge.com/production-standard-emoji-assets/15.0/apple-medium/1f64f-1f3fc@2x.png">`,
            'options' : ['thanks', 'bless you', 'prayer', 'high five'],
        },
        5 : {
            'emoji' : `<img src="https://emoji.slack-edge.com/T018726P2RY/fancy_cat/e95bdd0739e6dc0b.png">`,
            'options' : ['here`s to you!', 'formal event', 'ooh, so fancy', 'tuxedo cat'],
        },
        6 : {
            'emoji' : `<img src="https://emoji.slack-edge.com/T018726P2RY/nope/1f7bdf186ab63924.gif">`,
            'options' : ['I didn`t do it', 'no', 'it wasn`t me', 'I don`t know'],
        },
        7 : {
            'emoji' : `<img src="https://emoji.slack-edge.com/T018726P2RY/potato_spin/141f1ecb060dbe67.gif">`,
            'options' : ['today is crazy', 'I`m feeling rushed', `overwhelmed`, 'I love potatoes'],
        },
        8 : {
            'emoji' : `<img src="https://emoji.slack-edge.com/T018726P2RY/keanu-thanks/101cac237d80f62e.gif">`,
            'options' : ['I love Keanu', 'you`re the best', 'thank you so much', 'totally bodacious'],
        },
        9 : {
            'emoji' : `<img src="https://emoji.slack-edge.com/T018726P2RY/incel-clippy/32f1068f64224633.gif">`,
            'options' : ['I hate technology', 'someone is a jerk', 'this isn`t working', 'I`m mad at computer'],
        },
        10 : {
            'emoji' : `<img src="https://a.slack-edge.com/production-standard-emoji-assets/15.0/apple-medium/2705@2x.png">`,
            'options' : ['looks good', 'this is done', 'working on it', 'I agree with this'],
        },
        11 : {
            'emoji' : `<img src="https://emoji.slack-edge.com/T018726P2RY/ok_cry/b50a9471c9b010ec.png">`,
            'options' : ['I`m sad', 'I don`t like this', `frustrated`, 'this is NOT okay'],
        },
        12 : {
            'emoji' : `<img src="https://emoji.slack-edge.com/T018726P2RY/coffee_dance/c43c1c0d06cc7b75.gif">`,
            'options' : ['I like coffee', 'I need coffee', 'I have coffee', 'gone to get coffee'],
        },
        13 : {
            'emoji' : `<img src="https://a.slack-edge.com/production-standard-emoji-assets/15.0/apple-medium/1f440@2x.png">`,
            'options' : ['uh oh', 'look at that!', 'somebody did something', 'I`m looking now'],
        },
    }

    const answers = {
        1 : '',
        2 : '',
        3 : '',
        4 : '',
        5 : '',
        6 : '',
        7 : '',
        8 : '',
        9 : '',
        10 : '',
        11 : '',
        12 : '',
        13 : '',
        'userName' : '',
        'score' : 0,
        'madLibs' : [],
    }

    let userRecord;

    // get unique user key
    const pushUserObject = () => {
        const newPostRef = push(dbRef, answers);
        return newPostRef.key;
    }
    
    // question list as stars
    let currentQuestion = 0;
    const stars = document.querySelectorAll('.heart');
    
    const advanceQuestion = currentQuestion => {
        const sequence = [0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
        const currentStar = sequence[currentQuestion];
        const starClasses = [...stars[currentStar].classList];
        if (starClasses.includes('is-half')) {
            stars[currentStar].classList.remove('is-half');
            stars[currentStar].classList.add('is-full');
        } else if (starClasses.includes('is-transparent')) {
            stars[currentStar].classList.remove('is-transparent');
            stars[currentStar].classList.add('is-half');
        } else {
            return;
        }
    }

    // timer
    // let counter;
    // let timerCounter;
    // let currentScore = 0;

    // let setCounter = () => {
    //     clearInterval(timerCounter)
    //     counter = 950;
    //     timerCounter = setInterval(scoreDown, 10);
    // }
    // let resetCounter = () =>

    // document.querySelector('.nes-progress').value = counter;
    // const scoreDown = () => {
    //     if (counter > 0) {
    //         counter--;
    //     } else {
    //         clearInterval(timerCounter);
    //         lockOptions();
    //     }
    //     let visualCounter = counter / 10
    //     document.querySelector('.nes-progress').value = visualCounter;
    // }

    // const lockOptions = () => {
    //     const optionButtons = document.querySelectorAll('.optionButton');
    //     optionButtons.forEach(optionButton => {
    //         optionButton.disabled = true;
    //         optionButton.classList.add('is-disabled')
    //     })
    // }

    const recordAnswer = answer => {

        // button.classList.remove('is-primary');

        // const updatedScore = currentScore + (counter * 10);
        // currentScore = updatedScore;
        // document.querySelector('.score').classList.add('scoreChange');
        // document.querySelector('.score').innerText = updatedScore;

        // lockOptions();

        answers[currentQuestion] = answer;
        const updates = {};
        updates[userRecord] = answers;
        return update(dbRef, updates);
    }



    const populateEmoji = () => {
        document.querySelector('.emoji').innerHTML = `${results[currentQuestion].emoji}`;
        setTimeout(() => {
            document.querySelector('.prompt').classList.toggle('questionStart');
        }, 1000)
    }

    const populateOptions = () => {
        const optionButtons = document.querySelectorAll('.optionButton');
        optionButtons.forEach((optionButton, index) => {
            optionButton.classList.remove('is-disabled');
            optionButton.classList.remove('is-success');
            const optionClasses = [...optionButton.classList];
            if (!optionClasses.includes('is-primary')) {
                optionButton.classList.add('is-primary');
            }
            optionButton.disabled = false;
            optionButton.innerText = results[currentQuestion].options[index];
            optionButton.addEventListener('click', e => {
                optionButtons.forEach((optionButton, index) => {
                    optionButton.classList.remove('is-success');
                    optionButton.classList.add('is-primary');
                })
                e.target.classList.remove('is-primary');
                e.target.classList.add('is-success');

// find element with is-success, get innerText, save as answer


                // const answer = e.target.innerText;
                // e.stopImmediatePropagation();
                // recordAnswer(e.target, answer);
            })
        })
        setTimeout(() => {
            document.querySelector('.screen').classList.toggle('questionStart');
        }, 1500)
        // setTimeout(() => {
        //     setCounter();
        // },2000)
    }

    // const allDone = () => {
    //     const madLibs = document.querySelectorAll('.mad-libs');
    //     madLibs.forEach(input => {
    //         input.style.opacity = 0;
    //     })
    //     document.querySelector('.madLibsScreen h2').style.visibility = 'hidden';
    //     document.querySelector('.madLibsScreen button').style.visibility = 'hidden';
    //     document.querySelector('.madLibsScreen h4').innerText = `All of your answers are saved, and we'll read them later on! Thanks!`
    // }

    // const saveMadLibs = () => {
    //     const inputs = document.querySelectorAll('.mad-lib');
    //     const madLibs = [];
    //     inputs.forEach(input => {
    //         input.previousElementSibling.previousElementSibling.style.color = 'azure';
    //         input.style.borderImageSource = `url('data:image/svg+xml;utf8,<?xml version="1.0" encoding="UTF-8" ?><svg version="1.1" width="5" height="5" xmlns="http://www.w3.org/2000/svg"><path d="M2 1 h1 v1 h-1 z M1 2 h1 v1 h-1 z M3 2 h1 v1 h-1 z M2 3 h1 v1 h-1 z" fill="rgb(255,255,255)" /></svg>')`;
    //         if (!input.value) {
    //             input.previousElementSibling.previousElementSibling.style.color = 'red';
    //             input.style.borderImageSource = `url('data:image/svg+xml;utf8,<?xml version="1.0" encoding="UTF-8" ?><svg version="1.1" width="5" height="5" xmlns="http://www.w3.org/2000/svg"><path d="M2 1 h1 v1 h-1 z M1 2 h1 v1 h-1 z M3 2 h1 v1 h-1 z M2 3 h1 v1 h-1 z" fill="rgb(255,0,0)" /></svg>')`;
    //         } else {
    //             madLibs.push(input.value);
    //         }
    //     })
    //     if (madLibs.length == 5) {
    //         answers['madLibs'] = madLibs;
    //         const updates = {};
    //         updates[userRecord] = answers;
    //         setTimeout(() => allDone(),1000)
    //         return update(dbRef, updates);
    //     }
    // }

    // const madLibsLabels = document.querySelectorAll('.mad-libs label');
    // madLibsLabels.forEach(label => {
    //     label.addEventListener('mouseover', e => {
    //         const descriptor = e.target.nextElementSibling;
    //         descriptor.style.visibility = 'visible';
    //     })
    //     label.addEventListener('mouseout', e => {
    //         const descriptor = e.target.nextElementSibling;
    //         descriptor.style.visibility = 'hidden';
    //     })
    // })

    // const saveMadLib = document.querySelector('.saveMadLib');
    // saveMadLib.addEventListener('click', () => saveMadLibs());

    const enterNameScreen = () => {
        document.querySelector('.prompt').style.display = 'none';
        document.querySelector('.screen').style.display = 'none';
        document.querySelector('.enterYourName').style.display = 'flex';
        setTimeout(() => {
            document.querySelector('.enterYourName').classList.toggle('questionStart');
        }, 1500)
        document.querySelector('.done').addEventListener('click', () => {
            const userName = document.querySelector('#name_field').value;
            if (userName == null || userName == undefined) {
                document.querySelector('.error').style.visibility = 'visible';
            } else {
                document.querySelector('.error').style.visibility = 'hidden';
                answers['userName'] = userName;
                // answers['score'] = currentScore;
                const updates = {};
                updates[userRecord] = answers;
                document.querySelector('.enterYourName').classList.toggle('questionStart');
                setTimeout(() => {
                    document.querySelector('.enterYourName').style.display = 'none';
                    // getHighScores();
                    highScoreScreen();
                }, 1500)
                return update(dbRef, updates);
            }
        })
    }

    // const getHighScores = () => {
    //     get(dbRef).then((snapshot) => {
    //         if(snapshot.exists()){
    //             const fullDB = snapshot.val();
    //             const leaderboard = [];
    //             for (let entry in fullDB) {
    //                 const singleUser = {};
    //                 singleUser.userName = fullDB[entry].userName.toUpperCase();
    //                 singleUser.score = fullDB[entry].score;
    //                 leaderboard.push(singleUser);
    //             }
    //             leaderboard.sort((a, b) => b.score - a.score);
    //             highScoreScreen(leaderboard, answers.userName);
    //         } else {
    //             console.log("No data available")
    //         }
    //     })
    // }

    const highScoreScreen = (leaderboard, userName) => {
        // const scoreList = document.querySelector('.scoreList');
        // leaderboard.forEach(entry => {
        //     const userAndScore = document.createElement('div');
        //     userAndScore.classList.add('userAndScore')
        //     const individualUser = document.createElement('h5');
        //     const individualScore = document.createElement('h5');
        //     individualUser.innerText = entry.userName;
        //     individualScore.innerText = entry.score;
        //     if (entry.userName.toUpperCase() == userName.toUpperCase()) {
        //         setTimeout(() => {
        //             individualUser.classList.add('scoreChange');
        //             individualScore.classList.add('scoreChange');
        //         }, 3000);
        //     }
        //     userAndScore.appendChild(individualUser);
        //     userAndScore.appendChild(individualScore);
        //     scoreList.appendChild(userAndScore);
        // })
        document.querySelector('.highScoreScreen').style.display = 'block';
        setTimeout(() => {
            document.querySelector('.highScoreScreen').classList.add('questionStart');
        }, 1500)
    }

    const nextQuestion = () => {
        currentQuestion++;
        // clearInterval(timerCounter);
        if (currentQuestion == Object.keys(results).length + 1) {
            enterNameScreen();
        } else {
            populateEmoji();
            populateOptions();
        }
    }
    
    const nextButton = document.querySelector('.nextQuestion');
    nextButton.addEventListener('click', () => {

        const answer = document.querySelector('.is-success').innerText;
        recordAnswer(answer);

        advanceQuestion(currentQuestion);

        // document.querySelector('.score').classList.remove('scoreChange');

        document.querySelector('.screen').classList.toggle('questionStart');
        document.querySelector('.prompt').classList.toggle('questionStart');
        setTimeout(() => {
            // document.querySelector('.nes-progress').value = counter;
            nextQuestion(currentQuestion);
        }, 1500)
    })
    
    const firstQuestion = () => {
        userRecord = pushUserObject();
        setTimeout(() => {
            document.querySelector('.mainScreen').classList.toggle('questionStart');
        }, 1500)
        advanceQuestion(currentQuestion);
        nextQuestion();
    }
    // const madLibs = () => {
    //     setTimeout(() => {
    //         document.querySelector('.madLibsScreen').classList.toggle('questionStart');
    //     }, 1500)
    // }
    
    // const bonusRoundButton = document.querySelector('.bonusRound');
    // bonusRoundButton.addEventListener('click', () => {
    //     document.querySelector('.highScoreScreen').classList.toggle('questionStart');
    //     setTimeout(() => {
    //         document.querySelector('.highScoreScreen').style.display = 'none';
    //         document.querySelector('.madLibsScreen').style.display = 'flex';
    //     }, 1000)
    //     madLibs();
    // })

    const firstQuestionButton = document.querySelector('.firstQuestion');
    firstQuestionButton.addEventListener('click', () => {
        document.querySelector('.openingScreen').classList.toggle('questionStart');
        setTimeout(() => {
            document.querySelector('.openingScreen').style.display = 'none';
            document.querySelector('.mainScreen').style.display = 'flex';
        }, 1000)
        firstQuestion();
    })

    document.querySelector('.openingScreen').classList.toggle('questionStart');
