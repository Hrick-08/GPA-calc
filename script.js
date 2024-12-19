const semesterContainer = document.getElementById('semester-container');
const addSemesterButton = document.getElementById('add-semester');
const calculateCGPAButton = document.getElementById('calculate-cgpa');
const resultsContainer = document.getElementById('results-container');
const semesterGPAElement = document.getElementById('semester-gpa');
const totalCGPAElement = document.getElementById('total-cgpa');

function addCourseRow(tableBody) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td><input type="text" name="course-name" placeholder="Course Name" required></td>
        <td><input type="number" name="credits" min="1" placeholder="Credits" required></td>
        <td><input type="number" name="grade" min="0" max="4" step="0.01" placeholder="Grade" required></td>
        <td><button type="button" class="remove-course">Remove</button></td>
    `;
    tableBody.appendChild(row);

    row.querySelector('.remove-course').addEventListener('click', () => {
        row.remove();
    });
}

function bindAddCourseButtons() {
    document.querySelectorAll('.add-course').forEach(button => {
        button.addEventListener('click', () => {
            const tableBody = button.previousElementSibling.querySelector('tbody');
            addCourseRow(tableBody);
        });
    });
}

function addSemester() {
    const semesterCount = semesterContainer.querySelectorAll('.semester').length + 1;
    const semesterDiv = document.createElement('div');
    semesterDiv.classList.add('semester');
    semesterDiv.dataset.semester = semesterCount;
    semesterDiv.innerHTML = `
        <h2>Semester ${semesterCount}</h2>
        <table class="courses-table">
            <thead>
                <tr>
                    <th>Course Name</th>
                    <th>Credits</th>
                    <th>Grade (GPA)</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><input type="text" name="course-name" placeholder="Course Name" required></td>
                    <td><input type="number" name="credits" min="1" placeholder="Credits" required></td>
                    <td><input type="number" name="grade" min="0" max="4" step="0.01" placeholder="Grade" required></td>
                    <td><button type="button" class="remove-course">Remove</button></td>
                </tr>
            </tbody>
        </table>
        <button type="button" class="add-course">Add Course</button>
    `;

    semesterContainer.appendChild(semesterDiv);

    bindAddCourseButtons();
}

function calculateCGPA() {
    const semesters = semesterContainer.querySelectorAll('.semester');
    let totalCredits = 0;
    let weightedSum = 0;
    semesterGPAElement.innerHTML = ''; // Clear previous results

    semesters.forEach(semester => {
        const rows = semester.querySelectorAll('tbody tr');
        let semesterCredits = 0;
        let semesterWeightedSum = 0;

        rows.forEach(row => {
            const credits = parseFloat(row.querySelector('input[name="credits"]').value) || 0;
            const grade = parseFloat(row.querySelector('input[name="grade"]').value) || 0;

            semesterCredits += credits;
            semesterWeightedSum += credits * grade;
        });

        const semesterGPA = semesterCredits > 0 ? (semesterWeightedSum / semesterCredits) : 0;
        const semesterGPAElementItem = document.createElement('p');
        semesterGPAElementItem.textContent = `Semester ${semester.dataset.semester}: GPA ${semesterGPA}`;
        semesterGPAElement.appendChild(semesterGPAElementItem);

        totalCredits += semesterCredits;
        weightedSum += semesterWeightedSum;
    });

    const totalCGPA = totalCredits > 0 ? (weightedSum / totalCredits) : 0;
    totalCGPAElement.textContent = `Total CGPA: ${totalCGPA}`;
    resultsContainer.style.display = 'block';
}

document.getElementById('add-semester').addEventListener('click', addSemester);
document.getElementById('calculate-cgpa').addEventListener('click', calculateCGPA);
bindAddCourseButtons();
