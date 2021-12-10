// Compare funtion for sorting topics by name:
function compareTopics(topic1, topic2) {
    if (topic1["name"] < topic2["name"]) return -1;
    if (topic1["name"] > topic2["name"]) return 1;
    return 0;
}

// Loads the schedule onto the website:
function loadSchedule(schedule) {
    schedule.sort(compareTopics);
    // let subject_filter = document.getElementById("subject-filter");
    // let skill_filter = document.getElementById("skill-filter");
    let subject_schedule = document.getElementById("subject-schedule");
    let skill_schedule = document.getElementById("skill-schedule");

    for (let s of schedule) {
        let row;
        if (s["type"] == "subject") {
            row = subject_schedule.insertRow();
        } else if (s["type"] == "skill") {
            row = skill_schedule.insertRow();
        } else { continue; }

        let name = row.insertCell(0);
        name.innerHTML = "<a href=\"#resources-container\">" + s["name"] + "</a>";
        name.onclick = function() { displayResources(s["name"]); };
        row.insertCell(1).innerHTML = s["monday"];
        row.insertCell(2).innerHTML = s["tuesday"];
        row.insertCell(3).innerHTML = s["wednesday"];
        row.insertCell(4).innerHTML = s["thursday"];
    }
}

// Switches between Subject schedule and Skill schedule:
function switchSchedule() {
    let toggle = document.getElementById("toggle");
    // let subject_filter = document.getElementById("subject-filter");
    // let skill_filter = document.getElementById("skill-filter");
    let subject_schedule = document.getElementById("subject-schedule");
    let skill_schedule = document.getElementById("skill-schedule");

    if (toggle.innerHTML == "Schedule by Skill") {
        toggle.innerHTML = "Schedule by Subject";
        // subject_filter.style.display = "none";
        // skill_filter.style.display = "";
        subject_schedule.style.display = "none";
        skill_schedule.style.display = "";
    } else {
        toggle.innerHTML = "Schedule by Skill";
        // subject_filter.style.display = "";
        // skill_filter.style.display = "none";
        subject_schedule.style.display = "";
        skill_schedule.style.display = "none";
    }
}

// Displays the Resources section for the given topic:
function displayResources(topicName) {
    let ul = document.getElementById("resources-list");
    let links = resources[topicName];

    document.getElementById("resources-title").innerHTML = "Resources for " + topicName;
    ul.innerHTML = "";

    if (links.length == 0) { ul.innerHTML = "No resources available." }
    else {
        for (let l of links) {
            let li = document.createElement("li");
            if (l.name == "") { li.innerHTML = "<a href=\"" + l.url +"\" target=\"_blank\">" + l.url + "</a>"; }
            else { li.innerHTML = "<a href=\"" + l.url +"\" target=\"_blank\">" + l.name + "</a>"; }
            ul.appendChild(li);
            ul.appendChild(document.createElement("br"));
            ul.appendChild(document.createElement("br"));
        }
    }

    document.getElementById("resources-container").style.display = "";
}

// The following code is used to hardcode data into the website.

