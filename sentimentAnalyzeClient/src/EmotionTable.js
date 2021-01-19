import React from 'react';
import './bootstrap.min.css';

class EmotionTable extends React.Component {
    render() {
        let myEmotions = this.props.emotions;
        console.log(myEmotions);
        let myEmotionsArray = Object.entries(myEmotions);
        console.log(myEmotionsArray);
        let myEmotionDetails = myEmotionsArray.map((myEmotionDetial)=>{
        console.log(myEmotionDetial[0]);
        return <tr><td style={{color: "black"}}>{myEmotionDetial[0]}</td><td> {myEmotionDetial[1]}</td></tr>});
      return (  
        <div>
          {/*You can remove this line and the line below. */}
          {/*JSON.stringify(this.props.emotions)*/}
          <table className="table table-bordered">
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
