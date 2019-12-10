import React, { Component } from 'react';



class NavPage extends Component {
    state = {  }

    componentDidMount=() => {
        console.log(this.props);
    }
    render() { 
        return ( 
            <div>

                This is the Nav page
            </div>
         );
    }
}
 
export default NavPage;