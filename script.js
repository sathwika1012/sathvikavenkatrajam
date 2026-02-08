/***********************
 BASIC UI CONTROLS
***********************/
function openSection(sectionId) {
    document.getElementById("main-menu").classList.add("hidden");
    document.getElementById(sectionId).classList.remove("hidden");
}

function backToMenu() {
    document.getElementById("main-menu").classList.remove("hidden");

    document.getElementById("cs-section")?.classList.add("hidden");
    document.getElementById("ds-section")?.classList.add("hidden");
}

/***********************
 CLASS SCHEDULE
***********************/
const classSchedule = [
    { hour: "Hour 1", start: "09:00", end: "10:10" },
    { hour: "Hour 2", start: "10:10", end: "11:10" },
    { hour: "Hour 3", start: "11:10", end: "12:10" },
    { hour: "Hour 4", start: "12:10", end: "13:10" },
    { hour: "Hour 5", start: "14:10", end: "15:10" },
    { hour: "Hour 6", start: "15:10", end: "16:00" }
];

// Convert time string HH:MM to minutes for comparison
function timeToMinutes(timeStr) {
    const [h, m] = timeStr.split(':').map(Number);
    return h * 60 + m;
}

// Get current hour based on time
function getCurrentHour() {
    const now = new Date();
    const currentHours = String(now.getHours()).padStart(2, '0');
    const currentMinutes = String(now.getMinutes()).padStart(2, '0');
    const currentTime = currentHours + ':' + currentMinutes;
    const currentMins = timeToMinutes(currentTime);

    for (let i = 0; i < classSchedule.length; i++) {
        const startMins = timeToMinutes(classSchedule[i].start);
        const endMins = timeToMinutes(classSchedule[i].end);
        if (currentMins >= startMins && currentMins < endMins) {
            return i; // Return index (0-5 for hours 1-6)
        }
    }
    return -1; // No active hour
}

/***********************
 AUTO DATE AND TIME
***********************/
function initializeDateAndTime() {
    // Set today's date
    const today = new Date().toISOString().split('T')[0];
    const timeInputs = document.querySelectorAll('input[type="time"]');
    const dateInputs = document.querySelectorAll('input[type="date"]');

    dateInputs.forEach(input => {
        input.value = today;
    });

    // Populate hour dropdowns with timings
    populateHourDropdowns();

    // Update time every second
    function updateTime() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const currentTime = `${hours}:${minutes}`;

        timeInputs.forEach(input => {
            input.value = currentTime;
        });

        // Auto-select current hour
        const currentHourIdx = getCurrentHour();
        if (currentHourIdx >= 0) {
            const hourSelects = document.querySelectorAll('select[id^="hour"]');
            hourSelects.forEach(select => {
                select.value = classSchedule[currentHourIdx].hour;
            });
        }
    }

    updateTime();
    setInterval(updateTime, 1000);
}

function populateHourDropdowns() {
    const hourSelects = document.querySelectorAll('select[id^="hour"]');
    hourSelects.forEach(select => {
        select.innerHTML = '';
        classSchedule.forEach(schedule => {
            const option = document.createElement('option');
            option.value = schedule.hour;
            option.textContent = `${schedule.hour} (${schedule.start} - ${schedule.end})`;
            select.appendChild(option);
        });
    });
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', initializeDateAndTime);

/***********************
 GLOBAL VARIABLES
***********************/
const currentMode = {};

const finalTexts = {
    present: {},
    absent: {}
};

/***********************
 STUDENTS DATABASE
***********************/
const classConfig = {
    1: { key: "cs1", prefix: "CS1" },
    2: { key: "cs2", prefix: "CS2" },
    3: { key: "ds1", prefix: "DS1" },
    4: { key: "ds2", prefix: "DS2" }
};

const encryptedStudentsData = "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";

function decryptStudentsData(encryptedText) {
    const keyStr = "mySuperSecretKeyForStudents";
    const keyBytes = new TextEncoder().encode(keyStr);

    // Decode base64 to binary string
    const binaryStr = atob(encryptedText);
    const len = binaryStr.length;
    const bytes = new Uint8Array(len);

    // Convert binary string to byte array
    for (let i = 0; i < len; i++) {
        bytes[i] = binaryStr.charCodeAt(i);
    }

    // XOR decryption
    const decryptedBytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        decryptedBytes[i] = bytes[i] ^ keyBytes[i % keyBytes.length];
    }

    // Decode UTF-8 to string
    const jsonStr = new TextDecoder().decode(decryptedBytes);
    return JSON.parse(jsonStr);
}

const studentsData = decryptStudentsData(encryptedStudentsData);
console.log("Secure Student Data Loaded.");

