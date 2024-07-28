const fs = require('fs');
// Predefined arrays of valid options
const warmUps = ["10 minutes jogging", "5 minutes jumping jacks", "10 minutes cycling"];
const finalBlocks = ["Stretching", "Cool down and stretching", "Yoga poses"];
const routines = ["Cardio routine", "Strength training", "HIIT training", "Yoga"];
const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const trainerNames = ["John Doe", "Alice Johnson", "Robert Brown", "Emily Davis"];
const clientNames = ["Jane Smith", "Bob Brown", "Alice Wilson", "Charlie Johnson"];
const conditions = ["asthma", "diabetes", "hypertension"];
const targetNames = ["Weight Loss", "Muscle Gain", "Endurance", "Flexibility"];
const colors = ["red", "blue", "green", "yellow"];
const muscularGroups = ["Legs", "Arms", "Chest", "Back"];
const exercises = ["Squats", "Lunges", "Bicep Curls", "Tricep Dips", "Bench Press", "Chest Fly", "Pull Ups", "Deadlift"];
const descriptions = ["Basic exercise", "Advanced exercise", "Intermediate exercise"];
const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];
const generateRandomPlans = (numPlans) => {
    const plans = [];
    for (let i = 0; i < numPlans; i++) {
        const [trainerFirstName, trainerLastName] = getRandomElement(trainerNames).split(" ");
        const [clientFirstName, clientLastName] = getRandomElement(clientNames).split(" ");
        const plan = {
            startDate: new Date(),
            finishDate: new Date(),
            warmUp: getRandomElement(warmUps),
            finalBlock: getRandomElement(finalBlocks),
            specificRoutine: [
                {
                    description: getRandomElement(routines),
                    day: getRandomElement(days)
                },
                {
                    description: getRandomElement(routines),
                    day: getRandomElement(days)
                }
            ],
            trainer: {
                id: `trainer${i + 1}`,
                name: trainerFirstName,
                lastName: trainerLastName,
                email: `${trainerFirstName.toLowerCase()}.${trainerLastName.toLowerCase()}@example.com`
            },
            client: {
                id: `client${i + 1}`,
                name: clientFirstName,
                lastName: clientLastName,
                userName: `${clientFirstName.toLowerCase()}${clientLastName.toLowerCase()}`,
                email: `${clientFirstName.toLowerCase()}.${clientLastName.toLowerCase()}@example.com`,
                birthDate: new Date(1990, 1, 1),
                height: Math.floor(Math.random() * (200 - 150) + 150),
                weight: Math.floor(Math.random() * (100 - 50) + 50),
                conditions: [getRandomElement(conditions)]
            },
            target: {
                id: `target${i + 1}`,
                name: getRandomElement(targetNames),
                description: getRandomElement(descriptions),
                color: getRandomElement(colors)
            },
            muscularGroups: [
                {
                    muscularGroup: {
                        name: getRandomElement(muscularGroups),
                        description: getRandomElement(descriptions)
                    },
                    exercises: [
                        {
                            exercise: {
                                name: getRandomElement(exercises),
                                description: getRandomElement(descriptions),
                                files: ["example.png"]
                            },
                            day: getRandomElement(days),
                            series: Math.floor(Math.random() * (5 - 1) + 1),
                            repetitions: Math.floor(Math.random() * (15 - 8) + 8).toString(),
                            explanation: getRandomElement(descriptions),
                            metodology: getRandomElement(descriptions),
                            combination: null
                        }
                    ]
                },
                {
                    muscularGroup: {
                        name: getRandomElement(muscularGroups),
                        description: getRandomElement(descriptions)
                    },
                    exercises: [
                        {
                            exercise: {
                                name: getRandomElement(exercises),
                                description: getRandomElement(descriptions),
                                files: ["example.png"]
                            },
                            day: getRandomElement(days),
                            series: Math.floor(Math.random() * (5 - 1) + 1),
                            repetitions: Math.floor(Math.random() * (15 - 8) + 8).toString(),
                            explanation: getRandomElement(descriptions),
                            metodology: getRandomElement(descriptions),
                            combination: null
                        }
                    ]
                }
            ]
        };
        plans.push(plan);
    }
    return plans;
};
const numPlans = 10; // Change this number to generate more or fewer plans
const plans = generateRandomPlans(numPlans);
fs.writeFileSync('plans.json', JSON.stringify(plans, null, 2));
console.log(`Generated ${numPlans} plans and saved to plans.json`);
