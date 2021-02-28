import { useState } from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { createPet } from '../../store/pets';
import { useHistory } from 'react-router-dom';
import './Navigation.css';

function DashboardDropdown() {
    Modal.setAppElement(document.querySelector('.nav-logged-in'));
    const dispatch = useDispatch();
    const history = useHistory();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [name, setName] = useState('');
    const [breed, setBreed] = useState('');
    const [birthday, setBirthday] = useState('');

    const sessionUser = useSelector((state) => state.session.user);
    const userId = sessionUser.id;

    const addName = (e) => setName(e.target.value);
    const addBreed = (e) => setBreed(e.target.value);
    const addBirthday = (e) => setBirthday(e.target.value);

    const toggleModal = () => {
        modalIsOpen ? setModalIsOpen(false) : setModalIsOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            name,
            breed,
            birthday,
            userId,
        };
        const createdPet = await dispatch(createPet(payload));
        if (createdPet) {
            console.log('pet created!!!');
            history.push('/profile');
        }
    };

    const style = {
        overlay: {
            textAlign: 'center',
            backgroundColor: 'rgba(0,0, 0, 0.9)',
            zIndex: '100000',
        },
    };

    return (
        <div>
            <div className="add-a-pet" onClick={toggleModal}>
                │ add pet │ ⌄
            </div>
            <Modal
                className="modal-container-pet"
                style={style}
                isOpen={modalIsOpen}
                parentSelector={() => document.querySelector('.nav-logged-in')}
            >
                <div>
                    <h1 className="activity-add-title">Add a Pet</h1>
                    <form
                        className="pet-form-container"
                        onSubmit={handleSubmit}
                    >
                        <div className="name-container">
                            <label>name</label>
                            <input
                                className="name-input"
                                type="text"
                                value={name}
                                onChange={addName}
                                placeholder="Name"
                                required
                            />
                            <div className="activity-add-title">
                                __________________
                            </div>
                        </div>

                        <div className="breed-container">
                            <label>breed</label>
                            <input
                                className="breed-input"
                                type="text"
                                value={breed}
                                onChange={addBreed}
                                placeholder="breed(ish)"
                                required
                            />
                            <div className="activity-add-title">
                                __________________
                            </div>
                        </div>

                        <div className="birthday-container">
                            <label>birthday</label>
                            <input
                                className="birthday-input"
                                type="text"
                                value={birthday}
                                onChange={addBirthday}
                                placeholder="birthday(ish)"
                                required
                            />
                            <div className="activity-add-title">
                                __________________
                            </div>
                        </div>

                        <button className="add-pet-button" type="submit">
                            Add Pet
                        </button>
                        <button onClick={toggleModal}>Cancel</button>
                    </form>
                </div>
            </Modal>
        </div>
    );
}

export default DashboardDropdown;
