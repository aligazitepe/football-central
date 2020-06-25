import React, { Component } from "react";
import { QuizData } from "./QuizData";
import "./QuizStyles.css";
import Button from "@material-ui/core/Button";
export class Quiz extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userAnswer: null,
      currentIndex: 0,
      options: [],
      quizEnd: false,
      score: 0,
      disabled: true,
    };
  }

  loadQuiz = () => {
    const { currentIndex } = this.state;
    this.setState(() => {
      return {
        question: QuizData[currentIndex].question,
        options: QuizData[currentIndex].options,
        answer: QuizData[currentIndex].answer,
      };
    });
  };

  nextQuestionHandler = () => {
    const { userAnswer, answer, score } = this.state;

    if (userAnswer === answer) {
      this.setState({
        score: score + 1,
      });
    }

    this.setState({
      currentIndex: this.state.currentIndex + 1,
      userAnswer: null,
    });
  };

  componentDidMount() {
    this.loadQuiz();
  }

  checkAnswer = (answer) => {
    this.setState({
      userAnswer: answer,
      disabled: false,
    });
  };

  componentDidUpdate(prevProps, prevState) {
    const { currentIndex } = this.state;
    if (this.state.currentIndex != prevState.currentIndex) {
      this.setState(() => {
        return {
          question: QuizData[currentIndex].question,
          options: QuizData[currentIndex].options,
          answer: QuizData[currentIndex].answer,
        };
      });
    }
  }


  finishHandler =() => {
    if(this.state.currentIndex === QuizData.length -1){
        this.setState({
            quizEnd:true
        })
    }
}
  render() {
    const { question, options, currentIndex, userAnswer, quizEnd } = this.state;
    if(quizEnd) {
        return (
            <div className="Finish">
                <h1>Game Over. Final score is {this.state.score} points</h1>
                <p>The correct Answers for the quiz are</p>
                <ul>
                    {QuizData.map((item, index) => (
                        <li className='ui floating message options'
                            key={index}>
                                {item.answer}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
    return (
      <div className="QuizMain">
        <h2>{question}</h2>
        <span>{`Question ${currentIndex + 1} of ${QuizData.length}`}</span>
        {options.map((option) => (
          <p
            key={option.id}
            className={`options ${userAnswer === option ? "selected" : null}`}
            onClick={() => this.checkAnswer(option)}
          >
            {option}
          </p>
        ))}

{currentIndex < QuizData.length - 1 && <Button disabled = {this.state.disabled} onClick={this.nextQuestionHandler}>
    Next 
    </Button>}
{currentIndex === QuizData.length -1 && <Button onClick={this.finishHandler} disabled = {this.state.disabled}>
    Finish
    </Button>}
      </div>
    );
  }
}

export default Quiz;
