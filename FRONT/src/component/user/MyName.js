import { render } from '@testing-library/react';
import React, {Component} from 'react';

//클래스형
 class MyName extends Component {


    render() {
        return(
            <div>
                <b>{this.props.name}</b>
            </div>

        );

    }
}

export default MyName; 

