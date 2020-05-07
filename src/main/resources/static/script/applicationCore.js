var user;
function resolveUserRole(){
    switch (user.authority) {
        case "ADMIN":
            showEditComponents();
            break;
        case "USER":
            hideEditComponents();
            break;
    }
}

class DataManager {

    constructor() {
        this.baseHost='http://localhost:8081/';
        this.allTeachersURL = this.baseHost+'teachers/all';
        this.allStudentsURL = this.baseHost+'students/all';
        this.allLessonsURL = this.baseHost+'lessons/all';
        this.allSubjectsURL = this.baseHost+'subjects/all';
        this.teacherByIdURL = this.baseHost+'teachers/'; //+id required
        this.subjectByIdURL = this.baseHost+'subjects/'; //+id required
        this.lessonByIdURL = this.baseHost+'lessons/'; //+id required
        this.studentByIdURL = this.baseHost+'students/'; //+id required
        this.updateTeacherURL = this.baseHost+'teachers/update';
        this.updateSubjectURL = this.baseHost+'subjects/update';
        this.updateStudentURL = this.baseHost+'students/update';
        this.updateLessonURL = this.baseHost+'lessons/update';
        this.currentUserURL = this.baseHost+'user';
    }

    loadAllTeachers() {
        let json = this.executeGetRequestToREST(this.allTeachersURL);
        return TeacherBean.fromArray(json);
    }

    loadAllStudents() {
        let json = this.executeGetRequestToREST(this.allStudentsURL);
        return StudentBean.fromArray(json);
    }

    loadAllSubjects() {
        let json = this.executeGetRequestToREST(this.allSubjectsURL);
        return SubjectBean.fromArray(json);
    }

    loadAllLessons() {
        let json = this.executeGetRequestToREST(this.allLessonsURL);
        return LessonBean.fromArray(json);
    }

    loadTeacherById(id) {
        let json = this.executeGetRequestToREST(this.teacherByIdURL + id);
        return TeacherBean.from(json);
    }

    loadStudentById(id) {
        let json = this.executeGetRequestToREST(this.studentByIdURL + id);
        return StudentBean.from(json);
    }

    loadSubjectById(id) {
        let json = this.executeGetRequestToREST(this.subjectByIdURL + id);
        return SubjectBean.from(json);
    }

    loadLessonById(id) {
        let json = this.executeGetRequestToREST(this.lessonByIdURL + id);
        return LessonBean.from(json);
    }

    saveTeacher(teacherBean) {
        let json = JSON.stringify(teacherBean);
        return this.executePostToRest(this.updateTeacherURL, json);
    }

    saveStudent(studentBean) {
        let json = JSON.stringify(studentBean);
        return this.executePostToRest(this.updateStudentURL, json);
    }

    saveLesson(lessonBean) {
        let json = JSON.stringify(lessonBean);
        return this.executePostToRest(this.updateLessonURL, json);
    }

    saveSubject(subjectBean) {
        let json = JSON.stringify(subjectBean);
        return this.executePostToRest(this.updateSubjectURL, json);
    }

    deleteTeacher(id) {
        return this.executeDeleteToRest(this.teacherByIdURL + id);
    }

    deleteSubject(id) {
        return this.executeDeleteToRest(this.subjectByIdURL + id);
    }

    deleteLesson(id) {
        return this.executeDeleteToRest(this.lessonByIdURL + id);
    }

    deleteStudent(id) {
        return this.executeDeleteToRest(this.studentByIdURL + id);
    }

    loadCurrentUser(){
        return this.executeGetRequestToREST(this.currentUserURL);
    }

