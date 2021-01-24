import './bootstrap.min.css';
import './App.css';
import EmotionTable from './EmotionTable.js';
import React from 'react';
import axios from 'axios';
import Driver from 'driver.js';
import 'driver.js/dist/driver.min.css';

class App extends React.Component {
  state = {innercomp:
   <div className="form-group">
    <label htmlFor="textinput">Pour out your heart ❤️ with text and let the AI 🕵️ investigate to figure out the sentiment or emotion.</label>
    <textarea className="form-control" id="textinput" rows="3" placeholder="Write a sentence or two and then select which analysis you want to perform below."></textarea>
  </div>,
            mode: "text",
          sentimentOutput:[],
          sentiment:true
        }
  
  renderTextArea = ()=>{
    document.getElementById("textinput").value = "";
    if(this.state.mode === "url") {
      this.setState({innercomp:
      <div className="form-group">
    <label htmlFor="textinput">Pour out your heart ❤️ with text and let the AI 🕵️ investigate to figure out the sentiment or emotion.</label>
    <textarea className="form-control" id="textinput" rows="3" placeholder="Write a sentence or two and then select which analysis you want to perform below."></textarea>
  </div>,
//   <textarea rows="4" cols="50" id="textinput"/>,
      mode: "text",
      sentimentOutput:[],
      sentiment:true
    })
    } 
  }

  renderTextBox = ()=>{
    document.getElementById("textinput").value = "";
    if(this.state.mode === "text") {
      this.setState({innercomp:
      <div className="form-group">
    <label htmlFor="textinput">Not sure how much love ❤️ a website article was written with? Paste the URL below and let the AI 🕵️ investigate to figure out the sentiment or emotion.</label>
    <input className="form-control" id="textinput" rows="3" placeholder="Paste a website link here and then select which analysis you want to perform below."></input>
  </div>,
      mode: "url",
      sentimentOutput:[],
      sentiment:true
    })
    }
  }

  sendForSentimentAnalysis = () => {
    this.setState({sentiment:true});
    let ret = "";
    let url = ".";

    if(this.state.mode === "url") {
      url = url+"/url/sentiment?url="+document.getElementById("textinput").value;
    } else {
      url = url+"/text/sentiment?text="+document.getElementById("textinput").value;
    }
    ret = axios.get(url);
    ret.then((response)=>{

      //Include code here to check the sentiment and fomrat the data accordingly

      this.setState({sentimentOutput:response.data});
      let output = response.data; 
      if(response.data === "positive") {
        output = 
        <div className="row justify-content-center mt-3 mb-5">
            <div className="col">
                <h3>🕵️ Sentiment Analysis</h3><br/>
                <div className="h5" style={{color:"#28a745"}}>😊 Sounds pretty {response.data} to me!</div>
            </div>
        </div>    
      } else if (response.data === "negative"){
        output = 
        <div className="row justify-content-center mt-3 mb-5">
            <div className="col">
                <h3>🕵️ Sentiment Analysis</h3><br/>
                <div className="h5" style={{color:"#dc3545"}}>Lighten up buttercup 🙁 {response.data} thoughts don't help anyone.</div>
            </div>
        </div>
      } else {
        output = 
        <div className="row justify-content-center mt-3 mb-5">
            <div className="col">
                <h3>🕵️ Sentiment Analysis</h3><br/>
                <div className="h5" style={{color:"#ffc107"}}>Well this is pretty 😐 {response.data} and plain.</div>
            </div>
        </div>
      }
      this.setState({sentimentOutput:output});
    });
  }

  sendForEmotionAnalysis = () => {
    this.setState({sentiment:false});
    let ret = "";
    let url = ".";
    if(this.state.mode === "url") {
      url = url+"/url/emotion?url="+document.getElementById("textinput").value;
    } else {
      url = url+"/text/emotion/?text="+document.getElementById("textinput").value;
    }
    ret = axios.get(url);

    ret.then((response)=>{
      this.setState({sentimentOutput:<EmotionTable emotions={response.data}/>});
  });
  }

  componentDidMount() {
      const driver = new Driver();

// Define the steps for introduction
driver.defineSteps([
  {
    element: '#btnSelectDriver',
    popover: {
      className: 'first-step-popover-class',
      title: 'Analyze Text or Website Link',
      description: 'First select either the Write Text 📝 button or Paste Website Link 🔗 button.'
    //   position: 'left'
    }
  },
  {
    element: '#textinput',
    popover: {
      title: 'Enter Text or Website Link',
      description: 'Then either enter some text or a website link in the text box that you want to analyze.'
    //   position: 'top'
    }
  },
  {
    element: '#btnAnalyzeDriver',
    popover: {
      title: 'Analyze Sentiment or Emotion',
      description: 'Finally, select either the 🔍 Analyze Sentiment 😊 😐 🙁 button or Analyze Emotion 🔎 😥 😂 😨 🤢 😡 button and wait for the results!'
    //   position: 'right'
    }
  },
]);

// Start the introduction
driver.start();
  }

  
  

  render() {
    return (  
    <div className="container mt-5">
        <div className="row justify-content-center">
            
            <div className="col">
            <h2 className="text-center">AI Text Investigator 🕵️</h2>
            <p className="text-muted text-center">Use Artificial Intelligence to help analyze the sentiment and emotion of text or a webpage</p>
            </div>
           
        </div>
        
      <div className="App">
        <div id="btnSelectDriver">
            <button id="btnWriteText" className={this.state.mode==="text" ? 'btn btn-primary btn-lg m-3': 'btn btn-outline-primary btn-lg m-3'} onClick={this.renderTextArea}>Write Text 📝</button>
            <button id="btnWebsiteLink" className={this.state.mode==="url" ? 'btn btn-primary btn-lg m-3': 'btn btn-outline-primary btn-lg m-3'}  onClick={this.renderTextBox}>Paste Website Link 🔗</button>
        </div>
        <br/><br/>
        {this.state.innercomp}
        <br/>
        <div id="btnAnalyzeDriver">
            <button className='btn btn-primary btn-lg m-3' onClick={this.sendForSentimentAnalysis}>🔍 Analyze Sentiment <br /> 😊 😐 🙁</button>
            <button className='btn btn-primary btn-lg m-3' onClick={this.sendForEmotionAnalysis}>Analyze Emotion 🔎 <br /> 😥 😂 😨 🤢 😡</button>
        </div>
        <br/>
            {this.state.sentimentOutput}
      </div>
      <div className="row justify-content-center">
            
            <div className="col">
            <p className="text-muted text-center">Made with ❤️ by <a href="https://twitter.com/jkeatin" target="_blank" rel="noreferrer">@jkeatin</a> | Powered by <a href="https://www.ibm.com/watson" target="_blank" rel="noreferrer">IBM Watson</a> </p>
            </div>
           
        </div>
    </div>
    );
    }
}

export default App;
