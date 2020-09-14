import { home, initialState } from '../home_reducers';
import { home_action_types } from '../../Actions & Constants/constants';
//import { dummyVariousContent } from '../types/contentTypes';

describe('Home Reducer', () => {
    it('Handles default case', () => {
        const state = home(undefined, {});
        expect(state).toEqual(initialState);
    });
    it('Handles load Restaurants ', () => {
        const data = {restaurants:[]}
        data.restaurants = [{
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
        const action = { type: home_action_types.get_restaurants_success, payload: {data:data} };
        const state = home(undefined, action);
        expect(state).toMatchSnapshot();
    });
    // it('Handles load delays ', () => {
    //     const delays = [{ "cor": "9", "date": "04-30-18" }]
    //     let sorted_delays = delays.reduce((acc, val) => {
    //         acc[val.date] = val.cor;
    //         return acc
    //       }, {})
    //     const action = { type: home_action_types.get_delays_success, delays: sorted_delays };
    //     const state = home(undefined, action);
    //     expect(state).toMatchSnapshot();
    // });
    // it('Handles load streets ', () => {
    //     let street1 = {
    //         streetName: '148th Avenue Southeast',
    //         cor: 25,
    //         path: [
    //             {
    //                 'lat': 47.580725569999998,
    //                 'lng': -122.1412285
    //             },
    //             {
    //                 'lat': 47.585360440000002,
    //                 'lng': -122.1428461
    //             },
    //             {
    //                 'lat': 47.589032889999999,
    //                 'lng': -122.14273470000001
    //             },
    //             {
    //                 'lat': 47.596341019999997,
    //                 'lng': -122.142674
    //             },
    //             {
    //                 'lat': 47.60259559,
    //                 'lng': -122.14280979999999
    //             },
    //             {
    //                 'lat': 47.609862249999999,
    //                 'lng': -122.1429724
    //             },
    //         ]
    //     };
    //     const streets = [street1]
    //     const action = { type: home_action_types.get_streets_success, streets: streets };
    //     const state = home(undefined, action);
    //     expect(state).toMatchSnapshot();
    // });
});