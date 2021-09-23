import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { userActions } from '../redux/actions';

function HomePage() {
    const users = useSelector(state => state.users);
    const user = useSelector(state => state.authentication.user);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(userActions.getAll());
    }, []);

    function handleDeleteUser(id) {
        dispatch(userActions.delete(id));
    }

    return (
        <div className="col-lg-8 offset-lg-2">
            <h1>Hi {user.firstName}!</h1>
            <p>Welcome to the Dashboard!!</p>
            <h3>All registered users:</h3>
            {users.loading && <em>Loading users...</em>}
            {users.error && <span className="text-danger">ERROR: {users.error}</span>}
            {users.items &&

                <ul className="list-group">
                    {users.items.map((user, index) =>
                        <li key={user.id} className="list-group-item d-flex justify-content-between align-items-center">
                            {user.firstName + ' ' + user.lastName}
                            {
                                user.deleting ? <em> - Deleting...</em>
                                : user.deleteError ? <span className="text-danger"> - ERROR: {user.deleteError}</span>
                                : <span><button type="button" className="btn btn-danger" onClick={() => handleDeleteUser(user.id)}>Delete</button></span>
                            }
                        </li>
                    )}
                </ul>
            }
            <p className="mt-3">
                <Link to="/login" className="btn btn-primary">Logout</Link>
            </p>
        </div>
    );
}

export { HomePage }