import React from 'react';
import {Provider} from 'react-redux'
import { mount, shallow ,configure} from 'enzyme'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk';
import {Home} from './index'
import {initialState} from '../../Redux Files/Reducers/home_reducers'
import Adapter from 'enzyme-adapter-react-16';
import {home_action_types as atn_typs} from  '../../Redux Files/Actions & Constants/constants';
import toJson from 'enzyme-to-json';
import TestRenderer from 'react-test-renderer';

configure({ adapter: new Adapter() });

const mockStore = configureMockStore([thunk]);

describe('Home tests', () => {
  test('Home renders correctly enzyme', () => {
    const store = mockStore({
      home: { ...initialState }
    });
    const wrapper = mount(
      <Provider store={store}>
        <Home />
      </Provider>
    )
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  test('Home should render and dispatch all get methods', () => {
    const store = mockStore({
      home: { ...initialState }
    });
    const wrapper = mount(
      <Provider store={store}>
        <Home />
      </Provider>
    )
    const actions = store.getActions();
    expect(actions[0].type).toEqual(atn_typs.loading); /// Which is called in GetCities method
  });
  test('Home should render 1 Restaurant', () => {
    const store = mockStore({
      home: { ...initialState }
    });
    const wrapper = mount(
      <Provider store={store}>
        <Home />
      </Provider>
    )
    mount( <Provider store={store}> <Home /> </Provider> )
    const restaurants = [{
        address: "1 Benvenuto Place",
        area: "Toronto / SW Ontario",
        city: "Toronto",
        country: "CA",
        id: 21307,
        image_url: "https://www.opentable.com/img/restimages/21307.jpg",
        lat: 43.68207,
        lng: -79.40041,
        mobile_reserve_url: "http://mobile.opentable.com/opentable/?restId=21307",
        name: "Scaramouche Restaurant",
        phone: "4169618011",
        postal_code: "M4V 2L1",
        price: 4,
        reserve_url: "http://www.opentable.com/single.aspx?rid=21307",
        state: "ON"
    }]
    store.dispatch({
      type:atn_typs.get_restaurants_success,
      payload: restaurants
    });
    const actions = store.getActions();
    expect(actions[actions.length-1].type).toEqual(atn_typs.get_restaurants_success);
    expect(actions[actions.length-1].payload).toEqual(restaurants);
  })
})
