import { Component } from 'react';
import { Section } from './Section/Section';
import { FeedbackOptions } from "./FeedbackOptions/FeedbackOptions";
import { Statistics } from "./Statistics/Statistics";
 import { Notification } from "./Notification/Notification";



export class App extends Component {
  
  state = {
    good: 0,
    neutral: 0,
    bad: 0
  }
  handleClick = (key) => {
    this.setState(prevState => {
      return {
        [key]: prevState[key] + 1
      }
    })
  }
  countTotalFeedback = () =>{
    const { good, neutral, bad } = this.state;
    return (good + neutral + bad)
  };

  countPositiveFeedbackPercentage = () => {
    const { good} = this.state;
    const totalFeedback = this.countTotalFeedback();

    const positiveFeedback = Math.round((good / totalFeedback) * 100)
    return (positiveFeedback ? positiveFeedback : 0)
  }



//   render () {
//     const { good, neutral, bad } = this.state;
//     return (
//           <div>
//             <h1>Please leave feedback</h1>
//             <ul>
//           {Object.keys(this.state).map(key => <button key={key}onClick={() => this.handleClick(key)}>{key}</button>)}
//         </ul>
//             <h1>Statistics</h1>
//         <ul>
//           <li>Good : {good} </li>
//           <li>Neutral : {neutral} </li>
//           <li>Bad : {bad} </li>
//           <li>Total :{this.countTotalFeedback()} </li>
//           <li>Positive feedback : {this.countPositiveFeedbackPercentage()} % </li>
//           </ul>
//           </div>
//         );
//   }
// }

render(){
  const { good, neutral, bad } = this.state;
  const options=Object.keys(this.state)
  return(
    <div>
          <Section title="PLease leave feedback">
          <FeedbackOptions options={options} onLeaveFeedback={this.handleClick} />
          </Section>
    
          {!this.countTotalFeedback() ?
            <Notification message="There is no feedback"/>: 
            <Section title="Statistics">
            <Statistics good={good} neutral={neutral} bad={bad}
              total={this.countTotalFeedback()}
              positivePercentage={this.countPositiveFeedbackPercentage()} />
           </Section>}


    </div>
  )
          }}