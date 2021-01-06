import React,{Component} from "react";
import { connect } from "react-redux";
import ApiService from '../ApiService';
import TransferDepositComponent from "../component/system/TransferDepositComponent";

class TransferDepositContainer extends Component {

    transferDeposit = (e) => {
        console.log(e);
        ApiService.transferDiposit(e);

    }


    render() {


        return(
            <div>
                <TransferDepositComponent 
                onSubmit={this.transferDeposit}
                />

            </div>
        )
    }

}

const mapStateToProps = ({  }) => ({

})

const mapDispatchToProps = dispatch => ({
    
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TransferDepositContainer);