let url = "http://127.0.0.1:5000"
let resources;
let tutors;

// Retrieves data from server then loads it onto the website:
async function loadData() {
    let response = await fetch(url + "/schedule");
    let schedule = await response.json();
    loadSchedule(schedule);

    response = await fetch(url + "/resources");
    resources = await response.json();

    response = await fetch(url + "/tutors");
    tutors = await response.json();
    loadTutorSchedule();
}

// Compare function for sorting objects by "name" attribute:
function compareObjects(o1, o2) {
    if (o1["name"] < o2["name"] && o1["name"] !== "") return -1;
    if (o1["name"] > o2["name"] && o2["name"] !== "") return 1;
    return 0;
}

// Loads the schedule onto the website:
function loadSchedule(schedule) {
    schedule.sort(compareObjects);
    let course_schedule = document.getElementById("course-schedule");
    let skill_schedule = document.getElementById("skill-schedule");

    for (let s of schedule) {
        let row;
        if (s["type"] == "course") {
            row = course_schedule.insertRow();
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

function loadTutorSchedule() {
    tutors.sort(compareObjects);
    let tutor_scheudule = document.getElementById("tutor-schedule")

    for (let t of tutors) {
        let row = tutor_scheudule.insertRow();
        let name = row.insertCell(0);
        name.innerHTML = "<a>" + t["name"] + "</a>";
        row.insertCell(1).innerHTML = t["courses"];
        row.insertCell(2).innerHTML = t["skills"];
        row.insertCell(3).innerHTML = t["monday"];
        row.insertCell(4).innerHTML = t["tuesday"];
        row.insertCell(5).innerHTML = t["wednesday"];
        row.insertCell(6).innerHTML = t["thursday"];
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
        links.sort(compareObjects);
        for (let l of links) {
            let li = document.createElement("li");
            if (l.name === "") { li.innerHTML = "<a href=\"" + l.url +"\" target=\"_blank\">" + l.url + "</a>"; }
            else { li.innerHTML = "<a href=\"" + l.url +"\" target=\"_blank\">" + l.name + "</a>"; }
            ul.appendChild(li);
            ul.appendChild(document.createElement("br"));
            ul.appendChild(document.createElement("br"));
        }
    } else {
        ul.innerHTML = "No resources available.";
    }

    document.getElementById("resources-container").style.display = "";
}

// Switches between different schedules:
function switchSchedule(table) {
    document.getElementById("resources-container").style.display = "none";

    let course_schedule = document.getElementById("course-schedule");
    let skill_schedule = document.getElementById("skill-schedule");
    let tutor_schedule = document.getElementById("tutor-schedule");

    if (table == "courses") {
        course_schedule.style.display = "";
        skill_schedule.style.display = "none";
        tutor_schedule.style.display = "none"
    } else if (table == "skills") {
        course_schedule.style.display = "none";
        skill_schedule.style.display = "";
        tutor_schedule.style.display = "none"
    } else if (table == "tutors") {
        course_schedule.style.display = "none";
        skill_schedule.style.display = "none";
        tutor_schedule.style.display = ""
    }
}

loadData();