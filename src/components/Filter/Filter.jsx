import { useDispatch, useSelector } from 'react-redux';
import { changeFilter } from 'redux/filterSlice';
import { selectFilter } from 'redux/selectors';
import css from './Filter.module.css';

export const Filter = () => {
    const dispatch = useDispatch();
    const { filter } = useSelector(selectFilter);

    const onFilterChange = (event) => dispatch(changeFilter(event.target.value))


    return <div className={css.filter__wrapper}>
                <label className={css.label}> Find contacts by name
                    <input
                        className={css.input}
                        type="text"
                        value={filter}
                        onChange={onFilterChange}
                        required
                    />
                </label>
            </div>
}