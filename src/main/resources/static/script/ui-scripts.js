$(document).on("click", "#student-header-btn", function () {
    updateStudentTable();
    showStudentsPage();
});

function appendToStudentTable(studentBean) {
    let tbody = document.getElementById('students-table').getElementsByTagName("tbody")[0];
    let row = document.createElement('tr');
    let id_col = document.createElement('td');
    id_col.appendChild(document.createTextNode(studentBean.id));
    let name_col = document.createElement('td');
    name_col.appendChild(document.createTextNode(studentBean.surname));
    let surname_col = document.createElement('td');
    surname_col.appendChild(document.createTextNode(studentBean.surname));
    let rating_col = document.createElement('td');
    rating_col.appendChild(document.createTextNode(studentBean.rating));
    let group_col = document.createElement('td');
    group_col.appendChild(document.createTextNode(studentBean.group));
    row.appendChild(id_col);
    row.appendChild(name_col);
    row.appendChild(surname_col);
    row.appendChild(rating_col);
    row.appendChild(group_col);
    tbody.appendChild(row);
}


function appendToLessonsTable(lessonBean) {
    let tbody = document.getElementById('lessons-table').getElementsByTagName("tbody")[0];
    let row = document.createElement('tr');
    let id_col = document.createElement('td');
    id_col.appendChild(document.createTextNode(lessonBean.id));
    let teacher_id_col = document.createElement('td');
    teacher_id_col.appendChild(document.createTextNode(lessonBean.teacherId));
    let group_id_col = document.createElement('td');
    group_id_col.appendChild(document.createTextNode(lessonBean.groupId));
    let subject_id_col = document.createElement('td');
    subject_id_col.appendChild(document.createTextNode(lessonBean.subjectId));
    row.appendChild(id_col);
    row.appendChild(teacher_id_col);
    row.appendChild(group_id_col);
    row.appendChild(subject_id_col);
    tbody.appendChild(row);
}

function appendToSubjectsTable(subjectBean) {
    let tbody = document.getElementById('subjects-table').getElementsByTagName("tbody")[0];
    let row = document.createElement('tr');
    let id_col = document.createElement('td');
    id_col.appendChild(document.createTextNode(subjectBean.id));
    let name_col = document.createElement('td');
    name_col.appendChild(document.createTextNode(subjectBean.name));
    let hours_col = document.createElement('td');
    hours_col.appendChild(document.createTextNode(subjectBean.hours));
    row.appendChild(id_col);
    row.appendChild(name_col);
    row.appendChild(hours_col);
    tbody.appendChild(row);
}

function appendToTeacherTable(teacherBean) {
    let tbody = document.getElementById('teachers-table').getElementsByTagName("tbody")[0];
    let row = document.createElement('tr');
    let id_col = document.createElement('td');
    id_col.appendChild(document.createTextNode(teacherBean.id));
    let name_col = document.createElement('td');
    name_col.appendChild(document.createTextNode(teacherBean.name));
    let surname_col = document.createElement('td');
    surname_col.appendChild(document.createTextNode(teacherBean.surname));
    row.appendChild(id_col);
    row.appendChild(name_col);
    row.appendChild(surname_col);
    tbody.appendChild(row);
}

function clearTable(tableId) {
    let old_body = document.getElementById(tableId).getElementsByTagName('tbody')[0];
    let new_body = document.createElement('tbody');
    old_body.parentNode.replaceChild(new_body, old_body);
}

function updateTeacherTable() {
    clearTable('teachers-table');
    var manager = new DataManager();
    var teacherArray = manager.loadAllTeachers();
    for (const teacherObj of teacherArray) {
        appendToTeacherTable(teacherObj);
    }
    console.log('Teacher table successfully updated');
}

function updateStudentTable() {
    clearTable('students-table');
    var manager = new DataManager();
    var studentArray = manager.loadAllStudents();
    for (const studentObj of studentArray) {
        appendToStudentTable(studentObj);
    }
    if (user.authority === 'ADMIN') {
            let groups = manager.loadAllGroups();
            $('#add-student-group-select').empty();
        $.each(groups, function (index, value) {
                $('#add-student-group-select').append(new Option(value.id, value.name));
        });
    }
    console.log('Student table successfully updated');
}

