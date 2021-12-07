let topic = {
    name: "", // e.g., IS 101 or Python
    type: "", // subject or skill
    sunday: "", // Ignored for now.
    monday: "",
    tuesday: "",
    wednesday: "",
    thursday: "",
    friday: "", // Ignored for now.
    saturday: "", // Ignored for now.
    resources: [] // List of links to resources for given topic.
};

// Compare funtion for sorting topics by name:
function compareTopics(topic1, topic2) {
    if (topic1["name"] < topic2["name"]) return -1;
    if (topic1["name"] > topic2["name"]) return 1;
    return 0;
}

// Loads subjects & skills into schedule tables:
function loadSchedules(topics) {
    topics.sort(compareTopics);
    // let subject_filter = document.getElementById("subject-filter");
    // let skill_filter = document.getElementById("skill-filter");
    let subject_schedule = document.getElementById("subject-schedule");
    let skill_schedule = document.getElementById("skill-schedule");

    for (let t of topics) {
        let row;
        if (t["type"] == "subject") {
            row = subject_schedule.insertRow();
        } else if (t["type"] == "skill") {
            row = skill_schedule.insertRow();
        } else { continue; }

        let name = row.insertCell(0);
        name.innerHTML = "<a href=\"#resources-container\">" + t["name"] + "</a>";
        name.onclick = function() { displayResources(t["name"]); };
        row.insertCell(1).innerHTML = t["monday"];
        row.insertCell(2).innerHTML = t["tuesday"];
        row.insertCell(3).innerHTML = t["wednesday"];
        row.insertCell(4).innerHTML = t["thursday"];
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

// Displays the Resources section:
function displayResources(topicName) {
    document.getElementById("resources-title").innerHTML = "Resources for " + topicName;
    
    // TODO: Load resources into list:

    document.getElementById("resources-container").style.display = "";
}

// The following code is used to hardcode data into the website.

let topics = [
    {
        name: "IS 101",
        type: "subject",
        sunday: "",
        monday: "1 PM",
        tuesday: "1 PM",
        wednesday: "1 PM",
        thursday: "1 PM",
        friday: "",
        saturday: "",
        resources: [{
            name: "Google", url: "https://www.google.com/"
        }]
    }, 
    {
        name: "IS 107",
        type: "subject",
        sunday: "",
        monday: "1 PM",
        tuesday: "1 PM",
        wednesday: "1 PM",
        thursday: "1 PM",
        friday: "",
        saturday: "",
        resources: [{
            name: "Google", url: "https://www.google.com/"
        }]
    },
    {
        name: "Python",
        type: "skill",
        sunday: "",
        monday: "1 PM",
        tuesday: "1 PM",
        wednesday: "1 PM",
        thursday: "1 PM",
        friday: "",
        saturday: "",
        resources: [{
            name: "Google", url: "https://www.google.com/"
        }]
    },
    {
        name: "JavaScript",
        type: "skill",
        sunday: "",
        monday: "1 PM",
        tuesday: "1 PM",
        wednesday: "1 PM",
        thursday: "1 PM",
        friday: "",
        saturday: "",
        resources: [{
            name: "Google", url: "https://www.google.com/"
        }]
    }
];

loadSchedules(topics);