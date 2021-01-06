import React, { Component } from 'react';
import ApiService from "../../ApiService";

class UserListComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            users: [],
            message: null
        }
    }
 
    /* 컴포넌트가 화면에 나가기 직전에 호출되는 API 
       주로 서버사이드 호출하는 용도로 사용했었는데 ...뭐 여튼 거의 안씀 */
    /*componentWillUnmount() {

    } */
    /* 화면에 나타나게 됐을 때 호출 DOM을 사용해야하는 외부 라이브러리 연동을 하거나, 해당 컴포넌트에서 필요로하는 데이터를 요청하기 위해 
       axios, fetch 등을 통하여 ajax요청을 하거나, dDOM의 속성을 읽거나 직접 변경하는 작업을 진행합니다*/
    componentDidMount() {
        this.reloadUserList();
    }
    
    reloadUserList = () => {
        console.log("==========reloacUserList 진입==========");
        ApiService.fetchUsers()
        .then( res => {
            console.log("==========then 진입==========");
            console.log(res.data);
             this.setState({
                users: res.data
            });
        })
        .catch(err => {
            console.log("==========catch 진입==========");
            console.log('reloadUserList() Error!', err);
        })
    }

    deleteUser = (userID) => {
        ApiService.deleteUser(userID)
            .then(res=>{
                this.setState({
                    message: 'User Delete Successfully.'
                });
                this.setState({
                    users: this.state.users.filter(user=>
                        user.id !== userID)
                });
            })
            .catch(err => {
                console.log('deleteUser() Error!', err);
            })
    }

    editUser = (ID) => {
        window.localStorage.setItem("userID",ID);
        this.props.history.push('/edit-user');
    }

    addUser = () => {
        window.localStorage.removeItem("userID");
        this.props.history.push('/add-user');
    }

    render() {
        const number = [1,2,3,4,5];
        const testArray = [
            {
                id: 1,
                name: 'A',
            },
            {
                id: 2,
                name: 'B',
            },
            {
                id: 3,
                name: 'C',
            }
        ]
        //비구조화 할당
        const {a, b, c} = this.state.users;

        return(
            <div>
                <h2>USER LIST</h2>
                <button onClick={this.addUser}> Add User </button>
        <b>{JSON.stringify(this.state.users)}</b>
                 {/*<table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>FistName</th>
                            <th>LastName</th>
                            <th>UserName</th>
                            <th>Age</th>
                            <th>Salary</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.users.map(user => 
                            <tr key={user.auth_id}>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>{user.userName}</td>
                                <td>{user.age}</td>
                                <td>{user.salary}</td>
                                <td>
                                    <button onClick={() => this.editUser(user.id)}>Edit</button>
                                    <button onClick={() => this.editUser(user.id)}>Delete</button>
                                </td>
                            </tr>
                        )} 
                    </tbody>
                </table>*/}
            </div>
        );
    }
}
export default UserListComponent;