/***********************
 ATTENDANCE FUNCTION
***********************/
function markAttendance(id, mode) {
    currentMode[id] = mode;

    const config = classConfig[id];
    const dept = studentsData[config.key];

    const inputBox = document.getElementById("rolls" + id);
    if (!inputBox) {
        alert("Cannot find input box");
        return;
    }
    if (inputBox.value.trim() === "") {
        alert("Enter ABSENT roll numbers only");
        return;
    }

    // Read date and hour controls (fallbacks provided)
    const dateEl = document.getElementById('date' + id);
    const timeEl = document.getElementById('time' + id);
    const hourEl = document.getElementById('hour' + id);
    const dateVal = (dateEl && dateEl.value) ? dateEl.value : new Date().toLocaleDateString('en-CA');
    const timeVal = (timeEl && timeEl.value) ? timeEl.value : new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
    const hourVal = (hourEl && hourEl.value) ? hourEl.value : 'Hour 1';

    // Get hour timing information
    const hourTimingInfo = getHourTiming(hourVal);

    // User enters ONLY absentees (1, 2, A0, le1 etc.)
    const absentRolls = [...new Set(
        inputBox.value.trim()
            .toUpperCase()
            .split(/[\s,]+/)
    )];

    // Normalize student keys to uppercase → original
    const normalizedDeptKeys = {};
    Object.keys(dept).forEach(k => {
        normalizedDeptKeys[k.toUpperCase()] = k; // map uppercase → original key
    });

    const allStudents = Object.keys(dept);

    let absentSet = new Set();
    let presentSet = new Set();
    let invalid = [];

    absentRolls.forEach(r => {
        if (normalizedDeptKeys[r]) {
            absentSet.add(normalizedDeptKeys[r]); // store original key
        } else {
            invalid.push(r);
        }
    });

    if (invalid.length > 0) {
        alert("Invalid roll numbers: " + invalid.join(", "));
    }

    allStudents.forEach(r => {
        if (!absentSet.has(r)) {
            presentSet.add(r);
        }
    });

    let presentHTML = "", absentHTML = "";
    let presentText = "", absentText = "";

    allStudents.forEach(r => {
        if (presentSet.has(r)) {
            presentHTML += `<div class="present">${r} - ${dept[r]}</div>`;
            presentText += `${r} - ${dept[r]}\n`;
        } else {
            absentHTML += `<div class="absent">${r} - ${dept[r]}</div>`;
            absentText += `${r} - ${dept[r]}\n`;
        }
    });

    // Add headers for Present and Absent students
    if (presentText.trim() !== "") {
        presentText = "Present Students:\n" + presentText;
    }
    if (absentText.trim() !== "") {
        absentText = "Absent Students:\n" + absentText;
    }

    const headerText = `Class: ${config.prefix}\nDate: ${dateVal}\nTime: ${timeVal}\nHour: ${hourVal} (${hourTimingInfo})\n\n`;
    finalTexts.present[id] = headerText + presentText.trim();
    finalTexts.absent[id] = headerText + absentText.trim();

    // Persist to localStorage for later reference
    try {
        const storageKey = `attendance_${config.key}_${dateVal}_${hourVal.replace(/\s+/g, '_')}`;
        const saveObj = { class: config.prefix, date: dateVal, time: timeVal, hour: hourVal, hourTiming: hourTimingInfo, present: Array.from(presentSet), absent: Array.from(absentSet) };
        localStorage.setItem(storageKey, JSON.stringify(saveObj));
    } catch (e) {
        console.warn('Could not save attendance to localStorage', e);
    }

    const resultBox = document.getElementById("result" + id);
    resultBox.style.display = "block";

    const metaHTML = `<div class="attendance-meta"><strong>Class:</strong> ${config.prefix} &nbsp; <strong>Date:</strong> ${dateVal} &nbsp; <strong>Time:</strong> ${timeVal} &nbsp; <strong>Hour:</strong> ${hourVal} <strong>(${hourTimingInfo})</strong></div>`;

    if (mode === "present") {
        const presentHeaderHTML = presentSet.size > 0 ? `<h4>✅ Present Students</h4>` : '';
        resultBox.innerHTML = metaHTML + presentHeaderHTML + presentHTML;
    } else {
        const absentHeaderHTML = absentSet.size > 0 ? `<h4>❌ Absent Students</h4>` : '';
        resultBox.innerHTML = metaHTML + absentHeaderHTML + absentHTML;
    }

    document.getElementById("summary" + id).innerHTML =
        `Total: ${allStudents.length} | Present: ${presentSet.size} | Absent: ${absentSet.size}`;
}

/***********************
 GET HOUR TIMING
***********************/
function getHourTiming(hourValue) {
    const schedule = classSchedule.find(s => s.hour === hourValue);
    if (schedule) {
        return `${schedule.start} - ${schedule.end}`;
    }
    return "09:00 - 10:10";
}

/***********************
 COPY & SHARE
***********************/
function copyText(id, mode) {
    if (!finalTexts[mode] || !finalTexts[mode][id]) {
        alert("Generate attendance first!");
        return;
    }
    navigator.clipboard.writeText(finalTexts[mode][id]);
    alert("Copied successfully!");
}

function shareWhatsApp(id, mode) {
    if (!finalTexts[mode] || !finalTexts[mode][id]) {
        alert("Generate attendance first!");
        return;
    }
    const text = encodeURIComponent(finalTexts[mode][id]);
    window.open("https://wa.me/?text=" + text, "_blank");
}

// Auto-fill today's date for any date inputs when page loads
function setDefaultDates() {
    try {
        const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
        document.querySelectorAll('input[type="date"]').forEach(inp => {
            if (!inp.value) inp.value = today;
        });
    } catch (e) {
        console.warn('setDefaultDates error', e);
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setDefaultDates);
} else {
    setDefaultDates();
}
