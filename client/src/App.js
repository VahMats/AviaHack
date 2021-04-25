import React, { useState } from 'react';
import mic from './assets/mic.png'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import './App.css';

function App() {
  const { transcript, resetTranscript, listening } = useSpeechRecognition()
  const [ resObjs, setResObjs ] = useState([])
  const [ text, setText ] = useState('')
  if (listening && transcript !== text && transcript !== '') {
    setText(transcript)
  }

  const [ textHis, setTextHis ] = useState([])
  const handleOnSubmit = (e) => {
    console.log('sending', text)
    e.preventDefault();
    setTextHis([ ...textHis, text ])
    setText('')
    // requesty uxarkel stex
    // setResObjs([])
  }

  const handleStartListening = () => {
    console.log('listening')
    setText('')
    SpeechRecognition.startListening({ continuous: true })
  }

  const handleStopListening = () => {
    console.log('not listening')
    SpeechRecognition.stopListening()
    resetTranscript()
  }


  return (
    <div>
      <header>
          <h1>Zurich Airport </h1>
      </header>
      <div className="content">
          <div className="input">
              <div className="prev-messages">
                { textHis.map((text, i) =>
                  <div key={ i } className="prev-message">{ text }</div>
                ) }
              </div>
              <form onSubmit={ handleOnSubmit }>
                <div className="insert">
                  <input value={text} onChange={ (e) => !listening && setText(e.target.value) } type="text" name="chat" id="chat"/>
                  <div className={`circle ${ listening ? 'listening' : '' }`} onClick={ listening ? handleStopListening : handleStartListening }>
                    <img src={ mic } className="mic" alt="microphone"/>
                  </div>
                </div>
              </form>
          </div>

          <div className="outputs">
            { resObjs.map((obj, i) =>
              <div key={ i } className="output">{ obj.data }</div>
            ) }
          </div>
      </div>
    </div>
  );
}

export default App;
