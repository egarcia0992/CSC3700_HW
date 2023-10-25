const express = require('express');
const router = express.Router();
const path = require('path');
// const adminController = require("../views/")

let categories = [{
    catId: 0,
    cat: "Intuitive",
    desc: "Intuitives pay attention to their intuition, instinct, and ability to draw meaning from seemingly disconnected facts. They are good at reading between the lines and recognizing connections between random groups of facts. People with this preference are abstract and theoretical."
}, {
    catId: 1,
    cat: "Analytical",
    desc: "The Analytical Personality Type People who have the Analytical personality type usually appear to be very intelligent, nerdy or systematical. They normally have little to no emotion and make decisions slowly and with much second thought."
}, {
    catId: 2,
    cat: "Feeler",
    desc: "Feelers tend to be sensitive to what is important to others. They make decisions on what matters to them and their system of values and how the outcome affects the connections between people, often expressing concern for others."
}]
const MAX_PTS = 6;
let questions = [{id: 'q1', q: "Are you naturally observant?", cat: 0}, {
    id: 'q2',
    q: "Do you like to work puzzles?",
    cat: 1
}, {id: 'q3', q: "Is Authenticity important to you?", cat: 2}, {
    id: 'q4',
    q: "Do you use personal values to make decisions?",
    cat: 2
}, {id: 'q5', q: "Do you find it easy to trust your gut instinct?", cat: 0}, {
    id: 'q6',
    q: "Do you know how things work?",
    cat: 1
}, {id: 'q7', q: "Are you a good judge of character?", cat: 0}, {
    id: 'q8',
    q: "Do you think you are naturally Curious?",
    cat: 1
}, {id: 'q9', q: "Are you a good judge of character?", cat: 2}];

router.get('/about', (req, res, next) => {
    res.render(`about`,
        {
            from: 'about'
        });
});
router.get('/survey', (req, res, next) => {
    res.render(`survey`,
        {
            questions: questions,
            categories: categories,
            MAX_PTS: MAX_PTS,
            from: 'survey'
        });
});
router.post('/surveyResults', (req, res, next) => {
    let cData = [0, 0, 0];
    let percent = [0.0, 0.0, 0.0];
    questions.forEach(question => {
        // console.log(req.body[question.id]);
        if (question.cat == 0) {
            if (req.body[question.id] == "2") {
                cData[0] += 2;
            } else if (req.body[question.id] == "1") {
                cData[0] += 1;
            } else {
                cData[0] += 0;
            }
        }
        if (question.cat == 1) {
            if (req.body[question.id] == "2") {
                cData[1] += 2;
            } else if (req.body[question.id] == "1") {
                cData[1] += 1;
            } else {
                cData[1] += 0;
            }
        }
        if (question.cat == 2) {
            if (req.body[question.id] == "2") {
                cData[2] += 2;
            } else if (req.body[question.id] == "1") {
                cData[2] += 1;
            } else {
                cData[2] += 0;
            }
        }
    });
    let ct = 0;
    cData.forEach(cDat => {
        percent[ct] = ((cDat / 6) * 100).toPrecision(3);
        ++ct;
    });

    res.render(`surveyResults`,
        {
            percent: percent,
            questions: questions,
            cData: cData,
            categories: categories,
            MAX_PTS: MAX_PTS,
            from: 'surveyResults'
        });
});
router.get('/', (req, res, next) => {
    res.render(`survey`,
        {
            questions: questions,
            from: 'survey'
        });
});

exports.routes = router;
