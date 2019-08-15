$(document).ready(function(){
    var index_question = 11;
    var questions = [index_question];
    var answers = [[11]];
    var ajaxquestions = [];
    var ajaxanswers = [[]];
    var ajaxcheckanswers = [];
    addQuestion = () => {
        return "<span id='question"+index_question+"'>"+
        "<div class='form-group'>"+
            "<label>Вопрос</label>"+
            "<input type='text' class='form-control' id='question"+index_question+"' placeholder='Задайте ворос' />"+
        "</div>"+
        "<div class='form-row'>"+
            "<div class='form-group col-md-6'><label>Варианты ответов</label>"+
                "<input type='text' class='form-control' id='possible_answer"+index_question+"' placeholder='Вариант ответа' /></div>"+
            "<div class='form-group col-md-2' style='text-align:center'><div class='form-check'><input name='right_or"+index_question+"' type='radio' class='form-check-input' id='right_or"+index_question+"' checked='checked' />"+
                "<label class='form-check-label' for='gridCheck'>Верный</label></div></div>"+
        "</div>"+
        "</span>"+
        "<button id='add_answer"+index_question+"' type='submit' class='btn btn-primary'>Добавить вариант ответа</button>";
    }
    $( "#questions" ).html(addQuestion());
    $( "button[id*='add_question']" ).on( "click", function() {
        index_question = index_question+10;
        if (index_question < 26) {
            questions.push(index_question);
            answers.push([index_question]);
            var formgroups = document.getElementById('questions');
            formgroups.insertAdjacentHTML('beforeend', addQuestion());
        }
    });
    $( "#questions" ).on( "click", "button[id*='add_answer']", function() {
        var question = $(this).attr("id").slice(-2);
        var number_question = Number(question)+1;
        var des = question.charAt(0);
        var number_des = Number(des);
        var eden = question.slice(-1);
        var number_eden = Number(eden);
        answers[number_des-1].push(number_question);
        if(number_eden < 5) {
            $(this).attr("id", 'add_answer'+String(number_question));
            var formgroups = document.getElementById('question'+des+'1');
            formgroups.insertAdjacentHTML('beforeend', "<div class='form-row'>"+
            "<div class='form-group col-md-6'>"+
                "<input type='text' class='form-control' id='possible_answer"+String(number_question)+"' placeholder='Вариант ответа' /></div>"+
            "<div class='form-group col-md-2'><div class='form-check'><input name='right_or"+String(index_question)+"'  type='radio' class='form-check-input' id='right_or"+String(number_question)+"' />"+
                "<label class='form-check-label' for='gridCheck'>Верный</label></div></div>"+
            "</div>");
        }
    });
    $( "#save_questions" ).on( "click", function() {
        var pass = false;
        var passajax = false;
        questions.forEach( function (e,i) {
            var quest = $( "input#question"+e ).val();
            ajaxcheckanswers[i] = [];
            if($.trim(quest) != "") {
                ajaxanswers[i] = [];
                answers[i].forEach( function (el,ii) {
                    var answ = $( "input#possible_answer"+el ).val();
                    if($.trim(answ) != "") {
                        if($("input#right_or"+el).prop( "checked" )) {
                            ajaxcheckanswers[i].push(answ);
                        }
                        if(Array.isArray(ajaxanswers[i]) === false) {
                            ajaxanswers[i] = answ;
                        } else {
                            ajaxanswers[i].push(answ);
                        }
                        ajaxquestions[i] = quest;
                        pass = true;
                    }
                });
            }
        });
        if(pass == true) {
            ajaxanswers.forEach(function (e,i) {
                passajax = false;
                e.forEach(function (ee) {
                    if(ajaxcheckanswers[i] == ee) {
                        passajax = true;
                        return;
                    }
                });
                if(passajax == false)return;
            });
        }
        if(passajax == true) {
            $.ajax({
                method: "POST",
                url: "/api/index_post/format/json",
                data: { questions: ajaxquestions, answers: ajaxanswers, checked: ajaxcheckanswers},
                dataType: "json",
            })
            .done(function(msg) {
                var obj = $.parseJSON(msg);
                if (obj.status === "done") {
                    $("#messages").html("<div style='color:blue'><h1>Сохранено</h1></div>");
                }
            });
        } else {
            $("#messages").html("<div style='color:red'><h1>Ошибка</h1></div>");
        }
    });
});