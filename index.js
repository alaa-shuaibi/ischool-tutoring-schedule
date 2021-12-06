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
        friday: "1 PM",
        saturday: "",
        resources: [{
            name: "Google", url: "https://www.google.com/"
        }]
    }
];

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