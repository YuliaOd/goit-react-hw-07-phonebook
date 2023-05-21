import { ContactForm } from "./ContactForm/ContactForm";
import { ContactsList } from "./ContactsList/ContactsList";
import { Filter } from "./Filter/Filter";
import css from "./App.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchContacts } from "redux/operations";
import { selectContacts, selectError, selectIsLoading } from "redux/selectors";
import Notiflix from "notiflix";


export const App = () => {

  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const items = useSelector(selectContacts);
  
  useEffect(() => {
    dispatch(fetchContacts())
  }, [dispatch])
  

    return (
      <div className={css.container}>
        <h1 className={css.title}>Phonebook</h1>
        <ContactForm />
        
        <h2 className={css.title}>Contacts</h2>
        <Filter />
            {isLoading && <div className={css.text}>Loading...</div>}
            {error &&  Notiflix.Notify.failure('Error')}
            {items.length > 0 && < ContactsList />}
      </div>
  )
};