function DarkMode() {
    var element = document.body;
    element.classList.toggle("dark-mode")
}
function openBar() {
    document.getElementById("bar").innerHTML = "&#10006;";
    if (document.getElementById("Sidebar").style.width === "250px") {
        document.getElementById("bar").innerHTML = "&#9776;";
        closeBar();
    } else {
        document.getElementById("Sidebar").style.width = "250px";
        document.getElementById("main").style.marginLeft = "250px";
    }
}


function closeBar() {
    document.getElementById("Sidebar").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";

}
const skills = {
    javascript: {
        title: "JavaScript",
        description: "I use JavaScript to <span class='highlight'>add interactivity and functionality to websites</span>, including dynamic content, event handling, and responsive user interfaces."
    },
    html: {
        title: "HTML",
        description: "I use HTML to build <span class='highlight'>well-structured, accessible web pages</span>, with an understanding of semantic elements and how they contribute to usability, such as this one."
    },
    css: {
        title: "CSS",
        description: "I use CSS to create <span class='highlight'>visually appealing, responsive websites</span>, including layouts, animations, transitions, and light/dark themes."
    },
    git: {
        title: "GitHub",
        description: "I use GitHub to manage versions of my code, track changes, and <span class='highlight'>maintain an organised development workflow</span> as I am aware it is an industry standard."
    },
    python: {
        title: "Python",
        description: "I have an <span class='highlight'>extensive experience writing Python programs for over 7 years</span> and using programming concepts such as functions, loops, and conditional logic to solve all sorts of technical problems."
    },
    office: {
        title: "Microsoft Office",
        description: "I am <span class='highlight'>extremely comfortable navigating Microsoft Office applications</span>, including Word, Excel, and PowerPoint, to produce documents, organise information, and create presentations."
    },
    premiere: {
        title: "Adobe Premiere Pro",
        description: "<span class='highlight'>I have 7 years experience editing video content using Adobe Premiere Pro</span>, including cutting footage, arranging sequences, and working with audio and visual effects."
    },
    aftereffects: {
        title: "Adobe After Effects",
        description: "<span class='highlight'>I have 3 years of experience using Adobe After Effects</span> to create motion graphics, animations, and visual effects for video projects. Below is an example showcasing my ability to work with 3d objects and motion graphing.",
        video: "videos/apple.mp4"
    },
    skateboarding: {
        title: "Skateboarding",
        description: "Skateboarding has helped me develop persistence, patience, and resilience. Learning new tricks requires consistent practice, problem-solving, and a willingness to learn from mistakes. <span class='highlight'>I am also currently social secretary for my university's Skate Society.</span>"
    },
    teamwork: {
        title: "Team Work",
        description: "I enjoy collaborating with others, sharing ideas, and contributing towards common goals. I value clear communication, reliability, and learning from different perspectives, <span class='highlight'>my experience managing at Gregg's has really helped with my teamwork skills.</span>"
    },
    problemsolving: {
        title: "Problem Solving",
        description: "I approach challenges <span class='highlight'>logically by breaking problems into smaller steps</span>, exploring possible solutions, and learning from the results. I particularly enjoy applying this approach to programming."
    },
    spanish: {
        title: "Native Spanish Speaker",
        description: "<span class='highlight'>I am a native Spanish speaker</span>, allowing me to communicate confidently in Spanish and contribute to environments involving Spanish-speaking colleagues or customers."
    }
};

function showSkill(skill) {
    const box = document.getElementById("skillDescription");
    const title = document.getElementById("skillTitle");
    const text = document.getElementById("skillText");
    const video = document.getElementById("skillVideo");

    if (!skills[skill]) return;

    // Clicking the same skill closes its description
    if (!box.hidden && box.dataset.active === skill) {
        box.hidden = true;
        box.dataset.active = "";
        return;
    }

    title.textContent = skills[skill].title;
    text.innerHTML = skills[skill].description;

    video.pause();

    if (skills[skill].video) {
        video.src = skills[skill].video;
        video.hidden = false;
        video.load();
    } else {
        video.hidden = true;
        video.removeAttribute("src");
        video.load();
    }

    box.dataset.active = skill;
    box.hidden = false;
    box.classList.remove("fade-in");
    void box.offsetWidth;
    box.classList.add("fade-in");
}
