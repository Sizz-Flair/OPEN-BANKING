import React, { Suspense, Component } from 'react';
import {BrowserRouter, Route, Switch, browserHistory, Router} from 'react-router-dom';
import ApiService from '../ApiService';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as routerAction from '../store/modules/router';

import LoginContainer from "../containers/LoginContainer";
import DashbordContainer from "../containers/DashbordContainer";
import MembershipContainer from"../containers/MembershipContainer";
import AccountContainer from "../containers/AccountContainer"
import TrascationContainer from "../containers/TranscationListContainer";
import AccountUpdateInfoContainer from "../containers/AccountUpdateInfoContainer"
import TransferDepositContainer from "../containers/TransferDepositContainer"
import TransferResultContainer from "../containers/TransferResultContainer";

import Header from './system/templates/Header';
import Nav from './system/templates/Nav';
import Foot from './system/templates/foot';

class AppRouter extends Component {
    componentDidMount() {
    
        let renderState;
        let url = document.location.href;

        const { history, RouterAction } = this.props;
        ApiService.loginSessionCheck(history).then(res=>{
            renderState = res;
            
            renderState === "SESSION_KEEP" 
            ? RouterAction.renderState(true)
            : url === "http://localhost:3000/login" ?  console.log("true") : document.location.href="/login";
        })
      }
        render() {
            const {renderState} = this.props
            return(
                
                <div>
                    {renderState ?
                        <BrowserRouter>
                        <div>
                            <Suspense fallback={<div>Loading...</div>}>
                            <Route path="/">
                            <Switch>
                                <Route exact path="/login" component={LoginContainer} />
                                <Route path="/membership" component={MembershipContainer} />
                            </Switch>
                            </Route>
                            </Suspense>
                        </div>
                        <div>
                        <Route path="/index">
                            <Header />
                            <div>
                                <div className="d-flex flex-wrap p-0 col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                    <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2 border-right">
                                        <Nav />
                                    </div>
                                    <div className="col-xs-10 col-sm-10 col-md-10 col-lg-10">
                                    <Switch>
                                        <Route path="/index/userinfo" component={DashbordContainer} />
                                        <Route path="/index/account" component={AccountContainer} />
                                        <Route path="/index/transcation" component={TrascationContainer} />
                                        <Route path="/index/accountinfo" component={AccountUpdateInfoContainer} />
                                        <Route path="/index/transfer" component={TransferDepositContainer} />
                                        <Route path="/index/result" component={TransferResultContainer} />
                                    </Switch>
                                    </div>
                                </div>
                            </div>
                            <div className="border-top mt-3 pt-3">
                                <Foot/>
                            </div>
                        </Route>
                        </div>
                        </BrowserRouter>
                    :
                    <BrowserRouter>
                        <Switch>
                            <Route exact path="/login" component={LoginContainer} />
                        </Switch>
                    </BrowserRouter>}
                </div>
            );
        }
}   

const mapStateToProps = ({ router }) => ({
    renderState: router.renderState,
});

const mapDispatchToProps = dispatch => ({
    RouterAction: bindActionCreators(routerAction, dispatch),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AppRouter);
