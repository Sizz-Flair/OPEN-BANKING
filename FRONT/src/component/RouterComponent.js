import React, { Suspense } from 'react';
import {BrowserRouter, Route, Switch, browserHistory, Router} from 'react-router-dom';

import LoginContainer from "../containers/LoginContainer";
import DashbordContainer from "../containers/DashbordContainer";
import MembershipContainer from"../containers/MembershipContainer";
import AccountContainer from "../containers/AccountContainer"
import TrascationContainer from "../containers/TranscationListContainer";
import AccountUpdateInfoContainer from "../containers/AccountUpdateInfoContainer"
import TransferDepositContainer from "../containers/TransferDepositContainer"

import Header from './system/templates/Header';
import Nav from './system/templates/Nav';
import Foot from './system/templates/foot';

const AppRouter = () => {
    return(
        <div>
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
        </div>
    );
}

export default AppRouter;
