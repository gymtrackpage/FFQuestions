const questions = [
    {
        question: "001 What are your primary fitness goals? (Choose up to 2)",
        options: ["Build strength and muscle", "Improve endurance and stamina", "Lose weight and tone up", "Increase flexibility and mobility"],
        type: "checkbox"
    },
    {
        question: "What type of environment do you prefer to train in?",
        options: ["Gym with equipment", "Outdoors", "Home with minimal equipment"]
    },
    {
        question: "What is your current fitness level?",
        options: ["Beginner (just starting out)", "Intermediate (some experience)", "Advanced (experienced athlete)"]
    },
    {
        question: "Which of these activities sounds most appealing to you?",
        options: [
            "Constantly varied workouts with weights and bodyweight exercises",
            "Mastering bodyweight movements and developing control",
            "Short, intense bursts of exercise with rest periods",
            "Lifting heavy weights to build pure strength",
            "Technical lifts like the snatch and clean & jerk",
            "Functional movements with kettlebells",
            "Bodyweight exercises using suspension straps",
            "Combination of running and functional fitness exercises",
            "Obstacle courses and outdoor challenges"
        ]
    }
];

let currentQuestion = 0;
let userAnswers = [];

function displayQuestion() {
    const questionData = questions[currentQuestion];
    let questionHTML = `<h2>${questionData.question}</h2>`;

    if (questionData.type === "checkbox") {
        questionData.options.forEach(option => {
            questionHTML += `<label><input type="checkbox" value="${option}">${option}</label><br>`;
        });
    } else {
        questionData.options.forEach(option => {
            questionHTML += `<label><input type="radio" name="q${currentQuestion}" value="${option}">${option}</label><br>`;
        });
    }

    document.getElementById("quiz-container").innerHTML = questionHTML;
}

function nextQuestion() {
    const currentAnswers = [];
    if (questions[currentQuestion].type === "checkbox") {
        const selectedCheckboxes = document.querySelectorAll(
            input[name="q${currentQuestion}"]:checked
        );
        selectedCheckboxes.forEach(option => {
            currentAnswers.push(option.value);
        });
    } else { // radio buttons
        const selectedRadio = document.querySelector(
            input[name="q${currentQuestion}"]:checked
        );
        if (selectedRadio) { // Check if a radio button is selected
            currentAnswers.push(selectedRadio.value);
        }
    }

    if (currentAnswers.length === 0) {
        alert("Please select an answer.");
        return;
    }

    userAnswers.push(currentAnswers);

    currentQuestion++;
    if (currentQuestion < questions.length) {
        displayQuestion();
    } else {
        displayRecommendation();
    }
}
function displayRecommendation() {
    let recommendation = "Based on your answers, we recommend trying: ";

    // Strength & Muscle
    if (userAnswers[0].includes("Build strength and muscle")) {
        if (userAnswers[1] === "Gym with equipment") {
            if (userAnswers[2] === "Beginner (just starting out)") {
                recommendation += "Powerlifting or Kettlebell Training (to learn fundamental movements).";
            } else if (userAnswers[3] === "Constantly varied workouts with weights and bodyweight exercises") {
                recommendation += "CrossFit!";
            } else if (userAnswers[3] === "Lifting heavy weights to build pure strength") {
                recommendation += "Powerlifting!";
            } else if (userAnswers[3] === "Functional movements with kettlebells") {
                recommendation += "Kettlebell Training!";
            } else if (userAnswers[3] === "Technical lifts like the snatch and clean & jerk") {
                recommendation += "Olympic Weightlifting!";
            } else {
                recommendation += "CrossFit, Olympic Weightlifting, or Powerlifting (depending on your preference for variety and specific movements)!";
            }
        } else if (userAnswers[1] === "Home with minimal equipment") {
            recommendation += "Calisthenics or Suspension Training (depending on your preference for equipment)!";
        } else { // Outdoors
            recommendation += "Hyrox or Calisthenics!";
        }
    } 

    // Endurance & Stamina
    else if (userAnswers[0].includes("Improve endurance and stamina")) {
        if (userAnswers[1] === "Outdoors") {
            if (userAnswers[3] === "Obstacle courses and outdoor challenges") {
                recommendation += "Spartan Race!";
            } else if (userAnswers[3] === "Combination of running and functional fitness exercises") {
                recommendation += "Hyrox!";
            } else {
                recommendation += "Spartan Race or Hyrox (depending on your preference for obstacles vs. functional fitness exercises)!";
            }
        } else if (userAnswers[1] === "Gym with equipment") {
            if (userAnswers[2] === "Beginner (just starting out)") {
                recommendation += "HIIT or Rowing!";
            } else {
                recommendation += "HIIT, CrossFit, or Olympic Weightlifting!";
            }
        } else { // Home with minimal equipment
            if (userAnswers[3] === "Short, intense bursts of exercise with rest periods") {
                recommendation += "HIIT!";
            } else {
                recommendation += "Calisthenics or HIIT!"; 
            }
        }
    }

    // Weight Loss & Tone Up
    else if (userAnswers[0].includes("Lose weight and tone up")) {
        if (userAnswers[1] === "Outdoors") {
            recommendation += "Hyrox or Spartan Race!";
        } else if (userAnswers[2] === "Beginner (just starting out)") {
            recommendation += "HIIT (start slow and gradually increase intensity)!";
        } else if (userAnswers[3] === "Short, intense bursts of exercise with rest periods") {
            recommendation += "HIIT!";
        } else {
            recommendation += "HIIT, CrossFit, or any other option that you enjoy!";
        }
    }

    // Flexibility & Mobility
    else if (userAnswers[0].includes("Increase flexibility and mobility")) {
        if (userAnswers[1] === "Home with minimal equipment") {
            recommendation += "Calisthenics or Yoga!";
        } else if (userAnswers[1] === "Gym with equipment") {
            recommendation += "Yoga or Pilates!";
        } else {
            recommendation += "Calisthenics or Yoga (outdoors or at home)!";
        }
    }
    
    // No specific goal or combination doesn't fit the tree:
    else {
        recommendation += "Explore our detailed guides to each discipline to find the perfect fit for you!";
    }

    document.getElementById("quiz-container").innerHTML = <h2>${recommendation}</h2>;
    document.getElementById("next-btn").style.display = "none";
}

//initialise the quiz with the first question
displayQuestion();
