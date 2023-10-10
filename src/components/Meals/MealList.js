import React, { useCallback, useEffect, useState } from "react";
import classes from "./MealList.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";

function MealList() {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState();

  const fetchMeals = useCallback(async () => {
    try {
      const res = await fetch(
        "https://react-http-1808d-default-rtdb.firebaseio.com/meals"
      );
      if (!res.ok) {
        throw new Error("Something went wrong!");
      }
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
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setIsError(error.message);
    }
  }, []);

  useEffect(() => {
    fetchMeals();
  }, [fetchMeals]);

  if (isLoading) {
    return (
      <section className={classes.mealsLoading}>
        <p>...Loading</p>
      </section>
    );
  }

  if (isError) {
    return (
      <section className={classes.mealsError}>
        <p>{isError}</p>
      </section>
    );
  }

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
