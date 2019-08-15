class Question extends React.Component {
    constructor(props) {
        super(props);
        this.regulations_five = 2
    }
    addAnswer = () => {
        if(this.regulations_five < 6) {
            var formgroups = document.getElementById('formgroups');
            formgroups.insertAdjacentHTML('beforeend', "<div class='form-group'><input name='possible_answer' type='text' class='form-control' id='possible_answer"+this.regulations_five+"' aria-describedby='emailHelp' placeholder='Вариант ответа' /></div>");
            this.regulations_five++;
        }
    }
    render() {
        return (
            <span>
                <span id="formgroups">
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Вопрос</label>
                        <input name="question" type="text" className="form-control" id="question" aria-describedby="emailHelp" placeholder="Задайте ворос" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Варианты ответов</label>
                        <input name="possible_answer" type="text" className="form-control" id="possible_answer1" aria-describedby="emailHelp" placeholder="Вариант ответа" />
                    </div>
                </span>
                <button onClick={this.addAnswer} type="submit" className="btn btn-primary">Добавить вариант ответа</button>
            </span>
        )
    }
}

class Questions extends React.Component {
    constructor(props) {
        super(props);
    }

    addQuestion = () => {
        var formgroups = document.getElementById('questions');
        formgroups.insertAdjacentHTML('beforeend', <Question />);
    }

    saveQuestion = () => {

    }
    render() {
        return (
            <div id="start">
                <span id="questions"><Question /></span>
                <div id="messages"></div>
                <button onClick={this.addAnswer} type="submit" className="btn btn-primary">Добавить вопрос</button>
                <button onClick={this.saveQuestion} type="submit" className="btn btn-primary">Сохранить вопросы</button>
            </div>
        );
    }
}
ReactDOM.render(<Questions />, document.getElementById('container'));