    /** Executes GET request by url and returns *.responseText.
     *
     * @param url (like http://university-rest-server.herokuapp.com/teachers/all), only ports: 8081, 8080 is allowed
     */
    executeGetRequestToREST(url) {
       let xhr = new XMLHttpRequest();
        xhr.open('GET', url, false);

        // use xhr.onload and xhr.onerror if any troubles
        xhr.withCredentials = true;
        xhr.send();

        if (xhr.status !== 200) {
            alert(xhr.status + ': ' + xhr.statusText);
        } else {
            console.log("Headers: "+xhr.HEADERS_RECEIVED);
            console.log("Status: "+ xhr.statusText);
            console.log("JSON from url " + url + ": " + xhr.responseText);
            return xhr.responseText;

        }
    };


    executePostToRest(url, json) {
       $.ajax({
            type: 'POST',
            url: url,
           dataType: "json",
           contentType: "application/json; charset=UTF-8",
            xhrFields: {
                withCredentials: true
            },
            data: json,
            crossDomain: true,
            success:function (data, textStatus, jqXHR) {
            },
            error: function (data, textStatus, jqXHR) {
            }
        });
    }

    executeDeleteToRest(url) {
        let xhr = new XMLHttpRequest();
        xhr.withCredentials=true;
        xhr.open('DELETE', url, false);
        xhr.send();
        return xhr.status;
    }
}

document.addEventListener("DOMContentLoaded", checkAuthorization());
function checkAuthorization() {
    $('#wrong-username-or-password-msg').hide();
   $.ajax({
        url: "http://localhost:8081/auth/refresh-token",
        xhrFields: {
            withCredentials: true
        },
        type: 'POST',
        crossDomain: true,
        success: function (data, textStatus, jqXHR) {
            if (jqXHR.status === 200){
                $.ajax({
                    url: "http://localhost:8081/user/principal",
                    type: "GET",
                    xhrFields: {
                        withCredentials: true
                    },
                    crossDomain: true,
                    success: function (data, textStatus, jqXHR){
                        switch (jqXHR.status) {
                            case 200:
                                user = UserBean.from(jqXHR.responseText);
                                console.log("Built user on page reload: "+JSON.stringify(user));
                                resolveUserRole();
                                hideLoginPage();
                                updateTeacherTable();
                                break;
                            case 403:
                                alert("Authorization required");
                                break;
                        }
                    }
                })
            }else {
                alert("back to login");
            }
        },
        error: function (data, textStatus, jqXHR) {
            switch (jqXHR.status) {
                case 403:
                    console.log("Failed to authorize, token has expired");
                    break;

            }
        }
    })
}

$(document).on('click', '#logout-header-btn', function(event){
    event.preventDefault();
  $.ajax({
        url: 'http://localhost:8081/auth/logout',
        type: 'POST',
      xhrFields: {
          withCredentials: true
      },
      crossDomain: true,
        success: function(data, textStatus, jqXHR){
            user = null;
            showLoginPage();
        }
    });
    //showLoginPage();
});

$(document).on('click', '#login-submit-btn', function (event) {
    event.preventDefault();

    let username = $('#login-username-field').val();
    let password = $('#login-pass-field').val();
    console.log(username, password);
    $.ajax({
        type: 'POST',
        url: 'http://localhost:8081/auth/token',
        xhrFields: {
            withCredentials: true
        },
        data: {
            'username': username,
            'password': password,
        },
        crossDomain: true,
        success:function (data, textStatus, jqXHR) {
            let userJson;
            if (jqXHR.status === 200) {
                $.ajax({
                    type: 'GET',
                    url: 'http://localhost:8081/user/principal',
                    xhrFields: {
                        withCredentials: true
                    },
                    success: function(data, textStatus, jqXHR){
                        userJson = jqXHR.responseText;
                        if(jqXHR.status === 200){
                            hideLoginPage();
                        }
                        user = UserBean.from(userJson);
                        resolveUserRole();
                        console.log("Built user on submit click: "+JSON.stringify(user));
                    }
                });
            }
        },
        error: function (data, textStatus, jqXHR) {
            if (data.status === 404){
                $('#wrong-username-or-password-msg').show(500).delay(6000).hide(500);
            }
        }
        });
});

