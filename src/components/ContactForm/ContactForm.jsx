import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Notiflix from 'notiflix';
import { addContact } from 'redux/operations';
import { selectContacts } from "redux/selectors";
import css from './ContactForm.module.css';

export const ContactForm = () => {
    const dispatch = useDispatch();
    const contacts = useSelector(selectContacts);

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');

    const handleChange = event => {
        const { name, value } = event.currentTarget;
        switch (name) {
            case 'name':
                setName(value)
                break;
            
            case 'phone':
                setPhone(value)
                break;
        
            default:
                return;
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        
        const addedContacts = getAddedContacts(name);
        (addedContacts) ?
            Notiflix.Notify.warning(`${name} is already in contacts`) :
            dispatch(addContact({ name: form.elements.name.value, phone: form.elements.phone.value }));

        setName('');
        setPhone('');
    }

    const getAddedContacts = (name) => {
        return contacts.find(contact => contact.name.toLowerCase() === name.toLowerCase())
    }


        return (
            <form className={css.form} onSubmit={handleSubmit}>
                <div className={css.form__wrapper}>
                    <label className={css.label}> Name
                        <input
                            className={css.input} 
                            type="text"
                            name="name"
                            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                            value={name}
                            onChange={handleChange}
                            required
                        />
                    </label>
                </div>
                <div className={css.form__wrapper}>
                    <label className={css.label}> Number
                        <input
                            className={css.input}
                            type="tel"
                            name="phone"
                            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                            value={phone}
                            onChange={handleChange}
                            required
                        />
                    </label>
                </div>
                <button type='submit' className={css.button}>Add contact</button>
            </form>
        )
}