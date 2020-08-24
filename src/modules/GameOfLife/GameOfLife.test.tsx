import React from "react";
import { Provider } from "react-redux";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import { GameOfLife } from "./GameOfLife";
import { initialState, actions } from "./reducer";

const mockStore = configureStore([]);

describe("GameOfLife", () => {
  it("should dispatch an action on button click", () => {
    const store = mockStore({
      game: initialState,
    });
    store.dispatch = jest.fn();

    const component = renderer.create(
      <Provider store={store}>
        <GameOfLife />
      </Provider>
    );

    renderer.act(() => {
      component.root.findAllByType("button")[0].props.onClick();
    });

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(actions.click({ x: 0, y: 0 }));
  });
});