function updateSubjectTable() {
    clearTable('subjects-table');
    let manager = new DataManager();
    let array = manager.loadAllSubjects();
    for (const item of array) {
        appendToSubjectsTable(item);
    }
    console.log('Subject table successfully updated');
}

function updateLessonTable() {
    clearTable('lessons-table');
    let manager = new DataManager();
    let array = manager.loadAllLessons();
    for (const item of array) {
        appendToLessonsTable(item);
    }
    if (user.authority === 'ADMIN'){
        $('#lesson-add-subject-id-select').empty();
        $('#lesson-add-teacher-id-select').empty();
        $('#lesson-add-group-id-select').empty();

        // updating group select
        let groups = manager.loadAllGroups();
        $.each(groups, function (index, value) {
            $('#lesson-add-group-id-select').append(new Option(value.id, value.name));
        });
        // updating subjects select
        let subjects = manager.loadAllSubjects();

        $.each(subjects, function (index, value) {
            $('#lesson-add-subject-id-select').append(new Option(value.name, value.id));
        });
        // updating teachers select
        let teachersSelectMap = manager.loadAllTeachers();

        $.each(teachersSelectMap, function (index, value) {
            $('#lesson-add-teacher-id-select').append(new Option(value.name, value.id));
        });
    }
    console.log('Lesson table successfully updated');
}

$(document).on("click", "#teacher-header-btn", function () {
    updateTeacherTable();
    showTeachersPage();
});

$(document).on("click", "#subject-header-btn", function () {
    updateSubjectTable();
    showSubjectsPage();
});

$(document).on("click", "#lesson-header-btn", function () {
    updateLessonTable();
    showLessonsPage();
});

$(document).on("click", "#student-header-btn", function () {
    updateStudentTable();
    showStudentsPage();
});

$(document).on("click", '#add-teacher-btn', function (event) {
    event.preventDefault();
    let name = document.getElementById('teacher-name-input-field').value;
    let surname = document.getElementById('teacher-surname-input-field').value;
    let bean = new TeacherBean(null, name, surname);
    let data = new DataManager();
    data.saveTeacher(bean);
    updateTeacherTable()
});

$(document).on("click", '#find-teacher-btn', function (event) {
    event.preventDefault();
    let id = $('#find-teacher-id-input').val();
    let dataManager = new DataManager();
    let foundTeacher = dataManager.loadTeacherById(id);
    if (foundTeacher !== null) {
        $('#edit-teacher-id-input').val(foundTeacher.id);
        $('#edit-teacher-name-input').val(foundTeacher.name);
        $('#edit-teacher-surname-input').val(foundTeacher.surname);
        $('#teacher-not-found-msg').hide();
        $('#teacher-edit-form').show();
    } else {
        $('#teacher-edit-form').hide();
        $('#teacher-not-found-msg').show();
    }
});

$(document).on("click", '#edit-teacher-btn', function (event) {
    event.preventDefault();
    let dataManager = new DataManager();
    let obj = new TeacherBean($('#edit-teacher-id-input').val(),
        $('#edit-teacher-name-input').val(),
        $('#edit-teacher-surname-input').val());
    dataManager.saveTeacher(obj);
    updateTeacherTable();
//TODO: Notification about success or fail
});

$(document).on("click", '#delete-teacher-btn', function (event) {
    event.preventDefault();
    let dataManager = new DataManager();
    dataManager.deleteTeacher($('#delete-teacher-id-input').val());
    updateTeacherTable();
    //TODO: Notification about success or fail
});
$(document).on('click', '#add-student-btn', function (event) {
    event.preventDefault();
    let dataManager = new DataManager();
    let student = new StudentBean(null, $('#add-student-name-input').val(), $('#add-student-surname-input').val(),
        $('#add-student-rating-input').val(), $('#add-student-group-select').val());
    dataManager.saveStudent(student);
    updateStudentTable();
});

$(document).on('click', '#delete-student-btn', function (event) {
    event.preventDefault();
    let id = $('#delete-student-id-input').val();
    let dataManager = new DataManager();
    dataManager.deleteStudent(id);
    updateStudentTable();
});

