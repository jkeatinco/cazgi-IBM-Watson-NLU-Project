import './bootstrap.min.css';
import './App.css';
import EmotionTable from './EmotionTable.js';
import React from 'react';
import axios from 'axios';

class App extends React.Component {
  state = {innercomp:
   <div className="form-group">
    <label htmlFor="textinput">Put some text below you wish to analyze.</label>
    <textarea className="form-control" id="textinput" rows="3"></textarea>
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
    <label htmlFor="textinput">Put some text below you wish to analyze.</label>
    <textarea className="form-control" id="textinput" rows="3"></textarea>
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
    <label htmlFor="textinput">Copy and Paste a Website URL below you wish to analyze.</label>
    <textarea className="form-control" id="textinput" rows="3"></textarea>
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
        output = <div style={{color:"green",fontSize:20}}>The sentiment is {response.data}.</div>
      } else if (response.data === "negative"){
        output = <div style={{color:"red",fontSize:20}}>The sentiment is {response.data}.</div>
      } else {
        output = <div style={{color:"yellow",fontSize:20}}>The sentiment is {response.data}.</div>
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
  

  render() {
    return (  
    <div className="container">
        <div className="row justify-content-center">
            
            <div className="col">
            <h2 className="text-center">AI Text Investigator 🕵️</h2>
            <p className="text-muted text-center">Analyze the sentiment and emotion of text or a webpage</p>
            </div>
           
        </div>
        
      <div className="App">
        <button className={this.state.mode==="text" ? 'btn btn-primary btn-lg m-3': 'btn btn-outline-primary btn-lg m-3'} onClick={this.renderTextArea}>Write Text 📝</button>
        <button className={this.state.mode==="url" ? 'btn btn-primary btn-lg m-3': 'btn btn-outline-primary btn-lg m-3'}  onClick={this.renderTextBox}>Paste Website Link 🔗</button>
        <br/><br/>
        {this.state.innercomp}
        <br/>
        <button className="btn btn-primary btn-lg m-3" onClick={this.sendForSentimentAnalysis}>🔍 Analyze Sentiment</button>
        <button className="btn btn-primary btn-lg m-3" onClick={this.sendForEmotionAnalysis}>Analyze Emotion 🔎</button>
        <br/>
            {this.state.sentimentOutput}
      </div>
    </div>
    );
    }
}

export default App;
