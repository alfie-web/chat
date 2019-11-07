import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';

import {dialogsActions} from './../redux/actions';
import { Dialogs } from '../components';

// 1:01:32

// const DialogsContainer = ({fetchDialogs, items, userId}) => {
const DialogsContainer = (props) => {
            const {fetchDialogs, items, userId} = props;
            const [searchValue, setValue] = useState('');
            const [filtered, setFilteredItems] = useState(Array.from(items));

            const onChangeInput = value => {
                        setFilteredItems(
                                    items.filter(dialog => dialog.user.fullname.toLowerCase().indexOf(value.toLowerCase()) >= 0)
                        );

                        setValue(value);
            }

            useEffect(() => {
                        if (!items.length) {
                                    fetchDialogs();
                        } else {
                                    setFilteredItems(items);
                        }
            }, [items, fetchDialogs]);

            return (
                        <Dialogs items={filtered} onSearch={onChangeInput} value={searchValue} userId={userId} />
            )
}

const mapStateToProps = (state) => ({
            items: state.dialogs.items           
});

export default connect(mapStateToProps, dialogsActions)(DialogsContainer);
// export default connect(({dialogs}) => dialogs, dialogsActions)(DialogsContainer);