$(document).on('click', '#find-student-btn', function (event) {
    event.preventDefault();
    let id = $('#find-student-id-input').val();
    let dataManager = new DataManager();
    let student = dataManager.loadStudentById(id);
    if (student !== null) {
        $('#student-not-found-msg').hide();
        $('#student-edit-id-input').val(student.id);
        $('#student-edit-name-input').val(student.name);
        $('#student-edit-surname-input').val(student.surname);
        $('#student-edit-rating-input').val(student.rating);
        $('#student-edit-group-select').val(student.group);
        $('#student-edit-form').show();
    } else {
        $('#student-edit-form').hide();
        $('#student-not-found-msg').show();
    }
});

$(document).on('click', '#student-edit-btn', function (event) {
    event.preventDefault();
    let dataManager = new DataManager();
    let id = $('#student-edit-id-input').val();
    let name = $('#student-edit-name-input').val();
    let surname = $('#student-edit-surname-input').val();
    let rating = $('#student-edit-rating-input').val();
    let group = $('#student-edit-group-select').val();
    let student = new StudentBean(id, name, surname, rating, group);
    dataManager.saveStudent(student);
});

$(document).on('click', '#lesson-add-btn', function (event) {
    event.preventDefault();
    let teacherId = $('#lesson-add-teacher-id-select').val();
    let subjectId = $('#lesson-add-subject-id-select').val();
    let groupId = $('#lesson-add-group-id-select').val();
    let lesson = new LessonBean(null, groupId, subjectId, teacherId);
    let dataManager = new DataManager();
    dataManager.saveLesson(lesson);
    updateLessonTable();
});

$(document).on('click', '#lesson-delete-btn', function (event) {
    event.preventDefault();
    let id = $('#lesson-delete-id-input').val();
    let dataManager = new DataManager();
    dataManager.deleteLesson(id);
    updateLessonTable();
});

$(document).on('click', '#lesson-find-btn', function (event) {
    event.preventDefault();
    let id = $('#lesson-find-id-input').val();
    let dataManager = new DataManager();
    let lesson = dataManager.loadLessonById(id);
    if (lesson !== null) {
        $('#lesson-not-found-msg').hide();
        $('#lesson-edit-id-input').val(lesson.id);
        $('#lesson-edit-teacher-id-select').val(lesson.teacherId);
        $('#lesson-edit-subject-input').val(lesson.subjectId);
        $('#lesson-edit-group-select').val(lesson.groupId);
        $('#lesson-edit-form').show();
    } else {
        $('#lesson-edit-form').hide();
        $('#lesson-not-found-msg').show();
    }
});

$(document).on('click', '#lesson-edit-btn', function (event) {
    event.preventDefault();
    let id = $('#lesson-find-id-input').val();
    let teacherId = $('#lesson-edit-teacher-id-select').val();
    let subjectId = $('#lesson-edit-subject-input').val();
    let groupId = $('#lesson-edit-group-select').val();
    let lesson = new LessonBean(id, groupId, subjectId, teacherId);
    let dataManager = new DataManager();
    dataManager.saveLesson(lesson);
    updateLessonTable();
});

$(document).on('click', '#subject-add-btn', function (event) {
    event.preventDefault();
    let dataManager = new DataManager();
    let subject = new SubjectBean(null,
        $('#subject-add-name-input').val(),
        $('#subject-add-hours-input').val());
    dataManager.saveSubject(subject);
    updateSubjectTable();
});
$(document).on('click', '#subject-delete-btn', function (event) {
    event.preventDefault();
    let dataManager = new DataManager();
    let id = $('#subject-delete-id-input').val();
    dataManager.deleteSubject(id);
    updateSubjectTable();
});
$(document).on('click', '#subject-find-btn', function (event) {
    event.preventDefault();
    let id = $('#subject-find-id-input').val();
    let dataManager = new DataManager();
    let subject = dataManager.loadSubjectById(id);
    if (subject !== null) {
        $('#subject-not-found-msg').hide();
        $('#subject-edit-id-input').val(subject.id);
        $('#subject-edit-name-input').val(subject.name);
        $('#subject-edit-hours-input').val(subject.hours);
        $('#subject-edit-form').show();
    } else {
        $('#subject-edit-form').hide();
        $('#subject-not-found-msg').show();
    }
});

