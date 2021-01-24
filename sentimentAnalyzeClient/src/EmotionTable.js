import React from 'react';
import './bootstrap.min.css';

class EmotionTable extends React.Component {
    render() {
        let myEmotions = this.props.emotions;
        console.log(myEmotions);
        let myEmotionsArray = Object.entries(myEmotions);
        console.log(myEmotionsArray);
        myEmotionsArray[0].push("😥");
        myEmotionsArray[1].push("😂");
        myEmotionsArray[2].push("😨");
        myEmotionsArray[3].push("🤢");
        myEmotionsArray[4].push("😡");
        myEmotionsArray[0].push("progress-bar progress-bar-striped progress-bar-animated");
        myEmotionsArray[1].push("progress-bar progress-bar-striped progress-bar-animated bg-info");
        myEmotionsArray[2].push("progress-bar progress-bar-striped progress-bar-animated bg-warning");
        myEmotionsArray[3].push("progress-bar progress-bar-striped progress-bar-animated bg-success");
        myEmotionsArray[4].push("progress-bar progress-bar-striped progress-bar-animated bg-danger");
        let myEmotionDetails = myEmotionsArray.map((myEmotionDetial)=>{
        console.log(myEmotionDetial[0]);
        myEmotionDetial[1] = Math.round(myEmotionDetial[1] / 1 * 100);
        let myEmotionPercentage = myEmotionDetial[1];
        let myStyle = {
            splitterStyle: {
                width: myEmotionPercentage+"%"
            }
        };
        console.log(myStyle);
        return <tr><td style={{color: "black"}}>{myEmotionDetial[2]} {myEmotionDetial[0]}</td>
        <td>
            <div className="progress">
                <div style={myStyle.splitterStyle} className={myEmotionDetial[3]} role="progressbar" aria-valuenow={myEmotionDetial[1]} aria-valuemin="0" aria-valuemax="1">{myEmotionDetial[1]}%</div>
            </div>
        </td>
        </tr>});
      return (  
        <div className="table-responsive mt-3 mb-3">
          {/*You can remove this line and the line below. */}
          {/*JSON.stringify(this.props.emotions)*/}
          
          <h3 className="">🕵️ Emotion Table Analysis</h3>
          <table className="table table-bordered">
              <thead class="thead-dark">
                <tr>
                    <th scope="col">Emotions</th>
                    <th scope="col">Percentage</th>
                </tr>
            </thead>
            <tbody>
            {
                myEmotionDetails
            }
            </tbody>
          </table>
          </div>
          );
        }
    
}
export default EmotionTable;
