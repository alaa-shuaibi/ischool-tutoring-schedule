let topic = {
    name: "", // e.g., IS 101 or Python
    type: "", // Subject or Skill
    sunday: "",
    monday: "",
    tuesday: "",
    wednesday: "",
    thursday: "",
    friday: "",
    saturday: "",
    resources: [] // List of links to resources for given topic
};

// Compare funtion for sorting topics:
function compareTopics(topic1, topic2) {
    if (topic1["name"] < topic2["name"]) return -1;
    if (topic1["name"] > topic2["name"]) return 1;
    return 0;
}

// Loads subjects & skills into schedule tables:
function loadSchedules(subjects = [], skills = []) {
    subjects.sort(compareTopics);
    skills.sort(compareTopics);

    let subject_filter = document.getElementById("subject-filter");
    let skill_filter = document.getElementById("skill-filter");
    let subject_schedule = document.getElementById("subject-schedule");
    let skill_schedule = document.getElementById("skill-schedule");

    for (let s of subjects) {
        let row = subject_schedule.insertRow();
        let name = row.insertCell(0);
        let mon = row.insertCell(1);
        let tue = row.insertCell(2);
        let wed = row.insertCell(3);
        let thu = row.insertCell(4);

        name.innerHTML = s["name"];
        mon.innerHTML = s["monday"];
        tue.innerHTML = s["tuesday"];
        wed.innerHTML = s["wednesday"];
        thu.innerHTML = s["thursday"];
    }

    for (let s of skills) {
        let row = skill_schedule.insertRow();
        let name = row.insertCell(0);
        let mon = row.insertCell(1);
        let tue = row.insertCell(2);
        let wed = row.insertCell(3);
        let thu = row.insertCell(4);

        name.innerHTML = s["name"];
        mon.innerHTML = s["monday"];
        tue.innerHTML = s["tuesday"];
        wed.innerHTML = s["wednesday"];
        thu.innerHTML = s["thursday"];
    }
}

// Switches between Subject schedule and Skill schedule:
function switchSchedule() {
    let toggle = document.getElementById("toggle");
    let subject_filter = document.getElementById("subject-filter");
    let skill_filter = document.getElementById("skill-filter");
    let subject_schedule = document.getElementById("subject-schedule");
    let skill_schedule = document.getElementById("skill-schedule");

    if (toggle.innerHTML == "Schedule by Skill") {
        toggle.innerHTML = "Schedule by Subject";
        subject_filter.style.display = "none";
        skill_filter.style.display = "";
        subject_schedule.style.display = "none";
        skill_schedule.style.display = "";
    } else {
        toggle.innerHTML = "Schedule by Skill";
        subject_filter.style.display = "";
        skill_filter.style.display = "none";
        subject_schedule.style.display = "";
        skill_schedule.style.display = "none";
    }
}

// The following code is used to hardcode data into the website.

let subjects = [
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
    }
];

let skills = [
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

loadSchedules(subjects, skills);