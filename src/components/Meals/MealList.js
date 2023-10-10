import React, { useCallback, useEffect, useState } from "react";
import classes from "./MealList.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";

function MealList() {
  const [meals, setMeals] = useState([]);
  const fetchMeals = useCallback(async () => {
    const res = await fetch(
      "https://react-http-1808d-default-rtdb.firebaseio.com/meals.json"
    );
    const data = await res.json();

    const loadedMeals = [];

    for (const key in data) {
      loadedMeals.push({
        id: key,
        name: data[key].name,
        desc: data[key].description,
        price: data[key].price,
      });
    }

    setMeals(loadedMeals);
  }, []);

  useEffect(() => {
    fetchMeals();
  }, [fetchMeals]);

  return (
    <div className={classes.meals}>
      <Card>
        <ul>
          {meals.map((meal) => (
            <MealItem
              key={meal.id}
              name={meal.name}
              desc={meal.description}
              price={meal.price}
              id={meal.id}
            />
          ))}
        </ul>
      </Card>
    </div>
  );
}

export default MealList;
