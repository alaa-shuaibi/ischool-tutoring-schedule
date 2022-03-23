let resources;
// let tutors;

// Retrieves data from server then loads it onto the website:
async function loadData() {
    let response = await fetch("http://127.0.0.1:5000/getSchedule");
    let schedule = await response.json();
    displaySchedule(schedule);

    response = await fetch("http://127.0.0.1:5000/getResources");
    resources = await response.json();

    // response = await fetch("http://127.0.0.1:5000/getTutors");
    // tutors = await response.json();
}

// Compare funtion for sorting topics by name:
function compareTopics(topic1, topic2) {
    if (topic1["name"] < topic2["name"]) return -1;
    if (topic1["name"] > topic2["name"]) return 1;
    return 0;
}

// Displays the schedule onto the website:
function displaySchedule(schedule) {
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
    key = topicName.replace(/\s/g, "").toLowerCase();
    let ul = document.getElementById("resources-list");

    document.getElementById("resources-title").innerHTML = "Resources for " + topicName;
    ul.innerHTML = "";

    if (key in resources) { 
        let links = resources[key];
        for (let l of links) {
            let li = document.createElement("li");
            if (l.name == "") { li.innerHTML = "<a href=\"" + l.url +"\" target=\"_blank\">" + l.url + "</a>"; }
            else { li.innerHTML = "<a href=\"" + l.url +"\" target=\"_blank\">" + l.name + "</a>"; }
            ul.appendChild(li);
            ul.appendChild(document.createElement("br"));
            ul.appendChild(document.createElement("br"));
        }
    } else {
        ul.innerHTML = "No resources available."
    }

    document.getElementById("resources-container").style.display = "";
}

loadData();