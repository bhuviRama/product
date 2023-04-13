import React from 'react';
import { configure, shallow } from "enzyme"
import Adapter from 'enzyme-adapter-react-16';
import { create,renderer   } from 'react-test-renderer';

import ProductDetails from './ProductDetails';
configure({adapter: new Adapter()});
describe('ProductDetails related tests', () => {

  test('should render component <ProductDetails /> properly', () => {
    jest.mock("react-router-dom", () => ({
        ...jest.requireActual("react-router-dom"),
        useLocation: () => ({
          pathname: "localhost:3000/products/Apple/iPhone%209",
          state: {
              brand:"Apple", 
              category:  "smartphones",
              description :"An apple mobile which is nothing like apple", 
              discountPercentage :12.96, 
              id :1, 
              images:  ['https://i.dummyjson.com/data/products/1/1.jpg', 'https://i.dummyjson.com/data/products/1/2.jpg', 'https://i.dummyjson.com/data/products/1/3.jpg', 'https://i.dummyjson.com/data/products/1/4.jpg', 'https://i.dummyjson.com/data/products/1/thumbnail.jpg'],
              price: 549,
              rating: 4.69,
              stock: 94,
              thumbnail: "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
              title:"iPhone 9"
              }
        })
      }));

  const component =shallow(<ProductDetails/>);

  expect(component.toJSON()).toMatchSnapshot();
  });
})