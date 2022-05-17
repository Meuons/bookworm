import React from 'react'
import Start from './Start';
import ReactDOM from 'react-dom'
let deployed = true
let url = ''
if(deployed){
  url = 'https://bookworm-service.herokuapp.com/'
}
else{
  url = 'http://localhost:3000/'
}

class Confirmation extends React.Component {
    constructor() {
      super();
      this.state = {totalAmount: 0, totalPrice: 0, array:[]};
    }
    
    componentDidMount() {
        const queryString = window.location.search;
console.log(queryString);
const urlParams = new URLSearchParams(queryString);
const orderId = urlParams.get('order_id')


        fetch(url + 'KlarnaConfirmation/' + orderId)
        .then(async response => {
            const data = await response.json();
            console.log(data);
         
           let htmlSnippet = {__html:data.html_snippet}
           console.log(htmlSnippet);
        
           ReactDOM.render(
             <>  
       <div dangerouslySetInnerHTML={htmlSnippet} id="my-confirmation-container"></div>

             </>, document.getElementById('wrapper')
             )
    
                var confirmationContainer = document.getElementById('my-confirmation-container')
               
                var scriptsTags = confirmationContainer.getElementsByTagName('script')
                // This is necessary otherwise the scripts tags are not going to be evaluated
                for (var i = 0; i < scriptsTags.length; i++) {
                    var parentNode = scriptsTags[i].parentNode
                    var newScriptTag = document.createElement('script')
                    newScriptTag.type = 'text/javascript'
                    newScriptTag.text = scriptsTags[i].text
                    parentNode.removeChild(scriptsTags[i])
                    parentNode.appendChild(newScriptTag)
                }
          
             localStorage.clear()

            if (!response.ok) {
    
                const error = (data && data.message) || response.statusText;
                return Promise.reject(error);
            }
           //Store all the items from the database in an array
           const a = document.createElement('a');
           a.innerText = "Continue"
           a.setAttribute('id','klarnaContinue')
           a.href = 'https://meuons.github.io'
           document.getElementById("my-confirmation-container").appendChild(a)
        })
        .catch(error => {
            this.setState({ errorMessage: error.toString() });
            console.error('There was an error!', error);
        });
  

}

GoBack(){

ReactDOM.render(
 <> 
<Start/>
 </>, document.getElementById('wrapper'))
 }

render() {
    return(
<>
</>
    )
}

}
export default Confirmation 