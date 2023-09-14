import React, { useState } from 'react';
import axios from 'axios';

// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at


export default function AppFunctional(props) {
  const [message, setMessage] = useState(initialMessage);
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.

  function getXY() {
    const x = (initialIndex % 3) + 1;
    const y = Math.floor(initialIndex / 3) + 1;
    return {x, y};
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.
  }

  function getXYMessage() {
    const { x, y } = getXY();
    return `Coordinates (${x}, ${y})`;
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.
  }

  function reset() {
    setMessage(initialMessage);
    setEmail(initialEmail);
    setSteps(initialSteps);
    setIndex(initialIndex);
    // Use this helper to reset all states to their initial values.
  }

  function getNextIndex(direction) {
    let nextIndex = initialIndex;
    switch (direction) {
      case 'left':
        if (nextIndex % 3 !== 0) {
          nextIndex -= 1;
        }
        break;
        case 'up':
          if (nextIndex >= 3) {
            nextIndex -= 3;
          }
          break;
          case 'right':
            if (nextIndex % 3 !== 2) {
              nextIndex += 1;
            }
            break;
            default:
            break;
    }
    return nextIndex;
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
  }

  function move(direction) {
    const nextIndex = getNextIndex(direction);
    if (nextIndex !== initialIndex) {
      setIndex(nextIndex);
      setSteps(prevSteps => prevSteps + 1);
    }
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
  }

  function onChange(evt) {
    setEmail(evt.target.value);
    // You will need this to update the value of the input.
  }

  function onSubmit(evt) { 
    evt.preventDefault();
    axios.post('/api/endpoint', { email })
    .then(response => {
      setMessage(response.data.message);
    })
    .catch(error => {
      setMessage('An error occurred');
    });
    // Use a POST request to send a payload to the server.
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">Coordinates (2, 2)</h3>
        <h3 id="steps">You moved 0 times</h3>
      </div>
      <div id="grid">
        {
          [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
            <div key={idx} className={`square${idx === 4 ? ' active' : ''}`}>
              {idx === 4 ? 'B' : null}
            </div>
          ))
        }
      </div>
      <div className="info">
        <h3 id="message"></h3>
      </div>
      <div id="keypad">
        <button id="left">LEFT</button>
        <button id="up">UP</button>
        <button id="right">RIGHT</button>
        <button id="down">DOWN</button>
        <button id="reset">reset</button>
      </div>
      <form>
        <input id="email" type="email" placeholder="type email"></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  )
}