let schedule = [
    {
        "name": "IS 101",
        "type": "subject",
        "sunday": "",
        "monday": "12-7 PM",
        "tuesday": " 12-7 PM",
        "wednesday": "12-7 PM",
        "thursday": "12-7 PM",
        "friday": "",
        "saturday": ""
    },{
        "name": "IS 202",
        "type": "subject",
        "sunday": "",
        "monday": "12-1 PM, 2-7 PM",
        "tuesday": "1-2 PM, 4-7 PM",
        "wednesday": "12-5 PM",
        "thursday": "1-3 PM, 5-7 PM",
        "friday": "",
        "saturday": ""
    },{
        "name": "IS 203",
        "type": "subject",
        "sunday": "",
        "monday": "12-5 PM",
        "tuesday": "",
        "wednesday": "12-5 PM",
        "thursday": "2-3 PM, 5-6 PM",
        "friday": "",
        "saturday": ""
    },{
        "name": "IS 204",
        "type": "subject",
        "sunday": "",
        "monday": "2-4 PM, 5-7 PM",
        "tuesday": "1-2 PM, 4-7 PM",
        "wednesday": "2-5 PM",
        "thursday": "1-3 PM, 5-7 PM",
        "friday": "",
        "saturday": ""
    },{
        "name": "IS 205",
        "type": "subject",
        "sunday": "",
        "monday": "5-7 PM",
        "tuesday": "1-2 PM, 4-7 PM",
        "wednesday": "",
        "thursday": "1-3 PM, 5-7 PM",
        "friday": "",
        "saturday": ""
    },{
        "name": "IS 206",
        "type": "subject",
        "sunday": "",
        "monday": "2-4 PM, 5-7 PM",
        "tuesday": "5-7 PM",
        "wednesday": "2-5 PM",
        "thursday": "2-3 PM, 5-7 PM",
        "friday": "",
        "saturday": ""
    },{
        "name": "IS 407",
        "type": "subject",
        "sunday": "",
        "monday": "5-7 PM",
        "tuesday": "5-7 PM",
        "wednesday": "",
        "thursday": "5-7 PM",
        "friday": "",
        "saturday": ""
    },{
        "name": "IS 430",
        "type": "subject",
        "sunday": "",
        "monday": "5-7 PM",
        "tuesday": "5-7 PM",
        "wednesday": "",
        "thursday": "5-7 PM",
        "friday": "",
        "saturday": ""
    },{
        "name": "Python",
        "type": "skill",
        "sunday": "",
        "monday": "12-7 PM",
        "tuesday": "12-7 PM",
        "wednesday": "12-7 PM",
        "thursday": "12-7 PM",
        "friday": "",
        "saturday": ""
    },{
        "name": "SQL",
        "type": "skill",
        "sunday": "",
        "monday": "5-7 PM",
        "tuesday": "12-1 PM, 2-7 PM",
        "wednesday": "5-7 PM",
        "thursday": "12-1 PM, 3-7 PM",
        "friday": "",
        "saturday": ""
    },{
        "name": "Java",
        "type": "skill",
        "sunday": "",
        "monday": "1-7 PM",
        "tuesday": "12-1 PM, 5-7 PM",
        "wednesday": "12-7 PM",
        "thursday": "12-1 PM, 2-7 PM",
        "friday": "",
        "saturday": ""
    },{
        "name": "JavaScript",
        "type": "skill",
        "sunday": "",
        "monday": "12-1 PM",
        "tuesday": "12-1 PM, 2-4 PM",
        "wednesday": "12-2 PM, 5-7 PM",
        "thursday": "12-1 PM, 3-5 PM",
        "friday": "",
        "saturday": ""
    },{
        "name": "R",
        "type": "skill",
        "sunday": "",
        "monday": "5-7 PM",
        "tuesday": "12-1 PM, 2-7 PM",
        "wednesday": "5-7 PM",
        "thursday": "12-1 PM, 3-7 PM",
        "friday": "",
        "saturday": ""
    },{
        "name": "C/C++",
        "type": "skill",
        "sunday": "",
        "monday": "2-4 PM",
        "tuesday": "1-2 PM, 4-5 PM",
        "wednesday": "2-5 PM",
        "thursday": "1-3 PM, 5-6 PM",
        "friday": "",
        "saturday": ""
    },{
        "name": "Figma",
        "type": "skill",
        "sunday": "",
        "monday": "12-1 PM",
        "tuesday": "1-2 PM, 4-5 PM",
        "wednesday": "12-2 PM",
        "thursday": "1-3 PM",
        "friday": "",
        "saturday": ""
    },{
        "name": "Data Visualization",
        "type": "skill",
        "sunday": "",
        "monday": "5-7 PM",
        "tuesday": "1-2 PM, 4-7 PM",
        "wednesday": "",
        "thursday": "1-3 PM, 5-7 PM",
        "friday": "",
        "saturday": ""
    },{
        "name": "Databases",
        "type": "skill",
        "sunday": "",
        "monday": "5-7 PM",
        "tuesday": "12-7 PM",
        "wednesday": "5-7 PM",
        "thursday": "12-7 PM",
        "friday": "",
        "saturday": ""
    },{
        "name": "Math",
        "type": "skill",
        "sunday": "",
        "monday": "12-1 PM, 2-7 PM",
        "tuesday": "1-2 PM, 4-7 PM",
        "wednesday": "12-7 PM",
        "thursday": "1-3 PM, 5-7 PM",
        "friday": "",
        "saturday": ""
    }
];

let resources = {
    "IS 101": [],
    "IS 202": [],
    "IS 203": [],
    "IS 204": [],
    "IS 205": [],
    "IS 206": [],
    "IS 407": [],
    "IS 430": [],
    "Python": [
        {"name": "", "url": "https://www.python.org/"},
        {"name": "", "url": "https://www.learnpython.org/"},
        {"name": "", "url": "https://www.pythonforbeginners.com/"},
        {"name": "", "url": "https://python.swaroopch.com"},
        {"name": "", "url": "https://developers.google.com/edu/python"}    ],
    "SQL": [
        {"name": "", "url": "https://sqlbolt.com/"},
        {"name": "", "url": "https://www.khanacademy.org/computing/computer-programming/sql/"},
        {"name": "", "url": "https://sqlzoo.net/wiki/SQL_Tutorial"}    ],
    "Java": [
        {"name": "", "url": "https://www.codecademy.com/catalog/language/java"},
        {"name": "", "url": "https://www.geeksforgeeks.org/java/"},
        {"name": "", "url": "https://www.codingninjas.com/v2/courses/online-java-course"}    ],
    "JavaScript": [
        {"name": "", "url": "https://www.codecademy.com/catalog/language/javascript"},
        {"name": "", "url": "https://eloquentjavascript.net/"},
        {"name": "", "url": "https://developer.mozilla.org/en-US/docs/Learn"}
    ],
    "R": [
        {"name": "", "url": "https://r4ds.had.co.nz/index.html"}
    ],
    "C/C++": [
        {"name": "", "url": "https://www.cplusplus.com/"},
        {"name": "", "url": "https://www.geeksforgeeks.org/c-plus-plus/"},
        {"name": "", "url": "https://www.learncpp.com/"}
    ],
    "Figma": [
        {"name": "", "url": "https://www.figma.com/resources/learn-design/"}
    ],
    "Data Visualization": [
        {"name": "", "url": "https://www.tableau.com/"}
    ],
    "Databases": [],
    "Math": []
};

loadSchedule(schedule);