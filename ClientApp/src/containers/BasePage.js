import React, { useState, useContext } from "react";
import Modal from "../modal/Modal";
import { AlertContext } from "../components/alert/AlertContext";

const BasePage = ({ title, className, childrenColumn, childrenItem, childrenModal, options, onFindItem, onChange }) => {
    const [modalActive, setActive] = useState(false);
    const { show } = useContext(AlertContext);

    return (
        <React.Fragment>
            <div className={`${className}Header`}>
                <h1 style={{ textAlign: 'center' }}>{title}</h1>
                <div style={{ textAlign: 'end' }}>
                    <span className={`add${className} Button`} style={{
                        margin: '28px',
                        'cursor': 'pointer'
                    }} onClick={() => setActive(true)}>Добавить</span>
                    <select onChange={onChange}>
                        {options}
                    </select>
                    <input type="text" onKeyPress={onFindItem} />
                </div>
            </div>
            <div className={`${className}Info list`}>
                {childrenColumn}
                {childrenItem}
            </div>
            <button onClick={() => {
                show('Тест')
            }}>123</button>
            <Modal active={modalActive} setActive={setActive}>
                {childrenModal}
            </Modal>
        </React.Fragment>
    );
}
export default BasePage
