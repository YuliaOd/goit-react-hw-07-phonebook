import { useDispatch, useSelector } from 'react-redux';
import { deleteContact } from "redux/operations";
import { selectContacts, selectFilter } from 'redux/selectors';
import css from './ContactsList.module.css';

export const ContactsList = () => {
    const contacts = useSelector(selectContacts);
    const { filter } = useSelector(selectFilter);

    const dispatch = useDispatch();
    const handleDelete = (id) => dispatch(deleteContact(id));

    const getVisibleContacts = () => {
    const normalize = filter.toLowerCase();
        return contacts.filter(contact => contact.name.toLowerCase().includes(normalize))
    }

    const visibleContacts = getVisibleContacts();

    return <ul className={css.list}>{visibleContacts.map(({ id, name, phone }) => (
        <li className={css.item} key={id}>
            <p className={css.text}>{name} : {phone}</p>
            <button className={css.button} type='button' onClick={() => handleDelete(id)}>Delete</button>
        </li>))}
    </ul>
}