$(document).on('click', '#subject-edit-btn', function (event) {
    event.preventDefault();
    let subject = new SubjectBean($('#subject-edit-id-input').val(),
        $('#subject-edit-name-input').val(),
        $('#subject-edit-hours-input').val());
    let dataManager = new DataManager();
    dataManager.saveSubject(subject);
    updateSubjectTable();
});


function showTeachersPage() {
    var teacherPage = document.getElementById('teachers-page');
    var studentPage = document.getElementById('students-page');
    var lessonPage = document.getElementById('lessons-page');
    var subjectPage = document.getElementById('subjects-page');
    teacherPage.style.display = 'block';
    subjectPage.style.display = 'none';
    studentPage.style.display = 'none';
    lessonPage.style.display = 'none';
}

function showStudentsPage() {
    var teacherPage = document.getElementById('teachers-page');
    var studentPage = document.getElementById('students-page');
    var lessonPage = document.getElementById('lessons-page');
    var subjectPage = document.getElementById('subjects-page');
    teacherPage.style.display = 'none';
    subjectPage.style.display = 'none';
    studentPage.style.display = 'block';
    lessonPage.style.display = 'none';
}

function showHeader() {
    let teachersBtn = document.getElementById('teacher-header-btn');
    let studentsBtn = document.getElementById('students-header-btn');
    let subjectsBtn = document.getElementById('subjects-header-btn');
    let lessonsBtn = document.getElementById('lessons-header-btn');
    teachersBtn.style.display = 'block';
    studentsBtn.style.display = 'block';
    subjectsBtn.style.display = 'block';
    lessonsBtn.style.display = 'block';

}

function hideHeader() {
    let teachersBtn = document.getElementById('teacher-header-btn');
    let studentsBtn = document.getElementById('students-header-btn');
    let subjectsBtn = document.getElementById('subjects-header-btn');
    let lessonsBtn = document.getElementById('lessons-header-btn');
    teachersBtn.style.display = 'none';
    studentsBtn.style.display = 'none';
    subjectsBtn.style.display = 'none';
    lessonsBtn.style.display = 'none';

}

function showLessonsPage() {
    let teacherPage = document.getElementById('teachers-page');
    let studentPage = document.getElementById('students-page');
    let lessonPage = document.getElementById('lessons-page');
    let subjectPage = document.getElementById('subjects-page');
    teacherPage.style.display = 'none';
    subjectPage.style.display = 'none';
    studentPage.style.display = 'none';
    lessonPage.style.display = 'block';
}

function showSubjectsPage() {
    let teacherPage = document.getElementById('teachers-page');
    let studentPage = document.getElementById('students-page');
    let lessonPage = document.getElementById('lessons-page');
    let subjectPage = document.getElementById('subjects-page');
    teacherPage.style.display = 'none';
    subjectPage.style.display = 'block';
    studentPage.style.display = 'none';
    lessonPage.style.display = 'none';
}

function hideLoginPage() {
    $('#sign-in-page').css('display', 'none');
    $('header').css('display', 'block');
    $('#teachers-page').css('display', 'block');
}

function showLoginPage(){
    $('#sign-in-page').css('display', 'block');
    $('header').css('display', 'none');
    $('#teachers-page').css('display', 'none');
    $('#students-page').css('display', 'none');
    $('#lessons-page').css('display', 'none');
    $('#subjects-page').css('display', 'none');
}

function hideEditComponents() {
    $('.add-form').css('display', 'none');
    $('.delete-form').css('display', 'none');
    $('.find-form').css('display', 'none');
    $('.edit-form').css('display', 'none');
}
function showEditComponents() {
    $('.add-form').css('display', 'block');
    $('.delete-form').css('display', 'block');
    $('.find-form').css('display', 'block');
    $('.edit-form').css('display', 'none');
}

$(document).on("click", "#to-sign-up-page-btn", function (event) {
event.preventDefault();
$('#sign-in-page').css('display', 'none');
$('#sign-up-page').css('display', 'block');
});

$(document).on("click", "#to-sign-in-page-btn", function (event) {
event.preventDefault();
$('#sign-up-page').css('display', 'none');
$('#sign-in-page').css('display', 'block');
});


