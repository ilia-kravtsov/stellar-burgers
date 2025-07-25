import reducer, {
  fetchFeeds,
  initialState
} from '../src/services/slices/feeds';

describe('Тестирование feedsReducer', () => {
  const mockData = {
    orders: [],
    total: 1,
    totalToday: 1
  };

  describe('Общее поведение редьюсера - feedsReducer', () => {
    test('возвращает начальное состояние при вызове с undefined и unknown action', () => {
      expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });
  });

  describe('Тестирование fetchFeeds', () => {
    test('pending: выставляет флаг загрузки и сбрасывает ошибку', () => {
      const action = { type: fetchFeeds.pending.type };
      const state = reducer(initialState, action);

      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
    });

    test('fulfilled: сохраняет полученные данные и сбрасывает флаг загрузки', () => {
      const action = { type: fetchFeeds.fulfilled.type, payload: mockData };
      const state = reducer(initialState, action);

      expect(state.isLoading).toBe(false);
      expect(state.error).toBeNull();
      expect(state.data).toEqual(mockData);
    });

    test('rejected: сохраняет ошибку и сбрасывает флаг загрузки', () => {
      const error = { message: 'Error message' };
      const action = { type: fetchFeeds.rejected.type, error };
      const state = reducer(initialState, action);

      expect(state.isLoading).toBe(false);
      expect(state.error).toEqual(error);
    });
  });
});
