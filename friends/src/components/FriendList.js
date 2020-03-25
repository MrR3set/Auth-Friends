import { axiosWithAuth } from '../utils/axiosWithAuth';
import React, { useState, useEffect } from "react";
import Friend from './Friend';

const FriendList = () => {
    
    const [data,setData] = useState([]);
    const [friend,setFriend] = useState({
        id:"",
        name:"",
        age:"",
        email:""
    });

    const getData = () => {
        axiosWithAuth().get('/api/friends').then(res=>{
            setData(res.data);
        }).catch(err => console.log(err))
    }

    useEffect(() => {
        getData();
      }, []);

    const addFriend = (friend) => {
        console.log("adding", friend);
        axiosWithAuth().post('/api/friends',friend).catch(err=>console.log(err));
        getData();
    }
    const removeFriend = (id) => {
        axiosWithAuth().delete(`/api/friends/${id}`).catch(err=>console.log(err));
        getData();
    }
    const updateFriend = (friend) => {
        axiosWithAuth().put(`/api/friends/${friend.id}`, friend).catch(err=>console.log(err));
        getData();
    }

    const handleChange = (e) => {
        e.preventDefault();
        setFriend({...friend, [e.target.name]: e.target.value, id:Date.now()})
      }
      
      const handleSubmit = (e) => {
        e.preventDefault();
        addFriend(friend);
      }


    console.log("rendering", data);
    return (
        <div className="friend-list-wrapper">
            <div className="friends-list">
                {data.map(friend=>{
                    return <Friend key={friend.id} friend={friend} removeFriend={removeFriend} updateFriend={updateFriend}/>
                })}
            </div>
            <form onSubmit={handleSubmit} className="addForm">
                <label htmlFor='name'>Name</label>
                <input name='name' onChange={handleChange} value={friend.name}/>

                <label htmlFor='age'>Age</label>
                <input name='age' type="number" onChange={handleChange} value={friend.age}/>

                <label htmlFor='email'>Email</label>
                <input name='email' onChange={handleChange} value={friend.email}/>
                <button type='submit'>Add friend</button>
            </form>
        </div>
    )
}

export default FriendList;
