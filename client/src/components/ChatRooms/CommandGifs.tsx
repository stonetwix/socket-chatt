import axios from "axios";
import React from "react";

interface State {
    query: string
    GIFs: string []
    message: string 
}



class CommandGifs extends React.Component <{}, State> {
   
      state: State = {
            query : '',
            GIFs : [],
            message : 'Input a query to search related gif results'

        }
    
 
    onChange(e: any){
        this.setState({
            query : e.target.value
        })
    }
 
    onKeyUp(e: any){
        if (e.key === '/') {
            if(this.state.query.length){
                this.setState({
                    GIFs : [],
                  
                });
                this.getGIFs();
            }else{
                alert('Please enter a search term to find gif');
            }
        }
    }
    getGIFs(){
        this.setState({
            message : '',
        });
        axios.get('https://api.giphy.com/v1/gifs/search', {
            params: {
                api_key: 'uMYg95kRPqBDouTzVxHQ6XkJPFbFFnEQ',
                q : this.state.query,
                limit : 10,
            }
        })
        .then(function (response: any) {
            let results = response.data.data;
            if(results.length){
                let gifs = results.map((gif: any) => {
                    return {
                        original : gif.images.original.url,
                        fixed : gif.images.fixed_height.url
                    };
                });
                
            }
        }.bind(this))
        .catch(function (error) {
            console.log(error);
        });
    }
 
    // importera från contexten 
    sendGIF(gif: any, e: any){
        console.log(gif);
        this.props.sendMessage({
            type : 'gif',
            url : gif.original
        });
    }
    
    render(){
        return (
          <div></div>
        ) 
    }
}    
 
export default CommandGifs; 