import {
  fetchOrder,
  fetchOrders,
  createOrder,
  resetOrderModalData
} from '../src/services/slices';
import reducer, {
  initialState as ordersInitialState
} from '../src/services/slices/orders';
import { mockOrders } from './__mockData__/mockData';

describe('Тестирование ordersReducer', () => {
  test('Очищение данных модального окна заказа при вызове resetOrderModalData', () => {
    const prevState = {
      ...ordersInitialState,
      isOrderLoading: true,
      isOrdersLoading: true,
      orderModalData: mockOrders[0]
    };

    const nextState = reducer(prevState, resetOrderModalData());

    expect(nextState.orderModalData).toBeNull();
    expect(nextState.ordersData).toEqual([]);
    expect(nextState.error).toBeNull();
    expect(nextState.orderRequest).toBe(false);
    expect(nextState.isOrdersLoading).toBe(true);
    expect(nextState.isOrderLoading).toBe(true);
  });

  describe('Тестирование fetchOrders', () => {
    test('pending: выставляет флаг загрузки и сбрасывает ошибку', () => {
      const action = { type: fetchOrders.pending.type };
      const nextState = reducer(ordersInitialState, action);

      expect(nextState.isOrdersLoading).toBe(true);
      expect(nextState.error).toBeNull();
    });

    test('fulfilled: должен сохранить заказ, отключить загрузку заказа и сбросить ошибку', () => {
      const action = {
        type: fetchOrders.fulfilled.type,
        payload: mockOrders
      };
      const nextState = reducer(ordersInitialState, action);

      expect(nextState.isOrdersLoading).toBe(false);
      expect(nextState.error).toBeNull();
      expect(nextState.ordersData).toEqual(mockOrders);
    });

    test('rejected: должен отключить загрузку заказа и вывести ошибку', () => {
      const errorMessage = 'Ошибка получения заказов';
      const action = {
        type: fetchOrders.rejected.type,
        error: { message: errorMessage }
      };
      const nextState = reducer(ordersInitialState, action);

      expect(nextState.isOrdersLoading).toBe(false);
      expect(nextState.error?.message).toEqual(errorMessage);
    });
  });

  describe('Тестирование fetchOrder', () => {
    test('pending: должен установить флаг загрузки', () => {
      const action = { type: fetchOrder.pending.type };
      const nextState = reducer(ordersInitialState, action);

      expect(nextState.isOrderLoading).toBe(true);
    });

    test('fulfilled: должен сохранить заказ в orderModalData и сбросить флаг загрузки', () => {
      const action = {
        type: fetchOrder.fulfilled.type,
        payload: mockOrders[0]
      };
      const nextState = reducer(ordersInitialState, action);

      expect(nextState.isOrderLoading).toBe(false);
      expect(nextState.orderModalData).toEqual(mockOrders[0]);
    });

    test('rejected: должен сбросить флаг загрузки', () => {
      const errorMessage = 'Ошибка получения заказа';
      const action = {
        type: fetchOrder.rejected.type,
        error: { message: errorMessage }
      };
      const nextState = reducer(ordersInitialState, action);

      expect(nextState.isOrderLoading).toBe(false);
    });
  });

  describe('Тестирование createOrder', () => {
    test('pending: должен установить orderRequest в true', () => {
      const action = { type: createOrder.pending.type };
      const nextState = reducer(ordersInitialState, action);

      expect(nextState.orderRequest).toBe(true);
    });

    test('fulfilled: должен сохранить заказ и сбросить orderRequest', () => {
      const payload = { order: mockOrders[0], name: 'EXAMPLE' };
      const action = {
        type: createOrder.fulfilled.type,
        payload
      };
      const nextState = reducer(ordersInitialState, action);

      expect(nextState.orderRequest).toBe(false);
      expect(nextState.orderModalData).toEqual(mockOrders[0]);
    });

    test('rejected: должен отключить флаг orderRequest', () => {
      const errorMessage = 'Ошибка создания заказа';
      const action = {
        type: createOrder.rejected.type,
        error: { message: errorMessage }
      };
      const nextState = reducer(ordersInitialState, action);

      expect(nextState.orderRequest).toBe(false);
    });
  });
});
