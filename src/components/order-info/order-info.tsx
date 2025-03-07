import { FC, useEffect, useMemo } from 'react';
import { Preloader, OrderInfoUI } from '@ui';
import { TIngredient } from '@utils-types';
import { useDispatch, useSelector } from '@store';
import { useParams } from 'react-router-dom';
import {
  fetchOrder,
  selectIngredients,
  selectIngredientsIsLoading,
  selectIsOrderLoading,
  selectOrderModalData
} from '@slices';

export const OrderInfo: FC = () => {
  const dispatch = useDispatch();

  const isIngredientsLoading = useSelector(selectIngredientsIsLoading);
  const ingredients = useSelector(selectIngredients);
  const isOrderLoading = useSelector(selectIsOrderLoading);
  const orderModalData = useSelector(selectOrderModalData);

  const { number } = useParams<{ number: string }>();

  useEffect(() => {
    dispatch(fetchOrder(Number(number)));
  }, [dispatch]);

  const orderInfo = useMemo(() => {
    if (!orderModalData || !ingredients.length) return null;

    const date = new Date(orderModalData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderModalData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderModalData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderModalData, ingredients]);

  if (isIngredientsLoading || isOrderLoading) {
    return <Preloader />;
  }

  if (!orderInfo) {
    return null;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
