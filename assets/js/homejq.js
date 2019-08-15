$(document).ready(function(){
    var questions;
    var answers;
    var checked;
    $.ajax({
        method: "GET",
        url: "/api/index_get",
        dataType: "json",
    })
    .done(function(msg) {
        var obj = $.parseJSON(msg);
        if (obj.status === "done") {
            questions = obj.date.questions;
            answers = obj.date.answers;
            checked = obj.date.checked;
            var textHtml = "";
            questions.forEach(function(e, i) {
                textHtml += "<div class='form-group'><label>"+e+"</label></div>";
                answers[i].forEach(function(ee,ii) {
                    textHtml += "<div class='form-group'><input name='right_or"+i+"' type='radio' class='form-check-input' id='right_or"+i+ii+"' /><label>"+ee+"</label></div>";
                })
            });
            textHtml += "";
            var container = document.getElementById('container');
            container.insertAdjacentHTML('afterbegin', textHtml);
        }
    });
    $("#gotocheck").on("click", function() {
        var totalQuestions = questions.length;
        var trueQuestions = 0;
        questions.forEach(function(e, i) {
            answers[i].forEach(function(ee, ii) {
                if($("input#right_or"+i+ii).prop("checked")) {
                    if(checked[i].indexOf(ee) != -1) {
                        trueQuestions++;
                    }
                }
            })
        });
        var falseQuestions = totalQuestions-trueQuestions;
        $("#messages").html("Всего вопросов: "+totalQuestions+", Правильных ответов: "+trueQuestions+", Неправильных ответов: "+falseQuestions);
    })
})