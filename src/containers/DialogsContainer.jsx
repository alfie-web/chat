import React, {useState} from 'react';
import { Dialogs } from '../components';

const DialogsContainer = ({items, userId}) => {
            // Все как бы красиво, но надо перенести в reducer
            const [searchValue, setValue] = useState('');
            const [filtered, setFilteredItems] = useState(Array.from(items));

            const onChangeInput = value => {
                        setFilteredItems(
                                    items.filter(dialog => dialog.user.fullname.toLowerCase().indexOf(value.toLowerCase()) >= 0)
                        );

                        setValue(value);
            }

            return (
                        <Dialogs items={filtered} onSearch={onChangeInput} value={searchValue} userId={userId} />
            )
}

export default DialogsContainer;