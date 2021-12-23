import React, { useState } from "react";
import Modal from "../../modal/Modal";
import FastFood from "./fastFood";

const FastFoodSelectModal = ({ active, setActive, children, accountClientId }) => {

    const [foods, setFoods] = useState(null);
    const [selectedFoods, setSeletedFoods] = useState([]);

    function GetAllFoods() {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', "api/fastFood/GetAllFoods");
        xhr.onload = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                setFoods(JSON.parse(xhr.responseText));
            }
        }.bind(this);
        xhr.send();
    }

    function selectFood(id) {
        let array = [];
        array.push(id);
        let moreItems = [...selectedFoods, ...array]
        setSeletedFoods(moreItems)
    }
    function getTotalMoney() {
        let totalMoney = 0;
        foods.map(function (food) {
            selectedFoods.forEach(function (selectedFood) {
                if (food.id === selectedFood) {
                    totalMoney += food.price;
                }
            })
        });

        return totalMoney;
    }

    if (active) {
        GetAllFoods()
    }

    if (!active && selectedFoods.length > 0) {
        setSeletedFoods([]);
    }

    return (
        <React.Fragment>
            <Modal active={active} setActive={setActive}>
                <span>Выбранно: {selectedFoods.length}</span>
                {active && foods != null ? foods.map(function (food, index) {
                    return <FastFood key={index}
                        id={food.id}
                        fastFood={food.nameFastFood}
                        price={food.price}
                        cookingTime={food.cookingTime}
                        className={`fastFood ${index}`}
                        select={selectFood.bind(this)}
                        isOnlyContent={false} />
                }) : children}
                <span>Итого: {selectedFoods.length > 0 ? `${getTotalMoney()}р` : "0р"}</span>
                <button onClick={() => {
                    let array = [];
                    array.push(accountClientId)
                    var json = JSON.stringify({
                        accountClientId: array,
                        fastFoods: selectedFoods
                    });
                    const response = fetch("api/fastFood/AddFastFoodInBooking", {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: json
                    })
                    response.then(data => {
                        debugger;
                        console.log(data);
                    })
                }}>Добавить</button>
            </Modal>
        </React.Fragment>
    )
}
export default FastFoodSelectModal